---
title: "Selector"
summary: "The pattern that chooses which elements a rule applies to."
levels: { frontend: junior }
aliases: ["CSS selectors", "selectors", "class selector", "id selector"]
prereqs: ["html-element"]
related: ["specificity", "cascade", "pseudo-class", "pseudo-element", "has-selector", "css"]
core: [frontend]
---

A **selector** is the part of a CSS rule that says *which elements* the styles apply to.

```css
button { ... }        /* selector */
.card  { ... }
```

## The basic kinds

| Selector | Matches | Example |
|---|---|---|
| Element (type) | Every element of that tag | `p` |
| Class | Elements with that class | `.card` |
| ID | The element with that id (should be unique) | `#header` |
| Attribute | By attribute | `input[type="email"]` |
| Universal | Everything | `*` |

## Combining them

| Pattern | Meaning |
|---|---|
| `nav a` | Any `a` **inside** `nav` (descendant) |
| `ul > li` | `li` that is a **direct child** of `ul` |
| `h2 + p` | The `p` **immediately after** an `h2` |
| `h2 ~ p` | Any `p` **after** an `h2`, with the same parent |
| `button.primary` | A `button` that **also** has class `primary` (no space) |
| `h1, h2, h3` | **Any** of these (a list; the rule applies to each) |

The space in `.card .title` versus none in `.card.title` is a classic source of confusion: the first
means "a `.title` inside a `.card`", the second means "one element with both classes".

```css
.card .title { font-weight: 700; }
.card.featured { border-color: gold; }
a:hover { text-decoration: underline; }      /* pseudo-class: a state */
p::first-line { font-weight: bold; }         /* pseudo-element: a part of an element */
```

[Pseudo-classes](/t/pseudo-class) (`:hover`, `:focus`, `:nth-child(2)`) select by state or
position; [pseudo-elements](/t/pseudo-element) (`::before`, `::after`) select a part of an element.

## Habits

- **Prefer classes.** They're reusable and have low [specificity](/t/specificity).
- **Don't style by IDs** or long chains like `div > div > ul li a`, which break when HTML changes.
- **Keep selectors short** so they're easy to read and override.
- In [DevTools](/t/browser-devtools), the selector for each rule is shown, so you can see which ones match
  an element, and which lose.

When two rules match the same element and disagree, the winner is decided by the
[cascade](/t/cascade) and specificity.
