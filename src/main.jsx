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
      { path: "about-us", element: <About /> },
      { path: "contact", element: <Contact /> },       // ✅ Contact Us
      { path: "custom", element: <Custom /> }, // ✅ Custom Orders
      { path: "detail", element: <ProductInquiry /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:slug", element: <BlogDetail /> },
      { path: "blog", element: <Navigate to="/blogs" replace /> },
      { path: "blog/:slug", element: <Navigate to="/blogs" replace /> },
      { path: "custom-sportswear-:state", element: <Navigate to="/custom" replace /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms /> },

      // ✅ Sports Kits (301 Permanent Redirects from short slugs to Canonical Competitor URLs)
      { path: "football", element: <Navigate to="/custom-football-uniforms" replace /> },
      { path: "custom-football-uniforms", element: <CategoryRoute slug="football" /> },
      { path: "wrestling", element: <Navigate to="/custom-wrestling-singlets" replace /> },
      { path: "custom-wrestling-gear", element: <Navigate to="/custom-wrestling-singlets" replace /> },
      { path: "custom-wrestling-singlets-manufacturer", element: <Navigate to="/custom-wrestling-singlets" replace /> },
      { path: "cricket", element: <Navigate to="/custom-cricket-uniforms" replace /> },
      { path: "basketball", element: <Navigate to="/custom-basketball-uniforms" replace /> },
      { path: "custom-basketball-uniforms", element: <CategoryRoute slug="basketball" /> },
      { path: "hockey", element: <CategoryRoute slug="hockey" /> },
      { path: "rugby", element: <Navigate to="/custom-rugby-uniforms" replace /> },
      { path: "tennis", element: <Navigate to="/custom-tennis-apparel" replace /> },
      { path: "running", element: <Navigate to="/custom-running-apparel" replace /> },
      { path: "gym", element: <Navigate to="/custom-gym-fitness-wear" replace /> },
      { path: "oem-private-label-sportswear", element: <Navigate to="/custom-gym-fitness-wear" replace /> },
      { path: "private-label-activewear-low-moq", element: <Navigate to="/custom-gym-fitness-wear" replace /> },
      { path: "softball", element: <Navigate to="/custom-softball-uniforms" replace /> },
      { path: "custom-softball-uniforms", element: <CategoryRoute slug="softball" /> },
      { path: "soccer", element: <Navigate to="/custom-soccer-uniforms" replace /> },
      { path: "custom-soccer-uniforms", element: <CategoryRoute slug="soccer" /> },
      { path: "sublimated-soccer-jerseys-wholesale", element: <Navigate to="/custom-soccer-uniforms" replace /> },
      { path: "goalkeeper", element: <Navigate to="/custom-goalkeeper-uniforms" replace /> },
      { path: "custom-goalkeeper-uniforms", element: <CategoryRoute slug="goalkeeper" /> },
      { path: "volleyball", element: <Navigate to="/custom-volleyball-uniforms" replace /> },
      { path: "custom-volleyball-uniforms", element: <CategoryRoute slug="volleyball" /> },
      { path: "ice-hockey", element: <Navigate to="/custom-ice-hockey-uniforms" replace /> },
      { path: "baseball", element: <Navigate to="/custom-baseball-uniforms" replace /> },
      { path: "custom-baseball-uniforms", element: <CategoryRoute slug="baseball" /> },
      { path: "lacrosse", element: <Navigate to="/custom-lacrosse-uniforms" replace /> },
      { path: "streetwear", element: <Navigate to="/custom-streetwear-apparel" replace /> },
      { path: "sports-wears", element: <Navigate to="/custom-streetwear-apparel" replace /> },

      // ✅ Accessories
      { path: "shoes", element: <CategoryRoute slug="shoes" /> },
      { path: "gloves", element: <CategoryRoute slug="gloves" /> },
      { path: "caps", element: <CategoryRoute slug="caps" /> },
      { path: "bags", element: <CategoryRoute slug="bags" /> },
      { path: "headwear", element: <Navigate to="/caps" replace /> },
      { path: "varsity-jackets", element: <Navigate to="/custom" replace /> },
      { path: "workwear", element: <Navigate to="/custom" replace /> },

      // ✅ Additional Competitor/SEO Parent Category Slugs
      { path: "custom-cricket-uniforms", element: <CategoryRoute slug="cricket" /> },
      { path: "custom-ice-hockey-uniforms", element: <CategoryRoute slug="ice-hockey" /> },
      { path: "custom-lacrosse-uniforms", element: <CategoryRoute slug="lacrosse" /> },
      { path: "custom-rugby-uniforms", element: <CategoryRoute slug="rugby" /> },
      { path: "custom-tennis-apparel", element: <CategoryRoute slug="tennis" /> },
      { path: "custom-running-apparel", element: <CategoryRoute slug="running" /> },
      { path: "custom-gym-fitness-wear", element: <CategoryRoute slug="gym" /> },
      { path: "custom-streetwear-apparel", element: <CategoryRoute slug="streetwear" /> },
      { path: "custom-wrestling-singlets", element: <CategoryRoute slug="wrestling" /> },
      { path: "custom-sports-caps-headwear", element: <CategoryRoute slug="caps" /> },
      { path: "custom-sports-gear-bags", element: <CategoryRoute slug="bags" /> },
      { path: "custom-sports-gloves", element: <CategoryRoute slug="gloves" /> },

      // ✅ Hierarchical Product Detail Routes (Matching Competitor Hamco SEO Architecture)
      // e.g. /custom-baseball-uniforms/custom-baseball-cage-batting-jackets-01
      // e.g. /baseball/custom-baseball-cage-batting-jackets-01
      { path: ":categorySlug/:productSlug", element: <ProductInquiry /> },

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

