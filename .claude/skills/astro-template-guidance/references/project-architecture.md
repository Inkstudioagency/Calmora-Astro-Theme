# Project architecture

Calmora is a static Astro site. The design was built in Webflow; its exported CSS and runtime are kept as-is so the pages render pixel-identically, and Astro supplies the layout, components and content.

```
public/
  css/        normalize.css, webflow.css, calmora-astro-theme.webflow.css (all design styles)
  js/         webflow.js (nav, sliders, tabs, lightbox, interactions)
  images/     design images; images/cms/ holds the collection images
src/
  config/     config.json (site, footer, social), menu.json (header + footer links)
  content/    classes/, events/, blog-posts/ (markdown, one file per entry)
  content.config.ts   collection schemas; switches between markdown and Strapi
  layouts/    BaseLayout.astro (head, header, footer, scripts)
  components/
    SeoMeta.astro, Header.astro, Footer.astro, Scripts.astro, InteractionStyles.astro, LinkButton.astro
    cards/      BlogCard, ClassCard, EventRow
    sections/   one folder per page, plus shared/ (Faq, Gallery, BlogSlider, Team)
  lib/        content.ts (queries, URLs), utils.ts, strapi-loader.ts
  pages/      one file per route; classes/[slug], events/[slug], blog-posts/[slug]
```

## Data flow

1. `content.config.ts` defines three collections. With no `STRAPI_URL` they load from `src/content/*`; with it set they load from Strapi through `lib/strapi-loader.ts`. Both produce the same fields.
2. `lib/content.ts` is the only place that sorts and filters entries (`getClasses`, `getEvents`, `getBlogPosts`, `isUpcoming`, ...). Sections call these helpers rather than `getCollection` directly.
3. A page is a list of section components inside `BaseLayout`.

## Things that must stay in sync

- **`pageId`** on `BaseLayout` is the Webflow page id. `webflow.js` uses it to pick that page's interactions. A wrong id means animations do not run.
- **Attributes such as `hero-title`, `load-anim-2`, `layer-view-1`, `section-title`** are animation hooks. `InteractionStyles.astro` hides those elements until the animation engine is ready. Keep them when editing markup.
- **`w-variant-…` classes and `data-wf--…` attributes** select component variants in the CSS.
- `compressHTML` is off in `astro.config.mjs` on purpose: the design depends on the whitespace between inline elements.
