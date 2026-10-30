import React, { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const errorMsg = String(error?.message || error?.stack || error || '');
  
  const isChunkLoadError =
    errorMsg.includes('dynamically imported module') ||
    errorMsg.includes('Failed to fetch') ||
    errorMsg.includes('Loading chunk') ||
    errorMsg.includes('CSS chunk') ||
    error?.name === 'ChunkLoadError';

  useEffect(() => {
    if (isChunkLoadError && typeof window !== 'undefined') {
      const key = 'chunk_route_reload_ts';
      const lastReload = window.sessionStorage.getItem(key);
      const now = Date.now();
      // Auto-reload once if error encountered, protected against infinite loops with a 15s cooldown
      if (!lastReload || now - Number(lastReload) > 15000) {
        window.sessionStorage.setItem(key, String(now));
        console.warn('Chunk load error in route detected. Auto-reloading page for latest version...');
        window.location.reload();
      }
    }
  }, [isChunkLoadError]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-[5px] shadow-2xl text-center space-y-4">
        <div className="w-14 h-14 mx-auto bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 text-2xl font-bold">
          ↺
        </div>
        <h2 className="text-xl font-bold text-white">
          {isChunkLoadError ? 'New Update Available' : 'Something went wrong'}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {isChunkLoadError
            ? 'A new version of Zarko Sportswear has just been published. Please refresh to load the latest catalog.'
            : 'We encountered an error loading this section. Please refresh the page.'}
        </p>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.sessionStorage.clear();
              window.location.reload();
            }
          }}
          className="w-full py-3 px-6 rounded-[5px] bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-lg"
        >
          Refresh Now
        </button>
      </div>
    </div>
  );
}
