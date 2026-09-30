---
name: astro-template-guidance
description: Use this skill whenever you need to understand how the template works, including adding new pages, managing content, configuring pages, using components, understanding project architecture, using scripts, or styling and theming. Use it for ANY question related to the structure, usage, and customization of the project template.
---

# Template Guidance

This skill acts as the unified handbook for the template. It uses the progressive disclosure pattern to keep context lean.

Depending on the user's specific request, **you MUST use the file-reading tool to read the appropriate reference document** from the `references/` directory before proceeding.

## Routing Guide

Read the specific file in `references/` based on the user's request:

- **Adding a new page, route, or section:**
  Read: `references/adding-new-pages.md`

- **Using, modifying, or understanding UI components (e.g. BlogCard, SeoMeta, sections):**
  Read: `references/component-usage.md`

- **Adding, editing, or updating markdown content (classes, events, blog posts) or the Strapi source:**
  Read: `references/content-management.md`

- **Configuring site settings, navigation, social links, or SEO (config.json, menu.json):**
  Read: `references/page-configuration.md`

- **Understanding the high-level codebase structure or data flow:**
  Read: `references/project-architecture.md`

- **Running npm scripts (dev, build, generators):**
  Read: `references/script-usage.md`

- **Customizing styles, design tokens (CSS variables), or Webflow-exported CSS:**
  Read: `references/styling-and-theming.md`

- **Working with multi-language (i18n) features, translations, or localized routing:**
  Read: `references/i18n-guidance.md`

## Instructions

1. Identify the domain of the user's request.
2. View the corresponding reference markdown file in `references/` relative to this skill.
3. Follow the instructions within that reference file.
