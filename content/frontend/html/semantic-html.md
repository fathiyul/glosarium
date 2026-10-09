---
title: "Semantic HTML"
summary: "Using elements for their meaning, like <nav>, <main> and <button>."
levels: { backend: junior, frontend: junior }
aliases: ["semantic elements", "semantic markup", "HTML5 semantic elements"]
prereqs: ["html-element"]
related: ["html-forms", "form-validation", "html-element", "responsive-images", "web-components"]
core: [frontend]
---

**Semantic HTML** means choosing elements for what the content *is*, not just how it looks. A
`<button>` is a button; a `<nav>` is navigation, not a `<div>` styled to look like one.

```html
<!-- Non-semantic -->
<div class="header"><div class="nav-link" onclick="go()">Home</div></div>

<!-- Semantic -->
<header>
  <nav><a href="/">Home</a></nav>
</header>
<main>
  <h1>Orders</h1>
  <article>...</article>
</main>
<footer>...</footer>
```

## Why it matters

- **Accessibility.** Screen readers use elements to announce structure and let users jump
  between landmarks and headings. A `<div>` has no meaning for them.
- **Free behavior.** A real `<button>` is focusable, activated by Enter and Space and
  announced as a button. A clickable `<div>` needs all of that rebuilt by hand, and it's usually done badly.
- **SEO and tooling.** Search engines and other programs understand the page structure.
- **Easier to read and style.**

## Common elements

| Use | Instead of a `<div>` for... |
|---|---|
| `<header>`, `<nav>`, `<main>`, `<footer>` | Page regions (one `<main>` per page) |
| `<article>`, `<section>`, `<aside>` | Self-contained content, topical groups, side content |
| `<h1>`-`<h6>` | Headings, in order, without skipping levels for styling |
| `<ul>`, `<ol>`, `<li>` | Lists |
| `<button>` vs `<a href>` | An action vs navigation to somewhere |
| `<label>`, `<fieldset>` | Form labels and groups |
| `<table>` | Real tabular data (not layout) |
| `<time>`, `<figure>`, `<img alt>` | Dates, figures, images with text alternatives |

## Rules of thumb

- If it **does something**, it's a `<button>`. If it **goes somewhere**, it's an `<a>`.
- Pick headings by structure, and change size with CSS.
- Use `<div>` and `<span>` only when no element fits.
- Always give meaningful images an `alt` text; decorative ones get `alt=""`.

You can check your pages by navigating with only the keyboard, and with the accessibility panel in DevTools.
