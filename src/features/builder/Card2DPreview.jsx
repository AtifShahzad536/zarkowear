import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Global cache for loaded GLTF models
const modelCache = new Map();
const modelLoadingPromises = new Map();

// Single Shared Offscreen WebGL Renderer
let sharedRenderer = null;
let sharedScene = null;
let sharedCamera = null;
let dracoLoader = null;
let gltfLoader = null;

function getSharedRenderer() {
  if (!sharedRenderer && typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 640;
    sharedRenderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    sharedRenderer.setSize(512, 640, false);
    sharedRenderer.setPixelRatio(1);
    sharedRenderer.outputColorSpace = THREE.SRGBColorSpace;

    sharedScene = new THREE.Scene();
    sharedCamera = new THREE.PerspectiveCamera(30, 512 / 640, 0.1, 100);
    sharedCamera.position.set(0, 0, 4.0);

    // Studio lighting for rich fabric depth & reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(3, 5, 4);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
    fillLight.position.set(-3, 3, -3);
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
    frontLight.position.set(0, 0, 5);

    sharedScene.add(ambientLight, mainLight, fillLight, frontLight);

    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
    gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
  }
  return { sharedRenderer, sharedScene, sharedCamera, gltfLoader };
}

function loadModelData(url, layersMetadata = {}) {
  if (modelCache.has(url)) {
    return Promise.resolve(modelCache.get(url));
  }
  if (modelLoadingPromises.has(url)) {
    return modelLoadingPromises.get(url);
  }

  const { gltfLoader } = getSharedRenderer();
  const promise = new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        const root = gltf.scene;

        // 1. Calculate precise bounding box of raw geometry
        const bbox = new THREE.Box3().setFromObject(root);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        bbox.getCenter(center);
        bbox.getSize(size);

        // 2. Center geometry around root (0, 0, 0)
        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        // 3. Wrap in a parent group so position offset stays locked
        const wrapper = new THREE.Group();
        wrapper.add(root);

        // 4. Calculate optimal scale to fit comfortably in card view
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.6 / maxDim;
        wrapper.scale.set(scale, scale, scale);
        wrapper.position.set(0, 0, 0);

        // 5. Setup shader materials
        root.traverse((node) => {
          if (node.isMesh) {
            const meta = layersMetadata[node.name] || {};
            const stateKey = meta.merge_parent || node.name;
            const parentMeta = layersMetadata[stateKey] || {};
            const isLocked = meta.is_locked || parentMeta.is_locked;

            if (isLocked) return;

            node.material = node.material.clone();
            node.material.side = THREE.DoubleSide;
            node.material.userData.originalColor = node.material.color ? node.material.color.clone() : new THREE.Color('#ffffff');
            node.material.userData.uniforms = {
              uColor: { value: node.material.userData.originalColor.clone() },
              uIsGradient: { value: 0.0 },
              uColor1: { value: new THREE.Color('#ffffff') },
              uColor2: { value: new THREE.Color('#ffffff') },
              uMinY: { value: -1 },
              uMaxY: { value: 1 },
              uPatternType: { value: 0.0 }
            };

            node.material.onBeforeCompile = (shader) => {
              Object.assign(shader.uniforms, node.material.userData.uniforms);
              shader.vertexShader = `varying vec3 vLocalPos;\nvarying vec2 vUv;\n${shader.vertexShader}`.replace(
                '#include <begin_vertex>',
                '#include <begin_vertex>\nvLocalPos = position;\nvUv = uv;'
              );
              shader.fragmentShader = `
                uniform vec3 uColor;
                uniform float uIsGradient;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uMinY;
                uniform float uMaxY;
                uniform float uPatternType;
                varying vec3 vLocalPos;
                varying vec2 vUv;
                
                float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
                float noise(vec2 p) {
                  vec2 i = floor(p); vec2 f = fract(p);
                  f = f*f*(3.0-2.0*f);
                  return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), f.x),
                             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
                }

                ${shader.fragmentShader}
              `.replace(
                'vec4 diffuseColor = vec4( diffuse, opacity );',
                `
                vec3 baseColor = uColor;
                if (uIsGradient > 0.5) {
                  float t = (vLocalPos.y - uMinY) / (uMaxY - uMinY);
                  t = clamp(t, 0.0, 1.0);
                  t = smoothstep(0.0, 1.0, t);
                  baseColor = mix(uColor2, uColor1, t);
                }
                
                float patStrength = 0.0;
                if (uPatternType > 0.5 && uPatternType < 1.5) {
                  vec2 grid = fract(vUv * 40.0);
                  patStrength = step(0.5, grid.x) == step(0.5, grid.y) ? 0.1 : -0.1;
                } else if (uPatternType > 1.5 && uPatternType < 2.5) {
                  patStrength = (noise(vUv * 10.0) - 0.5) * 0.4;
                } else if (uPatternType > 2.5) {
                  vec2 grid = fract(vUv * 30.0) - 0.5;
                  patStrength = length(grid) < 0.3 ? -0.2 : 0.0;
                }
                
                baseColor += patStrength;
                
                if (!gl_FrontFacing) {
                  baseColor = vec3(0.92, 0.92, 0.92);
                }
                
                vec4 diffuseColor = vec4( baseColor, opacity );
                `
              );
            };
          }
        });

        const modelData = { wrapper, root };
        modelCache.set(url, modelData);
        modelLoadingPromises.delete(url);
        resolve(modelData);
      },
      undefined,
      (err) => {
        modelLoadingPromises.delete(url);
        reject(err);
      }
    );
  });

  modelLoadingPromises.set(url, promise);
  return promise;
}

/**
 * Ultra-Lightweight 2D Dynamic Card Preview Component
 * Renders high-fidelity model visuals with 0 DOM WebGL instances
 */
const Card2DPreview = ({
  modelUrl,
  mapping = {},
  primaryColor = '#ffffff',
  primaryIsGrad = false,
  primaryColor2 = '#ffffff',
  secondaryColor = '#ffffff',
  secondaryIsGrad = false,
  secondaryColor2 = '#ffffff',
  thirdColor = '#ffffff',
  thirdIsGrad = false,
  thirdColor2 = '#ffffff',
  pattern = 'none',
  finish = 'matte',
  layersMetadata = {}
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [modelData, setModelData] = useState(() => modelCache.get(modelUrl) || null);
  const [loading, setLoading] = useState(!modelData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!inView || modelData) return;
    let isMounted = true;
    loadModelData(modelUrl, layersMetadata)
      .then((data) => {
        if (isMounted) {
          setModelData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [inView, modelUrl, layersMetadata, modelData]);

  // Render to 2D canvas whenever colors, gradients or patterns change
  useEffect(() => {
    if (!modelData || !canvasRef.current) return;

    const { sharedRenderer, sharedScene, sharedCamera } = getSharedRenderer();
    const wrapper = modelData.wrapper;
    const root = modelData.root;

    const roughness = finish === 'gloss' ? 0.1 : finish === 'metallic' ? 0.2 : 0.8;
    const metalness = finish === 'metallic' ? 0.8 : 0.0;
    const pType = pattern === 'carbon' ? 1.0 : pattern === 'camo' ? 2.0 : pattern === 'dots' ? 3.0 : 0.0;

    const colors = {
      primary: { color: primaryColor, isGrad: primaryIsGrad, color2: primaryColor2 },
      secondary: { color: secondaryColor, isGrad: secondaryIsGrad, color2: secondaryColor2 },
      third: { color: thirdColor, isGrad: thirdIsGrad, color2: thirdColor2 }
    };

    root.traverse((node) => {
      if (node.isMesh && node.material && node.material.userData && node.material.userData.uniforms) {
        node.updateMatrixWorld();
        node.geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        node.geometry.boundingBox.getCenter(center);
        center.applyMatrix4(node.matrixWorld);

        const meshName = (node.name || '').toLowerCase();
        const meta = layersMetadata[node.name] || {};
        const parentKey = (meta.merge_parent || '').toLowerCase();

        // 1. Direct explicit mapping check
        let colorKey = null;
        if (mapping && mapping[node.name]) colorKey = mapping[node.name];
        else if (mapping && meta.merge_parent && mapping[meta.merge_parent]) colorKey = mapping[meta.merge_parent];

        // 2. Mesh Name check
        if (!colorKey) {
          if (
            meshName.includes('neck') || meshName.includes('collar') ||
            meshName.includes('trim') || meshName.includes('rib') ||
            meshName.includes('cuff') || meshName.includes('waist') ||
            meshName.includes('band') || parentKey.includes('collar') ||
            parentKey.includes('neck') || parentKey.includes('trim')
          ) {
            colorKey = mapping?.Neck || mapping?.Collar || mapping?.Trim || 'third';
          } else if (
            meshName.includes('sleeve') || meshName.includes('arm') ||
            meshName.includes('shoulder') || meshName.includes('stripe') ||
            meshName.includes('panel') || meshName.includes('side') ||
            parentKey.includes('sleeve') || parentKey.includes('stripe')
          ) {
            colorKey = mapping?.Sleeves || mapping?.R_Sleeve || mapping?.L_Sleeve || 'secondary';
          }
        }

        // 3. Spatial / Geometric position check
        if (!colorKey) {
          const { x, y } = center;
          if (y > 0.28) {
            // Upper collar / neckline
            colorKey = mapping?.Neck || mapping?.Collar || 'third';
          } else if (Math.abs(x) > 0.22) {
            // Outer sleeves & side panels
            colorKey = mapping?.Sleeves || mapping?.R_Sleeve || mapping?.L_Sleeve || 'secondary';
          } else {
            // Main body
            colorKey = mapping?.Body || mapping?.Front || mapping?.Back || 'primary';
          }
        }

        const config = colors[colorKey] || colors.primary;

        if (config) {
          const u = node.material.userData.uniforms;
          const originalColor = node.material.userData.originalColor || new THREE.Color('#ffffff');
          const isOriginalWhite = originalColor.r > 0.9 && originalColor.g > 0.9 && originalColor.b > 0.9;

          const configColor = config.color || '#ffffff';
          const configColor2 = config.color2 || '#ffffff';

          if (!isOriginalWhite && configColor === '#ffffff') {
            u.uColor.value.copy(originalColor).convertSRGBToLinear();
            u.uColor2.value.copy(originalColor).convertSRGBToLinear();
          } else {
            u.uColor.value.set(configColor).convertSRGBToLinear();
            u.uColor2.value.set(configColor).convertSRGBToLinear();
          }
          u.uIsGradient.value = (!isOriginalWhite) ? 0.0 : (config.isGrad ? 1.0 : 0.0);
          u.uColor1.value.set((!isOriginalWhite) ? originalColor : configColor2).convertSRGBToLinear();
          u.uMinY.value = node.geometry.boundingBox.min.y;
          u.uMaxY.value = node.geometry.boundingBox.max.y;
          u.uPatternType.value = pType;
        }

        node.material.roughness = roughness;
        node.material.metalness = metalness;
      }
    });

    sharedScene.add(wrapper);
    sharedRenderer.render(sharedScene, sharedCamera);
    sharedScene.remove(wrapper);

    // Draw rendered frame into the card's 2D canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sharedRenderer.domElement, 0, 0, canvas.width, canvas.height);
  }, [
    modelData,
    mapping,
    primaryColor, primaryIsGrad, primaryColor2,
    secondaryColor, secondaryIsGrad, secondaryColor2,
    thirdColor, thirdIsGrad, thirdColor2,
    pattern,
    finish,
    layersMetadata
  ]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative select-none">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="relative">
            <div className="w-7 h-7 border-2 border-white/10 rounded-full" />
            <div className="absolute top-0 left-0 w-7 h-7 border-2 border-t-indigo-500 rounded-full animate-spin" />
          </div>
          <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-[0.25em]">Loading Model</span>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={512}
          height={640}
          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </div>
  );
};

export default Card2DPreview;
