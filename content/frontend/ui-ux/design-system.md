---
title: "Design System"
summary: "Shared components, tokens and guidelines for consistent UI."
levels: { frontend: mid-level }
aliases: ["design systems", "component library and guidelines", "UI design system", "style guide"]
prereqs: ["component", "design-tokens"]
related: ["design-tokens", "component-library", "storybook", "headless-ui", "spacing-scale", "accessibility"]
core: [frontend]
---

A **design system** is a shared collection of reusable pieces and rules that lets many people build a **consistent** UI quickly: coded **components**, **design tokens** (colors, spacing, type), **usage guidelines**, **documentation** and often design-tool libraries that match the code.

The parts:

| Part | What it is |
|---|---|
| **[Design tokens](/t/design-tokens)** | The named values: colors, spacing, typography, radii, shadows |
| **Components** | Coded buttons, inputs, modals, tables ([component library](/t/component-library)), built accessibly |
| **Patterns** | How to combine them: forms, empty states, navigation |
| **Guidelines** | Voice and tone, accessibility rules, when to use what |
| **Documentation** | Live examples and API docs, often in [Storybook](/t/storybook) |
| **Design assets** | Matching component libraries in the designers' tools |

## Why teams build one

- **Consistency**: the same button looks and behaves the same everywhere.
- **Speed**: developers assemble screens instead of rebuilding common things, and designers don't redraw them.
- **Quality**: accessibility, responsiveness and states are fixed in one place, then inherited.
- **Shared language** between design and engineering.
- **Easier global change**: update a token or component once.

## Costs and risks

- **It's a product**, with maintainers, a roadmap, versioning and support. An unstaffed one rots.
- **Adoption is the hard part.** If using it is harder than writing a one-off, people won't. Make it easy to use, easy to contribute to and well documented.
- **Too rigid**, and teams work around it. **Too loose**, and it doesn't deliver consistency.
- **Breaking changes** ripple to every consumer, so version carefully and communicate.
- **Premature**: a tiny team with one product may need only a good set of shared components.

## Working with one

- **Use the existing component before building a new one.** If something's missing, propose it.
- **Don't override styles** ad hoc. Use tokens and supported options.
- **Contribute improvements back** rather than forking.
- Many systems build on **[headless](/t/headless-ui)** (unstyled, accessible) primitives, adding their own look on top.

See [design handoff](/t/design-handoff) for how designs become code using a system.
