---
title: "Boolean Flag Arguments"
summary: "Passing true/false to switch a function's behavior, and why it hurts readability."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["boolean parameter", "flag parameter", "boolean flag argument", "boolean trap"]
prereqs: ["boolean", "function"]
related: ["readability", "naming", "single-responsibility-principle", "default-parameter"]
---

A **flag argument** is a boolean parameter that switches a function between two behaviors:

```python
render(page, True)        # what does True mean?
send_email(user, False)
```

At the call site, `True` and `False` say nothing. Readers must open the function to learn what they do. And the function now does **two things**, chosen by the flag, which usually means it should be two functions.

## Better options

**Split into two functions:**

```python
render_for_print(page)
render_for_screen(page)
```

**Name the argument at the call site** (keyword arguments):

```python
send_email(user, include_attachments=False)
```

```js
sendEmail(user, { includeAttachments: false });   // an options object in JavaScript
```

**Use an enum** when there may be more than two modes:

```python
render(page, mode=RenderMode.PRINT)
```

## Why it hurts

- **Readability**: `connect(host, True, False)` is a puzzle.
- **Hidden complexity**: an `if flag:` inside the function means two code paths to test.
- **Growth**: a second flag makes four combinations, a third makes eight.

## When it's fine

A flag with a clear, self-evident meaning, passed by keyword (`verbose=True`), or a setter like `setVisible(true)`, is OK. The problem is the **unlabeled** boolean that switches behavior. See [boolean](/t/boolean) and [single responsibility](/t/single-responsibility-principle).
