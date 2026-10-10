---
title: "Portals"
summary: "Rendering a child into a different part of the DOM, e.g. for modals."
levels: { frontend: mid-level }
aliases: ["portals", "react portal", "teleport"]
prereqs: ["dom", "component-composition"]
related: ["dialog-element", "component-composition", "accessibility"]
---

**Portals** render a component's output into a different DOM location than its logical parent — typically `document.body` — while keeping React/Vue event bubbling and context semantics. Modals, tooltips, dropdowns and toasts escape clipping (`overflow: hidden` ancestors), stacking contexts and z-index traps by physically leaving them.

```jsx
createPortal(<Modal/>, document.body)  // logical child, physical elsewhere
```

Events still propagate through the *logical* tree (a portal button's click bubbles to its logical parents), which is exactly right for handlers and exactly surprising for CSS (physical location governs styling and layout).

The classic mistakes:

- Portals for everything. Escaping the tree for ordinary layout forfeits document flow benefits. Reserve portals for overlays that genuinely must escape ancestors.
- CSS context loss. Portal content inherits body-level styles, not its logical parent's — themed or scoped styles don't follow. Bridge theming explicitly (variables, parts).
- SSR mismatch. Portal targets (`document.body`) don't exist server-side; naive portal code breaks SSR. Guard or defer to client effects.
- Focus management forgotten. Portals don't trap focus or restore it — that's the dialog/focus layer's job (see [`<dialog>`](/t/dialog-element)). Portal + focus discipline together.
- Stacking replacement. Multiple portals (modal over toast over tooltip) need their own ordering discipline. A portal manager or layering convention prevents z-chaos 2.0.
- Event bubbling surprises. Clicks inside portals bubble logically — handlers on ancestors fire for physically-distant content. Usually desired, occasionally startling; know which tree governs.
- Cleanup on unmount. Portal containers created imperatively (`div` appended to body) must be removed with the component. Leaked containers accumulate invisibly.

**When to use them:** overlays escaping layout traps — modals, menus, toasts, tooltips. Physical escape plus logical belonging, with focus and styling bridged deliberately.
