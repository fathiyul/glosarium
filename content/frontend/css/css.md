---
title: "CSS"
summary: "The language that styles web pages."
levels: { backend: junior, frontend: junior }
aliases: ["Cascading Style Sheets", "stylesheets", "CSS3"]
prereqs: ["html"]
related: ["css-selector", "specificity", "box-model", "flexbox", "css-grid", "responsive-design"]
---

CSS (Cascading Style Sheets) is the language that styles web pages: colors, fonts, spacing, layout, animation. HTML says what the content is, and CSS says how it looks.

```css
h1 {
  color: #1f1f1d;
  font-size: 2rem;
}

.card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); }
```

A rule has a **[selector](/t/css-selector)** (which elements), and **declarations** (`property: value;`) in braces.

## Adding it to a page

```html
<link rel="stylesheet" href="styles.css">     <!-- external file: the usual way -->
<style> h1 { color: red; } </style>           <!-- in the page -->
<p style="color: red">...</p>                 <!-- inline: avoid -->
```

## The ideas to learn

- **The cascade**: when rules conflict, which wins ([specificity](/t/specificity), [cascade](/t/cascade)).
- **Inheritance**: some properties pass down to children ([inheritance](/t/css-inheritance)).
- **The box model**: content, padding, border and margin ([box model](/t/box-model)).
- **Layout**: [flexbox](/t/flexbox) and [grid](/t/css-grid).
- **Units**: `rem`, `%`, `vw` ([CSS units](/t/css-units)).
- **Responsive design**: layouts that adapt ([media queries](/t/media-query), [responsive design](/t/responsive-design)).
- **Variables** ([custom properties](/t/css-variables)).

## Habits

- **Use classes** for styling, and avoid IDs and `!important`.
- **Keep selectors short.**
- **Organize your styles** so they scale ([CSS architecture](/t/css-architecture)).
- **Inspect and experiment in DevTools** ([DevTools](/t/browser-devtools)).
- **Prefer layout tools** over hacks (floats, spacer elements).
- **Mind accessibility**: contrast, focus styles, resizable text ([color contrast](/t/color-contrast)).

CSS looks simple and takes time to master, mostly because of how rules interact. Learning the cascade and the box model solves most confusion.
