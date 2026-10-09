---
title: "Throttle"
summary: "Acting at most once per interval, e.g. for scroll handlers."
levels: { frontend: junior }
aliases: ["throttling", "rate limit function calls", "throttle function"]
prereqs: ["debounce", "event-handling"]
related: ["debounce", "event-handling", "intersection-observer", "resize-observer"]
---

Throttling limits how often a function can run: at most once per interval, however often it's triggered. It keeps frequent events (scroll, mouse move, resize) from running expensive code hundreds of times a second.

```js
function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

window.addEventListener("scroll", throttle(updateProgressBar, 100));
```

With a 100 ms throttle, the scroll handler runs at most 10 times a second.

## Throttle vs debounce

| | Throttle | [Debounce](/t/debounce) |
|---|---|---|
| Runs | regularly while events continue | once, after events **stop** |
| Good for | scroll position, drag, resize, game input | search-as-you-type, saving after typing, window resize end |

Throttle says "no more than once per 100 ms". Debounce says "wait until the user pauses for 300 ms".

## Variations

- **Leading edge**: run immediately at the first event, then ignore the rest.
- **Trailing edge**: also run once at the end so the final state isn't missed.
- Libraries (Lodash `throttle`, `debounce`) handle these options and edge cases. Prefer them to hand-written versions.

## Better options sometimes exist

- **`requestAnimationFrame`** for visual updates, which runs once per frame.
- **[IntersectionObserver](/t/intersection-observer)** instead of scroll handlers to detect visibility.
- **[ResizeObserver](/t/resize-observer)** for size changes.
- **CSS** (`position: sticky`, scroll-snap) for many scroll effects.
- **Passive listeners** (`{ passive: true }`) for scroll and touch.

Make the handler itself cheap too: read layout values once, and avoid forcing reflows.
