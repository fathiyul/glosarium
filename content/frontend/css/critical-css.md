---
title: "Critical CSS"
summary: "Inlining just the CSS needed for the first screen."
levels: { frontend: senior }
aliases: ["critical css", "above-the-fold css", "inline critical css"]
prereqs: ["critical-rendering-path", "css"]
related: ["critical-rendering-path", "resource-hints", "web-fonts"]
---

**Critical CSS** is the minimal set styling the visible viewport — inlined in `<head>` so first paint needs no stylesheet round trip, while the full CSS loads asynchronously. It attacks the render-blocking chain directly: bytes already present paint immediately.

```html
<head><style>/* above-the-fold rules only, ~5-15KB */</style>
<link rel="preload" as="style" href="full.css" onload="this.rel='stylesheet'">
```

Extraction (tooling determines used selectors per route), inlining, and async full-CSS loading form the pattern. Done well, first paint drops by a stylesheet round trip or more on slow networks.

The classic mistakes:

- Inlining everything. A 200KB inline `<style>` bloats every HTML response (uncacheable, re-sent per navigation) and delays parsing itself. Critical means *critical* — small.
- Stale critical CSS. Markup evolves; extracted critical CSS doesn't, leaving dead rules inflating HTML and missing new ones flashing unstyled. Regenerate in the build, per route.
- One critical set for all routes. A homepage's critical CSS on a dashboard route is dead weight. Extract per route/template.
- Forgetting the async full CSS. Inlined critical without loading the rest leaves below-fold unstyled on scroll. The full sheet must follow (async, but certain).
- Specificity divergence. Critical inline vs full stylesheet ordering differences restyle elements when the full CSS arrives (flash of *restyled* content). Keep ordering consistent.
- Measuring on localhost. Critical CSS pays on slow networks and distant users; local testing shows nothing. Measure with throttling and field data.
- Manual maintenance. Hand-curated critical CSS rots within sprints. Automate extraction or don't attempt it.

**When to use it:** content pages where first paint dominates experience, with build-automated per-route extraction. App shells with client rendering benefit less — there, the JS, not the CSS, is the critical path.
