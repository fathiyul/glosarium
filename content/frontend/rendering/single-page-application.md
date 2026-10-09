---
title: "Single-Page Application (SPA)"
summary: "One HTML page whose content changes through JavaScript."
levels: { backend: junior, frontend: junior }
aliases: ["single-page app", "SPA"]
prereqs: ["client-side-rendering"]
related: ["client-side-rendering", "multi-page-application", "client-side-routing", "hydration", "seo"]
---

A single-page application loads one HTML document, then uses JavaScript to change what's on screen as the user moves around. Clicking a link updates the page in place instead of loading a new HTML file, so navigation feels fast and the app can keep state between screens.

```
GET /        -> app shell (HTML + JavaScript)
GET /orders  -> no new HTML; JavaScript renders the orders view
GET /api/orders -> data, in JSON
```

The browser handles the page changes, which is called [client-side routing](/t/client-side-routing). The app usually fetches data from an API and builds the screens in the browser, so SPAs are often paired with [client-side rendering](/t/client-side-rendering).

On the backend, an SPA usually means a separate JSON API. Every request to it needs authentication, and if the frontend runs on a different origin you'll need [CORS](/t/cors) set up correctly. The API's design then matters as much as the screens do.

The classic mistake is choosing an SPA for a site that is mostly reading. Then you pay for the JavaScript download, the first-load wait and extra work for [SEO](/t/seo), and gain little. SPAs suit highly interactive tools like dashboards and editors, where the app keeps a lot of state. For most content sites, a [multi-page app](/t/multi-page-application) is simpler.
