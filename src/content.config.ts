import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
  robots: z.string().optional(),
}).optional();

const imageSchema = z.object({
  imageAlt: z.string().optional(),
  imageTitle: z.string().optional(),
  imageCaption: z.string().optional(),
}).optional();

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    type: z.enum(['homepage', 'page', 'archive']),
    published: z.boolean().default(true),
    seo: seoSchema,
  }),
});

const packagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/packages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['wisata', 'petualangan', 'bisnis', 'custom']),
    image: z.string(),
    imageAlt: z.string().optional(),
    imageTitle: z.string().optional(),
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
    published: z.boolean().default(true),
    order: z.number().optional().default(99),
    seo: seoSchema,
  }),
});

const transportCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/transportasi' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    image: z.string(),
    imageAlt: z.string().optional(),
    imageTitle: z.string().optional(),
    badge: z.string().optional(),
    category: z.string(),
    capacity: z.string(),
    luggage: z.string(),
    price: z.string(),
    pricePer: z.string(),
    includes: z.array(z.string()),
    description: z.string(),
    published: z.boolean().default(true),
    order: z.number().optional().default(99),
    seo: seoSchema,
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
    imageAlt: z.string().optional(),
    imageTitle: z.string().optional(),
    imageCaption: z.string().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    seo: seoSchema,
  }),
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    color: z.string(),
    icon: z.string(),
    order: z.number().default(99),
  }),
});

const mediaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/media' }),
  schema: z.object({
    title: z.string(),
    file: z.string(),
    alt: z.string(),
    title_attr: z.string().optional(),
    caption: z.string().optional(),
    description: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    format: z.string().default('jpg'),
    lazyLoading: z.boolean().default(true),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    order: z.number().default(99),
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
    slug: z.string(),
    origin: z.string(),
    text: z.string(),
    rating: z.number(),
    avatar: z.string(),
    order: z.number().optional().default(99),
  }),
});

const seoSettingsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seo-settings' }),
  schema: z.object({
    section: z.string(),
    siteName: z.string().optional(),
    tagline: z.string().optional(),
    url: z.string().optional(),
    language: z.string().optional(),
    defaultImage: z.string().optional(),
    twitterHandle: z.string().optional(),
    description: z.string().optional(),
    telephone: z.string().optional(),
    email: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      region: z.string().optional(),
      province: z.string().optional(),
      country: z.string().optional(),
    }).optional(),
    geo: z.object({
      latitude: z.string().optional(),
      longitude: z.string().optional(),
    }).optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
    whatsapp: z.string().optional(),
    youtube: z.string().optional(),
    twitter: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
    googleTagManagerId: z.string().optional(),
    facebookPixelId: z.string().optional(),
    hotjarId: z.string().optional(),
    enabled: z.boolean().optional(),
  }),
});

// ============ ENGLISH COLLECTIONS ============
const packagesEnCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/packages-en' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['wisata', 'petualangan', 'bisnis', 'custom']),
    image: z.string(),
    imageAlt: z.string().optional(),
    imageTitle: z.string().optional(),
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
    published: z.boolean().default(true),
    order: z.number().optional().default(99),
    seo: seoSchema,
  }),
});

const transportEnCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/transportasi-en' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    image: z.string(),
    imageAlt: z.string().optional(),
    imageTitle: z.string().optional(),
    badge: z.string().optional(),
    category: z.string(),
    capacity: z.string(),
    luggage: z.string(),
    price: z.string(),
    pricePer: z.string(),
    includes: z.array(z.string()),
    description: z.string(),
    published: z.boolean().default(true),
    order: z.number().optional().default(99),
    seo: seoSchema,
  }),
});

const blogEnCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog-en' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    imageAlt: z.string().optional(),
    imageTitle: z.string().optional(),
    imageCaption: z.string().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    seo: seoSchema,
  }),
});

const categoriesEnCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories-en' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    color: z.string(),
    icon: z.string(),
    order: z.number().default(99),
  }),
});

const homepageEnCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homepage-en' }),
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

const testimonialEnCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials-en' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    origin: z.string(),
    text: z.string(),
    rating: z.number(),
    avatar: z.string(),
    order: z.number().optional().default(99),
  }),
});

export const collections = {
  pages: pagesCollection,
  packages: packagesCollection,
  transport: transportCollection,
  blog: blogCollection,
  categories: categoriesCollection,
  media: mediaCollection,
  homepage: homepageCollection,
  testimonials: testimonialCollection,
  'seo-settings': seoSettingsCollection,
  'packages-en': packagesEnCollection,
  'transport-en': transportEnCollection,
  'blog-en': blogEnCollection,
  'categories-en': categoriesEnCollection,
  'homepage-en': homepageEnCollection,
  'testimonials-en': testimonialEnCollection,
};
