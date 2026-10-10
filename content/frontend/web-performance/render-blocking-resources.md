---
title: "Render-Blocking Resources"
summary: "CSS and scripts that delay the first paint."
levels: { frontend: mid-level }
aliases: ["render-blocking resources", "render blocking", "blocking resources"]
prereqs: ["critical-rendering-path", "fcp"]
related: ["critical-css", "resource-hints", "critical-rendering-path"]
---

**Render-blocking resources** — stylesheets, synchronous scripts, blocking fonts — halt first paint until downloaded, parsed and executed. The browser waits because showing unstyled or half-scripted content is worse than waiting briefly — but every blocking byte sits directly on the critical path to first pixels.

```text
<head>: 2 CSS + 3 sync JS + font → paint waits for ALL of it
fixed:   inline critical CSS, defer/async JS, swap fonts → paint early
```

Eliminating the block means: inline what's critical, defer the rest (`async`/`defer` scripts, non-critical CSS loaded asynchronously, `font-display: swap`), and split bundles so the critical path carries minimum weight.

The classic mistakes:

- Synchronous scripts in head. The most common blocker — parser halts for download plus execution. `defer` by default; `async` for independents; head-sync only for the truly critical.
- Stylesheet pileup. Five render-blocking CSS files serialise first paint. Concatenate critical, inline it, async the rest.
- Framework bundles blocking. Megabytes of JS before any paint is structural render-blocking. Code-split routes, SSR the shell, hydrate progressively.
- Third-party tags in head. Synchronous analytics/ads/widgets block on third-party servers' latency. Load third parties async/deferred, always.
- FOIT fonts. Invisible text awaiting fonts is blocking by another name. Swap display, preloaded critical faces.
- Preload abuse. Preloading non-critical files prioritises them *above* actual blockers. Preload only the critical few.
- Assuming "defer everything" is free. Deferred scripts still execute before DOMContentLoaded and compete for the main thread. Defer strategically; split aggressively.

**The audit:** list everything before first paint, justify each byte's blocking status, inline/defer/async the rest. First pixels should wait on almost nothing.
