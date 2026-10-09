---
title: "Shadowing"
summary: "An inner variable hiding an outer one with the same name."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["variable shadowing", "name shadowing"]
prereqs: ["scope"]
related: ["scope", "block-scope", "global-variable", "var-let-const", "naming"]
---

Shadowing is when a variable in an inner scope has the same name as one in an outer scope, so the inner one hides the outer one.

```js
let count = 10;

function demo() {
  let count = 1;        // shadows the outer count
  count += 1;
  return count;         // 2
}

demo();
console.log(count);     // still 10
```

Inside `demo`, the name `count` refers to the local one. The outer one is untouched, but you can't reach it from there.

## Why it causes bugs

- You think you're updating the outer variable, but you created a new one.

```python
total = 0
def add(x):
    total = total + x       # UnboundLocalError: assignment makes 'total' local
```

- In a loop or callback, a reused name like `i` or `item` hides the outer one, and the wrong value gets used.
- Built-in names get hidden: `list = [1, 2]` or `id = 5` means `list(...)` and `id(...)` stop working in that scope.

## Avoiding it

- **Use distinct names**, especially for outer variables that matter (`total_price`, not `x`).
- **Don't reuse built-in names** (`list`, `str`, `type`, `max`).
- **Keep functions small**, so there's little room for confusion.
- Turn on **linter rules** that warn about shadowing.

Shadowing is sometimes deliberate, such as a parameter named like a global it replaces. Be careful that it's intentional. See [scope](/t/scope) and [global variables](/t/global-variable).
