const trimSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

/** True when `href` points at the page being rendered (drives Webflow's `w--current` state). */
export const isCurrent = (href: string, pathname: string) => trimSlash(href) === trimSlash(pathname);

/** Props to spread on a link so the active page gets `aria-current` like the source design. */
export const currentAttrs = (href: string, pathname: string) =>
  isCurrent(href, pathname) ? { 'aria-current': 'page' as const } : {};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** `2026-08-15` -> `Aug 15, 2026` (UTC, so build machines in any timezone agree). */
export function formatDate(date: Date) {
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${MONTHS[date.getUTCMonth()]} ${day}, ${date.getUTCFullYear()}`;
}

/** Collects the non-empty values of numbered fields, e.g. `listItem1..listItem7`. */
export function numbered<T extends Record<string, unknown>>(data: T, prefix: string, count: number, suffix = '') {
  const values: string[] = [];
  for (let i = 1; i <= count; i++) {
    const value = data[`${prefix}${i}${suffix}`];
    if (typeof value === 'string' && value) values.push(value);
  }
  return values;
}
