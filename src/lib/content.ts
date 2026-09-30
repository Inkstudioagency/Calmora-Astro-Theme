import { getCollection, type CollectionEntry } from 'astro:content';

export type ClassEntry = CollectionEntry<'classes'>;
export type EventEntry = CollectionEntry<'events'>;
export type BlogPostEntry = CollectionEntry<'blog-posts'>;

export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const classUrl = (entry: ClassEntry) => `/classes/${entry.id}`;
export const eventUrl = (entry: EventEntry) => `/events/${entry.id}`;
export const blogPostUrl = (entry: BlogPostEntry) => `/blog-posts/${entry.id}`;

/** Classes in their manual `order`. */
export async function getClasses() {
  return (await getCollection('classes')).sort((a, b) => a.data.order - b.data.order);
}

/** Featured classes first, then the rest, capped at `limit`. */
export async function getFeaturedClasses(limit: number) {
  const classes = await getClasses();
  return [...classes.filter((c) => c.data.featured), ...classes.filter((c) => !c.data.featured)].slice(0, limit);
}

/** Events, soonest first. */
export async function getEvents() {
  return (await getCollection('events')).sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

export const isUpcoming = (event: EventEntry) => event.data.eventsType === 'Upcoming' && !event.data.isPast;

/** Blog posts, newest first. */
export async function getBlogPosts() {
  return (await getCollection('blog-posts')).sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
}
