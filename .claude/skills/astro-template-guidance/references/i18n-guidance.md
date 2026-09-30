# Multi-language (i18n)

Calmora ships in one language (English) with no localized routing. To add languages, use Astro's built-in i18n routing.

1. Configure it in `astro.config.mjs`:

```js
export default defineConfig({
  i18n: { locales: ['en', 'es'], defaultLocale: 'en' },
});
```

2. Mirror the pages under a locale folder, e.g. `src/pages/es/about.astro`, and set `site.lang` per page by passing the locale to `BaseLayout`.
3. Interface text lives in three places: `src/config/config.json`, `src/config/menu.json` and the section components. Create one config and menu file per locale (`menu.es.json`) and pick the file from `Astro.currentLocale` in `Header.astro` and `Footer.astro`.
4. Content: add a locale folder per collection (`src/content/blog-posts/es/...`) and filter by id prefix in `src/lib/content.ts`. With Strapi, enable the Internationalization option on the three content types and add `&locale=<code>` to the request in `src/lib/strapi-loader.ts`.
5. Prefix internal links with the locale using `getRelativeLocaleUrl` from `astro:i18n`.

See https://docs.astro.build/en/guides/internationalization/.
