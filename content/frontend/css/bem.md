---
title: "BEM"
summary: "A class naming convention: block__element--modifier."
levels: { frontend: junior }
aliases: ["Block Element Modifier", "BEM naming", "BEM methodology"]
prereqs: ["css-selector"]
related: ["css-architecture", "specificity", "css-modules", "utility-first-css", "naming"]
---

BEM (Block, Element, Modifier) is a naming convention for CSS classes that keeps styles predictable and avoids conflicts.

- **Block**: a standalone component: `card`, `menu`, `button`.
- **Element**: a part of a block, written with two underscores: `card__title`, `menu__item`.
- **Modifier**: a variation, written with two hyphens: `button--primary`, `card--featured`.

```html
<article class="card card--featured">
  <h2 class="card__title">Steel kettle</h2>
  <p class="card__price">$29.99</p>
  <button class="button button--primary card__action">Add</button>
</article>
```

```css
.card { border: 1px solid #ddd; }
.card--featured { border-color: gold; }
.card__title { font-size: 1.25rem; }
.button--primary { background: royalblue; }
```

## Why it helps

- **Flat, low specificity**: every selector is a single class, so there are no specificity fights ([specificity](/t/specificity)).
- **Self-explanatory names**: `card__title` tells you where it belongs.
- **No collisions**: a `.title` rule can't accidentally affect other components.
- **Easy to delete**: remove a block's CSS and markup together.

## Habits

- **Don't nest element names** (`card__body__title`). Flatten to `card__title`.
- **Use a modifier together with the base class**, not instead of it.
- **Don't style by tags or location**: avoid `.card h2` and `.sidebar .card`.
- **A block can be placed anywhere**, with no assumptions about its surroundings. Layout belongs to the parent.
- **Reuse blocks** inside other blocks (`card__action` mixed with `button`).

## Honest trade-offs

- Class names get long and repetitive.
- It's a convention, enforced only by discipline (linters can help).
- Modern alternatives, such as scoped styles, [CSS Modules](/t/css-modules) and [utility-first CSS](/t/utility-first-css), solve the same problems in other ways ([CSS architecture](/t/css-architecture)).

If your team uses BEM, follow it consistently ([following conventions](/t/following-conventions)).
