import { defineConfig } from 'astro/config';
import remarkNoteLinks from './src/plugins/remark-note-links.mjs';

const base = '/agentic-coding-trending';

export default defineConfig({
  site: 'https://pacific-engineers-constructors-ltd-1979.github.io',
  base,
  markdown: { remarkPlugins: [[remarkNoteLinks, { base }]] },
});
