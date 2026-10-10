---
title: "Babel / SWC"
summary: "Tools that transform modern JavaScript and JSX for older targets."
levels: { frontend: mid-level }
aliases: ["babel", "swc", "transpiler"]
prereqs: ["javascript", "browserslist"]
related: ["browserslist", "webpack", "commonjs"]
---

**Babel** and **SWC** transpile modern JavaScript (and TypeScript/JSX) into versions target environments run: arrow functions to function expressions, optional chaining to conditionals, TS types stripped. Babel (JS, plugin ecosystem, slower) pioneered it; SWC (Rust, far faster, broadly compatible) now powers major toolchains.

```text
input (modern JS/TS/JSX) → parse → transform (targets) → output (compatible JS)
targets from browserslist: "last 2 years" → minimal transform; "IE11" → everything
```

Transpiling is driven by targets: modern baselines transform little (mostly TS/JSX stripping); ancient ones rewrite everything. Polyfills (missing APIs like `Promise.any`) are the separate companion — syntax transforms don't add runtime features.

The classic mistakes:

- Transpiling to dead browsers. IE-era targets bloat every bundle with helpers modern engines don't need. Set baselines from real usage (see [Browserslist](/t/browserslist)); revisit yearly.
- Double transpilation. Library pre-transpiled plus app transpiling again (or two tools overlapping) wastes build time and risks conflicts. Transpile once, at the app layer, with `node_modules` excluded except known-shipped-modern exceptions.
- Helpers duplicated per file. Inline helpers in every module bloat output; shared runtime imports (`@babel/runtime`, SWC helpers) deduplicate.
- Confusing syntax with APIs. Transpiled `?.` runs anywhere; `Array.prototype.at` needs a polyfill regardless. Pair transforms with core-js/polyfill strategy for actual API gaps.
- TypeScript without typechecking. Transpilers strip types without checking them — `tsc --noEmit` (or an IDE) still owns correctness. Transpile for output, typecheck separately.
- Loose mode pitfalls. Loose transforms trade spec exactness for size/speed — edge-case semantics differ. Use deliberately, not by default.
- Ignoring the speed lever. Babel on huge codebases slows builds materially; SWC/esbuild-class tools cut it drastically. Build speed is developer experience — measure it.

**How to configure:** targets from usage data, transform once, helpers shared, polyfills by need, types checked separately. Transpilation bridges eras — aim it at the era your users inhabit.
