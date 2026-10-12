---
title: "Naming Things"
summary: "Choosing names that reveal intent; one of the hardest parts of programming."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: [variable names, identifier names]
prereqs: []
related: [readability, clean-code, magic-number, code-style-consistency, ubiquitous-language]
core: [backend]
---

A name is the cheapest documentation you have. Good names let a reader understand code
without opening anything else; bad ones make them reconstruct what you meant.

## Say what it is, not how it's stored

```python
# Hard to read
def calc(d, r):
    return d - d * r

# Easier
def price_after_discount(price, discount_rate):
    return price - price * discount_rate
```

Same logic, but the second version needs no explanation.

## Habits that help

- **Name for the meaning.** `days_until_expiry` beats `n`. Single letters are fine for tiny
  loops (`i`) and nothing else.
- **Functions are verbs, values are nouns.** `send_invoice()`, `invoice_total`.
- **Booleans read as yes/no questions.** `is_active`, `has_paid`, `can_edit`. Avoid
  negatives like `not_enabled`; `if not not_enabled` hurts.
- **Include units when it's not obvious.** `timeout_seconds`, `size_bytes`. This prevents
  real bugs when one place assumes milliseconds.
- **Don't abbreviate unless everyone knows it.** `customer` over `cstmr`. `url` and `id`
  are fine.
- **One word per concept.** If it's `user` in one file, don't call it `account` or
  `member` in the next, unless they really are different things.
- **Use your team's and language's conventions** (such as `snake_case` in Python,
  `camelCase` in JavaScript). Consistency matters more than which one you pick.

## When a name feels impossible

That usually means the code does too many things. If you can only name a function
`process_data_and_send_email`, split it into two. And rename freely: names are the easiest
thing to change with an editor's rename tool, and the cost of a bad one grows every day it
stays.
