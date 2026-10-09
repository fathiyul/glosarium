---
title: "Debounce"
summary: "Waiting until events stop before acting, e.g. for search boxes."
levels: { frontend: junior }
aliases: ["debouncing", "debounce function", "debounced input"]
prereqs: ["closure", "event-handling"]
related: ["throttle", "event-handling", "fetch-api", "use-effect", "microtask-macrotask"]
core: [frontend]
---

**Debouncing** delays running a function until the events that trigger it have *stopped* for a
short while. It stops you doing expensive work on every keystroke.

Think of a search box that calls an API. Without debouncing, typing "kettle" fires six requests. With a 300 ms
debounce, the call waits until the user pauses, so it fires once, with the full word.

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);                       // cancel the pending call
    timer = setTimeout(() => fn(...args), delay);   // schedule a new one
  };
}

const search = debounce((query) => fetchResults(query), 300);
input.addEventListener("input", (e) => search(e.target.value));
```

Each new event cancels the previous timer and starts a fresh one, so only the *last* event in a burst
makes it through. The `timer` variable survives between calls thanks to a [closure](/t/closure).

## Where it helps

- **Search-as-you-type** and autocomplete.
- **Validating or saving** while the user types (auto-save).
- **Window resize** handlers that recalculate layout.

## Debounce vs throttle

| | Runs | Good for |
|---|---|---|
| **Debounce** | Once, after events stop | Search input, auto-save |
| [**Throttle**](/t/throttle) | At most once per interval, *during* the events | Scroll and mouse-move handlers |

## Points to remember

- Pick a delay that feels responsive: roughly 200-500 ms for typing.
- Write the debounced function **once**, not on every render. In React, create it in a `useMemo`, a
  `useRef` or outside the component, and cancel it on unmount.
- Debouncing reduces calls but doesn't handle **out-of-order responses**: an older request can finish
  after a newer one. Cancel the old request (`AbortController`) or ignore stale results.
- Libraries such as Lodash provide `debounce` with options, if you'd rather not write your own.
