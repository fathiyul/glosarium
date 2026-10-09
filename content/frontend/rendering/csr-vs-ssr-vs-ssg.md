---
title: "CSR vs SSR vs SSG"
summary: "Choosing a rendering strategy for SEO, speed and complexity."
levels: { backend: senior, frontend: mid-level }
aliases: ["CSR vs SSR", "SSR vs SSG", "rendering strategies", "client-side vs server-side rendering", "static site generation"]
prereqs: ["server-side-rendering", "client-side-routing"]
related: ["server-side-rendering", "hydration", "meta-framework", "core-web-vitals", "islands-architecture", "server-components"]
core: [frontend]
---

Where and when HTML gets produced is a major architecture choice.

| | **CSR** (client-side rendering) | **SSR** (server-side rendering) | **SSG** (static site generation) |
|---|---|---|---|
| HTML created | In the **browser**, by JavaScript | On the **server, per request** | At **build time**, once |
| First response | An empty shell plus JS | Full HTML | Pre-built HTML file |
| First paint | Slower (wait for JS and data) | Fast | Fastest (can be served from a CDN) |
| SEO and link previews | Weaker unless crawlers run JS | Good | Good |
| Server cost | Static hosting | A server rendering on every request | Static hosting |
| Fresh data | Fetched on the client | Fresh per request | Only as fresh as the last build |
| Personalized content | Easy | Possible (careful with caching) | Hard (needs client-side fetch) |
| Complexity | Lowest | Highest (server and client) | Moderate |

```
CSR:  server → <div id="root"></div> + app.js → browser runs JS → fetch data → render
SSR:  server runs the app per request → full HTML → browser shows it → hydrate
SSG:  build runs the app → static .html files → CDN serves them → (optional hydration)
```

## Choosing

- **Mostly static content** (docs, blog, marketing pages): **SSG**. Fast, cheap, easy to cache.
- **Public pages with frequently changing or personalized data, where SEO and first paint matter** (product pages, news feeds): **SSR**, often with caching.
- **App behind a login**, such as dashboards and internal tools, where SEO is irrelevant: **CSR** is often fine, and simpler.
- **Most real sites mix them per route**, which is what [meta-frameworks](/t/meta-framework) enable: static marketing pages, server-rendered product pages, client-rendered account area.

## Variants worth knowing

- **Incremental/on-demand regeneration**: static pages rebuilt in the background after a time or on a trigger, giving SSG speed with fresher data (the names and details depend on the framework).
- **Streaming SSR**: send HTML in chunks as parts become ready.
- **Islands and server components**: ship less JavaScript by hydrating only interactive parts ([islands](/t/islands-architecture), [server components](/t/server-components)).

## What to measure

Load speed and stability: [Core Web Vitals](/t/core-web-vitals). SSR improves first paint, but hydration can delay interactivity, so look at both. Don't choose by fashion. Choose by the page: who's visiting, how fresh must the data be, and does a search engine need to see it.
