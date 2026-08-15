# MERN E‑Commerce — Project Summary

## Project Overview

This is a small MERN (MongoDB, Express, React, Node) e‑commerce sample project implementing a simple storefront (frontend) and API (backend). It includes user authentication, product listing and management, a shopping cart, and a seller dashboard where sellers can add products (with image uploads via Cloudinary).

## Tech Stack

- Backend: Node.js, Express
- Frontend: React (Vite), JSX, Tailwind CSS (utility classes visible in components)
- State: Zustand (frontend stores)
- HTTP client: axios (frontend `lib/axios.js` sets base instance)
- DB / Cache: MongoDB (backend), Redis utilities present (`lib/redis.js`, `utils/redis.utils.js`)
- File upload: Cloudinary (client widget used in `AddProductForm`)
- Auth: JWT-style endpoints in backend (`/auth/*`) with cookies used by axios (`withCredentials` in requests)
- Deployment: Vercel configuration present in `frontend/vercel.json` (frontend ready to deploy)

## Repository Structure (important files)

- backend/
  - `index.js` — server entrypoint, mounts routers and middleware
  - `controllers/` — route handlers: `auth.controller.js`, `products.controller.js`, `cart.controller.js`
  - `routers/` — `auth.route.js`, `products.router.js`, `cart.router.js`
  - `models/` — Mongoose models: `user.model.js`, `product.model.js`, `cart.model.js`
  - `lib/db.js` — MongoDB connection
  - `lib/redis.js`, `utils/redis.utils.js` — Redis connection and helpers
  - `middlewares/` — `jwt.middleware.js`, `isAdmin.middleware.js`, `protected.middleware.js`

- frontend/
  - `index.html`, `vite.config.js`, `package.json`
  - `src/main.jsx` — app bootstrap
  - `src/App.jsx` — routes and app-level wiring
  - `src/lib/axios.js` — axios instance with base URL and credentials
  - `src/stores/` — Zustand stores: `useAuthStore.js`, `useCartStore.js`, `useRvStore.js`, `useSearchStore.js`
  - `src/pages/` — page components (Home, Login, Signup, Product, Cart, seller/)
  - `src/pages/seller/` — `SellerDashboard.jsx`, `SideBar.jsx`, `AddProductForm.jsx`
  - `src/components/` — `Navbar.jsx`, `Footer.jsx`, `PageLoader.jsx`, `SellerRoute.jsx` (route guard)
  - `src/data/` — static data (`CategoryList.data.js`, `CategoryNames.js`, `Banner.data.js`)

## Key Behaviors / Flows

- Authentication
  - `useAuthStore.checkAuth()` calls `GET /auth/me` on app load and sets `authUser` in Zustand.
  - Login/signup endpoints POST to `/auth/login` and `/auth/signup` storing user in store on success.
  - `logout` POSTs `/auth/logout` and clears `authUser`.
  - `SellerRoute` component guards seller-only pages by checking `authUser` and `authUser.role`.

- Seller Dashboard
  - Route `/seller/dashboard` is wrapped in `SellerRoute` to ensure only sellers can access it.
  - `SellerDashboard.jsx` exposes internal views (`welcome`, `addproduct`, `products`, etc.) and synchronizes the active view with a `view` query parameter (e.g. `?view=addproduct`).
  - `SideBar.jsx` updates the URL when a nav item is clicked; `AddProductForm.jsx` renders when view equals `addproduct`.
  - `AddProductForm.jsx` uses Cloudinary client widget to upload images and posts product data to backend (uses `VITE_BACKEND_URL` env var).

- State Management
  - `useAuthStore.js` (Zustand) holds `authUser`, `isCheckingAuth`, and methods `checkAuth`, `login`, `signup`, `logout`.
  - Other stores: `useCartStore` (cart operations), `useRvStore` (recently viewed), and `useSearchStore` (search query). These are used by header and pages.

## Environment / Configuration

- Frontend expects `VITE_BACKEND_URL` in environment (used in `AddProductForm.jsx` and axios config)
- Cloudinary unsigned preset `product_unsigned` and cloud name are used in the client widget — configure corresponding Cloudinary account and upload preset.
- Backend needs MongoDB and Redis configured (check `backend/lib/db.js` and `backend/lib/redis.js`).

## Run locally

1. Backend
   ```bash
   cd backend
   npm install
   # ensure .env has DB/PORT/REDIS settings
   npm run start
   ```
2. Frontend
   ```bash
   cd frontend
   npm install
   # set .env (VITE_BACKEND_URL=http://localhost:5000 or your backend URL)
   npm run dev
   ```

## API Endpoints (high level)

- Auth
  - `POST /auth/login` — login, returns user
  - `POST /auth/signup` — register
  - `GET /auth/me` — current user
  - `POST /auth/logout` — logout
- Products
  - `GET /products` — list
  - `POST /api/products` — create (protected; seller)
  - `GET /products/:id` — single product
- Cart & other endpoints exist under `backend/routers` — inspect controllers for full behavior.

## Known Issues / Notes

- Role casing: frontend code originally checked for `Seller` vs `seller` inconsistently; normalized checks (lowercasing) were added in `SellerRoute` and navbar/sidebar logic to avoid redirects.
- The category dataset (`CategoryList.data.js`) contains objects; rendering `<option>` elements required using `CategoryName` (fixed in `AddProductForm.jsx`).
- The Add Product view is controlled by `?view=addproduct` query param; clicking the dashboard in the navbar opens the overview (`/seller/dashboard`) while the sidebar adds the query string.

## Extending the project

- Add server-side role checks (middleware) to enforce seller-only product creation.
- Add product image validation, server-side resizing, and format conversion.
- Pagination, filters, and full-text search (Elastic or Mongo Atlas Search).
- Add tests: Jest for backend, React Testing Library for frontend components.

## Troubleshooting

- If the Add Product form doesn't render, check browser console for errors and ensure the URL is either `/seller/dashboard` (overview) or `/seller/dashboard?view=addproduct` (form).
- Check `useAuthStore.checkAuth()` on app load — if CORS or credentials issues arise, ensure `axios` and backend allow cookie credentials and correct CORS settings.

## Contact / Ownership

- This summary was generated from the workspace contents at `d:/Web dev/mern-ecommerce`.

---

If you'd like, I can also:

- Commit this file to a new branch and create a commit message.
- Expand sections into separate docs (API spec, Setup guide, Deployment guide).
- Add a CONTRIBUTING.md or developer quickstart.
