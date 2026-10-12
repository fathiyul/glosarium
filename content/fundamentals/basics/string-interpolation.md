---
title: "String Interpolation"
summary: "Embedding values directly inside a string literal."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["string formatting", "template literal", "f-string"]
prereqs: ["string"]
related: ["string", "template-literals", "naming", "sql-injection", "internationalization"]
---

String interpolation puts values directly inside a string, instead of joining pieces with `+`.

```python
name, count = "Ana", 3
f"Hello {name}, you have {count} messages"       # f-string (Python)
```

```js
`Hello ${name}, you have ${count} messages`      // template literal (JavaScript)
```

Compare with concatenation:

```python
"Hello " + name + ", you have " + str(count) + " messages"
```

The interpolated version is easier to read, and in Python you don't need `str()` for each number.

## Expressions and formatting

```python
f"Total: {price * qty:.2f}"        # 2 decimal places
f"{name!r}"                         # the repr, handy for debugging
```

```js
`Total: ${(price * qty).toFixed(2)}`
```

## Other styles

- Python: `"Hi {}".format(name)`, and the older `"Hi %s" % name`.
- Java: `String.format("Hi %s", name)`.
- Languages with no built-in interpolation use a formatting function.

## Cautions

- **Don't interpolate untrusted input into SQL, HTML or shell commands.** Use parameterized queries and escaping, or you invite injection ([SQL injection](/t/sql-injection), [XSS](/t/xss)).
- **Don't log secrets** by interpolating whole objects.
- **Translatable text**: building sentences from pieces breaks in other languages. Use a message template with named placeholders ([internationalization](/t/internationalization)).
- **Dates and numbers** have locale-specific formats. Use formatting functions, not manual string work.
- In logging, prefer the logger's own formatting (`log.info("order %s", order_id)`) so formatting is skipped when the level is off.
