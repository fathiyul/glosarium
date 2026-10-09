---
title: "Dark Mode"
summary: "Supporting a dark color scheme with prefers-color-scheme or a toggle."
levels: { frontend: junior }
aliases: ["dark theme", "prefers-color-scheme", "color scheme"]
prereqs: ["css-variables", "media-query"]
related: ["css-variables", "design-tokens", "color-contrast", "media-query", "local-storage"]
---

Dark mode is a color scheme with light text on dark backgrounds. Many users prefer it for comfort, battery life or taste, and operating systems let them choose it, so sites are expected to follow.

## Following the system preference

```css
:root {
  --bg: #fdfdfc;
  --text: #1f1f1d;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #161615;
    --text: #e8e6e1;
  }
}

body { background: var(--bg); color: var(--text); }
```

The `prefers-color-scheme` [media query](/t/media-query) tells you what the user's system is set to. Using [CSS variables](/t/css-variables) means you define each color once per theme, and components just use the variables ([design tokens](/t/design-tokens)).

## Offering a toggle

Users may want to override the system. Set an attribute and remember the choice:

```css
:root[data-theme="dark"] { --bg: #161615; --text: #e8e6e1; }
```

```js
document.documentElement.dataset.theme = "dark";
localStorage.setItem("theme", "dark");     // remember it
```

Saving the choice uses [localStorage](/t/local-storage).

To avoid a flash of the wrong theme, apply the saved choice with a small inline script in the `<head>`, before the page paints.

## Getting it right

- **Don't just invert colors.** Pure black backgrounds with pure white text are harsh. Use dark grays and softer text colors.
- **Check contrast** in both themes ([color contrast](/t/color-contrast)). Colors that pass on white may fail on dark.
- **Soften saturated colors**, which glare on dark backgrounds.
- **Handle images and logos**: add a light variant, or backgrounds for transparent images.
- **Shadows** don't read well on dark, so use borders or lighter surfaces for depth.
- **Tell the browser**: `color-scheme: light dark;` makes form controls and scrollbars match.
- **Test every state**: hover, focus, disabled, charts, code blocks, embedded content.

Design for both modes from the beginning, since retrofitting means finding every hard-coded color.
