# Shop — Next.js E-commerce Starter

A product catalog with filtering, search, cart, and a product detail page —
built on Next.js App Router with Zustand for cart state.

## Features

- **Product grid** — responsive (3 cols desktop / 2 tablet / 1 mobile), each
  card shows image, title, price, rating, and a quick Add to Cart button.
- **Sidebar filters** — category and brand (multi-select, with live item
  counts) and a min–max price range. All filters are stored in the URL
  (`?category=Phone,Laptop&brand=Apple&price=2000-15000&q=iphone`), so they
  survive a refresh and are shareable.
- **Search** — debounced, matches title/category/brand, synced to `?q=`.
- **Product detail page** (`/product/[id]`) — image gallery, quantity
  selector, Add to Cart, and a reviews section.
- **Cart** (`/cart`) — quantity controls, remove item, price summary,
  persisted to `localStorage` via Zustand's `persist` middleware.
- **Conditional rendering** — "No products found" state when filters/search
  return nothing.
- **Header** — logo (left), search (center), cart badge + account icon
  (right).
- **Footer** — logo, copyright, social icons.

## Design system

- **Colors:** paper `#F1F0EC`, ink `#16171B`, muted text `#55575E`, hairline
  border `#D9D8D2`, accent `#FF4B26`. Defined in `app/globals.css` as CSS
  variables; components mostly use Tailwind arbitrary values (`bg-[#F1F0EC]`)
  directly rather than a Tailwind config extension, so they work regardless
  of your `tailwind.config`.
- **Type:** Space Grotesk (`.font-display`, headings/titles), Inter (body,
  default), JetBrains Mono (`.font-catalog`, prices/quantities/tags/counts —
  tabular numerals). Loaded via `next/font/google` in `app/layout.tsx`.
- **Shape:** `rounded-sm` throughout instead of pills/`rounded-full` —
  flat, catalog/spec-sheet feel rather than a soft lifestyle-shop look.

## File structure

```
app/
  layout.tsx                 root layout — loads fonts, renders Footer
  globals.css                Tailwind directives + design tokens
  page.tsx                   home page: Sidebar + ProductGrid
  cart/page.tsx               /cart route
  product/[id]/
    page.tsx                  /product/[id] route (generateStaticParams, 404 via notFound())
    ProductDetailClient.tsx    gallery, quantity selector, add to cart, reviews
components/
  Navbar.tsx                 logo / search / cart + account
  Footer.tsx                 logo / copyright / social icons
  Sidebar.tsx                category, brand, price filters (URL-driven)
  SearchBar.tsx               debounced search, syncs ?q= to URL
  ProductCard.tsx             grid card
  ProductGrid.tsx             filtering logic + empty state
  StarRating.tsx               rating stars
lib/
  products.ts                 mock catalog, Product type, categories/brands/priceBounds
store/
  useCartStore.ts              Zustand cart store, persisted to localStorage
next.config.js                 allows picsum.photos demo images
```

## Setup

1. Copy these files into your project, preserving folder structure. If you
   already have an `app/layout.tsx` or `next.config.js`, merge them by hand
   rather than overwriting — this layout also loads the fonts the design
   depends on.
2. Install Zustand:
   ```
   npm install zustand
   ```
3. Confirm your `tsconfig.json` has the `@/*` path alias (default in
   `create-next-app`):
   ```json
   "paths": { "@/*": ["./*"] }
   ```
4. Tailwind is assumed to already be configured.

## Routing note

This project assumes **Next.js App Router**: a route exists only if there is
a `page.tsx` file inside the matching folder under `app/` — e.g.
`app/cart/page.tsx` → `/cart`. Files elsewhere (like a `views/` folder) are
not routes by themselves. If you keep page content in `views/`, add a thin
re-export in `app/`:

```tsx
// app/cart/page.tsx
export { default } from "@/views/cart/page";
```

## Things to swap for a real backend

- `lib/products.ts` is static mock data — replace `products` / `getProductById`
  with real fetches (DB, CMS, API route) when ready; the grid, filters,
  detail page, and cart don't need to change shape.
- Reviews on the product page are static placeholders.
- Checkout button on `/cart` is a no-op — wire it to your payment flow.
- Cart-related components guard against SSR/localStorage hydration mismatches
  with a `mounted` flag (see `Navbar.tsx`, `app/cart/page.tsx`). Keep that
  pattern anywhere else you read `useCartStore`.