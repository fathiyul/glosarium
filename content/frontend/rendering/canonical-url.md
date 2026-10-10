---
title: "Canonical URL"
summary: "Telling search engines which URL is the original."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["canonical url", "rel canonical", "canonical tag"]
prereqs: ["seo", "history-api"]
related: ["seo", "rendering-strategies", "history-api"]
---

A **canonical URL** (`<link rel="canonical" href="…">`) names the authoritative address when multiple URLs serve the same content: tracking parameters, sorting variants, HTTP/HTTPS or www duplicates, paginated series. Search engines consolidate ranking signals onto the canonical instead of splitting them across duplicates (or penalising perceived duplication).

```html
<!-- on /items?utm_source=x, /items?page=1, http://… -->
<link rel="canonical" href="https://example.com/items">
```

It's a hint strong engines honour reliably — not a redirect (users still see variants) and not access control (it doesn't hide anything). Self-referencing canonicals on normal pages declare "this is the one" defensively.

The classic mistakes:

- No canonicals on parameterised URLs. Every campaign tag and sort order becomes a "duplicate page" splitting authority. Canonicalise parameter variants to the clean URL.
- Canonical pointing at redirects or errors. A canonical to a 404/redirect chain is ignored. Point at the live, final, preferred URL.
- Mixed signals. Canonical saying A while sitemap says B and hreflang says C confuses consolidation. Align all signals on one URL.
- Relative canonical URLs. Relative hrefs resolve unpredictably across variants. Absolute URLs always.
- Canonicalising paginated series to page 1. Distinct pages with distinct content each canonicalise to themselves (with rel prev/next retired, self-canonical per page). Mass-canonicalising hides content from the index.
- HTTP vs HTTPS / www splits. Serve one version (redirect the rest) *and* canonicalise to it. Canonicals complement redirects; they don't replace them.
- Client-rendered canonicals only. Search crawlers may index before JS runs; canonicals must be in server-rendered HTML to count reliably.

**The practice:** one content, one canonical, absolute and live, server-rendered, consistent with redirects and sitemaps. Duplicate URLs are inevitable; divided authority is optional.
