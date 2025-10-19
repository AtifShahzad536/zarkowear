# WearConnect API

Base URL: http://localhost:4000

## Public Endpoints
- GET `/api/categories`
  - Response: `[ { slug, name } ]`
- GET `/api/category/:slug`
  - Response: `{ slug, name, gradientFrom, gradientTo, featured, products }`
- GET `/api/product/:id`
  - Response: `{ id, name, image, description, category, categoryName }`
- GET `/api/home`
  - Response: `{ quickCategories: [ { slug, name } ], partners: string[], valueProps: { title, body }[] }`
- Per-category convenience
  - GET `/api/:slug` (if routed) and GET `/api/:slug/products`

## Admin Endpoints
- GET `/api/admin/categories`
- POST `/api/admin/categories`
  - Body: `{ slug, name, gradientFrom?, gradientTo?, featured? }`
- PUT `/api/admin/categories/:slug`
  - Body: partial fields to update
- DELETE `/api/admin/categories/:slug`

- POST `/api/admin/categories/:slug/products`
  - Body: `{ id, name, image?, description? }`
- PUT `/api/admin/categories/:slug/products/:id`
  - Body: partial product fields
- DELETE `/api/admin/categories/:slug/products/:id`

- POST `/api/admin/upload` (multipart)
  - Field `file`: binary
  - Response: `{ url, filename }`
  - Static served at `/uploads/<filename>`

## Seeding
- POST `/api/admin/seed` (one-time) to import initial categories/products from `server/src/models/data.js` into MongoDB.

## Environment
- Server `.env`:
  - `MONGODB_URI=...`
  - `CORS_ORIGIN=http://localhost:5173` (frontend origin)
- Frontend `.env`:
  - `VITE_API_BASE=http://localhost:4000`

## Notes
- Data model is a single `Category` collection (`server/src/models/Category.js`) with embedded `products`.
- Controllers for sports categories use a generic factory backed by MongoDB: `server/src/controllers/categoryControllerFactory.js`.
