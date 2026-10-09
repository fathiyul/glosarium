---
title: "Code Splitting"
summary: "Loading code only for the page or feature being used."
levels: { frontend: mid-level }
aliases: ["bundle splitting", "dynamic import splitting", "route-based splitting", "chunking"]
prereqs: ["bundler", "js-modules"]
related: ["lazy-loading", "bundle-size", "tree-shaking", "bundler", "core-web-vitals", "resource-hints"]
core: [frontend]
---

**Code splitting** breaks your JavaScript bundle into **multiple smaller files (chunks)** that are loaded when needed, rather than shipping the entire app up front. The first page loads faster because the browser downloads only what that page uses.

```js
// Static import: always in the main bundle
import { Chart } from "./Chart";

// Dynamic import: becomes a separate chunk, loaded on demand
const { Chart } = await import("./Chart");
```

```tsx
const AdminPage = React.lazy(() => import("./AdminPage"));      // chunk loaded when first rendered

<Suspense fallback={<Spinner />}>
  <AdminPage />
</Suspense>
```

The [bundler](/t/bundler) sees each dynamic `import()` and emits a separate file.

## Where to split

- **By route (page)**: the most effective and easiest. Users on `/login` don't download the admin dashboard. Most frameworks do this automatically.
- **Heavy features used occasionally**: charts, rich-text editors, PDF viewers, maps, markdown parsers, modal dialogs.
- **Large libraries only needed in some places.**
- **Vendor chunks**: separating rarely changing dependencies so browsers can cache them across deployments ([HTTP caching](/t/http-caching)).

## Why it helps

Less JavaScript to download, parse and run on first load means faster loading and interaction ([bundle size](/t/bundle-size), [Core Web Vitals](/t/core-web-vitals)). Splitting is one of the main tools for keeping a growing app fast.

## Practical advice

- **Measure first.** Use a bundle analyzer to see what's big, and split the heaviest, least-needed pieces.
- **Show a fallback** while a chunk loads, and **handle load failures** (a network error or a stale chunk after a deploy), for example with a retry.
- **Prefetch likely next chunks** when the browser is idle, or on hover, so navigation feels instant ([resource hints](/t/resource-hints)).
- **Don't over-split.** Hundreds of tiny chunks mean many requests and waterfalls. Balance chunk size.
- **Avoid waterfalls**: a chunk that triggers another chunk and then a data fetch in sequence is slow.
- **Combine with [tree shaking](/t/tree-shaking)** to remove unused code within chunks, and [lazy loading](/t/lazy-loading) of images and components.
