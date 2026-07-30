import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineCloudUpload, HiOutlineTrash, HiPlus, HiChevronDown } from 'react-icons/hi';
import { RiRobotLine, RiImageAddLine } from 'react-icons/ri';
import { BiPlusCircle } from 'react-icons/bi';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4001';

const AIAssistantTab = ({ meshes, meshStates, updateMeshStates, addDecal, decals, updateDecal, removeDecal, defaultPatterns, defaultLogos }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]); // List of { name, url, type: 'logo'|'pattern' }
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [history, setHistory] = useState([]); // Keeps track of chat messages context: { role: 'user'|'model', text: string }
  const [processingSeconds, setProcessingSeconds] = useState(0);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading(`Uploading custom ${type}...`);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/decal/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        toast.success(`${type === 'logo' ? 'Logo' : 'Pattern'} uploaded successfully!`, { id: toastId });
        setUploadedFiles(prev => [...prev, { name: file.name, url: data.url, type }]);
      } else {
        toast.error(`Failed to upload ${type}.`, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('Upload failed due to network error.', { id: toastId });
    }
  };

  const removeUploadedFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (isQuotaExceeded) {
      toast.error('Cannot send message: Antigravity model quota out of reach.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessingSeconds(0);
    const toastId = toast.loading('Gemini AI is designing your kit...');

    // Start timer interval counter
    const timerInterval = setInterval(() => {
      setProcessingSeconds(prev => prev + 1);
    }, 1000);

    // Append this message to the user prompt history
    const updatedHistory = [...history, { role: 'user', text: prompt }];
    setHistory(updatedHistory);

    try {
      // Format simple meshes list for context
      const meshList = (meshes || []).map(m => ({
        id: m.id,
        display: m.display
      }));

      // Format simple default systems assets lists for AI context (excluding large base64 data URLs)
      const systemLogos = (defaultLogos || [])
        .filter(l => l.imageUrl && !l.imageUrl.startsWith('data:'))
        .map(l => ({ name: l.name, imageUrl: l.imageUrl }));
      const systemPatterns = (defaultPatterns || [])
        .filter(p => p.imageUrl && !p.imageUrl.startsWith('data:'))
        .map(p => ({ name: p.name, imageUrl: p.imageUrl }));

      // Clean currentDecals to exclude large base64 data URLs to prevent context window overflow
      const cleanDecals = (decals || []).map(d => ({
        id: d.id,
        type: d.type,
        text: d.text,
        meshId: d.meshId,
        color: d.color,
        decalScale: d.decalScale,
        imageUrl: d.imageUrl && d.imageUrl.startsWith('data:') ? '[Base64 Image Data]' : d.imageUrl
      }));

      const res = await fetch(`${API_BASE}/api/ai/customize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          meshes: meshList,
          currentMeshStates: meshStates,
          currentDecals: cleanDecals, // Passing clean decals
          uploadedFiles, // Passing the uploaded files context
          systemLogos, // Passing system preset logos list
          systemPatterns, // Passing system preset patterns list
          history: updatedHistory // Passing full conversation thread context
        })
      });

      const data = await res.json();
      console.log('[AI Customizer Response]:', data);

      if (!res.ok) {
        if (res.status === 429 || data.error === 'quota_exceeded') {
          setIsQuotaExceeded(true);
          const qMsg = data.details || 'Model quota out of reach. Please check your API credits/limits.';
          setError(qMsg);
          throw new Error('Model quota out of reach.');
        } else {
          const errMsg = data.details || data.error || 'Failed to generate design configuration.';
          setError(errMsg);
          throw new Error(errMsg);
        }
      }

      const hasUpdates = data.updates && Object.keys(data.updates).length > 0;
      const hasDecals = data.decals && data.decals.length > 0;
      const currentStateKeys = Object.keys(meshStates);
      const norm = (k) => k.toLowerCase().replace(/\.obj$/i, '').trim();

      if (hasUpdates) {
        const newStates = { ...meshStates };

        Object.keys(data.updates).forEach(aiMeshKey => {
          const targetNorm = norm(aiMeshKey);
          let matchedKey = currentStateKeys.find(k => norm(k) === targetNorm);
          if (!matchedKey) {
            matchedKey = aiMeshKey;
          }

          const existing = newStates[matchedKey] || {
            color: '#ffffff',
            isGrad: false,
            grad1: '#ffffff',
            grad2: '#ffffff',
            pColor: '#ffffff',
            pUrl: null
          };

          newStates[matchedKey] = {
            ...existing,
            ...data.updates[aiMeshKey]
          };
        });

        console.log('[AI Customizer Merged States]:', newStates);
        updateMeshStates(newStates);
      }

      if (hasDecals) {
        data.decals.forEach(decal => {
          if (decal.action === 'delete' && decal.id) {
            removeDecal(decal.id);
            return;
          }
          if (decal.action === 'update' && decal.id) {
            const updates = {};
            if (decal.text !== undefined) updates.text = decal.text;
            if (decal.color !== undefined) updates.color = decal.color;
            if (decal.meshId !== undefined) {
              const targetNorm = norm(decal.meshId);
              updates.meshId = currentStateKeys.find(k => norm(k) === targetNorm) || decal.meshId;
            }
            if (decal.decalScale !== undefined) {
              updates.decalScale = decal.decalScale;
              updates.decalScaleX = decal.decalScale;
              updates.decalScaleY = decal.decalScale;
            }
            if (decal.position !== undefined) {
              updates.position = decal.position;
              updates.worldPoint = null;
              updates.worldNormal = null;
            }
            updateDecal(decal.id, updates);
            return;
          }

          // Skip image/pattern decals that don't carry a URL — they can't render
          if ((decal.type === 'image' || decal.type === 'pattern') && !decal.imageUrl) {
            console.warn('[AI Customizer] Skipping decal with missing imageUrl:', decal);
            return;
          }

          const targetNorm = norm(decal.meshId);
          const matchedKey = currentStateKeys.find(k => norm(k) === targetNorm) || decal.meshId;

          const extraProps = {};
          if (decal.decalScale !== undefined) {
            extraProps.decalScale = decal.decalScale;
            extraProps.decalScaleX = decal.decalScale;
            extraProps.decalScaleY = decal.decalScale;
          }
          if (decal.position !== undefined) {
            extraProps.position = decal.position;
          }

          addDecal(decal.type, decal.text || 'DESIGN', decal.imageUrl || null, matchedKey, decal.color || '#ffffff', extraProps);
        });
      }

      if (hasUpdates || hasDecals) {
        const exp = data.explanation || 'Customization applied successfully!';
        setHistory(prev => [...prev, { role: 'model', text: exp }]);
        setExplanation(exp);
        toast.success('Design updated live!', { id: toastId });
      } else {
        toast.error('AI didn\'t suggest any changes.', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'An error occurred during AI processing.', { id: toastId });
      setError(prev => prev || err.message || 'An error occurred during AI processing.');
    } finally {
      clearInterval(timerInterval);
      setIsLoading(false);
    }
  };

  const applyPreset = (presetText) => {
    setPrompt(presetText);
  };

  return (
    <div className="flex flex-col bg-white h-full p-6 space-y-6 text-left">
      {/* Processing Timer Mode (Antigravity/Gemini style thinking indicator) */}
      {isLoading && (
        <div className="flex items-center gap-3.5 p-4 bg-blue-50/40 border border-blue-100/50 rounded-xl animate-pulse">
          <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h5 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">AI Thinking & Customizing</h5>
            <p className="text-[8px] font-semibold text-slate-400 uppercase mt-0.5">Elapsed time: {processingSeconds}s</p>
          </div>
        </div>
      )}

      <form onSubmit={handleAISubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">What kind of design do you want?</label>
          
          {/* Quota Banner */}
          {isQuotaExceeded && (
            <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-in fade-in slide-in-from-top-2 duration-200 mb-3">
              <span className="text-sm">⚠️</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-red-800">Antigravity model quota out of reach</p>
                <p className="text-[9.5px] font-medium opacity-90 mt-0.5">Your AI design credits are depleted. Please check your system configuration or contact admin to recharge credits.</p>
              </div>
            </div>
          )}

          {/* Chat Bar Container */}
          <div className="relative border border-gray-100 rounded-xl bg-gray-50 p-2 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white transition-all">
            
            {/* Attached Tags above text area */}
            {uploadedFiles.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2 px-1">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-100/50 rounded-lg text-[9px] font-semibold text-blue-700">
                    <span className="opacity-60">{file.type === 'logo' ? '🖼️ Logo:' : '🏁 Pattern:'}</span>
                    <span className="truncate max-w-[80px]">{file.name}</span>
                    <button 
                      type="button" 
                      onClick={() => removeUploadedFile(idx)}
                      className="ml-1 hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Prompt Textarea */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Add glowing neon pink sleeve trims with stealth black body panels..."
              rows={3}
              className="w-full text-[11px] font-medium px-2 py-1 bg-transparent border-none focus:outline-none resize-none placeholder:text-gray-300"
              disabled={isLoading}
            />

            {/* Bottom bar with action (+) dropdown and send button */}
            <div className="flex items-center justify-between border-t border-gray-100/60 pt-2 px-1 relative">
              <div className="relative">
                {/* Plus (+) Action Toggle Button */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-slate-600 transition-all cursor-pointer"
                >
                  <HiPlus className={`text-sm transition-transform duration-200 ${dropdownOpen ? 'rotate-45 text-blue-600 bg-blue-50 rounded-full p-0.5' : ''}`} />
                </button>

                {/* Add Context Action Menu dropdown */}
                {dropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown on click outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    
                    <div className="absolute bottom-9 left-0 w-36 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 text-left">
                      <p className="px-3 py-1 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-1.5 mb-1">Add Context</p>
                      
                      <label className="flex items-center gap-2.5 px-3 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
                        <RiImageAddLine className="text-slate-400 text-sm" />
                        <span>Upload Logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => { handleFileUpload(e, 'logo'); setDropdownOpen(false); }}
                          className="hidden"
                          disabled={isLoading}
                        />
                      </label>

                      <label className="flex items-center gap-2.5 px-3 py-2 text-[10px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
                        <HiOutlineCloudUpload className="text-slate-400 text-sm" />
                        <span>Upload Pattern</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => { handleFileUpload(e, 'pattern'); setDropdownOpen(false); }}
                          className="hidden"
                          disabled={isLoading}
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Apply/Generate Button */}
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all cursor-pointer ${
                  isLoading 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/10'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    <span>Styling...</span>
                  </>
                ) : (
                  <>
                    <HiOutlineLightningBolt className="text-xs" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Design Presets */}
      <div className="space-y-2.5 pt-2">
        <p className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest">Quick Design Presets</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '🔥 Neon Cyberpunk', prompt: 'Stealth carbon black base panels with glowing neon cyan borders and neon pink sleeve trims.' },
            { label: '👑 Classic Premium', prompt: 'Deep navy body panels, solid clean gold collars and sleeve cuffs, and silver details.' },
            { label: '⚡ Stealth Storm', prompt: 'Sleek dark graphite and charcoal grey gradient body panels with high contrast optic yellow highlights.' },
            { label: '🌿 Organic Sage', prompt: 'Earth forest green and sage green gradient with white sleeves and details.' }
          ].map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset.prompt)}
              className="px-3 py-2 text-[9px] font-semibold text-slate-600 border border-gray-100 hover:border-blue-600 hover:bg-blue-50/20 text-left transition-all rounded-lg"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {explanation && (
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 animate-in fade-in duration-300">
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <HiOutlineSparkles className="text-blue-500" />
            <span>AI Designer Notes</span>
          </p>
          <p className="text-[10px] font-medium text-slate-600 leading-relaxed">{explanation}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-1.5 animate-in fade-in duration-300 text-left">
          <p className="text-[8.5px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
            <HiOutlineTrash className="text-red-500" />
            <span>AI Customization Failure</span>
          </p>
          <p className="text-[10px] font-semibold text-red-700 leading-relaxed">{error}</p>
          <p className="text-[9px] font-medium text-red-500 mt-1">If the issue persists, please check your network connection or try again later.</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistantTab;
