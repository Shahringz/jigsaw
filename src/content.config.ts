import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '{fa,en,ar}/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    relatedWork: z.enum(['cover', 'print', 'motion']).optional(),
  }),
});

export const collections = { blog };
