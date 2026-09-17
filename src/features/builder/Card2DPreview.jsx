import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Global cache for 2D snapshots and mesh masks
const snapshotCache = new Map();
const snapshotQueue = [];
let isProcessingQueue = false;

// Shared Offscreen Three.js Renderer for capturing 2D snapshots once per model
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
    sharedCamera.position.set(0, 0, 4.2);

    // Subtle natural studio lighting for capturing base AO shadow depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(2, 4, 3);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-2, 2, -2);
    sharedScene.add(ambientLight, dirLight, fillLight);

    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
    gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
  }
  return { sharedRenderer, sharedScene, sharedCamera, gltfLoader };
}

// Automatically process background snapshots queue
async function processSnapshotQueue() {
  if (isProcessingQueue || snapshotQueue.length === 0) return;
  isProcessingQueue = true;

  const { modelUrl, mapping, layersMetadata, resolve, reject } = snapshotQueue.shift();

  try {
    const { sharedRenderer, sharedScene, sharedCamera, gltfLoader } = getSharedRenderer();

    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        // Auto-center and fit model into frame
        const bbox = new THREE.Box3().setFromObject(root);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        bbox.getCenter(center);
        bbox.getSize(size);

        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.0 / maxDim;
        root.scale.set(scale, scale, scale);

        // Map meshes into distinct parts (Body, Neck, Sleeves, etc.)
        const meshes = [];
        root.traverse((node) => {
          if (node.isMesh) {
            node.geometry.computeBoundingBox();
            const nodeCenter = new THREE.Vector3();
            node.geometry.boundingBox.getCenter(nodeCenter);
            node.applyMatrix4(node.matrixWorld);

            const meta = layersMetadata[node.name] || {};
            const stateKey = meta.merge_parent || node.name;
            const parentMeta = layersMetadata[stateKey] || {};
            const isLocked = meta.is_locked || parentMeta.is_locked;

            let partType = 'Body';
            if (nodeCenter.y > 0.45) partType = 'Neck';
            else if (Math.abs(nodeCenter.x) > 0.3) partType = nodeCenter.x > 0 ? 'R_Sleeve' : 'L_Sleeve';
            else if (nodeCenter.z > 0.02) partType = 'Front';
            else if (nodeCenter.z < -0.02) partType = 'Back';

            const colorKey = mapping[partType] || mapping['Body'] || 'primary';
            meshes.push({ mesh: node, colorKey, isLocked });
          }
        });

        // 1. Capture Base Shadow & Ambient Occlusion (Neutral White)
        meshes.forEach(({ mesh }) => {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.8,
            metalness: 0.0,
            side: THREE.DoubleSide
          });
        });

        sharedScene.add(root);
        sharedRenderer.render(sharedScene, sharedCamera);
        const baseAoDataUrl = sharedRenderer.domElement.toDataURL('image/png');

        // 2. Capture isolated Part Masks (White part, Black background)
        const partMasks = {};
        const uniqueKeys = ['primary', 'secondary', 'third'];

        uniqueKeys.forEach((key) => {
          meshes.forEach(({ mesh, colorKey }) => {
            if (colorKey === key) {
              mesh.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
            } else {
              mesh.material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            }
          });
          sharedRenderer.render(sharedScene, sharedCamera);
          partMasks[key] = sharedRenderer.domElement.toDataURL('image/png');
        });

        // Clean up from scene
        sharedScene.remove(root);

        const snapshotData = { baseAoDataUrl, partMasks };
        snapshotCache.set(modelUrl, snapshotData);
        resolve(snapshotData);

        isProcessingQueue = false;
        processSnapshotQueue();
      },
      undefined,
      (err) => {
        console.error('Failed to snapshot 3D model:', err);
        reject(err);
        isProcessingQueue = false;
        processSnapshotQueue();
      }
    );
  } catch (error) {
    console.error('Offscreen snapshotting error:', error);
    reject(error);
    isProcessingQueue = false;
    processSnapshotQueue();
  }
}

function getModelSnapshot(modelUrl, mapping = {}, layersMetadata = {}) {
  if (snapshotCache.has(modelUrl)) {
    return Promise.resolve(snapshotCache.get(modelUrl));
  }
  return new Promise((resolve, reject) => {
    snapshotQueue.push({ modelUrl, mapping, layersMetadata, resolve, reject });
    processSnapshotQueue();
  });
}

/**
 * Ultra-Lightweight 2D Dynamic Colorable Preview Component
 * Runs entirely on HTML5 Canvas 2D with zero WebGL contexts on the grid
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
  layersMetadata = {}
}) => {
  const canvasRef = useRef(null);
  const [snapshot, setSnapshot] = useState(() => snapshotCache.get(modelUrl) || null);
  const [loading, setLoading] = useState(!snapshot);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  // Lazy load snapshot only when card enters viewport
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!inView || snapshot) return;
    let isMounted = true;
    getModelSnapshot(modelUrl, mapping, layersMetadata)
      .then((data) => {
        if (isMounted) {
          setSnapshot(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [inView, modelUrl, mapping, layersMetadata, snapshot]);

  // Render 2D Dynamic Color Composite onto Canvas
  useEffect(() => {
    if (!snapshot || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const aoImg = new Image();
    aoImg.src = snapshot.baseAoDataUrl;

    const maskImgs = {};
    const maskPromises = Object.keys(snapshot.partMasks).map((key) => {
      return new Promise((res) => {
        const img = new Image();
        img.onload = () => {
          maskImgs[key] = img;
          res();
        };
        img.onerror = res;
        img.src = snapshot.partMasks[key];
      });
    });

    Promise.all([
      new Promise((res) => {
        aoImg.onload = res;
        aoImg.onerror = res;
      }),
      ...maskPromises
    ]).then(() => {
      ctx.clearRect(0, 0, width, height);

      // Create an offscreen buffer for colored layers
      const colorCanvas = document.createElement('canvas');
      colorCanvas.width = width;
      colorCanvas.height = height;
      const cCtx = colorCanvas.getContext('2d');

      const colorDefs = {
        primary: { color: primaryColor, isGrad: primaryIsGrad, color2: primaryColor2 },
        secondary: { color: secondaryColor, isGrad: secondaryIsGrad, color2: secondaryColor2 },
        third: { color: thirdColor, isGrad: thirdIsGrad, color2: thirdColor2 }
      };

      // Draw each tinted part
      Object.keys(colorDefs).forEach((key) => {
        const mask = maskImgs[key];
        if (!mask) return;

        const partCanvas = document.createElement('canvas');
        partCanvas.width = width;
        partCanvas.height = height;
        const pCtx = partCanvas.getContext('2d');

        // 1. Draw color/gradient
        const conf = colorDefs[key];
        if (conf.isGrad) {
          const grad = pCtx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, conf.color || '#ffffff');
          grad.addColorStop(1, conf.color2 || '#ffffff');
          pCtx.fillStyle = grad;
        } else {
          pCtx.fillStyle = conf.color || '#ffffff';
        }
        pCtx.fillRect(0, 0, width, height);

        // 2. Pattern overlay
        if (pattern && pattern !== 'none') {
          pCtx.fillStyle = 'rgba(0,0,0,0.06)';
          if (pattern === 'carbon') {
            for (let x = 0; x < width; x += 12) {
              for (let y = 0; y < height; y += 12) {
                if ((x / 12 + y / 12) % 2 === 0) pCtx.fillRect(x, y, 6, 6);
              }
            }
          } else if (pattern === 'dots') {
            for (let x = 0; x < width; x += 16) {
              for (let y = 0; y < height; y += 16) {
                pCtx.beginPath();
                pCtx.arc(x, y, 3, 0, Math.PI * 2);
                pCtx.fill();
              }
            }
          } else if (pattern === 'camo' || pattern === 'zebra') {
            pCtx.fillStyle = 'rgba(0,0,0,0.08)';
            for (let y = 0; y < height; y += 20) {
              pCtx.fillRect(0, y, width, 8);
            }
          }
        }

        // 3. Mask out non-part area using destination-in
        pCtx.globalCompositeOperation = 'destination-in';
        pCtx.drawImage(mask, 0, 0, width, height);

        // Merge onto colorCanvas
        cCtx.drawImage(partCanvas, 0, 0);
      });

      // Render Base AO Shadows
      ctx.drawImage(aoImg, 0, 0, width, height);

      // Blend Color Layer onto AO using 'multiply' to keep 3D depth and wrinkles
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(colorCanvas, 0, 0);

      // Reset composite mode
      ctx.globalCompositeOperation = 'source-over';
    });
  }, [
    snapshot,
    primaryColor, primaryIsGrad, primaryColor2,
    secondaryColor, secondaryIsGrad, secondaryColor2,
    thirdColor, thirdIsGrad, thirdColor2,
    pattern
  ]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative select-none">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="relative">
            <div className="w-7 h-7 border-2 border-white/10 rounded-full" />
            <div className="absolute top-0 left-0 w-7 h-7 border-2 border-t-indigo-500 rounded-full animate-spin" />
          </div>
          <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-[0.25em]">Loading Preview</span>
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
