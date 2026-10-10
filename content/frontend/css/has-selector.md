---
title: ":has() Selector"
summary: "Selecting a parent based on its children."
levels: { frontend: mid-level }
aliases: [":has selector", "has pseudo-class", "parent selector"]
prereqs: ["css", "dom"]
related: ["css-nesting", "css", "responsive-design"]
---

**`:has()`** selects an element based on what's *inside* it — the long-missing "parent selector." `form:has(input:invalid)` styles the form when any field is invalid; `figure:has(figcaption)` adjusts figures with captions; `.card:has(img)` lays out differently when there's an image.

```css
/* the form itself reacts to a child's state */
form:has(input:invalid) { border-color: red; }
.card:has(> img) { grid-template-columns: 120px 1fr; }
```

It also takes state pseudo-classes, sibling combinators and quantity queries (`li:has(+ li + li)` — lists with 3+ items), collapsing whole JavaScript class-toggling routines into one selector.

The classic mistakes:

- Performance blindness. `:has()` can force the browser to re-evaluate up the tree on DOM changes; broad `:has()` over huge subtrees on frequently-mutating pages costs. Scope it tightly.
- Forgetting support floors. Extremely old browsers lack it; if your baseline includes them, provide a no-`:has()` fallback rather than silent restyling.
- Over-nesting with it. Combining `:has()` with deep descendant chains multiplies matching cost. Keep selectors short and close.
- Using it where markup would do. A class toggled server-side or at render is cheaper and clearer than a clever `:has()` — reach for the selector when state is genuinely dynamic, not as decoration.
- Quantity-query fragility. Sibling-counting selectors break the moment markup order shifts. Prefer explicit classes for load-bearing variants.
- Assuming style containment. `:has()` doesn't isolate — matched parents still cascade normally. Encapsulation needs shadow DOM or scope, not relational selectors.
- Testing only the positive. `:has()` restyles on child *removal* too; dynamic lists adding/removing nodes flip matches constantly. Verify both directions.

**How to use it:** relational styling for genuinely child-dependent presentation — validity, presence, counts — scoped narrowly, with fallbacks at the support floor. It's the selector that retires a generation of JS class toggles.
