---
title: "Media Query"
summary: "Applying styles based on screen size or user preferences."
levels: { frontend: junior }
aliases: ["media queries", "@media", "CSS media query", "breakpoints"]
prereqs: ["css-units", "box-model"]
related: ["responsive-design", "mobile-first", "css-variables", "dark-mode", "container-query"]
core: [frontend]
---

A **media query** applies CSS rules only when a condition is true, usually about the screen or the user's
preferences. They are the basic tool of [responsive design](/t/responsive-design).

```css
.sidebar { display: none; }

@media (min-width: 768px) {
  .sidebar { display: block; }       /* only on screens at least 768px wide */
}
```

## Common conditions

| Query | Meaning |
|---|---|
| `(min-width: 768px)` | Viewport at least that wide |
| `(max-width: 600px)` | Viewport at most that wide |
| `(prefers-color-scheme: dark)` | The user's system is set to dark mode ([dark mode](/t/dark-mode)) |
| `(prefers-reduced-motion: reduce)` | The user asked for less animation |
| `(orientation: landscape)` | Wider than tall |
| `print` | When printing |

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

## Mobile-first

Write the base styles for small screens, then add `min-width` queries for bigger ones
([mobile-first](/t/mobile-first)). The code stays simpler, and phones don't need to undo desktop styles.

```css
.grid { display: grid; gap: 1rem; }                       /* one column */
@media (min-width: 700px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .grid { grid-template-columns: repeat(3, 1fr); } }
```

## Tips

- Pages need `<meta name="viewport" content="width=device-width, initial-scale=1">` for these queries
  to behave on phones ([viewport meta](/t/viewport-meta)).
- **Choose breakpoints where your content breaks**, not at specific device sizes. Devices vary
  too much.
- Prefer flexible layouts ([flexbox](/t/flexbox), [grid](/t/css-grid) with `auto-fill`) so you
  need fewer queries.
- Media queries respond to the *viewport*. For components that should respond to their *container*,
  see [container queries](/t/container-query).
- Use relative units ([`em` or `rem`](/t/css-units)) in queries if you want them to follow the user's font size.
