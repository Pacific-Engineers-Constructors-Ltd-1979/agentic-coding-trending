# Build the site with Astro from the notes in place, and track repositories as Topics

The site is a static Astro project at the repository root, deployed to GitHub Pages with GitHub Actions. Notes stay as plain Markdown in `notes/`, loaded by a content collection whose type and date come from the path and filename (no front matter), so they stay readable on GitHub and keep their relative links. Version one tracks GitHub repositories as Topics, listed in `research/topics.yaml`, with Signals coming only from each Topic's releases and changelog. We chose Astro over a React single-page app because the content is static documents with no client-side interactivity, and Astro ships no JavaScript by default.

## Considered Options

- **React with Vite and a hash router**: rejected because deep links become `/#/...`, readers get a JavaScript bundle for static text, and every Note would need a client-side loader.
- **Moving the notes into `src/content/`**: rejected because it breaks relative links between Notes on GitHub and splits authoring from browsing.
- **A separate source registry**: dropped for version one because every Source is a Topic's Releases page or changelog, so a registry would duplicate the watchlist. Add it when the first non-repository Source (a blog, docs page, or announcement) is needed.

## Consequences

- Relative `.md` links between Notes do not work on the site, so a remark plugin rewrites them and fails the build when a target is missing.
- Note type and date are fixed by folder and filename; renaming a file changes its URL.
- A Note's English half and Traditional Chinese half stay in one file, so each page links between the two halves instead of using a language toggle.
- List pages show a Summary excerpt taken from the first paragraph under `## Summary` (Daily) or `## Week in review` (Weekly) in the English half, so authors must keep that paragraph first.
- Search, RSS, a sitemap, a language toggle, scheduled automation, and a sidebar are deferred past version one.
