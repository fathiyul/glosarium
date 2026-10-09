---
title: "z-index and Stacking Context"
summary: "How elements layer, and why z-index: 9999 sometimes does nothing."
levels: { frontend: mid-level }
aliases: ["stacking context", "z-index not working", "CSS stacking", "stacking order"]
prereqs: ["positioning", "box-model"]
related: ["positioning", "portals", "css-variables", "display-property", "css-transforms", "dialog-element"]
core: [frontend]
---

`z-index` controls which overlapping elements appear in front. It's famously confusing, because it works inside **stacking contexts**, and setting `z-index: 9999` sometimes does nothing.

```css
.modal { position: fixed; z-index: 1000; }
```

## Rule 1: it only applies to some elements

`z-index` works on **positioned elements** (`position` other than `static`), and on children of flex or grid containers. On a plain `static` block, it's ignored. (A frequent cause of "my
z-index isn't working": the element has no `position`.)

## Rule 2: stacking contexts

A **stacking context** is a self-contained layer group. Elements inside it are compared with each other, and then the **whole group** is stacked as one unit among its siblings. A child can never escape its parent's
stacking context, no matter how high its `z-index`.

```html
<div class="a" style="position: relative; z-index: 1">
  <div class="modal" style="position: absolute; z-index: 9999">…</div>
</div>
<div class="b" style="position: relative; z-index: 2">…</div>
```

Here `.modal` (9999) is still **behind** `.b` (2), because it lives inside `.a`'s context at level 1, which loses to `.b`'s level 2. That's the "why does 9999 do nothing" mystery.

## What creates a stacking context

- The root element.
- `position: relative`/`absolute` **with** a `z-index` other than `auto`; `position: fixed` and `sticky`.
- `opacity` below 1.
- `transform`, `filter`, `perspective`, `clip-path` (anything other than none).
- `isolation: isolate`.
- `will-change` for certain properties, and `mix-blend-mode`.
- Flex or grid items with a `z-index`.

A harmless-looking `transform: translateZ(0)` or `opacity: 0.99` on an ancestor can trap its descendants.

## Debugging and good habits

- **Find the ancestor** that creates the context: inspect parents in [DevTools](/t/browser-devtools) and look for the properties above. Some browsers' tools can show stacking contexts.
- **Use `isolation: isolate`** on a component's root to deliberately contain its internal `z-index` values, so they can't leak out and fight with the rest of the page.
- **Avoid z-index arms races** (999, 9999, 99999). Use a small scale with named variables ([CSS variables](/t/css-variables)): `--z-dropdown`, `--z-modal`.
- **Render overlays at the top level** of the document, so ancestor contexts can't trap them. Frameworks provide [portals](/t/portals) for modals and tooltips, and the native `<dialog>` uses the browser's top layer ([dialog element](/t/dialog-element)).
- Keep the DOM order meaningful, since later siblings paint on top of earlier ones when `z-index` is equal.
