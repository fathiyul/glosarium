---
title: "Largest Contentful Paint (LCP)"
summary: "When the main content becomes visible."
levels: { frontend: mid-level }
aliases: ["Largest Contentful Paint", "LCP metric", "largest paint", "loading performance metric"]
prereqs: ["core-web-vitals"]
related: ["core-web-vitals", "image-optimization", "lazy-loading", "ttfb", "render-blocking-resources", "resource-hints", "fcp"]
core: [frontend]
---

**Largest Contentful Paint (LCP)** is the time from the start of navigation until the **largest visible content element** (usually a hero image, a large heading, or a block of text) has rendered. It approximates "when does the main content look loaded?" and is the loading metric among the
[Core Web Vitals](/t/core-web-vitals). **Good is 2.5 seconds or less**, and poor is above 4 seconds.

## Where the time goes

LCP is the sum of four phases:

1. **Time to first byte**: server and network delay before any HTML arrives ([TTFB](/t/ttfb)).
2. **Resource load delay**: how long until the browser *discovers* the LCP resource (an image referenced late, by CSS or by JavaScript, is found late).
3. **Resource load duration**: downloading it, which depends on its size.
4. **Render delay**: time between the resource arriving and it being painted (blocking CSS and JavaScript, client-side rendering).

Finding which phase is long tells you what to fix.

## Common fixes

- **Make the LCP image load early and be small.** Compress it, use modern formats, size it correctly ([image optimization](/t/image-optimization)).
- **Never lazy-load the LCP image** ([lazy loading](/t/lazy-loading)). Put it in the HTML as a real `<img>` (not a CSS background or a JavaScript-inserted element, so the browser finds it
  immediately), and give it high priority:

```html
<img src="hero.webp" width="1200" height="600" fetchpriority="high" alt="...">
<link rel="preload" as="image" href="hero.webp">     <!-- when it can't be discovered early otherwise -->
```

- **Cut server time**: caching, a CDN, efficient queries, server-side rendering or static generation instead of waiting for client-side rendering to fetch data ([CSR vs SSR vs SSG](/t/csr-vs-ssr-vs-ssg)).
- **Remove render-blocking resources**: inline critical CSS, defer non-critical scripts ([render-blocking resources](/t/render-blocking-resources)).
- **Avoid long redirects** and slow third-party scripts before the main content.
- **Use [resource hints](/t/resource-hints)** (`preconnect`) for critical third-party origins.

## Measuring

Lab tools (Lighthouse, DevTools) name the LCP element, which is often a surprise. Check **field data** too, since real devices and networks differ ([real user monitoring](/t/real-user-monitoring)). The LCP element can differ between phone and desktop layouts.

Related metrics: [FCP](/t/fcp) (first content painted) comes earlier, and LCP is usually the better indicator of when the page *feels* loaded.
