---
title: "Output Encoding / Escaping"
summary: "Escaping data for the context it's inserted into."
levels: { backend: junior, frontend: junior }
aliases: ["escaping", "HTML escaping", "output escaping"]
prereqs: ["input-validation"]
related: ["xss", "xss-types", "html-entities", "sql-injection", "content-security-policy", "url-encoding"]
---

Output encoding (or escaping) means converting characters that have a special meaning in a particular place, so the browser, database or shell treats them as plain data instead of code.

The classic mistake: printing user input straight into a page.

```python
# Wrong: a comment of <script>steal()</script> runs in every visitor's browser
html = "<p>" + comment + "</p>"
```

In HTML, `<` becomes `&lt;` and `&` becomes `&amp;`, so the same comment shows up as visible text. That is the core defence against [XSS](/t/xss).

```python
from html import escape
html = "<p>" + escape(comment) + "</p>"   # <p>&lt;script&gt;steal()&lt;/script&gt;</p>
```

## The right encoding depends on the context

| Where the data lands | What to use |
|---|---|
| HTML text | HTML escaping (`&lt;`, `&amp;`) |
| HTML attribute | HTML escaping, with the attribute **quoted** |
| URL parameter | [URL encoding](/t/url-encoding) |
| JavaScript or JSON in a page | A proper JSON serializer, never string concatenation |
| SQL | Not escaping: use a [parameterized query](/t/parameterized-query) |

Encoding for the wrong context doesn't protect you. HTML-escaping a value that goes into a URL or a script block is not enough.

## In practice

- Use a template engine that escapes by default (Jinja2 autoescape, React's JSX, and similar) and treat any "raw" or "safe" switch as a red flag.
- Encode **at output**, as late as possible, not when data is saved. Stored data stays original; each destination gets its own encoding.
- If you must allow user HTML, run it through a maintained sanitizer. See [input sanitization](/t/input-sanitization).
- A [Content Security Policy](/t/content-security-policy) is a useful second layer, not a replacement.
