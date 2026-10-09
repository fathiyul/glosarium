---
title: "Viewport Meta Tag"
summary: "The tag that makes pages scale correctly on phones."
levels: { frontend: junior }
aliases: ["viewport meta tag", "meta viewport", "width=device-width"]
prereqs: ["html-head-meta"]
related: ["responsive-design", "media-query", "mobile-first", "html-head-meta"]
---

The viewport meta tag tells mobile browsers how to size and scale the page. Without it, a phone pretends the screen is about 980 pixels wide and shrinks your page to fit, so everything looks tiny.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- `width=device-width` makes the layout width equal to the real screen width.
- `initial-scale=1` sets the zoom to 100%.

It goes in the `<head>` ([head and meta tags](/t/html-head-meta)).

## Why it matters

[Responsive design](/t/responsive-design) and [media queries](/t/media-query) depend on it. A query like `(max-width: 600px)` only matches on a phone if the browser reports the real width. Without the tag, the phone reports about 980 and your mobile styles never apply.

## Things to avoid

```html
<!-- Don't do this: it blocks pinch-zoom and harms accessibility -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

Users with low vision rely on zooming. Leave zoom enabled.

## Related notes

- **Safe areas**: on phones with notches, you may need `viewport-fit=cover` plus `env(safe-area-inset-*)` padding.
- **`100vh` on mobile** can be taller than the visible area because of browser toolbars. Newer units like `dvh` help ([CSS units](/t/css-units)).
- **Test on real devices**, or device mode in DevTools ([DevTools](/t/browser-devtools)).
- Setting it is a one-time task, and every responsive page needs it. If a page looks zoomed out on a phone, check for it first.
