// @ts-check
import { defineConfig } from 'astro/config';
import config from './src/config/config.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url,
  // Keep the markup's whitespace as designed; collapsing it shifts inline elements.
  compressHTML: false,
});
