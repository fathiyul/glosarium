---
title: "Box Model"
summary: "Content, padding, border and margin around every element."
levels: { frontend: junior }
aliases: ["CSS box model", "box model", "content box", "padding border margin"]
prereqs: ["html-element"]
related: ["box-sizing", "display-property", "flexbox", "css-units", "positioning"]
core: [frontend]
---

Every element on a page is a rectangular box made of four layers, from the inside out:

```
┌───────────── margin ──────────────┐
│  ┌──────────── border ─────────┐  │
│  │  ┌──────── padding ───────┐ │  │
│  │  │                        │ │  │
│  │  │        content         │ │  │
│  │  │                        │ │  │
│  │  └────────────────────────┘ │  │
│  └─────────────────────────────┘  │
└───────────────────────────────────┘
```

| Layer | Purpose |
|---|---|
| **Content** | The text, image or children |
| **Padding** | Space *inside* the border, around the content (shows the background) |
| **Border** | The line around the padding |
| **Margin** | Space *outside* the border, pushing neighbors away (always transparent) |

```css
.card {
  width: 300px;
  padding: 16px;
  border: 1px solid #ccc;
  margin: 24px;
}
```

## The gotcha: how `width` is counted

By default (`box-sizing: content-box`), `width` only sets the **content** width, so padding and border
are *added*. That card above is actually `300 + 16×2 + 1×2 = 334px` wide, which is why layouts overflow
and "don't add up".

Most projects fix this once for everything:

```css
*, *::before, *::after { box-sizing: border-box; }
```

With `border-box`, `width: 300px` includes padding and border, so the box stays 300px
([box-sizing](/t/box-sizing)).

## Other things to know

- **Vertical margins of adjacent blocks can collapse**: two stacked elements with 20px and 30px margins
  get 30px between them, not 50px.
- Margin on `inline` elements doesn't affect vertical spacing. See the [display property](/t/display-property).
- Use margin to space elements *apart*, padding to space content *inside*.
- Use the layout view in [DevTools](/t/browser-devtools): hover an element to see its margin, border
  and padding in colors. It's the quickest way to see where space comes from.
