---
title: "Loop"
summary: "Repeating code with for, while, do-while or for-each."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["for loop", "while loop", "repeat"]
prereqs: ["conditional", "variable"]
related: ["iteration", "control-flow", "off-by-one-error", "recursion", "map-filter-reduce"]
---

A loop repeats a block of code. Use one when you need to do the same thing many times, or until something becomes true.

```python
# for: repeat for each item or a fixed number of times
for i in range(3):
    print(i)              # 0, 1, 2

# while: repeat as long as a condition holds
attempts = 0
while attempts < 3 and not connected():
    attempts += 1
```

```js
for (let i = 0; i < 3; i++) { ... }
while (cond) { ... }
do { ... } while (cond);      // runs at least once
```

## Controlling a loop

- `break` leaves the loop.
- `continue` skips to the next round.

## Common bugs

- **Infinite loop.** The condition never becomes false because nothing in the loop changes it. Check that every path moves toward the exit.
- **[Off-by-one](/t/off-by-one-error).** Running one time too many or too few. Remember that `range(3)` is 0, 1, 2.
- **Changing the thing you're looping over**, which can skip or repeat items ([iteration](/t/iteration)).
- **Heavy work inside**, such as a network call per item.
- **Forgetting to reset** a counter or accumulator that should start fresh each round.

## for or while?

Use `for` when you know what you're looping over (a collection, or N times). Use `while` when you're waiting for a condition. Often a built-in like `sum`, `map` or `any` says what you mean more clearly than a hand-written loop ([map, filter, reduce](/t/map-filter-reduce)).

Loops and [recursion](/t/recursion) can solve the same problems.
