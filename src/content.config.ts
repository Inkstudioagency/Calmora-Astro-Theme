import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { strapiLoader } from './lib/strapi-loader';

// Content comes from the markdown files in `src/content` by default.
// Set STRAPI_URL (see .env.example) to load the same collections from Strapi instead.
const STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

const source = (contentType: string, listFields: string[] = []) =>
  STRAPI_URL
    ? strapiLoader({ url: STRAPI_URL, token: STRAPI_TOKEN, contentType, listFields })
    : glob({ pattern: '**/*.md', base: `./src/content/${contentType}` });

const text = z.string().default('');
/** Image path (`/images/...`) or absolute URL. */
const image = z.string().default('');

const classes = defineCollection({
  loader: source('classes'),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    beginnerFriendly: z.boolean().default(false),
    category: text,
    level: text,
    durationMin: z.number().optional(),
    metaLabel: text,
    primaryDay: text,
    primaryTime: text,
    shortDescription: text,
    cardImage: image,
    heroImage: image,
    bodyFigure: image,
    bookingLink: text,
    benefits: text,
    teacherName: text,
    teacherRole: text,
    teacherAvatar: image,
    titleLead: text,
    titleAccent: text,
    leadTitle: text,
    leadText: text,
    advantagesTitle: text,
    advantage1: text,
    advantage2: text,
    advantage3: text,
    readyTitle: text,
    readyText: text,
    whyTitle: text,
    whyText: text,
    featuresTitle: text,
    feature1Title: text,
    feature1Text: text,
    feature2Title: text,
    feature2Text: text,
    feature3Title: text,
    feature3Text: text,
    practicesTitle: text,
    practicesText: text,
    testimonialTitle: text,
    testimonialName: text,
    testimonialQuote: text,
    testimonialImage: image,
    testimonialVideo: text,
  }),
});

const events = defineCollection({
  loader: source('events', ['includedList']),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    eventsType: z.enum(['Upcoming', 'Past']).default('Upcoming'),
    isPast: z.boolean().default(false),
    duration: text,
    location: text,
    shortDescription: text,
    thumbnailImage: image,
    bannerImage: image,
    gallery: z.array(z.string()).default([]),
    attendeeCountLabel: text,
    attendeeOverflow: text,
    attendeeAvatar1: image,
    attendeeAvatar2: image,
    attendeeAvatar3: image,
    attendeeAvatar4: image,
    bookingLink: text,
    heroTagline: text,
    aboutHeading: text,
    includedList: z.array(z.string()).default([]),
    bodyImage1: image,
    bodyImage2: image,
    experienceBody: text,
    bringItem1: text,
    bringItem2: text,
    bringItem3: text,
    whyJoinHeading: text,
    whyJoinBody: text,
    reserveBody: text,
  }),
});

const blogPosts = defineCollection({
  loader: source('blog-posts'),
  schema: z.object({
    title: z.string(),
    publishedDate: z.coerce.date(),
    category: text,
    featured: z.boolean().default(false),
    excerpt: text,
    readTime: text,
    seoDescription: text,
    thumbnailImage: image,
    bannerImage: image,
    bodyFigure: image,
    authorName: text,
    authorRole: text,
    authorAvatar: image,
    shareInstagram: text,
    introTitle: text,
    introText: text,
    listTitle: text,
    listIntro: text,
    listItem1: text,
    listItem2: text,
    listItem3: text,
    listItem4: text,
    listItem5: text,
    listItem6: text,
    listItem7: text,
    listClose: text,
    sectionTwoTitle: text,
    sectionTwoText: text,
    pullQuote: text,
    sectionThreeTitle: text,
    sectionThreeText: text,
    closingTitle: text,
    closingText: text,
    closingTextTwo: text,
  }),
});

export const collections = { classes, events, 'blog-posts': blogPosts };
