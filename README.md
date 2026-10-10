# Glosarium

A glossary of concepts, ordered by when you actually need them. Built with Astro.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/, plus the Pagefind search index
npm run preview # serve dist/; search only works here, not under `npm run dev`
```

Search is [Pagefind](https://pagefind.app), generated after the Astro build. To test it, use `npm run build && npm run preview`; the box is disabled under `npm run dev`. Concept, topic and domain pages are indexed (`indexed` prop on `Base.astro`, decided by URL); `pagefind.yml` lists what is excluded.

## Adding content

```
content/
  tracks/backend.yaml                 # a learning path and its level names
  <domain>/index.md                   # domain page
  <domain>/<topic>/index.md           # topic page
  <domain>/<topic>/<term-id>.md       # one concept; file name is its id and URL (/t/<term-id>)
```

A term:

```markdown
---
title: Refresh Token
summary: One line, shown in lists.
levels: { backend: mid-level }      # track → level; a term can sit at different levels per track
aliases: []
prereqs: [jwt]                      # term ids to learn first
related: [access-token]
also: [messaging]             # other topic ids this concept is also listed under
---

Explanation in plain Markdown. Link other terms with [text](/t/term-id).

A YouTube URL alone on its own line becomes an embedded video:

https://www.youtube.com/watch?v=VIDEO_ID
```

A term with no body is listed normally; its page shows the summary and "Not written yet".
The build fails on unknown term ids in `prereqs`/`related`, or a level a track doesn't define.
