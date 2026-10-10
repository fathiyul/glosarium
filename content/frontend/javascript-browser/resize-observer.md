---
title: "Resize Observer"
summary: "Reacting to an element changing size."
levels: { frontend: mid-level }
aliases: ["resize observer", "resizeobserver", "element resize"]
prereqs: ["javascript", "layout-reflow"]
related: ["layout-reflow", "responsive-design", "javascript"]
---

**Resize Observer** calls back when an observed element's size changes — container queries' JavaScript cousin, and the end of window-resize guesswork. Components adapt to their *actual allocated space* (not the viewport): charts redraw, virtual lists re-layout, text truncates by measured fit.

```js
new ResizeObserver(es => es.forEach(e => chart.resize(e.contentRect)))
  .observe(container);
```

Unlike window resize events, it fires for any cause (layout shifts, sidebar toggles, font loads, container queries) and reports precise content boxes — the measurement primitive responsive components needed.

The classic mistakes:

- Resize loops. Changing the observed element's size inside the callback re-triggers the callback — an infinite **loop** the browser eventually reports as an error. Read in the callback; write elsewhere (or guard with conditions).
- Observing too broadly. Watching `body` for component-local needs fires on every layout change anywhere. Observe the smallest relevant element.
- Layout thrash inside callbacks. Measuring then mutating synchronously per callback re-runs layout. Batch reads, schedule writes via `requestAnimationFrame`.
- Forgetting initial delivery. Observers fire once on observe with current sizes — initialise from that instead of duplicating measurement code.
- Unobserved disconnects. Long-lived observers on removed elements leak. Disconnect when components unmount.
- Assuming pixel stability. Sub-pixel sizes, zoom and DPR make exact-equality checks flaky. Compare with tolerance, not `===`.
- CSS-only cases done in JS. Pure container-query styling needs no observer. Reserve Resize Observer for measurements CSS can't express (canvas redraws, virtualisation math).

**How to use it:** observe the container that matters, read sizes, schedule mutations outside the callback, disconnect on teardown. Element-aware components without polling or window-size proxying.
