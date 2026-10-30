import { StrictMode, StrictMode as ReactStrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RequireAdmin from './components/admin/RequireAdmin.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import RouteErrorBoundary from './components/RouteErrorBoundary.jsx'
import { lazyWithRetry } from './utils/lazyRetry.js'

// Automatically reload stale pages if a new deployment changed asset hashes
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    console.warn('Vite asset preload failed (new deployment). Reloading page...');
    window.location.reload();
  });
}

import Home from './pages/Home.jsx'
const ProductInquiry = lazyWithRetry(() => import('./components/Detail.jsx'), 'Detail')
const Custom = lazyWithRetry(() => import('./pages/Custom.jsx'), 'Custom')
const Contact = lazyWithRetry(() => import('./pages/Contact.jsx'), 'Contact')
const About = lazyWithRetry(() => import('./pages/About.jsx'), 'About')
const CategoryRoute = lazyWithRetry(() => import('./pages/CategoryRoute.jsx'), 'CategoryRoute')
const AdminHome = lazyWithRetry(() => import('./pages/AdminHome.jsx'), 'AdminHome')
const AdminLayout = lazyWithRetry(() => import('./components/admin/AdminLayout.jsx'), 'AdminLayout')
const AdminLogin = lazyWithRetry(() => import('./pages/AdminLogin.jsx'), 'AdminLogin')
const NotFound = lazyWithRetry(() => import('./pages/NotFound.jsx'), 'NotFound')
const BuilderPage = lazyWithRetry(() => import('./pages/BuilderPage.jsx'), 'BuilderPage')

const ModelSelectionPage = lazyWithRetry(() => import('./pages/ModelSelectionPage.jsx'), 'ModelSelection')
const Blogs = lazyWithRetry(() => import('./pages/Blogs.jsx'), 'Blogs')
const BlogDetail = lazyWithRetry(() => import('./pages/BlogDetail.jsx'), 'BlogDetail')
const AdminBlogs = lazyWithRetry(() => import('./pages/AdminBlogs.jsx'), 'AdminBlogs')
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy.jsx'), 'PrivacyPolicy')
const Terms = lazyWithRetry(() => import('./pages/Terms.jsx'), 'Terms')


// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "admin/login", element: <AdminLogin /> },
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },       // ✅ Contact Us
      { path: "custom", element: <Custom /> }, // ✅ Custom Orders
      { path: "detail", element: <ProductInquiry /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:slug", element: <BlogDetail /> },
      { path: "custom-sportswear-:state", element: <Navigate to="/custom" replace /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms /> },

      // ✅ Sports Kits
      { path: "football", element: <CategoryRoute slug="football" /> },
      { path: "wrestling", element: <CategoryRoute slug="wrestling" /> },
      { path: "custom-wrestling-gear", element: <Navigate to="/wrestling" replace /> },
      { path: "custom-wrestling-singlets-manufacturer", element: <Navigate to="/wrestling" replace /> },
      { path: "cricket", element: <CategoryRoute slug="cricket" /> },
      { path: "basketball", element: <CategoryRoute slug="basketball" /> },
      { path: "hockey", element: <CategoryRoute slug="hockey" /> },
      { path: "rugby", element: <CategoryRoute slug="rugby" /> },
      { path: "tennis", element: <CategoryRoute slug="tennis" /> },
      { path: "running", element: <CategoryRoute slug="running" /> },
      { path: "gym", element: <CategoryRoute slug="gym" /> },
      { path: "oem-private-label-sportswear", element: <Navigate to="/gym" replace /> },
      { path: "private-label-activewear-low-moq", element: <Navigate to="/gym" replace /> },
      { path: "softball", element: <CategoryRoute slug="softball" /> },
      { path: "soccer", element: <CategoryRoute slug="soccer" /> },
      { path: "custom-soccer-uniforms", element: <Navigate to="/soccer" replace /> },
      { path: "sublimated-soccer-jerseys-wholesale", element: <Navigate to="/soccer" replace /> },
      { path: "volleyball", element: <CategoryRoute slug="volleyball" /> },
      { path: "ice-hockey", element: <CategoryRoute slug="ice-hockey" /> },
      { path: "baseball", element: <CategoryRoute slug="baseball" /> },
      { path: "lacrosse", element: <CategoryRoute slug="lacrosse" /> },
      { path: "streetwear", element: <CategoryRoute slug="streetwear" /> },
      { path: "sports-wears", element: <Navigate to="/streetwear" replace /> },

      // ✅ Accessories
      { path: "shoes", element: <CategoryRoute slug="shoes" /> },
      { path: "gloves", element: <CategoryRoute slug="gloves" /> },
      { path: "caps", element: <CategoryRoute slug="caps" /> },
      { path: "bags", element: <CategoryRoute slug="bags" /> },
      { path: "headwear", element: <Navigate to="/caps" replace /> },
      { path: "varsity-jackets", element: <Navigate to="/custom" replace /> },
      { path: "workwear", element: <Navigate to="/custom" replace /> },

      // ✅ 3D Jersey Builder
      { path: "builder", element: <BuilderPage /> },
      { path: "builder/models", element: <ModelSelectionPage /> },
      { path: "builder/:id", element: <BuilderPage /> },
      {
        path: "admin",
        element: <RequireAdmin />,
        children: [
          {
            path: "",
            element: <AdminLayout />,
            children: [
              { path: "home", element: <AdminHome /> },
              { path: "testimonials", element: <AdminHome /> },
              { path: "top-selling", element: <AdminHome /> },
              { path: "blogs", element: <AdminBlogs /> },
            ]
          }
        ]
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])

// SEO-friendly loading fallback
const SEOLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-gray-600">Loading Zarko Sportswear...</p>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<SEOLoadingFallback />}>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
)

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

