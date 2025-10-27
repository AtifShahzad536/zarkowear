import { createRoot } from 'react-dom/client';
import { StrictMode, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const helmetContext = {};

export function createApp(isServer = false, url = '/', context = {}) {
  const Router = isServer ? StaticRouter : BrowserRouter;

  const root = isServer ? null : createRoot(document.getElementById('root'));

  const app = (
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <Router location={url} context={context}>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm text-gray-600">Loading Zarko Sportswear...</p>
              </div>
            </div>
          }>
            <App />
          </Suspense>
        </Router>
      </HelmetProvider>
    </StrictMode>
  );

  if (isServer) {
    return app;
  }

  root.render(app);

  return { app: root, router: null };
}

// For SSG
export { default as App } from './App';
export { default as routes } from './routes';

// For development
if (import.meta.env.DEV) {
  createApp();
}

// Bot detection for SEO-friendly loading
if (typeof window !== 'undefined') {
  // Detect common bot user agents
  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawler/i,
    /scraper/i,
    /googlebot/i,
    /bingbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i
  ];

  const isBot = botPatterns.some(pattern => pattern.test(navigator.userAgent));
  window.isBot = isBot;

  // For bots, show minimal loading and render content faster
  if (isBot) {
    document.documentElement.style.setProperty('--loading-delay', '0ms');
  }
}
