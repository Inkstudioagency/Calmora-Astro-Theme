# Calmora — Wellness & Yoga Studio Theme for Astro

Calmora is a calm, editorial theme for yoga studios and wellness brands: classes, a weekly schedule, trainers, events and retreats, pricing and a blog.

## Features

- 15 page designs: Home, About, Classes, Class Schedule, Class detail, Events, Event detail, Blog, Blog post, Trainers, Pricing, Your First Time, Contact, Style Guide, 404
- Three content collections: **Classes**, **Events**, **Blog Posts**
- Content from local markdown, or from **Strapi** by setting one environment variable
- Scroll and page-load animations (GSAP), smooth scrolling (Lenis), sliders, tabs, FAQ accordion
- SEO component with Open Graph, Twitter cards and canonical URLs
- Site settings and menus in two JSON files
- Static output, no UI framework

## Quick start

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview
npm run check    # type-check
```

## Project structure

```
public/css, public/js, public/images   design styles, runtime and images
src/config/config.json                 site title, SEO defaults, footer, social links
src/config/menu.json                   header, mega menu and footer links
src/content/{classes,events,blog-posts}  one markdown file per entry
src/content.config.ts                  collection schemas and content source
src/layouts/BaseLayout.astro           page shell
src/components/                        SeoMeta, Header, Footer, cards/, sections/
src/lib/                               content queries, helpers, Strapi loader
src/pages/                             routes
```

## Customizing

1. **Site details**: edit `src/config/config.json`. Set `site.base_url` to your domain before deploying.
2. **Navigation**: edit `src/config/menu.json`.
3. **Page copy and images**: edit the section components in `src/components/sections/<page>/`.
4. **Collections**: add or edit markdown files in `src/content/`. The file name is the URL slug.
5. **Colours, type, spacing**: change the CSS variables at the top of `public/css/calmora-astro-theme.webflow.css`. `/style-guide` previews them.

Forms (newsletter, contact) are markup only. Point them at your form provider.

## Using Strapi as the CMS

The theme can load Classes, Events and Blog Posts from a Strapi 5 project with matching content types.

1. In Strapi, create collection types with the API ids `classes`, `events` and `blog-posts`. Give each a `slug` field and fields named exactly like the frontmatter keys of the markdown files (images as Media, `includedList` and `body` as Rich text (Markdown), `gallery` as multiple Media). Allow the Public role `find` and `findOne` on all three.
2. Copy `.env.example` to `.env` and set:

   ```
   STRAPI_URL=http://localhost:1337
   ```

3. Run `npm run dev` or `npm run build`. Content is fetched at build time, so rebuild after publishing in Strapi.

Remove `STRAPI_URL` to go back to the markdown files. Pages and components are the same in both modes.

## AI assistant guidance

`.claude/skills/astro-template-guidance/` contains a handbook that coding assistants can use to work on this theme: architecture, adding pages, components, content, configuration, scripts, styling and i18n.

## Credits

Designed by [Ink Studio](https://inks.studio/).
