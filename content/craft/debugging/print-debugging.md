---
title: "Print Debugging"
summary: "Adding temporary output to see what code is doing."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["printf debugging", "console.log debugging", "log debugging"]
prereqs: ["debugging"]
related: ["debugger", "breakpoint", "logging", "binary-search-debugging", "reading-error-messages"]
---

Print debugging means adding temporary output to a program to see what it's doing: which branch ran, and what the values were.

```python
def apply_discount(order):
    print("DEBUG order:", order.id, order.total, order.coupon)     # what came in?
    if order.coupon:
        print("DEBUG coupon branch")
        ...
```

```js
console.log("user", user);
console.table(items);
console.log({ total, tax });      // prints names with values
```

It's quick, works anywhere (servers, scripts, tests, CI), and needs no tools.

## Making it useful

- **Label what you print**: `print("subtotal:", subtotal)`, not just `print(subtotal)`.
- **Print inputs and outputs** around the suspect code, to narrow the problem ([divide and conquer](/t/binary-search-debugging)).
- **Show types and edge values**: `repr(x)` shows quotes, whitespace and `None`.
- **Add context**: IDs, loop indexes, timestamps.
- **Print in loops sparingly**, or you'll drown. Limit to a condition.
- Use the **right stream**: errors to stderr.

## Remember to clean up

- **Remove it before committing.** Stray prints end up in production logs. Search for `DEBUG`, or use a unique marker.
- **Never print secrets, tokens or personal data.**
- For output you want to keep, use proper [logging](/t/logging) with levels, instead of prints.

## Print or debugger?

Prints are great when you can't attach a debugger, for timing-sensitive code, and when you want a record of a whole run. A [debugger](/t/debugger) is better when you don't yet know which value matters, because you can inspect everything at the pause point without re-running. Good engineers use both.

If nothing prints, the code might not be running, which is useful information too.
