---
title: "box-sizing"
summary: "Whether an element's width includes its padding and border."
levels: { frontend: junior }
aliases: ["border-box", "content-box", "box-sizing: border-box"]
prereqs: ["box-model"]
related: ["box-model", "css-units", "flexbox", "css-reset", "css-grid"]
---

`box-sizing` controls what an element's `width` and `height` include.

- **`content-box`** (the default): `width` is only the content. Padding and border are added on top.
- **`border-box`**: `width` includes the content, padding and border. What you set is the final size.

```css
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
}
/* content-box: total width = 300 + 20*2 + 2*2 = 344px */
/* border-box:  total width = 300px */
```

With `content-box`, a box set to 100% wide plus padding overflows its parent, which is a common source of layout bugs and sideways scrollbars.

## The standard fix

Most projects start with this reset, so sizes mean what you expect:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

Now `width: 50%` with padding still fits in half the row, and arithmetic stays simple.

## Things to know

- **`border-box` doesn't include margin.** Margin is always outside the box ([box model](/t/box-model)).
- **`min-width`, `max-width` and `height`** follow the same rule.
- **Third-party widgets** may assume `content-box`. Set it on their container if something looks off.
- **Inheritance trick**: some teams set `html { box-sizing: border-box }` and `*, *::before, *::after { box-sizing: inherit }`, so components can opt out.
- Form controls usually default to `border-box` already, so mixing them with `content-box` elements gives uneven sizes.
- If a box is "a few pixels too wide", check this first, then check the margin and padding. [DevTools](/t/browser-devtools) show the box breakdown.

It's a core part of most [CSS resets](/t/css-reset).
