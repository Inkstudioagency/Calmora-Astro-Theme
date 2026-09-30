# Styling and theming

The theme does not use Tailwind. All styles are plain CSS in `public/css/`, loaded by `BaseLayout`:

1. `normalize.css`: reset.
2. `webflow.css`: base classes for the runtime widgets (`w-nav`, `w-slider`, `w-tabs`, `w-dropdown`, `w-form`, `w-richtext`).
3. `calmora-astro-theme.webflow.css`: the design itself.

## Design tokens

Colours, type sizes, spacing and radii are CSS variables declared in `:root` at the top of `calmora-astro-theme.webflow.css`. Change a token there to retheme the whole site, for example:

- `--_color---text-color--text-color-brand`, `--_color---background-color--…`, `--_color---button-color--…`
- `--_typography---font-family--…`, `--_typography---typography--paragraph-1..5`, `--_typography---font-weight--…`
- `--_sizes---spacers--…`, `--_sizes---redius--…`

`/style-guide` shows every colour, type style and button.

## Fonts

Families are listed in `config.json` under `fonts.google` and must match the `--_typography---font-family--…` tokens.

## Class conventions

- `section_<name>` > `section-gap` > `container-main` > `<name>-wrapper`.
- `<block>-block`, `<thing>-title`, `<thing>-text` for parts; `is-<modifier>` for variations (`is-ruled`, `is-large`, `is-page-top`).
- Utilities: `text-color-*`, `text-size-*`, `text-weight-*`, `heading-style-1..6`, `max-width-*`.
- Buttons: `btn btn-sm btn-brand`, `secondary-button`, and `LinkButton.astro`.
- `w-variant-<id>` classes switch a component to another variant; the shared sections expose these as a `variant` prop.

## Custom CSS

Add a new stylesheet in `public/css/` and link it in `BaseLayout.astro` after the three files above, or use a scoped `<style>` block in a component. Avoid editing `webflow.css`.

## Animations

Reveal animations are attribute-driven: `hero-title`, `load-anim-1..6` (on page load) and `section-title`, `layer-view-1..6` (on scroll). Add the attribute to an element to animate it; remove it to keep the element static. Number counters use `data-counter`. Smooth scrolling (Lenis) and the counter script are in `Scripts.astro`.

## Dark mode

The design has a single light theme. There is no dark-mode toggle.
