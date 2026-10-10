---
title: "Critical Rendering Path"
summary: "The steps from HTML bytes to pixels on screen."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["critical rendering path", "crp", "render path"]
prereqs: ["dom", "cssom"]
related: ["render-tree", "render-blocking-resources", "resource-hints"]
---

The **critical rendering path** is the sequence from HTML and CSS bytes to first pixels: parse HTML into the DOM, parse CSS into the CSSOM, combine them into the render tree, lay out geometry, paint. "Critical" means everything on this path delays what the user sees — and anything **render-blocking** (stylesheets, synchronous scripts, slow fonts) stalls the whole pipeline.

```text
HTML → DOM ─┐
            ├─▶ render tree → layout → paint → composite
CSS → CSSOM ─┘        ▲ blocked by: stylesheets, sync scripts, web fonts
```

Optimising it means shrinking the path: fewer critical bytes (minify, compress, tree-shake), fewer round trips (inline critical CSS, preload key resources), less blocking (async/defer scripts, `font-display: swap`), and shorter chains (no critical resource that itself waits on another).

The classic mistakes:

- Synchronous scripts in `<head>`. Each blocks parsing until downloaded and executed. `defer` (or move to end of body) keeps parsing flowing.
- Uninlined critical CSS. A stylesheet round trip before *any* paint is pure delay. Inline above-the-fold CSS; load the rest async.
- Web fonts blocking text. Invisible text while fonts load (FOIT) is a render block by another name. `font-display: swap` shows text immediately.
- Deep critical chains. A script that loads CSS that loads a font serialises three round trips before paint. Flatten the critical dependency chain.
- Measuring the wrong paint. Optimising full-load while users stare at blank screens misses the point — first paint and first contentful paint are the path's metrics.
- One optimisation, no re-measure. The path shifts as the page changes; removing one blocker reveals the next. Profile iteratively.

**The method:** map the bytes and round trips before first paint, then shorten, parallelise and defer. Every kilobyte and round trip on this path is user-visible latency.
