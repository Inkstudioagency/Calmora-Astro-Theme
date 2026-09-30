# Adding a new page, route or section

## New static page

1. Create `src/pages/<route>.astro`.
2. Wrap the content in `BaseLayout` and compose it from sections:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Faq from '../components/sections/shared/Faq.astro';
import Intro from '../components/sections/retreats/Intro.astro';
---

<BaseLayout
  title="Retreats | Calmora - Wellness Website Astro Theme"
  description="One sentence for search results and link previews."
  pageId="6aae6fe397fb335d35a4b23c"
  navVariant="light"
>
  <Intro />
  <Faq variant="bg-white" />
</BaseLayout>
```

3. Add the link to `src/config/menu.json` if it should appear in the header or footer.

### Choosing `pageId`

Interactions are registered per Webflow page id. A new page has no id of its own, so reuse the id of the existing page whose animations you want (copy it from that page's file). The attribute-driven reveals (`hero-title`, `load-anim-*`, `layer-view-*`, `section-title`) work on every page id.

### Choosing `navVariant`

- `base` (default): transparent header with white text, for pages that open on a dark full-bleed hero (home, about, contact, event detail).
- `light`: solid header, for pages that open on a light background.

## New section

1. Create `src/components/sections/<page>/<Name>.astro`. Put sections used by several pages in `sections/shared/`.
2. Build it from the existing classes (see `/style-guide` and `styling-and-theming.md`). Start from the closest existing section.
3. Give the outer element `class="section_<name>"`, then the usual `section-gap` > `container-main` wrappers.
4. Import it in the page and place it between the other sections.

## New dynamic route

Follow `src/pages/blog-posts/[slug].astro`: `getStaticPaths` maps a collection to `{ params: { slug: entry.id }, props: { entry } }`, and the sections receive `entry` as a prop. Add the collection in `src/content.config.ts` and a query helper in `src/lib/content.ts`.
