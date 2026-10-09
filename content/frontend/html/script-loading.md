---
title: "async and defer"
summary: "Loading scripts without blocking page rendering."
levels: { frontend: junior }
aliases: ["async defer", "script async", "script defer", "defer vs async"]
prereqs: ["html", "javascript"]
related: ["critical-rendering-path", "render-blocking-resources", "js-modules", "core-web-vitals", "dom"]
---

By default, a `<script>` tag blocks the browser: it stops parsing the HTML, downloads the script, runs it, and only then continues. Slow scripts delay the page. The `async` and `defer` attributes avoid that.

```html
<script src="app.js"></script>              <!-- blocks parsing while it downloads and runs -->
<script src="app.js" defer></script>        <!-- downloads in parallel, runs after parsing, in order -->
<script src="stats.js" async></script>      <!-- downloads in parallel, runs as soon as ready, any order -->
<script type="module" src="app.js"></script><!-- modules are deferred by default -->
```

| | Download | Runs | Order kept | Waits for DOM |
|---|---|---|---|---|
| (none) | blocks the parser | immediately | yes | no |
| `defer` | in parallel | after the HTML is parsed | **yes** | yes |
| `async` | in parallel | as soon as downloaded | **no** | no |

## Which to use

- **`defer`** for your own app scripts. They can safely use the DOM, and run in the right order. This is the usual default.
- **`async`** for independent scripts that don't rely on others or the DOM, such as analytics.
- **Neither**, only for the rare script that must run immediately and block (some critical inline code).

## Gotchas

- **`async` order is unpredictable.** If script B needs script A, don't make both async.
- **Inline scripts** can't use `defer` or `async`. Only external ones with `src`.
- **Putting scripts at the end of `<body>`** was the old workaround. `defer` in the head is better, because downloading starts earlier.
- **`DOMContentLoaded`** fires after deferred scripts run. Accessing an element too early gives `null`.
- **Third-party scripts** can still slow things (and run on the main thread), so audit them ([render-blocking resources](/t/render-blocking-resources), [Core Web Vitals](/t/core-web-vitals)).

See [the critical rendering path](/t/critical-rendering-path) for why blocking matters.
