---
title: "Web Fonts"
summary: "Loading custom fonts without layout shifts or invisible text."
levels: { frontend: mid-level }
aliases: ["web fonts", "font loading", "@font-face"]
prereqs: ["css", "critical-rendering-path"]
related: ["web-typography", "critical-css", "resource-hints"]
---

**Web fonts** (`@font-face` + WOFF2 files) bring brand typography to the browser — and, loaded carelessly, block text rendering and bloat the critical path. The discipline is small files, fast discovery, and graceful fallback: subsetted WOFF2, `preload` for the hero faces, `font-display: swap`, and a fallback stack that roughly matches metrics.

```css
@font-face { font-family: Body; src: url(body-latin.woff2) format('woff2');
             font-display: swap; unicode-range: U+0000-00FF; }
```

`swap` shows fallback text immediately and swaps when the font arrives (no invisible-text purgatory); `preload` discovers the critical faces early; subsetting ships only needed glyphs; variable fonts collapse many weights into one file.

The classic mistakes:

- Blocking text (FOIT). Default font-display behaviour hides text until fonts load — blank pages on slow networks. `swap` (or `optional` for non-critical) always.
- Full character sets. Shipping CJK-complete files for Latin text multiplies bytes hundredfold. Subset by unicode-range; split by script.
- Too many faces. Each weight/style is a download; eight variants for decorative range is bloat. Audit to the faces actually used.
- Late discovery. Fonts referenced only from CSS load late in the chain. Preload the 1–2 critical faces; let the rest follow.
- Layout shift on swap. A fallback with different metrics reflows text on swap (CLS). Match fallback metrics (`size-adjust`, ascent/descent overrides) to minimise shift.
- Icon fonts. Glyphs-as-fonts break screen readers, fail without the font, and resist styling. Inline SVG serves icons better in every dimension.
- Third-party font hosts unexamined. External font services add DNS/TLS round trips and privacy exposure. Self-host where the budget matters.

**The loading recipe:** WOFF2, subsetted, preloaded for critical faces, `swap` display, metric-matched fallbacks. Typography that arrives fast and swaps invisibly.
