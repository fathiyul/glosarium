---
title: "Cascade Layers (@layer)"
summary: "Controlling cascade priority between groups of styles."
levels: { frontend: senior }
aliases: ["cascade layers", "@layer", "css layers"]
prereqs: ["css", "css-nesting"]
related: ["css-nesting", "css-modules", "css"]
---

**Cascade layers** (`@layer`) let stylesheets declare their precedence explicitly: unlayered styles beat layered ones, and earlier layers lose to later ones — *regardless of specificity*. Framework, components, utilities each in a layer, and the order declared once decides conflicts that specificity wars used to settle unpredictably.

```css
@layer reset, components, utilities;
@layer reset     { * { box-sizing: border-box; } }
@layer utilities { .hidden { display: none; } }  /* always wins over components */
```

Utilities reliably overriding components, third-party CSS slotting into a known layer, theme overrides without `!important` escalation — layers turn cascade management from archaeology into architecture.

The classic mistakes:

- Layering everything immediately. Retrofitting layers onto a specificity-tangled codebase changes winners unpredictably. Introduce layers on new code and boundaries first; migrate deliberately.
- Forgetting unlayered wins. Styles outside any layer beat *all* layered styles — a stray unlayered rule silently overrides the whole system. Layer everything or know exactly what's outside.
- Import order confusion. `@import` order and layer declaration order interact; first declaration of the layer order wins. Centralise the order in one place.
- Using layers as scoping. Layers control *precedence*, not *reach* — a layered rule still matches globally. Scoping needs modules, scope, or shadow DOM.
- !important escalation. `!important` inverts layer order (earlier layers win), which surprises everyone once. Reserve it for user/preference overrides, not conflicts.
- Third-party layer mismatch. Libraries shipping their own layers interleave with yours by declaration order — coordinate or wrap imports in your layer structure.
- Assuming old-browser support. Layers drop entirely where unsupported (rules still apply, unordered). Baseline accordingly.

**How to adopt:** declare the order once (reset → base → components → utilities → overrides), put third-party code in its layer, and let precedence be boring. Specificity stays for within-layer ties; architecture handles the rest.
