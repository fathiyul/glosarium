---
title: "HTML Entities"
summary: "Escaped characters like &amp; and &lt;."
levels: { backend: junior, frontend: junior }
aliases: ["character entities", "&amp", "escaping HTML"]
prereqs: ["html"]
related: ["xss", "output-encoding", "character-encoding", "html-element", "string-interpolation"]
---

HTML entities are codes that represent characters which would otherwise be read as part of the markup, or that are hard to type. They start with `&` and end with `;`.

| Entity | Shows | Why |
|---|---|---|
| `&lt;` | `<` | otherwise starts a tag |
| `&gt;` | `>` | |
| `&amp;` | `&` | otherwise starts an entity |
| `&quot;` | `"` | inside attribute values |
| `&#39;` or `&apos;` | `'` | |
| `&nbsp;` | a non-breaking space | keeps words together |
| `&copy;` | © | easy-to-type symbols |
| `&#8364;` or `&euro;` | € | numeric or named forms |

```html
<p>5 &lt; 10 &amp;&amp; 10 &gt; 5</p>          <!-- displays: 5 < 10 && 10 > 5 -->
<p>Use the &lt;strong&gt; tag for emphasis.</p>
```

## Why it matters most: escaping user input

If you put text into a page without escaping it, any `<` or `&` in it is treated as markup. A user who enters `<script>...</script>` could run code on your page: that's cross-site scripting ([XSS](/t/xss)).

```
user types:   <img src=x onerror=steal()>
unescaped:    runs the code
escaped:      &lt;img src=x onerror=steal()&gt;      shows as harmless text
```

The fix is to **escape output** for the HTML context ([output encoding](/t/output-encoding)):

- Modern frameworks and template engines do it automatically. Use `{{ value }}` in a template, `textContent` in the DOM, JSX braces.
- The danger is bypassing it: `innerHTML`, `dangerouslySetInnerHTML`, `|safe` filters.

```python
import html
html.escape("<b>Tom & Jerry</b>")     # '&lt;b&gt;Tom &amp; Jerry&lt;/b&gt;'
```

## Other notes

- Escaping for HTML text and for attributes, URLs and JavaScript are **different contexts** with different rules.
- With UTF-8 you can usually type characters like © or € directly, instead of entities ([UTF-8](/t/utf-8)).
- Entities aren't the same as [URL encoding](/t/url-encoding).
