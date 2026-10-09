---
title: "CSS Reset / Normalize"
summary: "Removing differences between browsers' default styles."
levels: { frontend: junior }
aliases: ["normalize.css", "reset stylesheet", "CSS normalize"]
prereqs: ["css", "css-inheritance"]
related: ["box-sizing", "css-architecture", "css-inheritance", "browser-compatibility", "design-tokens"]
---

Every browser ships default styles: headings are bold and large, lists have bullets, the body has an 8-pixel margin. They differ slightly between browsers. A CSS reset (or normalize) is a small stylesheet loaded first that removes or evens out those differences, so you start from a known baseline.

Two approaches:

- **Reset**: strip defaults, so margins and sizes start at zero or plain.
- **Normalize**: keep useful defaults, but make them consistent across browsers, and fix bugs.

A modern minimal reset might look like:

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
```

## What these do

- [`box-sizing: border-box`](/t/box-sizing) makes widths behave predictably.
- Zeroing margins avoids surprises.
- A reasonable `line-height`.
- Media elements scale down to their container instead of overflowing.
- Form controls use the page's font instead of the system default ([inheritance](/t/css-inheritance)).

## When to use one

- **Starting a site from scratch**: yes, a short one.
- **With a framework or component library**: it usually includes its own. Don't stack several.
- **Utility-first tools** like Tailwind ship a base layer (preflight).

## Cautions

- **Keep it small.** A giant reset that undoes everything makes you restyle every element, including ones you wanted defaults for (lists, headings in rich text).
- **Mind accessibility.** Don't remove focus outlines without replacing them ([focus-visible](/t/focus-visible)).
- **Rich text content** (articles, markdown) needs its list and heading styles restored in that area.
- **Load it first**, so your own styles override it.
- Browsers have converged, so today's resets are mostly about preference and `box-sizing` ([CSS architecture](/t/css-architecture)).
