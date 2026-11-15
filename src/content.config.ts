import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Type and date come from the path and filename, so notes need no front matter.
const notes = defineCollection({
  loader: glob({
    pattern: '{daily,weekly}/*.md',
    base: './notes',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
});

// Each key in the YAML file is the repository (owner/name) and becomes the entry id.
const topics = defineCollection({
  loader: file('research/topics.yaml'),
  schema: z.object({
    reason: z.object({ en: z.string().min(1), zh: z.string().min(1) }),
    tags: z.array(z.string()).default([]),
    changelog: z.string().optional(),
  }),
});

export const collections = { notes, topics };
