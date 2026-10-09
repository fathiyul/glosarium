---
title: "Utility-First CSS (Tailwind)"
summary: "Styling with small single-purpose classes directly in markup."
levels: { frontend: junior }
aliases: ["Tailwind", "Tailwind CSS", "utility classes", "atomic CSS"]
prereqs: ["css", "html-element"]
related: ["bem", "css-architecture", "design-tokens", "css-modules", "css-preprocessor"]
---

Utility-first CSS styles elements by combining many small, single-purpose classes directly in the markup, instead of writing custom CSS for each component. Tailwind CSS is the best-known framework.

```html
<button class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
  Save
</button>
```

Each class does one thing: `px-4` is horizontal padding, `rounded-lg` rounds the corners, `hover:bg-blue-700` changes the background on hover. Compare with the traditional approach:

```html
<button class="btn btn-primary">Save</button>
```
```css
.btn-primary { border-radius: 8px; background: #2563eb; padding: 0.5rem 1rem; ... }
```

## Why people like it

- **No naming** of classes, no deciding where styles live.
- **Local reasoning**: the styles are right next to the element, so changes don't leak elsewhere.
- **A consistent scale**: spacing, colors and sizes come from a design system (the config), instead of ad hoc values ([design tokens](/t/design-tokens)).
- **Small CSS output**: the tool generates only the classes you use.
- **Responsive and state variants** are prefixes: `md:flex`, `dark:bg-black`, `focus:ring`.

## The criticisms

- **Long class lists** make markup noisy.
- **Repetition**: the same cluster in many places. The fix is components (React, templates), not CSS abstractions.
- **Learning the vocabulary** takes time.
- **Weaker separation** of structure and style.
- **Tooling dependence** on its build step.

## Using it well

- **Extract components**, so the class list lives in one place.
- **Use the config** for your design tokens, not arbitrary values everywhere.
- **Still learn CSS.** Utilities are a thin layer over it, and you need to understand the box model, [flexbox](/t/flexbox) and the [cascade](/t/cascade).
- **Use editor plugins** for completion and class sorting.

Alternatives include [BEM](/t/bem), [CSS Modules](/t/css-modules) and plain CSS ([CSS architecture](/t/css-architecture)). Choose one approach per project and stick to it.
