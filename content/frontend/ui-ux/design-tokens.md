---
title: "Design Tokens"
summary: "Named values for color, spacing and type shared across platforms."
levels: { frontend: mid-level }
aliases: ["design token", "tokens", "style tokens", "theme tokens", "Style Dictionary"]
prereqs: ["css-variables", "design-system"]
related: ["design-system", "css-variables", "spacing-scale", "dark-mode", "color-contrast", "web-typography"]
core: [frontend]
---

**Design tokens** are named values for design decisions: colors, spacing, font sizes, radii, shadows, durations. Instead of writing `#2f5bd3` and `16px` all over, you refer to `color.primary` and `space.4`. The tokens are the single source of truth,
and can be output for web, iOS, Android and design tools.

```json
{
  "color": {
    "blue-600": { "value": "#2f5bd3" },
    "primary":  { "value": "{color.blue-600}" }
  },
  "space": { "2": { "value": "8px" }, "4": { "value": "16px" } }
}
```

On the web, they usually become [CSS custom properties](/t/css-variables):

```css
:root {
  --color-primary: #2f5bd3;
  --space-4: 1rem;
}
.button { background: var(--color-primary); padding: var(--space-4); }
```

## Two layers

| Layer | Example | Purpose |
|---|---|---|
| **Primitive (raw) tokens** | `blue-600: #2f5bd3` | The palette: what values exist |
| **Semantic (alias) tokens** | `color-text-link`, `color-background-danger` | What a value is *for* |

Components should use the **semantic** tokens. That's what makes **theming** easy: dark mode just remaps `color-background` and `color-text` to different primitives, and no component needs to change ([dark mode](/t/dark-mode)).

```css
:root { --color-bg: #fdfdfc; --color-text: #1f1f1d; }
@media (prefers-color-scheme: dark) {
  :root { --color-bg: #161615; --color-text: #e8e6e1; }
}
```

## Benefits

- **Consistency**: everyone uses the same colors and spacing ([spacing scale](/t/spacing-scale)).
- **Easy rebranding and theming**, from one place.
- **Shared between design and code**, so designers and developers talk about the same names.
- **Accessibility built in**: define color pairs that meet contrast requirements ([color contrast](/t/color-contrast)).
- **Multi-platform**: tools such as Style Dictionary transform one token source into several outputs.

## Habits

- **Name by purpose, not appearance**: `color-danger`, not `color-red`, since the value may change.
- **Keep the set small**. Dozens of near-identical shades defeat the purpose.
- **Avoid hard-coded values** in components. A raw hex code in CSS is a smell.
- **Version and document** them like any API, as part of the [design system](/t/design-system).
