---
title: "Lighthouse"
summary: "Google's tool for auditing performance, accessibility and SEO."
levels: { frontend: junior }
prereqs: ["web-performance"]
related: ["web-performance", "bundle-size", "seo", "accessible-forms"]
---

Lighthouse is an open-source tool from Google that loads a page and reports on its quality. It scores several areas, including performance, accessibility, best practices and SEO, and lists specific issues to fix. You can run it from Chrome DevTools, from the command line, or through PageSpeed Insights.

```bash
npx lighthouse https://example.com --view
```

Lighthouse results depend on the device and network it simulates, and on what's running on your machine. Run it a few times and compare, rather than trusting one score. Its performance section reports on measures like the [Core Web Vitals](/t/core-web-vitals), and its suggestions often point to large files, such as oversized [bundles](/t/bundle-size).

The classic mistake is chasing a perfect score. Some audits flag things that don't matter for your users, and fixing them can cost more than it helps. Use the report to find real problems: a slow image, a missing label on a form field, a page with no description for search engines. Then check the result with real users if you can, since a lab test is only a sample.
