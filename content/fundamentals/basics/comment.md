---
title: "Code Comment"
summary: "Text for humans in code, best used to explain why rather than what."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["code comments", "comments", "inline comment", "docstring"]
prereqs: ["readability"]
related: ["naming", "readability", "clean-code", "magic-number", "technical-writing"]
---

A **comment** is text in source code that the computer ignores, written for **humans**.

```python
# Single-line comment
x = 5  # inline comment

"""A docstring: documentation attached to a function."""
```

```js
// single line
/* multiple
   lines */
```

## What good comments say: **why**

The code already shows *what* it does. A comment earns its place by explaining **why**: a decision, a surprise, a constraint the code can't express.

```python
# Bad: repeats the code
i = i + 1   # add one to i

# Good: explains a reason
# The API returns timestamps in local time, so convert to UTC before comparing.
created = to_utc(row["created"])

# Good: warns about a trap
# Don't sort here: the caller relies on insertion order.
```

## Habits

- **Prefer clearer code to a comment that explains confusing code.** Rename a variable, extract a function ([naming](/t/naming), [readability](/t/readability)).
- **Keep comments up to date.** A comment that's wrong is worse than none.
- **Don't comment out old code and leave it.** Version control remembers it ([Git](/t/git)).
- **Use `TODO` with context** (who or what ticket), and follow up.
- **Document public functions** (parameters, return values, errors) with docstrings, since tools turn them into help and autocomplete.
- **Link to the source of a non-obvious decision**: a ticket, a spec, an issue.
- **Never put secrets** in comments.

See [clean code](/t/clean-code) for the broader view.
