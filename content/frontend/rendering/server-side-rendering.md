---
title: "Server-Side Rendering (SSR)"
summary: "The server builds HTML for each request."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["SSR", "server rendering", "server-side rendered HTML", "Next.js SSR"]
prereqs: ["http", "component"]
related: ["csr-vs-ssr-vs-ssg", "hydration", "hydration-mismatch", "meta-framework", "ttfb", "server-components"]
core: [frontend]
---

With **server-side rendering (SSR)**, the server **builds the HTML for each request**: it runs your UI code, fetches the data it needs and sends a complete page. The browser can show real content right away, without waiting for JavaScript to download and run.

```
Browser ──GET /products/7──► Server: runs the component code, queries data, produces HTML
        ◄── <html>… full content …</html>
Browser shows it immediately → downloads JS → hydrates → interactive
```

## Benefits

- **Faster first paint** and a better experience on slow devices and networks.
- **SEO and link previews**: crawlers and social platforms get real content.
- **Fresh data on every request**, and personalization based on cookies or headers.

## Costs

- **Server work for every request**, which needs capacity, and affects response time (TTFB, see [TTFB](/t/ttfb)). A slow data fetch delays the whole page.
- **More complexity**: code runs in two environments, and you need to know which.
- **Hydration** is needed to make the page interactive ([hydration](/t/hydration)), with its own cost and mismatch errors ([hydration mismatch](/t/hydration-mismatch)).
- **Caching is trickier**: personalized pages can't be shared in a CDN without care.

## Pitfalls that bite

- **Browser-only APIs** (`window`, `document`, `localStorage`) don't exist on the server. Code that touches them at render time crashes with "window is not defined". Use them in effects, or guard them.
- **Shared state between requests.** A module-level variable on a server lives across requests, so one user's data can leak into another's page. Keep per-request state per request.
- **Non-deterministic output** (current time, random values) causes server and client HTML to differ.
- **Fetching on the server vs client**: avoid fetching twice. Pass the server-fetched data to the client.
- **Auth and cookies**: forward the user's cookies when the server calls your APIs.
- **Errors and timeouts** during rendering must produce a graceful page, not a blank one.

## Related options

- **Streaming SSR** sends HTML as parts become ready, instead of waiting for the slowest data.
- **Static generation** pre-renders at build time, when content doesn't depend on the request.
- **Server components** and **islands** reduce the JavaScript that needs hydrating.

See [CSR vs SSR vs SSG](/t/csr-vs-ssr-vs-ssg) for choosing, and [meta-frameworks](/t/meta-framework) that implement it.
