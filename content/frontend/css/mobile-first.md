---
title: "Mobile-First"
summary: "Designing for small screens first, then enhancing for larger ones."
levels: { frontend: junior }
aliases: ["mobile first design", "mobile-first CSS", "progressive enhancement"]
prereqs: ["media-query", "responsive-design"]
related: ["responsive-design", "media-query", "viewport-meta", "flexbox", "css-grid"]
---

Mobile-first means designing and coding for small screens first, then adding enhancements for larger ones. Instead of building a desktop layout and squeezing it down, you start with the simplest layout and expand.

```css
/* Base styles: phones */
.grid { display: grid; gap: 1rem; }           /* one column */

/* Larger screens add to it */
@media (min-width: 700px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1100px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

The queries use `min-width`: "from this width up". The opposite approach, desktop-first, uses `max-width`, and has to undo styles for phones.

## Why it works

- **Forces priorities.** With little space, you decide what matters most.
- **Simpler CSS.** The base styles are simple, and larger screens add rules, instead of overriding many desktop ones.
- **Better performance** for phones, which get the minimum by default, often on slower networks and CPUs.
- **Matches usage**: a large share of web traffic is on phones.
- **Progressive enhancement**: the core experience works everywhere, and features improve it where supported.

## In practice

- **Add the viewport tag** ([viewport meta](/t/viewport-meta)).
- **Start with a single column**, readable text and tappable controls (large enough targets).
- **Add breakpoints where the content needs them**, not at fixed device widths ([media queries](/t/media-query)).
- **Prefer flexible layouts** (flexbox, grid with `auto-fill`) that need few breakpoints ([flexbox](/t/flexbox), [CSS Grid](/t/css-grid)).
- **Don't hide essential content** on mobile. Reorganize it.
- **Remember touch**: no hover-only interactions, and keep controls reachable.
- **Test on real phones**, and on slow connections.

It isn't about phones only. It's an order of work. The result should be good everywhere ([responsive design](/t/responsive-design)).
