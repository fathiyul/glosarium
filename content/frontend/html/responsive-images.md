---
title: "Responsive Images (srcset, picture)"
summary: "Serving the right image size for each screen."
levels: { frontend: mid-level }
aliases: ["responsive images", "srcset", "picture element"]
prereqs: ["html", "responsive-design"]
related: ["responsive-design", "performance-budget", "image-processing"]
---

**Responsive images** serve appropriately-sized files per device: `srcset`/`sizes` lets the browser pick among resolutions, and `<picture>` adds **art direction** (different crops per viewport) and format switching (modern formats with fallbacks).

```html
<img src="s.jpg" srcset="s-480.jpg 480w, s-800.jpg 800w, s-1200.jpg 1200w"
     sizes="(max-width: 600px) 480px, 800px" alt="…">
```

The browser — knowing viewport, DPR and network — chooses, often better than server-side guessing can. The savings are enormous: a 480px phone downloading a 2400px hero wastes megabytes on every visit.

The classic mistakes:

- One giant image for all. The default failure: desktop-sized files on phones. Size variants are the fix, not an optimisation extra.
- Wrong `sizes`. A `sizes` that doesn't match the CSS layout makes the browser pick wrongly (too big = waste, too small = blurry). Keep it in sync with actual rendered widths.
- Missing dimensions. Images without width/height shift layout when they load (CLS). Declare aspect ratio up front.
- Format neglect. Serving only JPEG/PNG while modern formats halve bytes. Offer new formats first with automatic fallback.
- Art direction ignored. A wide desktop banner cropped by CSS on phones shows nothing meaningful. `<picture>` serves genuinely different compositions.
- Lazy-loading above the fold. `loading="lazy"` on the hero delays the most important image. Eager + fetchpriority for LCP; lazy below the fold.
- Forgetting density. DPR 3 phones need more pixels than the CSS width suggests; width descriptors with DPR-aware selection handle it.

**The practice:** generate width variants plus modern formats, declare sizes matching layout, reserve dimensions, lazy-load below fold only. Images are usually the page's bytes — sizing them right is the biggest single performance win.
