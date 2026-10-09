---
title: "Layout Thrashing"
summary: "Alternating layout reads and writes, forcing many reflows."
levels: { frontend: senior }
aliases: ["forced synchronous layout", "forced reflow", "layout thrash", "reflow thrashing", "DOM read write interleaving"]
prereqs: ["dom-manipulation", "layout-reflow"]
related: ["layout-reflow", "paint-composite", "main-thread", "long-tasks", "inp", "dom-manipulation"]
core: [frontend]
---

**Layout thrashing** happens when JavaScript **repeatedly alternates between reading layout properties and changing the DOM**, forcing the browser to recalculate the page layout over and over inside a single task. Layout (reflow) is expensive, and normally the browser batches changes and does it once before painting. Interleaved reads and writes defeat that.

## How it happens

Changing styles or the DOM **invalidates** the layout. Reading a layout-dependent property (such as `offsetHeight`, `offsetWidth`, `getBoundingClientRect()`, `scrollTop`, `clientWidth`, `getComputedStyle(...)`) forces the browser to **recalculate layout immediately** to give you an accurate answer. Do that in a loop, and each iteration recalculates:

```js
// Thrashing: write, read, write, read... each read forces a full layout
for (const box of boxes) {
  box.style.width = container.offsetWidth / 2 + "px";   // read (forces layout) then write (invalidates it)
}
```

With hundreds of elements, this can take tens or hundreds of milliseconds and freezes the page ([main thread](/t/main-thread), [long tasks](/t/long-tasks), [INP](/t/inp)).

## The fix: separate reads from writes

**Batch all the reads first, then all the writes:**

```js
const width = container.offsetWidth / 2;               // read once, before changing anything
for (const box of boxes) {
  box.style.width = width + "px";                      // writes only: layout is calculated once afterwards
}
```

When values depend on each element, read them all into an array first, then write:

```js
const heights = boxes.map(b => b.offsetHeight);        // all reads
boxes.forEach((b, i) => { b.style.height = heights[i] + 10 + "px"; });   // all writes
```

## Other ways to avoid it

- **Use `requestAnimationFrame`** to schedule writes together at the right time in the frame.
- **Prefer properties that don't trigger layout**: animate with `transform` and `opacity`, which can be handled by the compositor ([paint and composite](/t/paint-composite)).
- **Toggle classes** instead of setting many inline style properties, to apply changes in one go.
- **Build elements off-DOM** (a document fragment) and insert once.
- **Avoid reading layout in scroll and resize handlers** repeatedly. Cache values, and throttle ([throttle](/t/throttle)).
- **Use observers** (`ResizeObserver`, `IntersectionObserver`) instead of polling layout values ([resize observer](/t/resize-observer), [intersection observer](/t/intersection-observer)).
- **Let frameworks batch updates**, and avoid mixing manual DOM reads and writes inside components.
- Libraries exist that schedule reads and writes in separate phases.

## Finding it

The browser's Performance panel flags **forced reflow** in the call stack (often with a warning) and shows long "Layout" blocks, alternating with script. See [layout and reflow](/t/layout-reflow) for the rendering side. Look for loops where each iteration touches layout.
