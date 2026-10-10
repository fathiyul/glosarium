---
title: "webpack"
summary: "The long-dominant, highly configurable JavaScript bundler."
levels: { frontend: mid-level }
aliases: ["webpack", "bundler", "module bundler"]
prereqs: ["commonjs", "npm-scripts"]
related: ["asset-hashing", "babel-swc", "code-splitting"]
---

**webpack** bundles modules (JS, CSS, assets) into deployable files through loaders and plugins: `import` anything, transform it, split it, hash it, emit it. Its power is configurability — code splitting, tree shaking, dev middleware with HMR, and a plugin for every need — at the price of configuration complexity that spawned a thousand boilerplates.

```text
entries → loaders (babel, css, files) → plugins (html, define, split)
→ chunks (hashed, split by route/vendor) → output
```

Vite/esbuild-class tools now win dev-speed contests, but webpack's ecosystem depth (Module Federation, exotic loaders, legacy integration) keeps it entrenched — and its concepts (loaders, chunks, splitting) transfer everywhere.

The classic mistakes:

- No code splitting. One giant bundle makes every page load everything. Split by route, lazy-load heavy features, separate vendor churn from app churn.
- Production running dev config. Unminified, unhashed, sourcemap-heavy dev builds deployed "temporarily" become permanent performance disasters. Separate configs; verify output.
- Loader sprawl. A loader per whim (and per decade) slows builds and risks conflicts. Minimal loaders, modern targets, measured build times.
- Ignoring bundle analysis. Blind bundles grow monotonically. Analyse regularly (`webpack-bundle-analyzer`), budget sizes, fail builds on regressions.
- Caching misconfiguration. Unhashed filenames or missing chunkhashes serve stale code; over-aggressive `[fullhash]` churns caches. Content-hash per chunk, hashed consistently.
- Dev/prod parity gaps. Aliases, defines and env injection differing between modes produce works-here failures. Mirror resolution and defines across modes.
- HMR as testing. Hot reload speeds development but doesn't verify production behaviour. Test production builds, not just dev servers.

**Its place:** deep configurability for complex builds, legacy depth, federation patterns — with splitting, hashing and analysis as non-negotiable hygiene. Concepts first (chunks, loaders, splitting); config second.
