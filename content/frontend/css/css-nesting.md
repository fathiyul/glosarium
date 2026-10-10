---
title: "Native CSS Nesting"
summary: "Nesting selectors directly in plain CSS."
levels: { frontend: mid-level }
aliases: ["css nesting", "nested css", "css nest"]
prereqs: ["css", "css-modules"]
related: ["css-modules", "css-layers", "css"]
---

Native **CSS nesting** lets stylesheets nest rules like preprocessors always did — no build step: `.card { …; &:hover { … } .title { … } }`. Readability and locality improve, especially for component styles, pseudo-states and media queries grouped with their selector.

```css
.card {
  padding: 1rem;
  &:hover { border-color: navy; }
  .title { font-size: 1.2rem; }
  @media (min-width: 40rem) { padding: 2rem; }
}
```

One syntax rule catches everyone: bare element selectors can't start a nested rule (`div {…}` parses ambiguously) — `:is(div)` or `& div` disambiguates. Beyond that, nesting is sugar over flat selectors with identical cascade behaviour.

The classic mistakes:

- Deep nesting. Five levels of nesting produce hyper-specific selectors that resist overrides and bloat matching cost. Nest two, maybe three — never five.
- Forgetting it's still the cascade. Nesting doesn't scope (that's modules/shadow) or isolate. Specificity wars continue; locality just organises them.
- Over-nesting media queries. Repeating the same breakpoint inside twenty components scatters responsive logic. Nest component tweaks; keep layout breakpoints systematic.
- Preprocessor habits unexamined. `&` gymnastics and mixin-shaped patterns from Sass don't all translate; native nesting is simpler — use it simply.
- Support-floor blindness. Older browsers parse nested rules as invalid and drop the whole block. Know the baseline; PostCSS can flatten where needed.
- Nesting as scoping. Nested `.title` still matches *any* descendant `.title` globally. True scoping needs modules, layers or shadow DOM.
- Specificity creep. Each nesting level adds specificity, quietly making overrides harder over time. Flat-ish nesting keeps the cascade manageable.

**How to use it:** shallow nesting for readability (states, children, component queries), flat selectors for reach, scoping via modules or layers where isolation matters. Sugar, not architecture.
