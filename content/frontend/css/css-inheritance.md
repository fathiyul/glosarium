---
title: "CSS Inheritance"
summary: "Properties like color passing down to child elements."
levels: { frontend: junior }
aliases: ["inherited properties", "inherit keyword"]
prereqs: ["css"]
related: ["cascade", "specificity", "css-variables", "css-selector", "box-model"]
---

Some CSS properties are inherited: if you set them on an element, its children use the same value, unless they set their own. That's why setting a font once on `body` styles the whole page.

```css
body {
  font-family: system-ui, sans-serif;
  color: #1f1f1d;
}
/* every paragraph, link text and list item now uses that font and color */
```

## Which properties inherit

- **Usually inherited**: text-related ones: `color`, `font-family`, `font-size`, `line-height`, `text-align`, `visibility`, `cursor`.
- **Usually not inherited**: box and layout ones: `margin`, `padding`, `border`, `background`, `width`, `display`. It would be strange if a child copied its parent's border.

## Controlling it

```css
.child { color: inherit; }        /* take the parent's value, even for a property that doesn't inherit by default */
.child { color: initial; }        /* reset to the property's default */
.child { all: unset; }            /* reset almost everything */
.child { border: revert; }
```

## Inheritance vs the cascade

Inheritance only supplies a value when no rule targets the element directly. Any rule that matches the element wins over an inherited value, whatever its [specificity](/t/specificity). So `a { color: blue }` beats a parent's `color: red`, and links stay blue unless you write `a { color: inherit }`.

## Practical uses

- **Set typography and color on `body`** or a root container, instead of repeating it everywhere.
- **`currentColor`** uses the current text color for borders and icons (`fill: currentColor`), so they follow the text.
- **[CSS variables](/t/css-variables)** are inherited, which makes theming easy: set `--accent` on a section, and everything inside uses it.
- **Form controls** don't inherit fonts by default, so many resets add `font: inherit` ([CSS reset](/t/css-reset)).

When styles "leak" down unexpectedly, or a child doesn't match its parent, check inheritance in [DevTools](/t/browser-devtools), which shows inherited properties.
