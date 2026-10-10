---
title: "Paint and Composite"
summary: "Filling in pixels and assembling layers on the GPU."
levels: { frontend: senior }
aliases: ["paint", "composite", "paint and composite"]
prereqs: ["layout-reflow", "render-tree"]
related: ["layout-reflow", "critical-rendering-path", "css-animations"]
---

After layout fixes geometry, **paint** fills in pixels — text, colours, borders, shadows — into layers, and **composite** draws those layers to the screen in order. The split matters because compositing is cheap (the GPU just repositions pre-painted layers) while painting is not (rasterising pixels costs). Smooth animation lives on the compositor; jank lives in repeated paint.

```text
layout → paint (rasterise layers) → composite (GPU positions layers)
transform/opacity animation → composite only ✓ (60fps-friendly)
width/color animation → layout + paint every frame ✗
```

Browsers promote elements to their own layers for animated transforms, video, canvases and explicit hints (`will-change`, `translateZ`). Each layer costs memory, so layer count is a budget too.

The classic mistakes:

- Animating paint properties. `color`, `box-shadow`, `background-position` re-rasterise every frame. Prefer compositor properties (`transform`, `opacity`) for motion.
- Layer explosion. Promoting hundreds of elements (blanket `will-change`, huge lists) eats GPU memory and slows compositing itself. Promote deliberately, release after.
- Giant paint areas. A full-screen repaint per frame (large blurred backgrounds, animating body backgrounds) overwhelms rasterisation. Reduce paint area; prefer transforms over repaints.
- Ignoring raster costs on low-end devices. Desktop-smooth paint budgets blow mobile frame times. Test on representative hardware, not just the dev machine.
- Forgetting paint happens on scroll. Fixed/parallax effects that repaint during scroll jank on mobile. Compositor-driven parallax (transforms) scrolls smoothly.
- will-change as permanent state. It's a hint to *prepare* a layer, not a performance flag to leave on. Apply before the animation, remove after.

**The rule:** animate transform and opacity; keep layers few; shrink paint areas. Paint is necessary once per change — per-frame paint is the thing to design away.
