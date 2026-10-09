---
title: "Client-Side Rendering (CSR)"
summary: "The browser builds the page with JavaScript."
levels: { backend: junior, frontend: junior }
aliases: ["CSR"]
prereqs: ["dom"]
related: ["single-page-application", "server-templates", "static-site-generation", "hydration", "seo"]
---

With client-side rendering, the server sends a mostly empty HTML file plus a JavaScript bundle. The browser runs that JavaScript, which builds the page content, usually by creating the HTML elements in the [DOM](/t/dom) and filling in the data.

```html
<!-- What the server sends -->
<body>
  <div id="root"></div>
  <script src="/app.js"></script>
</body>
```

Until `app.js` has downloaded, parsed and run, the user sees a blank or nearly blank page. Most of the wait is in JavaScript, so a large bundle makes it longer (see [bundle size](/t/bundle-size)).

After that first load, navigation and updates are quick, because the page doesn't need a full reload from the server. This is the trade-off that makes [single-page apps](/t/single-page-application) popular.

On the backend, CSR means the server mostly hands out static files and a JSON API. That's cheap to host, but the API now carries the whole load: if it's slow, the page stays blank for longer, so keep its responses fast.

The classic mistake is assuming the page is fully there because the HTML loaded. If the script fails, or runs slowly on a weak phone, the user sees nothing useful. Search engines and link previews may also see less content than a server-rendered page would give them (see [SEO](/t/seo)). For content-heavy sites, consider rendering on the server or at build time instead.
