# Content management

Three collections drive the dynamic pages. Schemas live in `src/content.config.ts`.

| Collection | Folder | Detail route | Listed on |
| --- | --- | --- | --- |
| `classes` | `src/content/classes/` | `/classes/<slug>` | `/classes`, `/class-schedule`, `/your-first-time` |
| `events` | `src/content/events/` | `/events/<slug>` | `/`, `/events`, event detail |
| `blog-posts` | `src/content/blog-posts/` | `/blog-posts/<slug>` | `/blog`, blog slider on several pages |

The file name is the slug. Images are paths under `public/` (for example `/images/cms/event-thumbnail.webp`) or absolute URLs.

## Adding an entry

Copy an existing file in the collection folder, rename it, and edit the frontmatter. Empty text fields may be left out; the matching block then renders empty or is skipped.

## How fields map to the pages

**Classes**
- `featured`: shown first in the slider on `/classes` (four slides).
- `beginnerFriendly`: listed on `/your-first-time`.
- `primaryDay` (`Monday` ... `Sunday`) and `primaryTime`: column and time on `/class-schedule`.
- `order`: position in lists.
- `metaLabel`, `teacherName`, `teacherAvatar`, `shortDescription`, `cardImage`: the class card.
- `titleLead` + `titleAccent`: the two-tone heading on the detail page. The remaining fields (`leadTitle`, `advantage1..3`, `readyTitle`, `feature1Title`, `testimonialQuote`, ...) fill the detail layout top to bottom.

**Events**
- `eventsType`: `Upcoming` or `Past`; drives the tabs on `/events` and the home slider (upcoming only).
- `date`: `YYYY-MM-DD`; events sort soonest first.
- `heroTagline` + `title`: the two lines of the detail hero.
- `includedList`: bullet list under "What's Included".
- `attendeeAvatar1..4`, `attendeeOverflow`, `attendeeCountLabel`: the attendee row.
- The markdown body is the "About" text on the detail page.

**Blog posts**
- `featured`: the two large cards at the top of `/blog`; the rest appear under "Latest Blogs".
- `publishedDate`: `YYYY-MM-DD`; posts sort newest first.
- `introTitle`/`introText`, `listTitle`/`listIntro`/`listItem1..7`/`listClose`, `sectionTwo*`, `pullQuote`, `sectionThree*`, `closing*`: the article layout, top to bottom.
- `seoDescription`: meta description; falls back to `excerpt`.

The detail pages for classes and blog posts are built from those structured fields. The markdown body of those two collections is stored but not rendered by the design.

## Using Strapi instead of markdown

1. Run a Strapi 5 project with collection types whose API ids are `classes`, `events` and `blog-posts`, a `slug` field, and fields named exactly like the frontmatter keys (image fields as Media, `includedList` and `body` as Rich text (Markdown), `gallery` as multiple Media). Allow the Public role `find` and `findOne` on all three.
2. Set `STRAPI_URL` in `.env` (and `STRAPI_TOKEN` if the Public role cannot read the collections).
3. Run `npm run dev` or `npm run build`.

`src/lib/strapi-loader.ts` fetches `/api/classes`, `/api/events` and `/api/blog-posts`, turns media into URLs and produces the same fields as the markdown files. Components do not change. Content is fetched at build time, so rebuild (or trigger a deploy webhook from Strapi) after publishing.

## Queries

Use the helpers in `src/lib/content.ts` (`getClasses`, `getFeaturedClasses`, `getEvents`, `isUpcoming`, `getBlogPosts`, `classUrl`, `eventUrl`, `blogPostUrl`) so ordering and URLs stay consistent.
