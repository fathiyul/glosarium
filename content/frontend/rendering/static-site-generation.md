---
title: "Static Site Generation (SSG)"
summary: "Building HTML once, at build time."
levels: { backend: junior, frontend: junior }
aliases: ["static generation", "SSG"]
prereqs: ["client-side-rendering", "server-templates"]
related: ["server-templates", "client-side-rendering", "hydration", "sitemap-robots", "seo"]
---

Static site generation builds every page to an HTML file ahead of time, during the build step. The finished files are uploaded to a server or a CDN, and each visitor gets a ready-made page with no work done on request.

```bash
npm run build   # writes dist/index.html, dist/about.html, dist/products/42.html, ...
```

Because the pages already exist, they load quickly, are cheap to host, and are easy for search engines to read. Documentation sites, blogs and marketing pages often fit well. Frameworks such as Astro, Next.js and Hugo can generate static sites, and many also support [hydration](/t/hydration) to add interactivity afterwards.

The trade-off is freshness. A page shows what existed at build time, so changes need a rebuild, and per-user content such as a shopping cart can't be fully pre-built.

On the backend, the work moves to the build step and the hosting. If you still have a live API, it's the only dynamic part. You then need a way to refresh the site, such as a scheduled rebuild or a [webhook](/t/webhooks) that triggers one when content changes.

The classic mistake is building a static site for data that changes every minute, then wondering why it's out of date. Rebuild on a schedule or when content changes, or render the changing parts in the browser. The [sitemap](/t/sitemap-robots) is often generated in the same build step.
