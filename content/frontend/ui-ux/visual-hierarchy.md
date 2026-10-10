---
title: "Visual Hierarchy"
summary: "Size, weight and spacing guiding the eye."
levels: { frontend: mid-level }
aliases: ["visual hierarchy", "information hierarchy", "hierarchy design"]
prereqs: ["web-typography", "spacing-scale"]
related: ["web-typography", "color-contrast", "spacing-scale"]
---

**Visual hierarchy** orders attention: the primary action reads first, supporting content second, chrome last — through size, weight, colour, spacing, position and motion. Users don't read pages; they scan them in predictable patterns (F-shaped on text, Z on sparse layouts) — hierarchy places meaning where eyes land.

```text
primary:  large, bold, high-contrast, top-left, generous space
secondary: smaller, muted, grouped nearby
tertiary:  minimal chrome, edges, low contrast (but still legible)
```

Every element competes; hierarchy decides winners deliberately instead of by loudest-default. One primary action per view, headings that outline the page, whitespace that groups — the rest is restraint.

The classic mistakes:

- Everything emphasised. Five bold red CTAs emphasise nothing — emphasis is relative, and equals collapse it. One primary; demote the rest honestly.
- Hierarchy by decoration. Borders, shadows and colours added without ordering intent create noise, not rank. Each treatment must answer "more or less important than neighbours?"
- Weak heading structure. Skipped levels and vague headings break both scanning and assistive-tech navigation. Headings outline; levels nest properly.
- Low-contrast body sacrifice. Muted secondary text pushed below legibility fails everyone. Hierarchy within contrast floors (see [color contrast](/t/color-contrast)).
- Motion hijacking. Animated badges and carousels outrank static content regardless of importance. Motion is the strongest attractor — spend it on what matters.
- Mobile hierarchy collapse. Desktop sidebars stacked linearly bury primary actions on phones. Re-rank explicitly per breakpoint; order follows importance, not desktop position.
- No squint test. Blurring the design should still reveal the order (big/dark = important). If the blur shows uniform grey, hierarchy failed.

**The craft:** rank content deliberately, express rank through size/weight/space/colour, verify by squint and scan testing. Attention is scarce — spend the user's where it pays.
