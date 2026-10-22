# AfriEssence storefront

A Vite + React storefront for the AfriEssence product collection.

## Local development

```sh
npm ci
npm run dev
```

## Production deployment

Build with `npm run build` and publish the generated `dist/` directory. Product, journal, logo, cursor, and hero images live in `assets/` and are bundled by Vite with hashed URLs, so they are included in the production output instead of relying on unbundled files at the repository root.

The default base path is `/` for domain-root deployments. If the site is hosted under a path such as `https://example.com/3d/`, set `VITE_BASE_PATH=/3d/` in the build environment before running `npm run build`. Same-site links use client-side navigation. For direct visits or refreshes of routes such as `/shop`, `/wellness`, product pages, and journal articles, configure the hosting provider to serve `index.html` for unknown app paths (SPA fallback).
