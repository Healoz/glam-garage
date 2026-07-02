# GlamGarage

A front-end e-commerce prototype built with **React + TypeScript**, created as a learning project to explore React fundamentals — state management, routing, context, custom hooks, and animation — through the lens of a realistic shopping site.

> 🚧 **Learning project / prototype** — product data is a local JSON file, there's no backend or payment processing, and some flows (checkout, sizing) are UI-complete but not functionally wired up yet.

---

## Overview

GlamGarage is a clothing storefront with the core flows you'd expect from a real e-commerce site:

- Browse a product catalogue, filtered by category or search
- View detailed product pages with an image carousel and size selection
- Add items to a cart (persisted to `localStorage`), adjust quantities, and view a running total
- Save products to a favourites/wishlist list
- Fully responsive layout (mobile → tablet → desktop breakpoints throughout)
- Polished micro-interactions throughout via Framer Motion (page transitions, hover states, staggered grid animations, drag-to-swipe carousel, an "add to cart" flourish that animates toward the cart icon)

---

## Architecture

### State & data flow

`App.tsx` is the single source of truth for the app. Rather than scattering state across pages, it owns:

- **Products** — loaded from a local `products.json` (stand-in for a real API)
- **Cart** — array of `CartItem`s, initialised from and synced to `localStorage` so the cart survives a page refresh
- **Favourites** — array of saved `Product`s
- **Category names** — derived automatically from the unique categories present in the product list

State and the functions that mutate it (`addProductToCart`, `removeCartItemFromCart`, `updateProductInCart`) are exposed two ways:

- Passed down as **props** to `Header`, `Home`, `Cart`, `CategoryPage`, `Search`, and `Favourites`
- Also exposed via a React **Context** (`CartContext`), used by deeper components like `ProductPage` so cart actions don't need to be prop-drilled through every intermediate layer

Routing is handled with `react-router-dom` (`HashRouter`), with routes for the homepage, product detail, category, cart, and search pages.

### Data types (`data/types.ts`)

- `Product` — id, name, description, category, price, image URLs
- `CartItem` — a product + quantity + selected size, with its own generated UUID (so the same product can appear as multiple cart lines if added in different sizes)
- `Size` enum — XS through XL

---

## Pages

| Page           | Description                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Home`         | Landing page — animated hero section with a parallax-ready image collage, rotating circular badge, category shortcuts, and the main product grid                                                                                      |
| `ProductPage`  | Product detail — draggable/swipeable image carousel (with a separate thumbnail gallery on desktop), size selector, add-to-cart button with a custom "fly to cart" animation, and expandable info accordions (details, shipping, etc.) |
| `Cart`         | Full cart page — itemised list with quantity controls, subtotal + flat shipping calculation, checkout CTA, empty-state messaging                                                                                                      |
| `CategoryPage` | Filters the catalogue by category, read from the URL                                                                                                                                                                                  |
| `Search`       | Filters the catalogue by a `?q=` query string, matched against product names                                                                                                                                                          |
| `Favourites`   | Displays saved/wishlisted products, shown persistently beneath the routed page content                                                                                                                                                |

---

## Key Components

| Component         | Purpose                                                                                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Header`          | Sticky nav bar — logo, desktop category links, search bar, and a cart button with an animated item-count badge. Cart click opens a popout on desktop or navigates to `/cart` on mobile |
| `CartPopout`      | Dropdown mini-cart shown from the header on desktop, animated in/out, lists items and total, links to full cart/checkout                                                               |
| `CartItemElement` | Single cart line item — image, price, name, size, and (optionally) inline quantity +/- controls                                                                                        |
| `CatalogueGrid`   | Responsive product grid (2/3/4 columns across breakpoints) with a staggered fade-up-on-scroll animation per item                                                                       |
| `CatalogueItem`   | Individual product card — swaps to a second image on hover, favourite/heart toggle, links to product and category pages                                                                |
| `SearchBar`       | Expanding search input — icon-only on mobile until tapped, animated open/close, submits via URL query params                                                                           |
| `SizeSelect`      | Custom-styled `<select>` for choosing a product size, generated from the `Size` enum                                                                                                   |
| `Accordion`       | Expand/collapse content block (used for product details/shipping info), animated height via `AnimatePresence`                                                                          |
| `Button`          | Shared button component — renders as a router `Link` or plain anchor, with colour scheme, icon, circular/pill and "fill available space" variants                                      |
| `Footer`          | Simple footer with placeholder link columns and copyright                                                                                                                              |

---

## Custom Hooks & Utilities

- **`useClickOutside`** — detects clicks outside a given ref and closes the element (with support for "ignore" refs, e.g. the toggle button itself). Powers both the cart popout and search bar dismiss behaviour.
- **`ScrollToTop`** — resets scroll position to the top on every route change.
- **`transition.tsx`** — a higher-order component that wraps a page in Framer Motion slide overlays for page-transition effects.

---

## Styling

- Plain CSS with **CSS Modules** per-component (`*.module.css`), scoped automatically to avoid class name collisions
- A global stylesheet (`App.css`) handles browser resets (buttons, inputs, links, images) and defines the design system as CSS custom properties — colour palette (purple/yellow/black/white), spacing scale, custom scrollbar
- Mobile-first responsive design, with consistent breakpoints at `768px` (tablet) and `1200px` (desktop), and some components adding a `1500px` "wide desktop" tier
- `ColourScheme` enum (Primary / Secondary / White) drives consistent button theming across the app

---

## Tech Stack

- **React** + **TypeScript**
- **react-router-dom** — routing (`HashRouter`)
- **Framer Motion** — animation (page transitions, gestures/drag, scroll-triggered animation, layout animation)
- **CSS Modules** — component-scoped styling
- **uuid** — generating unique cart item IDs
- **react-lazy-load-image-component** — lazy image loading in the catalogue
- **Material Symbols** — icon set
- `localStorage` — cart persistence (no backend)

---

## Known Limitations / Roadmap

Since this is a learning-focused prototype, a few things are intentionally incomplete:

- Checkout button doesn't process anything — it just links back to a route
- Product data is static JSON, not a real API/database
- `ScrollToTop` imports Lenis (smooth scroll library) but doesn't currently use it — smooth scroll setup is commented out in `App.tsx`
- Favourites aren't persisted (they reset on refresh, unlike the cart)
- No form validation/error states for search or checkout
- Some Lorem ipsum placeholder copy still in place (footer links, product accordions, cart disclaimer text)

---

## Running the Project

1. Clone the repo
2. `npm install`
3. `npm start`
4. Visit `http://localhost:3000`
