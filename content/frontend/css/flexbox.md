---
title: "Flexbox"
summary: "One-dimensional layout along a row or a column."
levels: { frontend: junior }
aliases: ["CSS Flexbox", "flex layout", "display: flex", "flex container"]
prereqs: ["box-model", "display-property"]
related: ["css-grid", "responsive-design", "positioning", "media-query", "box-model"]
core: [frontend]
---

Flexbox lays items out along **one axis**, as a row or a column, and gives you control over spacing,
alignment and how items grow or shrink. It's the go-to tool for toolbars, button groups, centering and
card rows.

```css
.toolbar {
  display: flex;
  justify-content: space-between;   /* along the main axis */
  align-items: center;              /* across the other axis */
  gap: 12px;
}
```

```html
<div class="toolbar"><h1>Orders</h1><button>New</button></div>
```

Setting `display: flex` on a parent makes its **children** flex items.

## The two axes

- **Main axis**: the direction items flow (`flex-direction: row` by default, or `column`).
- **Cross axis**: perpendicular to it.

`justify-content` positions items along the **main** axis; `align-items` positions them along
the **cross** axis. People mix these up until it clicks. If you switch to `flex-direction: column`, the two swap
roles.

## Properties you'll use most

| On the container | Does |
|---|---|
| `flex-direction` | `row` or `column` |
| `justify-content` | `flex-start`, `center`, `space-between`, `space-around`... |
| `align-items` | `stretch`, `center`, `flex-start`... |
| `flex-wrap` | Allow items to wrap onto new lines |
| `gap` | Space between items |

| On an item | Does |
|---|---|
| `flex: 1` | Grow to share leftover space equally |
| `flex-shrink: 0` | Don't shrink |
| `align-self` | Override alignment for one item |

## Centering something

```css
.parent { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
```

## Tips

- Long text may overflow a flex child. Add `min-width: 0` to the item so it can shrink.
- Flexbox is **one-dimensional**. For rows *and* columns that line up, use [CSS Grid](/t/css-grid).
- Use [DevTools](/t/browser-devtools): many browsers show a flex overlay and let you toggle the properties.
