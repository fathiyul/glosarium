---
title: "Positioning"
summary: "static, relative, absolute, fixed and sticky."
levels: { frontend: junior }
aliases: ["CSS position", "position: absolute", "position: fixed", "sticky"]
prereqs: ["box-model", "display-property"]
related: ["z-index", "display-property", "flexbox", "css-grid", "box-model"]
---

The `position` property controls how an element is placed relative to the normal flow of the page.

| Value | Behavior |
|---|---|
| `static` (default) | normal flow. `top`, `left` and similar are ignored |
| `relative` | stays in the flow, but can be shifted from its normal spot with `top`/`left`. It also becomes a reference point for absolutely positioned children |
| `absolute` | removed from the flow, and placed relative to the nearest ancestor that isn't `static` |
| `fixed` | removed from the flow, and placed relative to the viewport, staying put when you scroll |
| `sticky` | behaves as `relative` until it reaches a scroll threshold, and then sticks like `fixed` |

```css
.card { position: relative; }
.card .badge {
  position: absolute;      /* positioned within the nearest positioned ancestor: .card */
  top: 8px;
  right: 8px;
}

header { position: sticky; top: 0; }       /* stays at the top while scrolling its container */
.cookie-banner { position: fixed; bottom: 0; left: 0; right: 0; }
```

## The classic pattern

To place a child at a corner of a parent, make the parent `position: relative` and the child `position: absolute` with offsets. If the parent isn't positioned, the child positions against some further ancestor, or the page, which is a common bug.

## Gotchas

- **Absolute and fixed elements take no space** in the layout, so siblings move up and overlap, and parents can collapse.
- **`sticky` needs a `top` (or similar) value**, and fails if an ancestor has `overflow: hidden`, `auto` or `scroll`.
- **Stacking order**: positioned elements can overlap, and `z-index` decides which is on top ([z-index](/t/z-index)).
- **Don't use positioning for whole-page layout.** Use [flexbox](/t/flexbox) and [grid](/t/css-grid). Positioning is for overlays, badges, tooltips, sticky headers and similar.
- **Fixed elements on mobile** can behave oddly with browser toolbars and keyboards.
- Using offsets (`top`, `left`) without a position does nothing.
