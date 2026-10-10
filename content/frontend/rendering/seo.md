---
title: "SEO"
summary: "Making pages discoverable and well ranked by search engines."
levels: { backend: mid-level, frontend: junior , tech-entrepreneur: pmf }
aliases: ["search engine optimization"]
prereqs: ["semantic-html"]
related: ["sitemap-robots", "client-side-rendering", "server-templates", "static-site-generation", "web-performance"]
---

Search engine optimization (SEO) is the work of making your pages easy for search engines to find, understand and rank. For a frontend developer, most of it comes down to a few basics:

- **Each page has its own URL** that returns real content, not an empty shell.
- **A clear `<title>` and a meta description** that say what the page is about.
- **Real links** (`<a href="/products/42">`), so crawlers can follow your site. A `<div>` with a click handler isn't a link to them.
- **Meaningful HTML**: one `<h1>`, headings in order, and text instead of text inside images.

```html
<head>
  <title>Trail Running Shoes | Example Shop</title>
  <meta name="description" content="Lightweight shoes for trail running, in sizes 6 to 13.">
</head>
```

Rendering matters too. A [client-side rendered](/t/client-side-rendering) page can be indexed, but the content may only appear after the script runs, which can slow things down and make indexing less reliable. Server-rendered or pre-built pages send the content in the first response.

On the backend, SEO depends on what your server returns. A missing page should give a real `404` status, not a `200` with a "not found" message, since that "soft 404" looks like a real page to crawlers. Moved pages need a permanent `301` redirect to the new URL.

The classic mistake is treating SEO as a set of tricks, like stuffing keywords. Search engines reward pages that load quickly, have clear content and link well. Also see [sitemap and robots.txt](/t/sitemap-robots) and [web performance](/t/web-performance).
