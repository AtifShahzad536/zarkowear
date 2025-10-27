import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RequireAdmin from './components/admin/RequireAdmin.jsx'
import { ToastProvider } from './components/Toast.jsx'

const ProductInquiry = lazy(() => import('./components/Detail.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const Custom = lazy(() => import('./pages/Custom.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const CategoryRoute = lazy(() => import('./pages/CategoryRoute.jsx'))
const AdminHome = lazy(() => import('./pages/AdminHome.jsx'))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout.jsx'))
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Define routes
const router = createBrowserRouter([
 {
    path: "/",
    element: <App />,
    children: [
      { path: "admin/login", element: <AdminLogin /> },
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },       // ✅ Contact Us
      { path: "custom", element: <Custom/> }, // ✅ Custom Orders
      { path: "detail", element: <ProductInquiry /> },

      // ✅ Sports Kits
      { path: "football", element: <CategoryRoute slug="football"/> },
      { path: "wrestling", element: <CategoryRoute slug="wrestling"/> },
      { path: "cricket", element: <CategoryRoute slug="cricket"/> },
      { path: "basketball", element: <CategoryRoute slug="basketball"/> },
      { path: "hockey", element: <CategoryRoute slug="hockey"/> },
      { path: "rugby", element: <CategoryRoute slug="rugby"/> },
      { path: "tennis", element: <CategoryRoute slug="tennis"/> },
      { path: "running", element: <CategoryRoute slug="running"/> },
      { path: "gym", element: <CategoryRoute slug="gym"/> },

      // ✅ Accessories
      { path: "shoes", element: <CategoryRoute slug="shoes"/> },
      { path: "gloves", element: <CategoryRoute slug="gloves"/> },
      { path: "caps", element: <CategoryRoute slug="caps"/> },
      { path: "bags", element: <CategoryRoute slug="bags"/> },
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
    <Suspense fallback={<SEOLoadingFallback />}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Suspense>
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
