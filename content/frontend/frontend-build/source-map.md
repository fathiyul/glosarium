---
title: "Source Map"
summary: "A mapping from built code back to the original source, for debugging."
levels: { backend: junior, frontend: junior }
aliases: ["source maps", "sourcemap", ".map files", "sourceMappingURL"]
prereqs: ["bundler"]
related: ["browser-devtools", "minification", "bundler", "debugger", "babel-swc"]
core: [frontend]
---

Production code is often **minified and bundled**: one line of unreadable JavaScript, with names like `a`, `t`
and `e`. An error at `main.8f3a2.js:1:48213` tells you nothing. A **source map** is a file that maps positions
in the built code back to the original source files, lines and names.

```js
// Built code: main.8f3a2.js
function t(e){return e.items.map(n=>n.price).reduce((a,b)=>a+b,0)}
//# sourceMappingURL=main.8f3a2.js.map
```

The comment at the end points to `main.8f3a2.js.map`. With it, [DevTools](/t/browser-devtools) can show you
`src/cart/total.ts`, line 14, and let you set breakpoints in the original code even though the browser is
running the built version.

## Where it's used

- **Debugging in the browser**, in development and in production.
- **Error-tracking tools** (Sentry and similar): you upload the maps so reported stack traces show original
  files and lines instead of `main.js:1:48213`.
- **TypeScript and other compile-to-JS code**, in the browser and in Node (`node --enable-source-maps`).

## Things to know

- **They contain your original source** (or a way to rebuild it). If you serve `.map` files publicly, anyone can
  read your unminified code. That's often acceptable for open code, but if not, generate "hidden" source maps
  (no reference comment in the bundle) and upload them only to your error tracker, or don't deploy them.
- **They're large.** Browsers download them only when DevTools is open, so they don't slow visitors down.
- **Match the exact build.** A map from a different build gives wrong positions, so the build and the upload should
  come from the same commit. File names with content hashes help ([asset hashing](/t/asset-hashing)).
- If "the line numbers in my error are nonsense", the source map is missing, wrong or not loaded.

Bundlers such as [Vite and webpack](/t/bundler) can generate them with a config switch.
