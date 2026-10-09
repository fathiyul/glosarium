---
title: "Image Optimization"
summary: "The right size, modern formats like WebP and AVIF, and compression."
levels: { frontend: junior }
aliases: ["optimizing images", "image compression", "WebP", "AVIF", "responsive images optimization"]
prereqs: ["html-element"]
related: ["lazy-loading", "responsive-images", "lcp", "cls", "web-performance", "cdn"]
core: [frontend]
---

Images are often the heaviest part of a page, so optimizing them is one of the cheapest ways to make a site
faster.

## What to do

**1. Serve the right size.** A 4000px photo shown in a 400px slot wastes bandwidth. Resize to the largest size
the layout needs (about 2× for high-density screens), and use `srcset` so smaller screens get smaller
files ([responsive images](/t/responsive-images)).

**2. Use modern formats.**

| Format | Best for |
|---|---|
| **AVIF**, **WebP** | Photos and graphics: much smaller than JPEG/PNG at similar quality, widely supported in current browsers |
| **JPEG** | Photos, as a fallback |
| **PNG** | Images needing lossless quality or transparency, when WebP isn't an option |
| **SVG** | Icons, logos, simple illustrations: tiny and scale perfectly |

Use `<picture>` to offer a modern format with a fallback.

**3. Compress.** Quality 75-85 is often visually indistinguishable at a fraction of the size. Build tools,
image CDNs and frameworks can do this automatically.

**4. Reserve space.** Always set `width` and `height` (or CSS `aspect-ratio`), so the page doesn't jump when the
image loads ([layout shift](/t/cls)).

```html
<img src="/img/kettle-800.webp"
     srcset="/img/kettle-400.webp 400w, /img/kettle-800.webp 800w"
     sizes="(min-width: 600px) 400px, 100vw"
     width="800" height="600" alt="A steel kettle" loading="lazy">
```

**5. Load lazily, but not everything.** Images below the fold get `loading="lazy"`
([lazy loading](/t/lazy-loading)). The main image at the top of the page ("hero") should load eagerly, because
delaying it hurts [LCP](/t/lcp).

**6. Cache and use a CDN** so repeat visits and distant users load fast.

## Checking

Lighthouse and the [network tab](/t/network-tab) show image sizes and flag oversized ones. Avoid GIFs for
animation: video formats are far smaller. Always include meaningful `alt` text (and `alt=""` for decoration).
