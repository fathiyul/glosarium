---
title: "Bundle Size"
summary: "How much JavaScript users have to download."
levels: { frontend: junior }
aliases: ["JS bundle size", "JavaScript payload"]
prereqs: ["web-performance"]
related: ["minification", "web-performance", "lighthouse", "client-side-rendering", "skeleton-screen"]
---

A bundle is the JavaScript file (or files) your build produces for the browser. Bundle size is how many bytes of it the user has to download before the app can run. Bigger bundles take longer to download, parse and execute, which is especially slow on older phones and weak connections.

Ways to see it and shrink it:

- **Measure first.** Your bundler's analyzer, or the browser's network panel, shows what's inside the bundle. Check the compressed size, since that's what travels over the network.
- **Check your imports.** Importing a whole library for one function adds all of it:

```js
import _ from "lodash";                  // pulls in the whole library
import debounce from "lodash/debounce";  // pulls in only one function
```

- **Split code by route or feature** so a page loads only the code it needs (code splitting). Use lazy loading for rarely used parts, like a chart on an admin page.
- **Remove what you don't use** and let the build drop unused exports, which is called tree shaking.

The classic mistake is adding a big library for a small task, such as a date picker or a utility function, without checking its size first. Each dependency is cost that every visitor pays. [Minification](/t/minification) helps too, but it can't remove code that's really needed.
