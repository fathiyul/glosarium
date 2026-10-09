---
title: "Hydration"
summary: "Attaching interactivity to server-rendered HTML."
levels: { frontend: mid-level }
aliases: ["React hydration", "hydrating", "SSR hydration", "rehydration", "server-side rendering hydration"]
prereqs: ["client-side-routing", "dom"]
related: ["hydration-mismatch", "server-components", "islands-architecture", "meta-framework", "concurrent-rendering", "lazy-loading"]
core: [frontend]
---

With **server-side rendering (SSR)**, the server sends **ready-made HTML**, so the user sees content immediately. But that HTML is static: buttons don't do anything yet. **Hydration** is the step where the framework's JavaScript loads in the browser, **attaches event
handlers and state to the existing HTML**, and turns the static page into a live app.

```
1. Server renders HTML     → user sees the page quickly (but it's not interactive)
2. Browser downloads JS
3. Hydration               → framework walks the existing DOM, attaches listeners and state
4. Page is interactive
```

## Why it exists

You get a fast first paint and good SEO from server HTML, and keep the rich interactivity of a client-side app. Frameworks that offer this include Next.js, Nuxt, SvelteKit and Astro with interactive islands
([meta-frameworks](/t/meta-framework)).

## Costs and problems

- **The page looks interactive before it is.** Clicks during the gap are lost or delayed. Large bundles make the gap longer.
- **Double work**: the component code runs on the server *and* again in the browser, and the browser must download all that JavaScript just to reproduce what's already on screen.
- **Hydration mismatches**: if the HTML the server produced differs from what the client renders on its first pass, the framework warns or discards and re-renders. Typical causes are
  `Date.now()`, `Math.random()`, `window` checks, locale/time-zone differences and invalid HTML nesting ([hydration mismatch](/t/hydration-mismatch)).

```tsx
// Mismatch: server and client produce different text
<p>{new Date().toLocaleTimeString()}</p>
```

## Reducing the cost

- **Ship less JavaScript** (code splitting, [lazy loading](/t/lazy-loading)).
- **Hydrate only what needs interactivity**: islands ([islands architecture](/t/islands-architecture)), or components that run only on the server and ship no JavaScript ([server components](/t/server-components)).
- **Hydrate progressively** or on demand (when visible or on interaction).
- **Keep first-render output deterministic**, and put browser-only values in effects.

If a page is mostly static content, it may not need hydration for most of it.
