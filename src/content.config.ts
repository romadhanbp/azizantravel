import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const packagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/packages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['wisata', 'petualangan', 'bisnis', 'custom']),
    image: z.string(),
    badge: z.string().optional(),
    duration: z.string(),
    maxGroup: z.number().optional(),
    capacity: z.string().optional(),
    luggage: z.string().optional(),
    price: z.string(),
    pricePer: z.string(),
    includes: z.array(z.string()),
    description: z.string(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(99),
  }),
});

const transportCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/transportasi' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    image: z.string(),
    badge: z.string().optional(),
    category: z.string(),
    capacity: z.string(),
    luggage: z.string(),
    price: z.string(),
    pricePer: z.string(),
    includes: z.array(z.string()),
    description: z.string(),
    order: z.number().optional().default(99),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

const homepageCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homepage' }),
  schema: z.object({
    section: z.string(),
    tag: z.string().optional(),
    title: z.string().optional(),
    highlightWord: z.string().optional(),
    description: z.string().optional(),
    badge: z.string().optional(),
    badgeIcon: z.string().optional(),
    badgeNumber: z.string().optional(),
    badgeText: z.string().optional(),
    image: z.string().optional(),
    buttonPrimary: z.string().optional(),
    buttonPrimaryLink: z.string().optional(),
    buttonSecondary: z.string().optional(),
    buttonSecondaryLink: z.string().optional(),
    stats: z.array(z.object({
      number: z.string(),
      label: z.string(),
    })).optional(),
    features: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    items: z.array(z.object({
      image: z.string(),
      label: z.string(),
    })).optional(),
  }),
});

const testimonialCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    origin: z.string(),
    text: z.string(),
    rating: z.number(),
    avatar: z.string(),
    order: z.number().optional().default(99),
  }),
});

export const collections = {
  packages: packagesCollection,
  transport: transportCollection,
  blog: blogCollection,
  homepage: homepageCollection,
  testimonials: testimonialCollection,
};
