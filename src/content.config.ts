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

export const collections = {
  packages: packagesCollection,
  transport: transportCollection,
  blog: blogCollection,
};
