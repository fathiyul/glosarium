---
title: "HTML"
summary: "The markup language that structures web pages."
levels: { backend: junior, frontend: junior }
aliases: ["HyperText Markup Language", "HTML5", "markup"]
prereqs: ["browser"]
related: ["html-element", "html-attribute", "css", "javascript", "semantic-html", "dom"]
---

HTML (HyperText Markup Language) is the language that defines the structure and content of web pages: headings, paragraphs, links, images, forms. It describes what things are. CSS controls how they look, and JavaScript controls how they behave.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a <a href="/about">simple page</a>.</p>
    <img src="photo.jpg" alt="A mountain at dawn">
  </body>
</html>
```

A page is a tree of [elements](/t/html-element), each with optional [attributes](/t/html-attribute). The browser parses it into the [DOM](/t/dom).

## The three languages of the web

| | Role |
|---|---|
| **HTML** | structure and meaning |
| **CSS** | presentation and layout |
| **JavaScript** | behavior and interactivity |

## What to learn first

- The basic page skeleton above.
- **Text, links and images**, and lists.
- **[Semantic elements](/t/semantic-html)**: `header`, `nav`, `main`, `button`, which give meaning, accessibility and free behavior.
- **[Forms](/t/html-forms)** for collecting input.
- **[Head and meta tags](/t/html-head-meta)**.

## Good habits

- **Use the right element for the job.** A link is `<a>`, a button is `<button>`.
- **Write valid, well-nested HTML**, and keep it readable.
- **Keep styling in CSS**, not in HTML attributes.
- **Give images `alt` text** ([alt text](/t/alt-text)).
- **Think accessibility from the start** ([accessibility](/t/accessibility)).
- Browsers are forgiving of errors, so check the DOM in DevTools to see what they made of it.

HTML isn't a programming language. It has no logic or loops, and it's declarative markup. Modern frameworks generate HTML from components, but the output is still HTML, so understanding it remains essential.
