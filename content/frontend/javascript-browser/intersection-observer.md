---
title: "Intersection Observer"
summary: "Detecting when elements enter the viewport, e.g. for lazy loading."
levels: { frontend: mid-level }
aliases: ["intersection observer", "intersectionobserver", "in-view detection"]
prereqs: ["javascript", "performance-budget"]
related: ["responsive-images", "performance-budget", "main-thread"]
---

**Intersection Observer** asynchronously notifies when an element's visibility crosses **thresholds** — entering the viewport, leaving it, or hitting a ratio. No scroll listeners, no per-frame geometry reads, no main-thread polling: the browser watches and calls back.

```js
new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { load(e.target); obs.unobserve(e.target); }
}), {rootMargin: '200px'}).observe(img);
```

Lazy-loading images and iframes, infinite scroll triggers, impression analytics, and scroll-spy navigation all collapse to a few lines — cheaper and more correct than scroll handlers ever were.

The classic mistakes:

- Scroll listeners instead. Per-scroll `getBoundingClientRect` forces layout on every tick — the jank this API was invented to kill. Observe, don't poll.
- No rootMargin preloading. Observing at exact viewport edges loads content visibly late. Preload margins (200–500px) fetch before arrival.
- Forgetting to unobserve. One-shot loads that stay observed fire repeatedly and leak. Unobserve after handling (or guard idempotently).
- Threshold mismatch. A `0.5` threshold on a tall element fires late; `0` with margins suits preloading. Match thresholds to intent.
- Assuming initial state. Elements already in view fire on observe — handle "already visible" (usually: load immediately) rather than waiting for a scroll that never comes.
- Impression fraud naivety. Visibility callbacks inform analytics, but bots and background tabs intersect too. Gate billing-grade impressions on additional signals.
- Old-browser gaps. Ancient browsers lack it; a tiny polyfill (or eager-load fallback) covers the floor without penalising everyone.

**When to use it:** any "when visible" logic — lazy media, infinite lists, animations on entry, viewability. It's the async, off-thread answer to scroll position questions.
