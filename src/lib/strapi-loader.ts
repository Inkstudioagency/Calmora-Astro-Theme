import type { Loader } from 'astro/loaders';

interface StrapiLoaderOptions {
  /** Strapi base URL, e.g. `http://localhost:1337`. */
  url: string;
  /** Optional API token; not needed when the Public role can `find` the collection. */
  token?: string;
  /** Plural API id of the collection type, e.g. `blog-posts`. */
  contentType: string;
  /** Markdown (rich text) fields that hold a bullet list and should load as `string[]`. */
  listFields?: string[];
}

type StrapiEntry = Record<string, unknown> & { slug?: string; documentId: string; body?: string | null };

const STRAPI_META = ['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'localizations', 'slug', 'body'];

const isMedia = (value: unknown): value is { url: string } =>
  typeof value === 'object' && value !== null && typeof (value as { url?: unknown }).url === 'string';

const markdownList = (markdown: string) =>
  markdown
    .split('\n')
    .map((line) => line.match(/^\s*(?:[-*+]|\d+\.)\s+(.*)$/)?.[1].trim())
    .filter((item): item is string => Boolean(item));

/**
 * Loads a Strapi 5 collection type into an Astro content collection.
 * Entries get the same shape as the local markdown files in `src/content`,
 * so pages and components do not care where the content came from.
 */
export function strapiLoader({ url, token, contentType, listFields = [] }: StrapiLoaderOptions): Loader {
  const base = url.replace(/\/+$/, '');
  const mediaUrl = (path: string) => (path.startsWith('http') ? path : `${base}${path}`);

  // Media objects become plain URLs; nulls are dropped so schema defaults apply.
  const normalize = (entry: StrapiEntry) => {
    const data: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(entry)) {
      if (STRAPI_META.includes(key) || value === null) continue;
      if (isMedia(value)) data[key] = mediaUrl(value.url);
      else if (Array.isArray(value)) data[key] = value.filter(isMedia).map((file) => mediaUrl(file.url));
      else if (listFields.includes(key) && typeof value === 'string') data[key] = markdownList(value);
      else data[key] = value;
    }
    return data;
  };

  return {
    name: 'calmora-strapi-loader',
    async load({ store, parseData, renderMarkdown, generateDigest, logger }) {
      const entries: StrapiEntry[] = [];
      for (let page = 1, pageCount = 1; page <= pageCount; page++) {
        const endpoint = `${base}/api/${contentType}?populate=*&pagination[page]=${page}&pagination[pageSize]=100`;
        const response = await fetch(endpoint, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!response.ok) {
          throw new Error(`Strapi responded ${response.status} for ${endpoint}. Is Strapi running and is "find" allowed for this collection?`);
        }
        const json = await response.json();
        entries.push(...json.data);
        pageCount = json.meta?.pagination?.pageCount ?? 1;
      }

      store.clear();
      for (const entry of entries) {
        const id = entry.slug ?? entry.documentId;
        const body = entry.body ?? '';
        const data = await parseData({ id, data: normalize(entry) });
        store.set({ id, data, body, rendered: await renderMarkdown(body), digest: generateDigest({ data, body }) });
      }
      logger.info(`Loaded ${entries.length} "${contentType}" entries from ${base}`);
    },
  };
}
