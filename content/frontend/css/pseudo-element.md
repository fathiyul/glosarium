---
title: "Pseudo-elements"
summary: "::before and ::after for styling parts of an element."
levels: { frontend: junior }
aliases: ["pseudo-elements", "::before", "::after"]
prereqs: ["css-selector", "pseudo-class"]
related: ["pseudo-class", "css-selector", "specificity", "accessibility"]
---

A pseudo-element lets you style a part of an element, or add decorative content, without extra HTML. It's written with two colons.

```css
.quote::before { content: "“"; }
.quote::after  { content: "”"; }
p::first-line  { font-weight: 600; }
input::placeholder { color: #888; }
li::marker { color: royalblue; }
::selection { background: gold; }
```

## Common ones

| Pseudo-element | Targets |
|---|---|
| `::before`, `::after` | generated content inside the element, before or after its content |
| `::first-line`, `::first-letter` | the first line or letter of text |
| `::placeholder` | placeholder text of an input |
| `::marker` | a list item's bullet or number |
| `::selection` | text the user has highlighted |

## Using ::before and ::after

They only appear if `content` is set (even to `""`). They behave like a child element, so they can be positioned, sized and colored:

```css
.badge { position: relative; }
.badge::after {
  content: "";
  position: absolute;
  top: 0; right: 0;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: crimson;
}
```

Typical uses: icons, decorative lines, overlays, clearing floats, tooltips.

## Cautions

- **Pseudo-elements aren't in the DOM.** JavaScript can't select them, and users can't select their text.
- **Don't put meaningful content in `content`.** Screen readers may or may not read it, and it can't be translated or searched. Use real HTML for anything important ([accessibility](/t/accessibility)).
- **`<img>` and `<input>` can't have `::before` or `::after`**, because they have no content box.
- **Two colons vs one**: `::before` is the modern form. Don't confuse it with a [pseudo-class](/t/pseudo-class) like `:hover`, which selects a state.
