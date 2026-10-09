---
title: "Custom Properties (CSS Variables)"
summary: "Reusable values defined in CSS that can change at runtime."
levels: { frontend: junior }
aliases: ["custom properties", "CSS custom properties", "var(--x)"]
prereqs: ["css"]
related: ["design-tokens", "dark-mode", "css-inheritance", "css-architecture", "css-units"]
---

CSS variables (officially custom properties) are reusable values you define in CSS and use with `var()`. Unlike preprocessor variables, they live in the browser at runtime, so they can change, inherit and respond to JavaScript.

```css
:root {                         /* :root is the page's top element: variables defined here are global */
  --accent: #2f5bd3;
  --space: 1rem;
  --radius: 8px;
}

.button {
  background: var(--accent);
  padding: var(--space);
  border-radius: var(--radius);
}

.button.small { padding: calc(var(--space) / 2); }
.card { color: var(--text-color, #222); }     /* a fallback after the comma */
```

## Why use them

- **One place to change a value**: update `--accent` and every use follows.
- **Theming**: redefine variables for a theme, and the whole UI changes ([dark mode](/t/dark-mode)).
- **Scoped overrides**: variables are inherited, so setting one on a section affects only what's inside ([inheritance](/t/css-inheritance)).
- **Used by design tokens** ([design tokens](/t/design-tokens)).

```css
.theme-dark { --bg: #161615; --text: #e8e6e1; }
body { background: var(--bg); color: var(--text); }
```

## Changing them at runtime

```js
document.documentElement.style.setProperty("--accent", "#c4542a");
getComputedStyle(el).getPropertyValue("--accent");
```

## Things to know

- **Names start with `--`** and are case-sensitive.
- **Values are substituted as text**, so `var(--space)` inside `calc()` works, but a variable can't hold just a unit change in all contexts.
- **They can't be used in media query conditions** (`@media (min-width: var(--bp))` doesn't work), or as property names.
- **Fallbacks**: `var(--x, fallback)` applies if the variable isn't defined.
- **Invalid values** (a variable holding text where a color is expected) make the property fall back to its inherited or initial value, which can be confusing to debug.
- Support is universal in current browsers.

Name by purpose (`--color-text`, `--space-md`), and keep the set small.
