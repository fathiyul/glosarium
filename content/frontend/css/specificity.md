---
title: "Specificity"
summary: "The rules deciding which conflicting CSS declaration wins."
levels: { frontend: junior }
aliases: ["CSS specificity", "selector specificity", "!important", "why isn't my CSS working"]
prereqs: ["css-selector"]
related: ["cascade", "css-selector", "css-layers", "bem", "css-architecture"]
core: [frontend]
---

When several CSS rules match the same element and set the same property, the browser needs a
winner. **Specificity** is a score for how targeted a selector is, and more specific selectors win,
no matter where they appear in the file.

## How it's counted

Think of three columns, compared from left to right:

| | IDs | Classes, attributes, pseudo-classes | Elements, pseudo-elements |
|---|---|---|---|
| `p` | 0 | 0 | 1 |
| `.note` | 0 | 1 | 0 |
| `p.note` | 0 | 1 | 1 |
| `#intro` | 1 | 0 | 0 |
| `nav a:hover` | 0 | 1 | 2 |

One ID beats any number of classes, and one class beats any number of element selectors. So
`.note` (0,1,0) beats `div div div p` (0,0,4).

```css
p        { color: black; }
.note    { color: blue; }     /* wins over p */
#intro   { color: green; }    /* wins over .note */
```

Inline `style="..."` beats all of these, and `!important` beats those, which is why it causes trouble.

## When specificity is tied

The **last** rule in the stylesheet wins (the order of the [cascade](/t/cascade)).

## Typical bugs and fixes

- **"My style isn't applying."** Open [DevTools](/t/browser-devtools), select the element and look
  for your rule crossed out. Another rule with higher specificity is winning.
- **Don't "fix" it by escalating** with `!important` or long selectors, since the next override will need
  to be bigger still.
- **Do** lower the specificity of the rule that's too strong, or match it with a similar selector placed
  later.

## Staying out of trouble

- Style with **single classes**, and avoid IDs and `!important` in your own styles.
- Keep selectors flat. Naming conventions like [BEM](/t/bem) help.
- [Cascade layers](/t/css-layers) let you control priority between groups of styles explicitly.

`*` and combinators like `>` add no specificity. Rules inside `:where()` count as zero.
