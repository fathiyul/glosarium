---
title: "Web Performance"
summary: "How fast pages load and respond."
levels: { backend: mid-level, frontend: junior }
aliases: ["Core Web Vitals", "page speed"]
prereqs: ["dom"]
related: ["bundle-size", "lighthouse", "minification", "skeleton-screen", "seo"]
---

Web performance is how quickly a page becomes usable and how responsive it stays afterwards. Users notice when a page takes long to show content, or when a button takes a moment to react to a click.

Three measures from Google's Core Web Vitals are a good starting point:

- **Largest Contentful Paint (LCP):** how long until the main content is visible.
- **Interaction to Next Paint (INP):** how quickly the page responds to clicks and key presses.
- **Cumulative Layout Shift (CLS):** how much the content jumps around while loading.

Common causes of slowness are large JavaScript [bundles](/t/bundle-size), unoptimized images, and too many network requests before anything shows. Measure before you change anything, using [Lighthouse](/t/lighthouse) for a lab check and real-user data where you have it.

On the backend, the first byte matters as much as the bundle. Response time depends on slow database queries, heavy work on the request path, and the distance to the server. [Caching](/t/caching) responses, enabling [compression](/t/compression), and keeping slow work off the request path all help before the browser does anything.

The classic mistake is optimizing what's easy to see instead of what's slow. A developer on a fast laptop and office Wi-Fi may see no problem, while a user on a mid-range phone on a slow network waits many seconds. Test on a slower device or with throttling enabled, and treat performance as a feature you check on every change.
