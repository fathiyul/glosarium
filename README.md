# Annotated Mind

A glossary of concepts, ordered by when you actually need them. Built with Astro.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

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
---

Explanation in plain Markdown. Link other terms with [text](/t/term-id).

A YouTube URL alone on its own line becomes an embedded video:

https://www.youtube.com/watch?v=VIDEO_ID
```

A term with no body is listed normally; its page shows the summary and "Not written yet".
The build fails on unknown term ids in `prereqs`/`related`, or a level a track doesn't define.
