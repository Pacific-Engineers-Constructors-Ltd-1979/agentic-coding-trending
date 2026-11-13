import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Type and date come from the path and filename, so notes need no front matter.
const notes = defineCollection({
  loader: glob({
    pattern: '{daily,weekly}/*.md',
    base: './notes',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
});

export const collections = { notes };
