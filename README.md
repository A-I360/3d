# AFRIESSENCE — Where Beauty Meets Radiance

A premium, immersive luxury e-commerce experience for AfriEssence — a modern
African beauty and wellness brand. Built with **Next.js 14, React Three Fiber,
Three.js, Framer Motion and Tailwind CSS**.

> Seven rituals. One philosophy of radiance.

---

## ✦ The Collection (7 Products)

| # | Product | Category | Slug |
|---|---------|----------|------|
| 01 | Lush Wood Body Oil | Body | `lush-wood-body-oil` |
| 02 | Herbal Glow Body Wash | Cleansing | `herbal-glow-body-wash` |
| 03 | Baovera Hair Oil | Hair | `baovera-hair-oil` |
| 04 | Body Butter | Body | `body-butter` |
| 05 | Perfume Oil | Fragrance | `perfume-oil` |
| 06 | Shimmer Oil | Body | `shimmer-oil` |
| 07 | Black Luxe Soap | Cleansing | `black-luxe-soap` |

## 🚀 Run it

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # serve production build
```

## 🗂 Structure

```
app/                  # pages (home, shop, journal, product/[slug], checkout)
components/           # Hero3D, ProductScene (3D engine), CollectionSection,
                      # FeaturedStory, SignatureSection, Navbar, CartDrawer,
                      # SearchOverlay, Preloader, CustomCursor, Footer, …
lib/products.ts       # ★ single source of truth for the entire catalogue
lib/cart.tsx          # shopping bag (context + localStorage persistence)
lib/site.tsx          # loader / search state
public/products/      # product imagery (7 files, one per slug)
public/icon.svg       # favicon + brand mark
public/logo.svg       # full logo reference
```

## 🔄 Adding / Editing Products

Everything is data-driven from **`lib/products.ts`** — no component changes needed.

1. Add an object to the `PRODUCTS` array with a unique `slug`.
2. Drop the product image at `public/products/<slug>.png`.
3. Pick a model type: `bottle · pump · dropper · jar · vial · slim · bar`
   (add a new variant in `components/ProductScene.tsx` if you need a new shape).
4. Set `featured` / `signature` flags to opt into the cinematic sections.

The route `/product/<slug>`, search, filtering, cart and related products all
work automatically.

## 🖼 Replacing AI visuals with your own photography

The current visuals are premium AI-generated renders. To use your real product
photos, **just replace the files** — same names, same paths. Nothing else to change:

| Replace this file | With |
|---|---|
| `public/products/lush-wood-body-oil.png` | Your Lush Wood Body Oil photo |
| `public/products/herbal-glow-body-wash.png` | Your Herbal Glow Body Wash photo |
| `public/products/baovera-hair-oil.png` | Your Baovera Hair Oil photo |
| `public/products/body-butter.png` | Your Body Butter photo |
| `public/products/perfume-oil.png` | Your Perfume Oil photo |
| `public/products/shimmer-oil.png` | Your Shimmer Oil photo |
| `public/products/black-luxe-soap.png` | Your Black Luxe Soap photo |
| `public/brand-story.jpg` | Your brand / lifestyle image |
| `public/icon.svg` | Your logo (favicon + header mark, square) |
| `public/logo.svg` | Your full logo (header/footer reference) |

Recommended: square images, 1024×1024+, PNG/WebP (Next.js serves AVIF/WebP
automatically). The favicon/header logo should be a square mark with
transparency — replace `public/icon.svg` and update nothing else.

## ✨ Experience Highlights

- **Immersive 3D hero** — real-time WebGL product with pointer parallax across
  three depth layers, cursor-reactive lighting and a product switcher.
- **Cinematic scroll story** — sticky chapters that rotate the 3D product as
  the environment transitions between scenes.
- **3D product cards** — perspective tilt, independent image movement,
  deepening shadows and magnetic buttons.
- **Interactive product viewer** — drag to rotate, scroll to zoom, auto-rotate
  and Ivory/Dark studio environments on every product page.
- **Full commerce** — category filtering, live search, bag with quantities,
  checkout flow with confirmation, localStorage persistence.
- **Brand theatre** — preloader, custom cursor, marquees, editorial journal,
  testimonials, newsletter, parallax throughout.
- **Accessible & performant** — semantic HTML, keyboard-friendly, ARIA labels,
  `prefers-reduced-motion` support, lazy loading, static generation.

## 📍 Local craft

All products are positioned as handcrafted in Lagos, Nigeria, with Naira
pricing (₦8,500 – ₦22,000). Prices are centralised in `lib/products.ts`.
