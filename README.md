#  E-Commerce UI with Product Details and Cart

This project is a modern Next.js e-commerce frontend with a product catalog, search and filter experience, product detail pages, and a persistent cart.

## ✨ Features

- Product listing page with responsive cards
- Search and category/brand filtering
- Product detail page for each item
- Add-to-cart interactions with quantity updates
- Cart page with subtotal, shipping, and total summary
- Persistent cart state using Zustand + localStorage
- Image URLs generated from each product’s name/category for a more consistent catalog experience

## 🧰 Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zustand

## ▶️ Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

4. Vercel deployment link: [https://frontend-assignment-screentask.vercel.app/](https://frontend-assignment-screentask.vercel.app/)

## 🏗️ Build

```bash
npm run build
```

## 🧭 Main Routes

- `/` — home/catalog page
- `/product/[id]` — product detail page
- `/cart` — shopping cart page

## 📝 Notes

- Product images are generated from the product title and category to keep visuals aligned with the catalog data.
- The cart and product detail routes are wired through the app router so navigation works correctly from the navbar and product cards.
