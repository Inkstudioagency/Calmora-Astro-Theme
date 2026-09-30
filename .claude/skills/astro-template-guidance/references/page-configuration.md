# Site configuration

## `src/config/config.json`

| Key | Used for |
| --- | --- |
| `site.title`, `site.description` | Default SEO title and description; the title is also the suffix of detail pages |
| `site.base_url` | Production URL. Feeds `site` in `astro.config.mjs`, canonical links, Open Graph URLs and blog share links. **Set this before deploying.** |
| `site.og_image` | Default social image |
| `site.logo_light`, `site.logo_dark`, `site.logo_alt` | Header logos (white for the transparent header, dark for the solid one) |
| `site.lang` | `<html lang>` |
| `fonts.google` | Google Font families loaded by the WebFont loader |
| `footer.*` | Footer logo, description, newsletter texts, copyright |
| `social[]` | Footer social links: `name`, `url`, `icon`, `new_tab` |
| `webflow.site_id` | Required by `webflow.js`; do not change |

## `src/config/menu.json`

| Key | Used for |
| --- | --- |
| `main[]` | Top-level header links |
| `mega.label`, `mega.columns[]` | The "Pages" dropdown: each column has a `title` and `links[]` |
| `cta` | The header button |
| `footer[]` | Footer link columns, each with `title` and `links[]` |

Links are `{ "name": "...", "url": "/path" }`. The link that matches the current URL gets the active state automatically.

## Per-page SEO

Pass `title`, `description`, `image` and `noindex` to `BaseLayout`. Detail pages compute these from the entry (`shortDescription`, `seoDescription`, banner image).

## Forms

The newsletter, contact and filter forms keep the design's markup but have no backend on a static host. Point each `<form>` at your provider (set `action` and `method`), or handle the submit in a script.
