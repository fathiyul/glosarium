---
title: "Cumulative Layout Shift (CLS)"
summary: "How much the page jumps around while it loads."
levels: { frontend: mid-level }
aliases: ["Cumulative Layout Shift", "layout shift", "layout jank", "content jumping"]
prereqs: ["core-web-vitals", "box-model"]
related: ["core-web-vitals", "image-optimization", "web-typography", "lcp", "inp", "skeleton-screen"]
core: [frontend]
---

**Cumulative Layout Shift (CLS)** measures how much visible content **unexpectedly moves** while a page loads or runs. You've felt it: you're about to tap a button, an ad loads above it, everything jumps down, and you tap the wrong thing.

It's one of the [Core Web Vitals](/t/core-web-vitals). Each shift gets a score based on how much of the screen moved and how far, and CLS adds them up. **Good is 0.1 or lower.** Shifts caused directly by a user action (clicking to expand a section) don't count.

## Common causes

- **Images and videos without dimensions.** The browser doesn't know their size until they load, so text below jumps.
- **Ads, embeds and iframes** injected without reserved space.
- **Content inserted above existing content**: banners, cookie notices and "new message" bars pushing everything down.
- **Web fonts** swapping in with different metrics from the fallback, so lines re-wrap ([web fonts](/t/web-fonts)).
- **Late-loading or client-rendered data** replacing a short placeholder with a tall block.
- **Animations** that change layout properties (`top`, `height`, `margin`) instead of transform.

## Fixes

**Reserve space before content arrives:**

```html
<img src="hero.webp" width="1200" height="600" alt="..."> <!-- browser computes the aspect ratio before loading -->
```

```css
.video-embed { aspect-ratio: 16 / 9; }
.ad-slot     { min-height: 250px; }
```

- **Set `width`/`height` (or `aspect-ratio`)** on all media ([image optimization](/t/image-optimization)).
- **Use skeletons** that match the final size, instead of empty space that collapses ([skeleton screens](/t/skeleton-screen)).
- **Insert new content below** what the user is looking at, or in space you've already reserved. Don't push existing content down.
- **Load fonts carefully**: preload critical ones, and use `font-display` with a fallback that has similar size metrics.
- **Animate with `transform` and `opacity`**, which don't trigger layout.

## Finding it

- DevTools' Performance panel marks layout shifts and the elements involved. Lighthouse and the Layout Shift Regions overlay highlight them.
- **Field data** matters. Shifts depend on real network speed, ad responses and cached state, which a fast lab test may hide ([real user monitoring](/t/real-user-monitoring)).

CLS bugs are often found by watching a page load on a throttled connection and noticing what jumps.
