---
title: "Pseudo-classes"
summary: "States like :hover, :focus and :nth-child."
levels: { frontend: junior }
aliases: ["pseudo-classes", ":hover", ":focus", ":nth-child"]
prereqs: ["css-selector"]
related: ["css-selector", "pseudo-element", "focus-visible", "has-selector", "specificity"]
---

A pseudo-class is a keyword added to a selector, starting with a colon, that matches an element in a particular state or position, without needing an extra class in the HTML.

```css
a:hover { text-decoration: underline; }            /* when the pointer is over it */
button:focus-visible { outline: 2px solid royalblue; }
input:disabled { opacity: 0.5; }
input:invalid { border-color: crimson; }
input:checked + label { font-weight: bold; }
li:first-child { font-weight: 700; }
tr:nth-child(even) { background: #f6f6f6; }
li:not(.done) { color: black; }
```

## Common ones

| Kind | Pseudo-classes |
|---|---|
| **User actions** | `:hover`, `:active`, `:focus`, `:focus-visible`, `:focus-within` |
| **Form state** | `:checked`, `:disabled`, `:required`, `:valid`, `:invalid`, `:placeholder-shown` |
| **Position** | `:first-child`, `:last-child`, `:nth-child(n)`, `:only-child` |
| **Logic** | `:not(...)`, `:is(...)`, `:where(...)`, `:has(...)` ([`:has`](/t/has-selector)) |
| **Links** | `:link`, `:visited` |
| **Other** | `:root`, `:empty`, `:target` |

## Notes

- **Specificity**: a pseudo-class counts like a class in [specificity](/t/specificity). `:where()` counts as zero.
- **Focus styles matter for accessibility.** Don't remove the outline without a replacement. Prefer `:focus-visible`, which shows only for keyboard users ([focus-visible](/t/focus-visible)).
- **Touch devices have no hover.** Don't hide essential content behind `:hover`.
- **`:visited` is restricted** for privacy: only a few properties (like color) can be changed.
- **Order of link states**: for links, the old rule "LVHA" (link, visited, hover, active) avoids conflicts.
- **Don't confuse** with [pseudo-elements](/t/pseudo-element), written with two colons (`::before`), which style a part of an element.

Pseudo-classes let you style behavior with CSS alone, which is often simpler and more robust than JavaScript.
