---
title: "CSS Grid"
summary: "Two-dimensional layout with rows and columns."
levels: { frontend: junior }
aliases: ["CSS Grid", "grid layout", "display: grid", "CSS grid layout"]
prereqs: ["box-model", "display-property"]
related: ["flexbox", "responsive-design", "media-query", "css-units", "logical-properties"]
core: [frontend]
---

CSS Grid is a layout system for arranging items in **rows and columns at the same time**. Use it when
you're designing the overall structure of a page or a grid of cards.

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* three equal columns */
  gap: 16px;                               /* spacing between cells */
}
```

```html
<div class="gallery">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>   <!-- wraps to a second row -->
</div>
```

`fr` is a "fraction of the free space" unit, so `1fr 2fr` makes the second column twice as wide.

## A responsive grid without media queries

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
```

This fits as many columns of at least 220px as the container allows and stretches them to fill the
row. It adapts from a phone to a desktop automatically.

## Page layouts with named areas

```css
.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.page > header { grid-area: header; }
.page > nav    { grid-area: sidebar; }
```

You can also place items on specific lines (`grid-column: 1 / 3`) and span cells.

## Grid or Flexbox?

- **[Flexbox](/t/flexbox)** is one-dimensional: items in a row *or* a column, where content decides sizes.
- **Grid** is two-dimensional: you define the tracks, then put content in them.

They work together. Use grid for the page frame, flexbox inside components such as a button row.
Rule of thumb: if you want things to line up in both directions, reach for Grid.
