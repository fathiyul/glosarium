---
title: "Layout / Reflow"
summary: "Computing the position and size of every element."
levels: { frontend: mid-level }
aliases: ["layout", "reflow", "layout thrashing"]
prereqs: ["render-tree", "critical-rendering-path"]
related: ["render-tree", "paint-composite", "critical-rendering-path"]
---

**Layout** (reflow) computes every visible element's geometry — position and size — from styles and content. It's the pipeline's expensive step: deeply interdependent (one element's size shifts siblings and ancestors), so repeating it costs far more than repeating paint. Forced synchronous layout — reading geometry right after mutating styles — is the classic jank source.

```text
mutate style → read offsetHeight → forced reflow (sync!)
repeat per row → layout thrashing: N reflows for N rows
```

The browser batches layout work when left alone; interleaved read/write forces it to flush the queue on every read. A loop touching a hundred rows can trigger a hundred full layouts.

The classic mistakes:

- Layout thrashing. The read-write loop above. Fix: read all, then write all (batch phases), or use `requestAnimationFrame` to schedule mutations.
- Animating layout properties. Animating `width`, `top`, `margin` re-runs layout every frame. Animate `transform` and `opacity` instead — compositor-only, no layout.
- Unnecessary deep reflows. Changing an ancestor's width re-lays-out its whole subtree. Contain the damage: size leaves, not roots; use CSS containment where supported.
- Forced sync layout in frameworks. Render-then-measure-then-patch patterns in effects re-trigger what the framework just computed. Measure in layout effects deliberately, mutate minimally.
- Ignoring the initial layout. A huge DOM lays out slowly on first paint too — not just on updates. DOM size is a layout budget.
- Display:none vs visibility. `display: none` removes from layout entirely (cheap to hide, full reflow to show); `visibility: hidden` keeps geometry (no reflow). Choose by whether the space should persist.

**The discipline:** batch reads before writes, animate compositor properties, keep DOM lean, and contain layout scope. Reflow is necessary — repeated reflow is optional.
