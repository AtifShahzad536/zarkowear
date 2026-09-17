import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineRefresh, HiOutlineEye, HiOutlineCode } from 'react-icons/hi';

let dracoLoader = null;
let gltfLoader = null;

function getLoaders() {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
    gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
  }
  return { gltfLoader };
}

const uvCache = new Map();

/**
 * Extracts true UV wireframe geometry and island polygons from GLB model
 */
function extractModelUVs(modelUrl) {
  if (uvCache.has(modelUrl)) {
    return Promise.resolve(uvCache.get(modelUrl));
  }

  const { gltfLoader } = getLoaders();
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;
        const meshUVs = [];
        let totalVertices = 0;
        let totalTriangles = 0;

        root.traverse((node) => {
          if (node.isMesh && node.geometry) {
            const geom = node.geometry;
            const uvAttr = geom.attributes.uv;
            const posAttr = geom.attributes.position;

            if (uvAttr && uvAttr.count > 0) {
              const uvs = [];
              for (let i = 0; i < uvAttr.count; i++) {
                uvs.push({
                  u: uvAttr.getX(i),
                  v: uvAttr.getY(i)
                });
              }

              const indices = [];
              if (geom.index) {
                for (let i = 0; i < geom.index.count; i++) {
                  indices.push(geom.index.getX(i));
                }
              } else {
                for (let i = 0; i < uvAttr.count; i++) {
                  indices.push(i);
                }
              }

              totalVertices += uvAttr.count;
              totalTriangles += Math.floor(indices.length / 3);

              meshUVs.push({
                name: node.name,
                uvs,
                indices,
                vertexCount: uvAttr.count,
                triangleCount: Math.floor(indices.length / 3)
              });
            }
          }
        });

        const data = { meshUVs, totalVertices, totalTriangles };
        uvCache.set(modelUrl, data);
        resolve(data);
      },
      undefined,
      (err) => {
        console.error('Failed to load UVs for model:', err);
        reject(err);
      }
    );
  });
}

/**
 * 🌐 Authentic Mathematical UV Blueprint View
 */
const UVBlueprintView = ({ modelUrl, meshStates = {}, decals = [], layersMetadata = {} }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [uvData, setUvData] = useState(() => (modelUrl ? uvCache.get(modelUrl) || null : null));
  const [loading, setLoading] = useState(!uvData);
  const [zoom, setZoom] = useState(1);
  const [showWireframe, setShowWireframe] = useState(true);
  const [activeLayerFilter, setActiveLayerFilter] = useState('ALL');

  useEffect(() => {
    if (!modelUrl) return;
    if (uvCache.has(modelUrl)) {
      setUvData(uvCache.get(modelUrl));
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    extractModelUVs(modelUrl)
      .then((data) => {
        if (isMounted) {
          setUvData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [modelUrl]);

  // Render authentic UV polygons and wireframes
  useEffect(() => {
    if (!uvData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Technical UV Grid (0.0 to 1.0 coordinates)
    ctx.fillStyle = '#060814';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
    ctx.lineWidth = 1;

    const gridDivisions = 10;
    for (let i = 0; i <= gridDivisions; i++) {
      const pos = (i / gridDivisions) * width;
      // Vertical grid lines
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, height);
      ctx.stroke();

      // Horizontal grid lines
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(width, pos);
      ctx.stroke();
    }

    // 2. Draw Real Unwrapped Mesh Islands
    const padding = 20;
    const drawWidth = width - padding * 2;
    const drawHeight = height - padding * 2;

    uvData.meshUVs.forEach((meshItem, idx) => {
      if (activeLayerFilter !== 'ALL' && meshItem.name !== activeLayerFilter) return;

      const state = meshStates[meshItem.name] || {};
      const meta = layersMetadata[meshItem.name] || {};
      const parentState = meta.merge_parent ? meshStates[meta.merge_parent] : null;

      const activeColor = state.color || parentState?.color || '#ffffff';
      const isGrad = state.isGrad || parentState?.isGrad;
      const grad1 = state.grad1 || parentState?.grad1 || '#ffffff';
      const grad2 = state.grad2 || parentState?.grad2 || '#6366f1';

      const uvs = meshItem.uvs;
      const indices = meshItem.indices;

      // Group triangles and fill polygon
      ctx.save();

      // Set fill style
      if (isGrad) {
        const gradient = ctx.createLinearGradient(0, height, width, 0);
        gradient.addColorStop(0, grad1);
        gradient.addColorStop(1, grad2);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = activeColor;
      }

      ctx.globalAlpha = 0.85;

      // Draw and fill all triangles in UV space
      for (let i = 0; i < indices.length; i += 3) {
        const i0 = indices[i];
        const i1 = indices[i + 1];
        const i2 = indices[i + 2];

        if (uvs[i0] && uvs[i1] && uvs[i2]) {
          const p0 = { x: padding + uvs[i0].u * drawWidth, y: height - (padding + uvs[i0].v * drawHeight) };
          const p1 = { x: padding + uvs[i1].u * drawWidth, y: height - (padding + uvs[i1].v * drawHeight) };
          const p2 = { x: padding + uvs[i2].u * drawWidth, y: height - (padding + uvs[i2].v * drawHeight) };

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();
          ctx.fill();

          if (showWireframe) {
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    });

    // 3. Project Applied Decals (Logos & Text) onto UV Layout
    decals.forEach((decal) => {
      if (!decal.uvPosition) return;
      const dx = padding + decal.uvPosition.u * drawWidth;
      const dy = height - (padding + decal.uvPosition.v * drawHeight);
      const dSize = (decal.decalScale || 0.2) * drawWidth;

      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(decal.rotation || 0);

      if (decal.type === 'image' && decal.canvas) {
        ctx.drawImage(decal.canvas, -dSize / 2, -dSize / 2, dSize, dSize);
      } else if (decal.text) {
        ctx.fillStyle = decal.fillColor || '#ffffff';
        ctx.font = `bold ${Math.max(12, dSize * 0.3)}px ${decal.fontFamily || 'Outfit'}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(decal.text, 0, 0);
      }

      // Decal bounding box border
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-dSize / 2, -dSize / 2, dSize, dSize);
      ctx.restore();
    });

    // 4. Draw Precision Outer UV Boundary Coordinate Overlay
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(padding, padding, drawWidth, drawHeight);

  }, [uvData, meshStates, decals, layersMetadata, showWireframe, activeLayerFilter]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#060814] flex flex-col select-none z-10 overflow-hidden font-['Outfit']">
      
      {/* Top Controls Toolbar */}
      <div className="h-10 border-b border-white/5 bg-[#090b17] px-4 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-wider">
            <span>UV ATLAS (0.0 – 1.0)</span>
          </div>
          {uvData && (
            <span className="text-[8.5px] font-bold text-slate-400 font-mono hidden sm:inline">
              {uvData.meshUVs.length} Islands • {uvData.totalVertices.toLocaleString()} Vertices • {uvData.totalTriangles.toLocaleString()} Polys
            </span>
          )}
        </div>

        {/* View Options & Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className={`px-2.5 py-1 border text-[8.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              showWireframe ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Toggle UV Wireframe Polygons"
          >
            <HiOutlineEye size={12} />
            <span>Wireframe</span>
          </button>

          <div className="flex items-center border border-white/10 bg-white/5">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
              className="px-2 py-1 text-slate-400 hover:text-white border-r border-white/10 transition cursor-pointer"
              title="Zoom Out"
            >
              <HiOutlineZoomOut size={13} />
            </button>
            <span className="px-2 py-1 text-[8.5px] font-mono text-indigo-400 font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              className="px-2 py-1 text-slate-400 hover:text-white transition cursor-pointer"
              title="Zoom In"
            >
              <HiOutlineZoomIn size={13} />
            </button>
          </div>

          <button
            onClick={() => setZoom(1)}
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            title="Reset Zoom"
          >
            <HiOutlineRefresh size={13} />
          </button>
        </div>
      </div>

      {/* Main UV Canvas Workspace */}
      <div className="flex-1 relative flex items-center justify-center overflow-auto custom-scrollbar p-6 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:24px_24px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Generating Mathematical UV Map...</span>
          </div>
        ) : (
          <div 
            className="relative shadow-2xl transition-transform duration-150 border border-indigo-500/30"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            <canvas
              ref={canvasRef}
              width={1024}
              height={1024}
              className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] bg-[#060814] block"
            />

            {/* Corner Coordinate Badges */}
            <span className="absolute top-1 left-2 text-[7.5px] font-mono text-indigo-400/80 pointer-events-none">(0.0, 1.0)</span>
            <span className="absolute top-1 right-2 text-[7.5px] font-mono text-indigo-400/80 pointer-events-none">(1.0, 1.0)</span>
            <span className="absolute bottom-1 left-2 text-[7.5px] font-mono text-indigo-400/80 pointer-events-none">(0.0, 0.0)</span>
            <span className="absolute bottom-1 right-2 text-[7.5px] font-mono text-indigo-400/80 pointer-events-none">(1.0, 0.0)</span>
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="h-7 bg-[#070914] border-t border-white/5 px-4 flex items-center justify-between text-[7.5px] font-mono text-slate-500 z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-indigo-400">ENGINE: MATHEMATICAL_UV_UNWRAP_v2</span>
          <span>PRECISION: FLOAT32_UV_BUFFER</span>
        </div>
        <span>FACTORY DYE-SUBLIMATION PRE-PRESS</span>
      </div>

    </div>
  );
};

export default UVBlueprintView;
