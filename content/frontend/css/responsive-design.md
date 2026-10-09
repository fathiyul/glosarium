---
title: "Responsive Design"
summary: "Layouts that adapt to any screen size."
levels: { frontend: junior }
aliases: ["responsive web design", "RWD", "responsive layout", "mobile responsive"]
prereqs: ["media-query", "flexbox"]
related: ["mobile-first", "css-grid", "viewport-meta", "responsive-images", "container-query", "css-units"]
core: [frontend]
---

**Responsive design** means one website that adapts to any screen size, from a phone to a wide
monitor, instead of separate "mobile" and "desktop" sites.

It rests on three ideas:

1. **A viewport declaration** so phones use their real width:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

2. **Flexible layouts**: sizes in relative units and layouts that rearrange, such as
   [flexbox](/t/flexbox) wrapping and [grid](/t/css-grid) with `auto-fill`.
3. **Media queries** to adjust where the layout needs to change
   ([media queries](/t/media-query)).

```css
img { max-width: 100%; height: auto; }          /* images never overflow their container */

.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}
```

## Habits

- **Design [mobile-first](/t/mobile-first).** Start with the small layout, then enhance.
- **Check at real widths** (around 360-400px for phones), with the device mode in
  [DevTools](/t/browser-devtools), and on an actual phone when possible.
- **No horizontal scrolling** at any width. If the page scrolls sideways, something is too wide: a
  fixed `width`, a long unbroken string, a wide table or image.
- **Make touch targets big enough** to tap and keep them apart.
- **Keep text readable**: don't let lines get too long on wide screens (`max-width: 65ch`) or tiny on
  phones. Use [relative units](/t/css-units).
- **Serve appropriately sized images** ([responsive images](/t/responsive-images)).
- **Test text size and zoom**, since users change them.

Responsive doesn't just mean resizing. Think about what a phone user needs first, and consider
hover-only interactions, which don't exist on touch screens.
