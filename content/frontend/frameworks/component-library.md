---
title: "Component Library"
summary: "Ready-made components like MUI, shadcn/ui or Radix."
levels: { frontend: junior }
aliases: ["UI library", "MUI", "shadcn/ui", "Radix", "Material UI"]
prereqs: ["component", "css"]
related: ["design-system", "utility-first-css", "accessibility", "css-modules"]
---

A component library is a collection of ready-made user interface components (buttons, modals, dropdowns, tables, date pickers) that you use instead of building each yourself.

```tsx
import { Button, Dialog } from "@mui/material";

<Button variant="contained" onClick={save}>Save</Button>
```

## Types

| Kind | Examples | Idea |
|---|---|---|
| **Styled libraries** | MUI, Ant Design, Chakra UI, Bootstrap | complete look and components, customized with themes |
| **Headless / unstyled** | Radix UI, Headless UI, React Aria | behavior and accessibility only; you bring the styles |
| **Copy-in collections** | shadcn/ui | components are copied into your project, built on headless parts and [utility CSS](/t/utility-first-css), so you own and edit the code |

## Why use one

- **Speed**: standard components are done.
- **Accessibility and edge cases** already handled: keyboard navigation, focus traps, ARIA ([accessibility](/t/accessibility)). A custom dropdown or modal is surprisingly hard to get right.
- **Consistency** across a product.

## Trade-offs

- **Bundle size**: check what you import, and use tree shaking.
- **Look-alike apps** if you don't customize.
- **Fighting the library** when your design differs from its assumptions.
- **Lock-in and upgrades**: major versions can mean large migrations.
- **Styling approach** may clash with yours.

## Choosing

- Prototype or internal tool: a styled library is fastest.
- A strong, custom brand: a headless library plus your own styles, or shadcn-style copying.
- Check: accessibility quality, maintenance activity, TypeScript support, theming, documentation.

Larger teams build their own on top as a [design system](/t/design-system), wrapping the library so the rest of the code doesn't depend on it directly.
