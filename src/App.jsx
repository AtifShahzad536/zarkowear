import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
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

  const markContentAsLoaded = () => setContentLoaded(true);

  return (
    <ContentLoadedContext.Provider value={{
      markAsLoaded: markContentAsLoaded,
      isContentLoaded: contentLoaded
    }}>
      {isLoading ? (
        <SplashLoading
          logoSrc="/headerLogo.png"
          logoScale={1.3}
          progress={loadingProgress}
          message={loadingMessage}
          subMessage={loadingSubMessage}
        />
      ) : (
        <div className="transition-opacity duration-500 opacity-100">
          <Header />
          <main className="min-h-screen">
            <Suspense
              fallback={
                <SplashLoading
                  size="md"
                  logoSrc="/headerLogo.png"
                  logoScale={2.1}
                  progress={0}
                  message="Loading components..."
                  subMessage="Please wait a moment"
                />
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
