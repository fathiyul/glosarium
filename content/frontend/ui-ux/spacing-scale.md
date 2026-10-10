---
title: "Spacing Scale"
summary: "A consistent set of spacing values."
levels: { frontend: mid-level }
aliases: ["spacing scale", "spacing system", "space scale"]
prereqs: ["design-tokens", "visual-hierarchy"]
related: ["design-tokens", "visual-hierarchy", "css"]
---

A **spacing scale** replaces arbitrary margins with a fixed progression — `4, 8, 16, 24, 32, 48, 64…` (or a ratio-based ramp) — so every gap in the product comes from one set. Consistency emerges automatically: related elements share rhythms, unrelated pages still rhyme, and "does this look aligned?" has an objective answer.

```css
:root { --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 1rem;
        --space-4: 1.5rem; --space-5: 2rem; --space-6: 3rem; }
```

As design tokens, spacing values propagate everywhere (margins, padding, gaps, radii) and change coherently — density modes (comfortable/compact) become variable swaps rather than redesigns.

The classic mistakes:

- Magic numbers. `margin: 13px` here, `17px` there — accumulation of arbitrary values that never align and can't be tuned globally. Scale values only.
- Too many steps. Twenty increments nobody distinguishes defeats the purpose. Six to ten steps cover real needs; more is indecision.
- Linear-only scales. Even increments (`4, 8, 12, 16…`) under-serve large gaps; geometric growth handles section-to-section leaps naturally. Mix deliberately.
- Inconsistent application. Scale adopted in new code while legacy stays arbitrary produces two visual languages. Migrate steadily; lint new code.
- Ignoring density. One spacing for data-dense tables and marketing heroes fits neither. Density variants (tokens swapped per context) serve both.
- Spacing as the only hierarchy. Gaps organise, but size, weight and colour also rank. Spacing plus type scale plus colour compose hierarchy — never spacing alone.
- RTL/physical confusion. Inline spacing needs logical properties to mirror correctly. Tokens pair with logical usage (see [logical properties](/t/logical-properties)).

**The practice:** one scale, tokenised, used everywhere, density-aware. Invisible when working — which is exactly the point.
