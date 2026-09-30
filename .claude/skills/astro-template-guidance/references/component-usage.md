# Components

## Layout

| Component | Purpose | Props |
| --- | --- | --- |
| `layouts/BaseLayout.astro` | Page shell: head, header, `<main>`, footer, scripts | `title`, `description`, `image`, `noindex`, `pageId` (required), `navVariant` (`base` \| `light`) |
| `SeoMeta.astro` | Title, description, Open Graph, Twitter, canonical, robots | `title`, `description`, `image`, `noindex`; falls back to `config.json` |
| `Header.astro` | Navigation and mega menu from `menu.json` | `variant` |
| `Footer.astro` | Footer from `config.json` and `menu.json` | `pageId` |
| `Scripts.astro` | jQuery, `webflow.js`, GSAP, Lenis, counter animation | none |
| `InteractionStyles.astro` | Pre-hides animated elements until the engine loads | none |

## Cards

| Component | Used by | Props |
| --- | --- | --- |
| `cards/BlogCard.astro` | `BlogSlider` | `post`, `tagClass` |
| `cards/ClassCard.astro` | All classes grid | `entry` |
| `cards/EventRow.astro` | Events page, event detail | `event`, `heading` (`h2` \| `h3`), `tinted`, `reveal`, `titleLinkClass` |
| `LinkButton.astro` | Underlined arrow link | `href`, `label` |

## Shared sections

| Component | Props |
| --- | --- |
| `sections/shared/Faq.astro` | `variant`: `bg-color` (default) or `bg-white` |
| `sections/shared/Gallery.astro` | `variant`: `base` (default) or `bg-white` |
| `sections/shared/BlogSlider.astro` | `variant` (`base` \| `bg-color`), `title`, `subtitle` (`null` hides it), `exclude` (slug), `limit` |
| `sections/shared/Team.astro` | none |

Pick the variant that contrasts with the section above it: tinted sections on white pages, white sections on tinted pages.

## Page sections

Every other folder in `components/sections/` belongs to one page (`home/`, `about/`, `classes/`, `class-single/`, ...). Text and images in these are edited directly in the component. Sections that list collection entries read them through `src/lib/content.ts`.

## Editing rules

- Keep animation attributes (`hero-title`, `load-anim-*`, `layer-view-*`, `section-title`) and `w-…` classes; the runtime depends on them.
- Sliders need `.w-slider` > `.w-slider-mask` > `.w-slide` as direct children. Tabs need matching `data-w-tab` values on the link and the pane.
- Scripts inside components must use `is:inline`.
