import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollTopButton from './components/ScrollTopButton';
import SplashLoading from './components/ui/SplashLoading';
import useAppBoot from './hooks/useAppBoot';

// Create a context to track content loading state
export const ContentLoadedContext = React.createContext({
  markAsLoaded: () => {},
  isContentLoaded: false
});

const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));

function App() {
  const { isLoading, loadingProgress, loadingMessage, loadingSubMessage } = useAppBoot();
  const [contentLoaded, setContentLoaded] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);
  const location = useLocation();

  const markContentAsLoaded = () => setContentLoaded(true);

  const isBuilderRoute = location.pathname.startsWith('/builder');
  const is3DEditor = /^\/builder\/.+/.test(location.pathname);

  return (
    <ContentLoadedContext.Provider value={{
      markAsLoaded: markContentAsLoaded,
      isContentLoaded: contentLoaded
    }}>
      {showSplash ? (
        <SplashLoading
          progress={loadingProgress}
          onComplete={() => setShowSplash(false)}
        />
      ) : isBuilderRoute ? (
        <div className={`transition-opacity duration-500 opacity-100 ${is3DEditor ? 'h-[100vh] overflow-hidden' : 'min-h-screen'}`}>
          <main className="h-full w-full">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="transition-opacity duration-500 opacity-100">
          <Header />
          <main className="min-h-screen">
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-4">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }
            >
              <ChatbotWidget />
            </Suspense>
            <Outlet />
          </main>
          <Footer />
          <ScrollTopButton />
        </div>
      )}
    </ContentLoadedContext.Provider>
  );
}

export default App;
