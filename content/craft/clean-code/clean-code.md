---
title: "Clean Code"
summary: "Code that's easy to read, change and trust."
levels: { backend: junior, frontend: junior }
aliases: ["clean code principles", "readable code"]
prereqs: ["readability", "naming"]
related: ["code-smell", "dry", "kiss", "single-responsibility-principle", "refactoring", "technical-debt"]
core: [backend, frontend]
---

Clean code is code that's easy to read, easy to change and easy to trust. It's measured by
how fast a new person can understand it and make a change without breaking something. It is
not measured by how clever it is.

The reason is simple: code is read far more often than it is written. Every shortcut that
saves you five minutes costs readers five minutes each time.

## Habits

- **Meaningful names.** `elapsed_days` over `d` (see [naming](/t/naming)).
- **Small functions that do one thing**, at one level of detail.
- **Little nesting.** Use [guard clauses](/t/guard-clause).
- **No surprises.** A function called `get_user` shouldn't also delete things
  ([least astonishment](/t/principle-of-least-astonishment)).
- **Comments explain *why*,** not what. If a comment explains what confusing code does,
  rewrite the code.
- **No dead code or duplication** ([DRY](/t/dry)).
- **Consistent style**, enforced by a formatter and linter ([style consistency](/t/code-style-consistency)).
- **Tests** that let you change things safely.

```python
# Before
def f(l):
    r = 0
    for x in l:
        if x[2] == 1:
            r += x[1] * x[0]
    return r

# After
def total_of_paid_orders(orders):
    return sum(o.price * o.quantity for o in orders if o.is_paid)
```

## Don't overdo it

Clean code isn't dogma. Rules like "functions under 5 lines" or "never repeat anything" can be
applied until the code is harder to follow. Use principles as guides, ask "will the next
reader understand this?" and follow your team's conventions. Clean code also grows
incrementally: leave each file a little tidier than you found it
([boy scout rule](/t/boy-scout-rule)).
