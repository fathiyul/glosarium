---
title: "Logical Properties"
summary: "margin-inline and friends, which adapt to writing direction."
levels: { frontend: mid-level }
aliases: ["logical properties", "css logical properties", "rtl css"]
prereqs: ["css", "rtl-support"]
related: ["rtl-support", "localization", "css"]
---

CSS **logical properties** express direction relative to writing mode instead of physical sides: `margin-inline-start` (not `margin-left`), `padding-block`, `inset-inline-end`, `text-align: start`. In left-to-right they map as expected; in right-to-left (or vertical scripts) they flip automatically — one stylesheet serving every direction.

```css
.card { margin-inline-start: 1rem; padding-block: 0.5rem; text-align: start; }
/* LTR: left margin. RTL: right margin. No overrides, no [dir] hacks. */
```

They're the foundation of genuinely international layouts: no duplicated RTL stylesheets, no `!rtl` overrides rotting beside the LTR original, icons and asymmetry handled through the same model.

The classic mistakes:

- Physical properties everywhere. `margin-left`/`padding-right` hard-code direction; every RTL pass then overrides each one. Author logical from the start.
- Assuming everything flips. Media, charts, code samples and brand marks often *shouldn't* mirror. Flip layout and text; keep intrinsically directional content deliberate.
- Icons and asymmetry. Arrows, progress and chat bubbles need mirroring logic beyond properties — icon sets need RTL variants, transforms need care.
- Mixed old/new. Logical and physical properties interacting (shorthand resetting longhands) produce order-dependent surprises. Commit per codebase, migrate deliberately.
- Testing only LTR. Logical properties are only verified in RTL rendering. Test with `dir="rtl"` early — automated visual checks catch what authors miss.
- Numbers and placeholders. Numeric input, phone fields and mixed-direction text need `dir`/`unicode-bidi` handling beyond spacing properties.
- Forgetting vertical modes. `block`/`inline` abstract over vertical scripts too — the same properties serve CJK vertical layouts, not just RTL.

**The practice:** logical properties by default, physical only where direction is intrinsic, RTL rendering in the test matrix. Internationalisation done at authoring time beats overrides forever.
