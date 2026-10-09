---
title: "Attribute"
summary: "Extra information on an element, like href or alt."
levels: { backend: junior, frontend: junior }
aliases: ["HTML attributes", "attribute", "href", "alt"]
prereqs: ["html-element"]
related: ["html-element", "data-attributes", "semantic-html", "input-types", "html-forms"]
---

An attribute is extra information inside an HTML element's opening tag, written as `name="value"`.

```html
<a href="/pricing" target="_blank" rel="noopener">Pricing</a>
<img src="kettle.webp" alt="A steel kettle" width="400" height="300">
<input type="email" name="email" required>
<div id="cart" class="panel highlighted" hidden>...</div>
```

## Common ones

| Attribute | Used on | Purpose |
|---|---|---|
| `id` | any | a unique identifier, for links and scripts |
| `class` | any | one or more names for styling and selection |
| `href` | `<a>`, `<link>` | where a link goes |
| `src` | `<img>`, `<script>` | the file to load |
| `alt` | `<img>` | a text alternative ([alt text](/t/alt-text)) |
| `type`, `name`, `value` | `<input>` | what kind of field it is, and what's submitted ([forms](/t/html-forms)) |
| `placeholder`, `required`, `disabled` | form fields | hints and behavior |
| `style` | any | inline CSS (use classes instead) |
| `data-*` | any | your own data ([data attributes](/t/data-attributes)) |
| `aria-*`, `role` | any | accessibility ([ARIA](/t/aria)) |

## Boolean attributes

Some attributes are on or off, and only their presence matters:

```html
<button disabled>Save</button>       <!-- disabled="false" would STILL be disabled -->
```

To turn it off, remove the attribute (in JavaScript, `button.disabled = false` or `removeAttribute`).

## Working with them in JavaScript

```js
link.getAttribute("href");
link.setAttribute("href", "/new");
link.hasAttribute("target");
link.removeAttribute("target");
```

Many attributes are also available as properties (`img.src`, `input.value`), though attribute and property can differ (an input's current `value` vs its original `value` attribute).

## Tips

- Always use **quotes** around values.
- **`id` values must be unique** on a page.
- Attribute names are case-insensitive, and conventionally lowercase.
- Untrusted data put into attributes must be escaped, or it enables XSS ([XSS](/t/xss)).
