# Copenhagen Walking Tour

A complete Vite + React application showing an interactive walking-tour map, route timeline, and photo gallery.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

## Build for hosting

```bash
npm run build
```

The production-ready static site will be generated in `dist/`. You can host that folder on Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, or any static web host.

## Preview production build

```bash
npm run preview
```

## Notes

- The map uses OpenStreetMap tiles through Leaflet / React Leaflet.
- The route coordinates are approximate.
- Gallery images are remote Unsplash image URLs, so the site needs internet access to display them.
