---
title: "Web Typography"
summary: "Fonts, line height, line length and readable text."
levels: { frontend: mid-level }
aliases: ["web typography", "typography", "type scale"]
prereqs: ["css", "web-fonts"]
related: ["web-fonts", "visual-hierarchy", "accessibility"]
---

**Web typography** is text made readable: a type *scale* (a few harmonious sizes, not twelve), comfortable *measure* (45–75 characters per line for body), adequate line-height (1.4–1.6 for prose), and contrast that passes without squinting. Most "design quality" users perceive is typography done right.

```css
:root { --step-0: 1rem; --step-1: 1.25rem; --step-2: 1.563rem; /* ratio scale */ }
article { max-width: 65ch; line-height: 1.6; }
```

Fluid type (`clamp()`) scales smoothly between viewport bounds without breakpoint jumps; relative units (`rem`) respect user font-size settings; and vertical rhythm (consistent spacing scale) makes pages feel composed rather than stacked.

The classic mistakes:

- Fixed pixel type. `px` font sizes override user preferences; `rem`-based type honours the browser's font-size setting — an accessibility baseline, not a nicety.
- Endless sizes. Fourteen distinct text sizes is visual noise. A ratio scale with 4–6 steps covers everything.
- Full-width body text. 200-character lines exhaust readers. Constrain measure (`ch` units do it directly).
- Cramped line-height. Tight leading in long prose tires eyes; headings can sit tight, body needs air.
- Grey-on-grey body copy. Fashionable low contrast fails users and standards alike. Body text needs real contrast ratios (see [color contrast](/t/color-contrast)).
- No fluid behaviour. Jumping sizes at breakpoints feels broken between them; `clamp()` interpolates gracefully.
- Ignoring the fallback stack. Fallback fonts with different metrics reflow on swap. Match metrics so the swap is invisible (see [web fonts](/t/web-fonts)).

**The foundation:** ratio scale, fluid sizes in relative units, constrained measure, generous leading, real contrast. Typography is the UI for readers — get it right and everything else looks better.
