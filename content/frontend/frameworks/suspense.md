---
title: "Suspense"
summary: "Declaratively showing fallbacks while data or code loads."
levels: { frontend: senior }
aliases: ["suspense", "react suspense", "suspense boundary"]
prereqs: ["concurrent-rendering", "rendering-strategies"]
related: ["concurrent-rendering", "error-boundary", "hydration"]
---

**Suspense** lets components *declare* async dependencies (data, code, assets) and **boundaries** specify fallbacks while they resolve: the framework suspends the subtree, shows the nearest fallback, and swaps in content when ready — coordinating parallel loads and avoiding waterfall spinners.

```jsx
<Suspense fallback={<Skeleton/>}><Profile/><Feed/></Suspense>
```

It composes: nested boundaries stream independently (fast sections appear while slow ones pend), pairs with transitions (don't flash fallbacks for quick loads), and pairs with error boundaries (failure is the sibling state of pending).

The classic mistakes:

- Fallback flash. Showing skeletons for 80ms loads feels worse than waiting. Delay fallbacks slightly or pair with transitions that avoid flashing.
- Waterfall composition. Sequential suspense (parent resolves → child starts → suspends) serialises loads. Hoist dependencies to load in parallel; stream with nested boundaries.
- No error boundary alongside. Suspended work can reject; without an error boundary the whole tree crashes. Every suspense tree needs its failure state designed.
- Cascading skeletons. Uncoordinated boundaries flashing across the page read as broken. Design loading states hierarchically (page shell → sections → items).
- Cache-less fetching. Suspending on uncached fetches refires per mount. Pair suspense with a cache (request dedupe, data layer) so resolves persist.
- SSR mismatch. Server-resolved content vs client-suspended fallbacks must agree on first render or hydration mismatches. Coordinate server data with client expectations.
- Using it for everything async. Event handlers and mutations aren't render dependencies — suspense serves *render-blocking* async, not all async.

**How to use it:** boundaries at content seams, cached async sources, transitions against flashing, error boundaries beside. Loading as a designed state, not an accident of timing.
