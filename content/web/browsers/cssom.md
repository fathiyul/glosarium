---
title: "CSSOM"
summary: "The browser's tree of parsed styles."
levels: { frontend: mid-level }
aliases: ["cssom", "css object model", "stylesheet api"]
prereqs: ["dom", "critical-rendering-path"]
related: ["dom", "render-tree", "critical-rendering-path"]
---

The **CSSOM** (CSS Object Model) is the browser's live representation of all CSS: stylesheets, rules, and the computed styles resulting from the cascade. JavaScript reads it (`getComputedStyle`) and mutates it (inserting rules, toggling classes, setting custom properties) — making it the styling counterpart to the DOM.

```text
CSS files → CSSOM (rules + cascade) ─┐
HTML      → DOM                        ├─▶ render tree → layout → paint
```

Two facts dominate its performance story: stylesheets are *render-blocking* (the browser waits for CSS before first paint, to avoid flashing unstyled content), and reading computed style forces the browser to resolve styles synchronously — interleaved with writes, that's layout thrash.

The classic mistakes:

- Render-blocking CSS piles. Every stylesheet delays first paint until loaded and parsed. Keep critical CSS inline and small; defer the rest.
- Read-write interleaving. Alternating `getComputedStyle` reads with style writes forces repeated synchronous style recalculation. Batch reads, then batch writes.
- Inline styles at scale. `element.style` per node defeats the cascade, bloats the DOM and can't be cached or overridden cleanly. Toggle classes; vary via custom properties.
- Huge stylesheets. Megabytes of CSS parse slowly and match slowly against every element. Ship only what's used (tree-shake, split by route).
- Mutating rules instead of classes. Rewriting stylesheet rules from JS is powerful and usually the wrong tool — classes and custom properties express state better.
- Forgetting computed vs specified. `getComputedStyle` returns resolved values (pixels, not `2em`) — correct for measurement, misleading for logic about authored intent.

**How to treat it:** the CSSOM is a render-critical data structure — keep stylesheets lean and non-blocking, mutate through classes and custom properties, and never interleave measurement with mutation in hot paths.
