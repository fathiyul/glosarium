---
title: "Right-to-Left Support"
summary: "Supporting languages like Arabic and Hebrew."
levels: { frontend: senior }
aliases: ["right-to-left support", "rtl support", "rtl layout"]
prereqs: ["localization", "logical-properties"]
related: ["localization", "logical-properties", "pluralization"]
---

**Right-to-left (RTL) support** mirrors interfaces for RTL languages (Arabic, Hebrew, Persian, Urdu): layout flips horizontally, text aligns right, navigation reverses — while genuinely directional content (media controls, charts, code, brand marks) stays put. Done with logical properties it's largely automatic; bolted on after, it's overrides archaeology.

```css
/* logical properties flip automatically under dir="rtl" */
.toolbar { padding-inline-start: 1rem; text-align: start; }
```

The work beyond properties: icon mirroring (back/forward arrows, progress direction), asymmetric graphics review, mixed-direction text (`bidi` isolation for names/numbers inside opposite-direction prose), and full testing in RTL — layout, flows, and comprehension, not just screenshots.

The classic mistakes:

- Physical properties throughout. `margin-left`/`float: right` layouts need per-rule overrides in RTL — hundreds of them, rotting independently. Logical properties from the start.
- Blind mirroring. Timers, sliders, charts and media timelines have intrinsic direction; flipping them confuses. Mirror navigation and reading flow; preserve meaningful direction.
- Unmirrored icons. Back arrows pointing the wrong way, progress filling backwards — icon sets need RTL variants with review, not assumption.
- Mixed-text breakage. User names, numbers and Latin terms inside RTL prose scramble without `bidi` isolation (`<bdi>`, `unicode-bidi: isolate`). Wrap embedded runs.
- Testing in translation only. Machine-translated spot checks miss layout breaks real copy exposes (length, line-breaking, font rendering). Test with real translations on real pages.
- Numbers and inputs. Phone fields, PINs and numeric input need explicit direction handling — digits flow left-to-right inside RTL contexts by rule, not accident.
- Chart and data viz. Axes, legends and time direction carry meaning; flipping conventions mislead. Localise visualisations with domain care, not blanket mirroring.

**The practice:** logical properties, mirrored icons reviewed, bidi-isolated mixed text, real-translation RTL testing in the matrix. Direction is layout infrastructure — build it in, not on.
