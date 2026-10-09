---
title: "display"
summary: "block, inline, inline-block, flex, grid and none."
levels: { frontend: junior }
aliases: ["CSS display", "display: none", "display: block", "inline-block"]
prereqs: ["css", "html-element"]
related: ["flexbox", "css-grid", "box-model", "positioning", "html-element"]
---

The `display` property decides how an element takes part in layout: whether it starts a new line, whether it can have a width and height, and how its children are arranged.

| Value | Behavior |
|---|---|
| `block` | starts on a new line, fills the available width; width and height apply (`div`, `p`, `h1`) |
| `inline` | flows within a line of text; width and height are ignored (`span`, `a`) |
| `inline-block` | flows inline like text, but accepts width, height and vertical margins |
| `flex` | a [flexbox](/t/flexbox) container, arranging children in a row or column |
| `grid` | a [grid](/t/css-grid) container, with rows and columns |
| `none` | removed from the page entirely: no space, and not shown or read by screen readers |
| `contents` | the element's box disappears, and its children act as children of the parent |

```css
a.button { display: inline-block; padding: 0.5rem 1rem; }   /* now padding and width behave */
.row { display: flex; gap: 1rem; }
.hidden { display: none; }
```

## Common confusions

- **Width on a `span` does nothing**, because it's inline. Make it `inline-block` or `block`.
- **Vertical margin on inline elements** has no effect.
- **A gap under an inline image**: images are inline, so they sit on the text baseline. Use `display: block` on the image.
- **Hiding**: `display: none` removes the element from layout. `visibility: hidden` hides it but keeps its space. `opacity: 0` keeps it fully present (still clickable). For accessibility, `display: none` also hides it from screen readers.
- **Changing `display`** changes the children's layout too: setting `display: flex` on the parent makes its children flex items.
- **Animation**: you can't smoothly animate to and from `display: none`. Use other properties, or newer techniques.

Elements have a default value from the browser (`div` is block, `span` is inline), which you can override. When a layout surprises you, check the `display` value in [DevTools](/t/browser-devtools).
