---
title: "Lazy Loading"
summary: "Deferring images and code until they're needed."
levels: { frontend: junior }
aliases: ["lazy load", "lazy loading images", "code splitting lazy", "deferred loading"]
prereqs: ["image-optimization"]
related: ["code-splitting", "intersection-observer", "image-optimization", "bundle-size", "suspense", "lcp"]
core: [frontend]
---

**Lazy loading** means not loading something until it's actually needed, so the first view of the page is
faster. It applies to images and iframes, and to chunks of JavaScript.

## Images and iframes

Browsers do it with one attribute:

```html
<img src="photo.webp" width="800" height="600" alt="..." loading="lazy">
<iframe src="https://example.com/embed" loading="lazy"></iframe>
```

The browser fetches them only when they're close to scrolling into view.

## Code

Load a heavy part of the app only when the user goes there, with a dynamic `import()`:

```jsx
const Chart = React.lazy(() => import("./Chart"));

<Suspense fallback={<Spinner />}>
  <Chart data={data} />
</Suspense>
```

Bundlers turn each dynamic import into a separate file. This is a common form of
[code splitting](/t/code-splitting), and helps [bundle size](/t/bundle-size). Typical candidates: routes,
modals, charts, rich-text editors.

For custom cases (infinite scroll, loading a section when visible), the
[Intersection Observer](/t/intersection-observer) tells you when an element enters the viewport.

## Don't lazy-load everything

- **Never lazy-load the main image or content visible at the start** (above the fold). It delays your
  [Largest Contentful Paint](/t/lcp), the opposite of what you want.
- **Reserve space** with width/height or aspect ratio, so content doesn't jump as things load
  ([layout shift](/t/cls)).
- **Provide a good fallback** (skeleton or placeholder) while a lazy chunk loads, and handle load failure,
  since a network error will break it.
- **Don't split too finely.** Many tiny files mean many requests, and users can wait a moment at each
  navigation. Prefetching likely next routes helps.
- Content that only appears after JavaScript runs may not be seen by crawlers that don't run it.

The principle: spend the user's bandwidth and time on what they need first, and defer the rest.
