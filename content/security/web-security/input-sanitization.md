---
title: "Input Sanitization"
summary: "Cleaning untrusted input, and why validation and escaping matter more."
levels: { backend: junior, frontend: junior }
aliases: ["sanitizing input", "input cleaning", "sanitisation"]
prereqs: ["input-validation"]
related: ["input-validation", "output-encoding", "parameterized-query", "sql-injection", "xss"]
---

Sanitization means cleaning untrusted input by removing or changing parts of it, for example stripping `<script>` tags from a comment. The tempting idea is "clean everything on the way in and it's safe".

That idea is the classic mistake. Safety depends on **where the data ends up**, and at input time you don't know:

- In an HTML page, `<` must become `&lt;`.
- In a SQL query, a quote is the problem.
- In a shell command, `;` and `$()` are.
- In a plain text email, none of those matter and mangling them corrupts the data.

A name like `O'Brien` is fine data, but a blanket "remove quotes" filter breaks it, and filters like that are often bypassed anyway.

## What to do instead

1. **[Validate](/t/input-validation)** input against what you expect: type, length, range, allowed characters. Reject what doesn't fit.
2. **Use the right defence at the point of use:**
   - SQL: [parameterized queries](/t/parameterized-query), never string concatenation. See [SQL injection](/t/sql-injection).
   - HTML: [output encoding](/t/output-encoding), usually done by your template engine. See [XSS](/t/xss).
3. **Sanitize only when you must accept rich input**, such as user-written HTML, and then use a maintained sanitizer library with an allow-list. Don't write regexes to strip tags.

```python
# Wrong: trying to clean the string
q = "SELECT * FROM users WHERE name = '" + name.replace("'", "") + "'"

# Right: the driver keeps data and code separate
cur.execute("SELECT * FROM users WHERE name = %s", (name,))
```

(The placeholder style, `%s` here, depends on the database driver.)
