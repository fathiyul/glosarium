---
title: "First Contentful Paint"
summary: "When anything first appears on screen."
levels: { frontend: mid-level }
aliases: ["first contentful paint", "fcp", "first paint"]
prereqs: ["critical-rendering-path", "performance-budget"]
related: ["ttfb", "render-blocking-resources", "critical-css"]
---

**First Contentful Paint (FCP)** marks when the browser first renders any content — text, image, canvas — ending the blank-page stare. It's the earliest user-perceived milestone: not "usable" yet (interactivity comes later), but proof the page exists and progress is happening.

```text
navigation → TTFB → … → FCP (something visible!) → … → interactive
```

FCP is dominated by the critical path: server response ([TTFB](/t/ttfb)), render-blocking CSS/JS, font waits and client rendering delays. Optimising it means shortening everything before first pixels — the same work as the critical rendering path, measured at its first checkpoint.

The classic mistakes:

- Optimising load instead of paint. Full-load time can improve while users still stare at blank screens. FCP (then interactivity) is the user-visible sequence — optimise in order.
- Render-blocking piles. Synchronous scripts and stylesheets in `<head>` delay FCP directly. Defer, async, inline critical CSS.
- Slow TTFB blamed on frontend. No paint beats a slow server response. Fix backend latency before tuning assets.
- Client-rendered emptiness. JS-only apps paint nothing until bundles load, parse and fetch — FCP suffers structurally. SSR or static shells fix the architecture, not the assets.
- Web-font-gated text. Invisible text awaiting fonts pushes FCP. `font-display: swap` paints immediately.
- Measuring only fast devices. FCP on a flagship phone over wifi hides the median experience. Lab-test throttled; trust field data (see [RUM](/t/real-user-monitoring)).
- Splash screens as paint. A branded loader paints early and means nothing — FCP gaming that users see through. Paint real content.

**How to move it:** faster server response, non-blocking resources, critical CSS inline, content rendered server-side. First pixels fast, then everything else.
