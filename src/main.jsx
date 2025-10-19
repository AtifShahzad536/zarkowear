import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProductInquiry from './components/Detail.jsx'
import Home from './pages/Home.jsx'
import Custom from "./pages/Custom";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CategoryRoute from './pages/CategoryRoute.jsx'
import AdminHome from './pages/AdminHome.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import RequireAdmin from './components/admin/RequireAdmin.jsx'
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
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
