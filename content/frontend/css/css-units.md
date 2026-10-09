---
title: "CSS Units"
summary: "px, rem, em, %, vw and vh, and when to use each."
levels: { frontend: junior }
aliases: ["CSS length units", "px rem em", "rem vs em", "viewport units"]
prereqs: ["box-model"]
related: ["responsive-design", "media-query", "web-typography", "box-model", "css-variables"]
core: [frontend]
---

CSS lengths come in absolute and relative units. Choosing the right one makes pages scale properly
across screens and respect users' settings.

| Unit | Relative to | Good for |
|---|---|---|
| `px` | Fixed CSS pixel | Borders, shadows, small precise details |
| `rem` | Root element's font size (usually 16px by default) | Font sizes, spacing, most layout |
| `em` | The element's own font size (for `font-size`, its parent's) | Spacing that should scale with the text, such as button padding |
| `%` | The parent's size (what it refers to depends on the property) | Fluid widths |
| `vw` / `vh` | 1% of the viewport's width / height | Full-screen sections, fluid type |
| `ch` | The width of the "0" character | Readable line length (`max-width: 65ch`) |
| `fr` | A share of free space in a grid | [CSS Grid](/t/css-grid) tracks |

```css
html { font-size: 100%; }              /* respect the user's browser setting */
h1   { font-size: 2rem; }              /* 32px by default, scales if the user changes it */
.card { padding: 1rem; max-width: 40rem; }
.hero { min-height: 100vh; }
```

## Why `rem` over `px` for text

If someone sets a larger default font size in their browser (for accessibility), sizes in `rem`
grow with it. Sizes in `px` don't. So use `rem` for text and for spacing that relates to text.

## `em` compounds

Because `em` is relative to the element's font size, nested elements can multiply:
inside a parent that is `1.2em`, another `1.2em` gives 1.44 times the base. `rem` doesn't have this
problem, since it always points at the root.

## Mobile `vh` caveat

On phones, `100vh` can be taller than what's visible while the browser's address bar is showing.
Newer units like `dvh` (dynamic viewport height) address this. Check browser support for your
audience.

Unitless values exist too: `line-height: 1.5` means 1.5 times the font size and scales
well. Prefer relative units for sizes, and keep `px` for things that shouldn't scale.
