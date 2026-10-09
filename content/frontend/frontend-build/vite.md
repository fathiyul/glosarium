---
title: "Vite"
summary: "A fast dev server and bundler for modern frontends."
levels: { frontend: junior }
prereqs: ["dev-server"]
related: ["dev-server", "hot-module-replacement", "bundle-size", "build-artifact"]
---

Vite is a build tool for frontend projects. In development it runs a [dev server](/t/dev-server) that serves your source files directly, so it starts quickly and updates as you edit. For production it bundles the app, and it uses Rollup for that step.

```sh
npm create vite@latest my-app   # scaffold a new project
npm run dev                     # start the dev server
npm run build                   # write the production files to dist/
```

The dev server and the production build behave differently, and that gap is where mistakes come from. Code that works in `npm run dev` can break after `npm run build`, so run the production build before you release.

Vite only exposes environment variables to browser code if they start with `VITE_`. A secret stored in a variable without that prefix won't reach the browser, which is the intended protection. Don't put real secrets in any frontend variable anyway, because anything shipped to the browser can be read.

Vite provides [hot module replacement](/t/hot-module-replacement) out of the box, and the production output is the size you should check with [bundle size](/t/bundle-size) tools.
