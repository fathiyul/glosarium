---
title: "Regular Expression"
summary: "A pattern language for matching and extracting text."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["regex", "regexp"]
prereqs: ["string"]
related: ["string", "pattern-matching", "regex-tools", "input-validation", "redos"]
---

A regular expression (regex) is a compact pattern for matching and extracting text.

```python
import re

re.search(r"\d{4}-\d{2}-\d{2}", "Due 2026-10-10")        # finds a date
re.findall(r"[\w.]+@[\w.]+", "a@x.com, b@y.org")          # ['a@x.com', 'b@y.org']
re.sub(r"\s+", " ", "too   many    spaces")                # 'too many spaces'
```

## The building blocks

| Pattern | Matches |
|---|---|
| `abc` | the literal text |
| `.` | any one character |
| `\d` `\w` `\s` | a digit, a word character, whitespace |
| `[aeiou]` | one character from the set |
| `*` `+` `?` | zero or more, one or more, optional |
| `{3}` `{2,4}` | an exact or ranged count |
| `^` `$` | start and end of the text |
| `( )` | a group, whose match you can capture |
| `a\|b` | a or b |

```python
m = re.match(r"(\d+)-(\w+)", "42-abc")
m.group(1)      # "42"
```

## Habits

- **Test patterns interactively** with a regex tool before putting them in code ([regex tools](/t/regex-tools)).
- **Anchor them** (`^...$`) when validating a whole value, or `"abc"` will match inside `"xabcx"`.
- **Don't parse HTML or complex formats** with regex. Use a real parser.
- **Be wary of emails and URLs.** Perfect patterns are enormous. Use a library, or a simple check plus a confirmation email.
- **Avoid catastrophic backtracking.** Nested repeats like `(a+)+` can take exponential time on bad input ([ReDoS](/t/redos)).
- Add a comment explaining what a long pattern is for. Future readers can't decode it quickly.
