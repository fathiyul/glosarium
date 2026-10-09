---
title: "sitemap.xml and robots.txt"
summary: "Telling crawlers what to index and what to skip."
levels: { backend: junior, frontend: junior }
aliases: ["robots.txt", "sitemap.xml"]
prereqs: ["seo"]
related: ["seo", "static-site-generation", "server-templates"]
---

Two small text files at the root of your site guide search engine crawlers. Neither one is a security feature.

**`robots.txt`** says which paths crawlers may visit:

```
# https://example.com/robots.txt
User-agent: *
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml
```

**`sitemap.xml`** lists the URLs you want indexed, so crawlers can find pages that have few links pointing to them:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/products/42</loc></url>
</urlset>
```

The classic mistake is thinking `Disallow` hides a page. It only asks well-behaved crawlers to skip it, and the file itself is public, so listing `/secret-admin/` tells everyone where it is. Protect private pages with authentication. Also, robots.txt blocks crawling, not necessarily indexing, so a blocked page can still appear in results.

On the backend, a sitemap for a database-driven site is usually generated from the same data that builds the pages, so it can't drift from them. Large sites often split the list into several sitemap files, referenced from a sitemap index.

For sites built with a framework, the sitemap is often generated at build time. A sitemap that lists old or broken URLs is a common silent problem, so regenerate it when pages change. See [SEO](/t/seo).
