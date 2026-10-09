---
title: "Switch / Match"
summary: "Choosing between many branches based on a value."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["switch case", "match statement", "case statement"]
prereqs: ["conditional"]
related: ["conditional", "ternary-operator", "control-flow", "pattern-matching", "polymorphism"]
---

A switch (or match) statement chooses one of many branches based on the value of a single expression. It's a tidier alternative to a long `if / else if` chain.

```js
switch (status) {
  case "paid":
    ship();
    break;
  case "pending":
  case "processing":          // two values, one branch
    wait();
    break;
  default:
    reject();
}
```

```python
match status:                  # Python 3.10+
    case "paid":
        ship()
    case "pending" | "processing":
        wait()
    case _:                    # default
        reject()
```

## The classic bug: fall-through

In C, Java and JavaScript, a `case` without `break` keeps running into the next one:

```js
case "paid":
  ship();          // forgot break: continues into the next case
case "pending":
  wait();
```

Python's `match` and many newer languages don't fall through.

## Habits

- **Always include a default**, to handle values you didn't expect.
- **Use it for fixed sets of values** (enum, status). For ranges and complex conditions, `if` is clearer.
- **Consider a lookup table** when each case just returns a value:

```python
SHIPPING = {"standard": 4.99, "express": 12.99}
fee = SHIPPING[method]
```

- **A growing switch on type** is a sign to use polymorphism instead, so each type carries its own behavior.
- Newer `match` statements can destructure values and check shapes ([pattern matching](/t/pattern-matching)).
