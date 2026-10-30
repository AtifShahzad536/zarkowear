import { lazy } from 'react';

/**
 * Robust lazy loading wrapper with automatic reload for stale chunk hashes
 * after a new deployment on Vercel/Production.
 */
export function lazyWithRetry(componentImport, key = '') {
  return lazy(async () => {
    const storageKey = `retry_${key || componentImport.toString().slice(0, 50)}`;
    const hasRefreshed = typeof window !== 'undefined' && window.sessionStorage.getItem(storageKey);

    try {
      const module = await componentImport();
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(storageKey);
      }
      return module;
    } catch (error) {
      const errorString = String(error?.message || error || '');
      const isChunkLoadError = 
        errorString.includes('dynamically imported module') ||
        errorString.includes('Failed to fetch') ||
        errorString.includes('Loading chunk') ||
        errorString.includes('CSS chunk') ||
        error?.name === 'ChunkLoadError';

      if (isChunkLoadError && typeof window !== 'undefined' && !hasRefreshed) {
        window.sessionStorage.setItem(storageKey, 'true');
        console.warn('Chunk load failed (new deployment detected). Automatically reloading page...', errorString);
        window.location.reload();
        return new Promise(() => {}); // hold execution until page reloads
      }

      throw error;
    }
  });
}
