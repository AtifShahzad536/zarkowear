import { createRoot } from 'react-dom/client';
import { StrictMode, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const helmetContext = {};

export function createApp() {
  const root = createRoot(document.getElementById('root'));
  
  root.render(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );

  return { app: root, router: null };
}

// For SSG
export { default as App } from './App';
export { default as routes } from './routes';

// For development
if (import.meta.env.DEV) {
  createApp();
}
