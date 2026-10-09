---
title: "Design Handoff"
summary: "Turning a designer's mockups into implemented UI."
levels: { frontend: junior }
aliases: ["designer developer handoff", "handoff", "implementing designs", "Figma handoff"]
prereqs: ["html-forms", "css-units"]
related: ["design-system", "design-tokens", "pixel-perfect", "visual-hierarchy", "spacing-scale", "empty-state"]
core: [frontend]
---

**Design handoff** is the step where a designer's mockups become real UI. A good handoff is a conversation, not a file
dropped over a wall.

## What to read in a design

Design tools (Figma and similar) show measurements, colors and fonts, and many let you inspect them. Beyond the
static picture, find:

- **Spacing and sizes**: map them to your [spacing scale](/t/spacing-scale) and [design tokens](/t/design-tokens)
  rather than hard-coding every pixel value you see.
- **Colors and typography**: use the existing tokens and styles if there's a [design system](/t/design-system).
- **Reusable parts**: which pieces are existing components, and which are new?
- **Assets**: icons and images, in the right formats (SVG for icons, see [image optimization](/t/image-optimization)).

## What mockups often don't show

Designs usually show the happy path at one screen width. Ask about, or check, the rest:

- **All states**: hover, focus, active, disabled, [loading, error and empty states](/t/loading-error-states).
- **Responsive behavior**: what happens on a phone, a tablet and a wide screen? ([responsive design](/t/responsive-design))
- **Real content**: very long names, missing images, translations that run longer.
- **Interactions and animation**: timing, what triggers them, [reduced motion](/t/reduced-motion).
- **Accessibility**: contrast, focus order, labels ([accessibility](/t/accessibility)).

## Working well with a designer

- **Ask early and often.** A five-minute question beats a day of rework.
- **Flag problems**, such as "this color fails contrast" or "this can't fit on small screens", and propose alternatives.
- **Don't silently change the design.** Agree on any deviation.
- **Show work in progress** on a real device, before it's "done."
- Aim for faithful, not necessarily **[pixel-perfect](/t/pixel-perfect)**: browsers, fonts and screen sizes differ, so
  match the intent, spacing system and hierarchy.
- Give feedback in terms of **what the user sees**, not only how it's built.

The best handoffs rely on shared building blocks, so that designers and developers use the same names for the same
things.
