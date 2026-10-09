---
title: "Element and Tag"
summary: "The building blocks of HTML, like <p> and <a>."
levels: { backend: junior, frontend: junior }
aliases: ["HTML tag", "tag", "HTML elements"]
prereqs: ["html"]
related: ["html-attribute", "semantic-html", "dom", "html-forms", "html-head-meta"]
---

An element is a building block of an HTML page: an opening tag, some content and a closing tag. Tags are the labels, and elements are the whole thing.

```html
<p>Hello, <strong>world</strong>!</p>
```

- `<p>` is the opening tag, `</p>` is the closing tag.
- Everything between is the content, and can include other elements (here, `<strong>`).
- Elements nest, and form a tree ([the DOM](/t/dom)).

## Void elements

Some elements have no content and no closing tag:

```html
<img src="kettle.webp" alt="A kettle">
<br>
<input type="text">
<meta charset="utf-8">
```

## Block vs inline

- **Block elements** start on a new line and take the full width: `<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`.
- **Inline elements** flow within text: `<a>`, `<span>`, `<strong>`, `<img>`.

CSS can change this ([display property](/t/display-property)).

## Elements you'll use constantly

| Purpose | Elements |
|---|---|
| Text | `h1`-`h6`, `p`, `strong`, `em`, `blockquote` |
| Links and media | `a`, `img`, `video` |
| Lists | `ul`, `ol`, `li` |
| Structure | `header`, `nav`, `main`, `section`, `article`, `footer` ([semantic HTML](/t/semantic-html)) |
| Forms | `form`, `input`, `label`, `button`, `select` ([forms](/t/html-forms)) |
| Tables | `table`, `tr`, `td`, `th` |
| Generic containers | `div`, `span` |

## Tips

- **Choose elements for meaning**, not looks: a button is `<button>`, not a styled `<div>` ([semantic HTML](/t/semantic-html)).
- **Close tags and nest properly.** Browsers forgive mistakes, but the result may not be what you intended.
- **Details go in [attributes](/t/html-attribute).**
- Validate your HTML if something renders oddly.
