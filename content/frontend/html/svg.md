---
title: "SVG"
summary: "Vector graphics described in markup."
levels: { frontend: junior }
aliases: ["Scalable Vector Graphics", "vector graphics", "SVG icons"]
prereqs: ["html-element"]
related: ["image-optimization", "html-element", "css", "accessibility", "canvas"]
---

SVG (Scalable Vector Graphics) describes images with markup: shapes, paths and text, instead of pixels. Because they're math rather than pixels, they stay sharp at any size.

```html
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="steelblue" />
  <rect x="35" y="35" width="30" height="30" fill="white" />
  <path d="M20 80 L50 60 L80 80" stroke="black" fill="none" />
</svg>
```

## Why use it

- **Crisp on every screen**, including high-density displays.
- **Small files** for simple graphics (icons, logos, illustrations, charts).
- **Styleable and scriptable**: you can change colors with CSS (`fill: currentColor`) and animate parts with CSS or JavaScript.
- **Accessible**: text inside is real text.

## Using SVG in a page

```html
<img src="logo.svg" alt="Acme Hardware">      <!-- like any image; cached; not styleable from outside -->
<svg ...>...</svg>                            <!-- inline: can be styled and scripted; no extra request -->
```

```css
.icon { width: 1.25rem; height: 1.25rem; fill: currentColor; }   /* the icon takes the text color */
```

The `viewBox` defines the internal coordinate system, and lets the graphic scale to whatever size CSS gives it.

## When not to

- **Photographs**: use JPEG, WebP or AVIF. A photo as SVG is huge ([image optimization](/t/image-optimization)).
- **Very complex drawings** with thousands of paths, which are slow to render.
- For pixel-level, many-object drawing, [canvas](/t/canvas) may be better.

## Practical tips

- **Optimize files** (tools like SVGO remove editor junk) to cut size.
- **Add accessible names**: `alt` on `<img>`, or `<title>` and `role="img"` with `aria-label` on inline SVG. Decorative icons get `aria-hidden="true"` ([accessible names](/t/accessible-name)).
- **Never inline or accept untrusted SVG** without sanitizing: it can contain scripts ([XSS](/t/xss)).
- **Sprite sheets and icon libraries** manage many icons.
- Set explicit width and height (or `aspect-ratio`) to prevent layout shift ([CLS](/t/cls)).
