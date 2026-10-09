---
title: "Container Query"
summary: "Styling a component by the size of its container instead of the screen."
levels: { frontend: mid-level }
aliases: ["container queries", "@container", "CSS container queries", "container-type"]
prereqs: ["media-query", "flexbox"]
related: ["media-query", "responsive-design", "css-grid", "component", "css-units", "css-layers"]
core: [frontend]
---

A **container query** applies CSS based on the **size of a component's container**, rather than the size of the whole viewport. A card component can lay out differently depending on whether it sits in a wide main column or a narrow
sidebar, with no knowledge of the page around it.

```css
.card-wrapper {
  container-type: inline-size;       /* make this element a query container */
  container-name: card;              /* optional */
}

.card { display: grid; gap: 1rem; }

@container card (min-width: 400px) {
  .card { grid-template-columns: 150px 1fr; }    /* image beside text when there's room */
}
```

Compare to a [media query](/t/media-query), which asks "how wide is the browser window?". The same card in a narrow sidebar on a wide screen would get the *desktop* styles, and look cramped.

## Why they matter

Components (especially in design systems and reusable libraries) are placed in many layouts. With container queries, a component **adapts to where it is**, so it can be reused anywhere without page-specific overrides
([components](/t/component), [responsive design](/t/responsive-design)).

## Details

- You declare a **container** with `container-type`. `inline-size` (width) is the usual choice.
- A container query styles **descendants** of the container, not the container itself.
- **Container units** exist (`cqw`, `cqi`) for sizes relative to the container.
- Query a named container (`@container card (...)`), or the nearest ancestor container if you leave out the name.
- A container with `container-type` is sized independently of its content, so a container whose width depends on its children needs thought.
- They're supported in current major browsers. Check your audience's support, and provide sensible defaults for browsers that lack it.

## When to use which

| Use | For |
|---|---|
| **Media queries** | Page-level layout: columns, navigation, overall breakpoints; user preferences (dark mode, reduced motion) |
| **Container queries** | Component-level adaptation to available space |
| **Intrinsic layouts** (flex-wrap, grid `auto-fill`) | Often enough with neither ([CSS Grid](/t/css-grid)) |

Prefer fluid layouts first, and add container queries where a component needs structurally different arrangements at different sizes.
