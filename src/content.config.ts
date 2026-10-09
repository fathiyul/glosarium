import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Content layout:
//   content/<domain>/index.md                 → domain page
//   content/<domain>/<topic>/index.md         → topic page
//   content/<domain>/<topic>/<term>.md        → term page (file name = global term id)
//   content/tracks/<track>.yaml               → a learning path with its own level names
// Domain and topic come from the folder path, so terms don't repeat them in frontmatter.

const base = './content';

const domains = defineCollection({
  loader: glob({ base, pattern: '*/index.md', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(100),
  }),
});

const topics = defineCollection({
  loader: glob({ base, pattern: '*/*/index.md', generateId: ({ entry }) => entry.split('/')[1] }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(100),
  }),
});

const terms = defineCollection({
  loader: glob({
    base,
    pattern: ['*/*/*.md', '!*/*/index.md'],
    generateId: ({ entry }) => entry.split('/')[2].replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    // One line, shown in lists and link previews.
    summary: z.string(),
    // Level per track, e.g. { backend: junior }. Keys and values are checked against content/tracks.
    levels: z.record(z.string(), z.string()),
    // Tracks where this is a must-know at its level. Core terms are listed first; the rest are collapsed.
    core: z.array(z.string()).default([]),
    // Other topics this concept also belongs to. It's listed on those topic pages too; its page stays in one place.
    also: z.array(z.string()).default([]),
    aliases: z.array(z.string()).default([]),
    prereqs: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
  }),
});

const tracks = defineCollection({
  loader: glob({ base: `${base}/tracks`, pattern: '*.yaml' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Ordered from first to learn to last.
    levels: z.array(z.object({ id: z.string(), title: z.string(), summary: z.string() })),
  }),
});

export const collections = { domains, topics, terms, tracks };
