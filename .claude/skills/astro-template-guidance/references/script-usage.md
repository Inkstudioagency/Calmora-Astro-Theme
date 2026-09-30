# Scripts

Requires Node 22.12 or newer.

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check `.astro` and `.ts` files |

pnpm and yarn work the same way (`pnpm dev`, `pnpm build`, ...).

## With Strapi

Set `STRAPI_URL` in `.env` first; Strapi must be running when `dev` or `build` starts, because content is fetched then. Restart `dev` to pick up new or changed entries.

## Before publishing

1. Set `site.base_url` in `src/config/config.json`.
2. `npm run check` and `npm run build` must both pass.
