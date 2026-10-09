---
title: "List"
summary: "An ordered collection; a dynamic array or a linked list depending on the language."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["lists", "dynamic array", "ArrayList"]
prereqs: ["array"]
related: ["array", "tuple", "indexing", "slicing", "set", "iteration"]
---

A list is an ordered collection that can grow and shrink. In Python it's the everyday collection type. In other languages it may be called an array, vector or `ArrayList`, or be a separate linked structure.

```python
tasks = ["write", "test"]
tasks.append("deploy")          # add at the end
tasks.insert(0, "plan")         # add at the front
tasks.remove("test")
tasks.pop()                     # remove and return the last
len(tasks)
tasks.sort()
sorted(tasks, reverse=True)     # returns a new list
```

## List or something else?

| Need | Better choice |
|---|---|
| Ordered items that change | list |
| A fixed collection that shouldn't change | [tuple](/t/tuple) |
| Fast "is this in there?" and no duplicates | [set](/t/set) |
| Lookup by key | [dictionary](/t/dictionary) |
| Fast add and remove at both ends | a deque (`collections.deque`) |

## Behaviors to know

- **Mutable.** Changing a list changes it for everyone holding a reference ([mutable vs immutable](/t/mutable-vs-immutable)).
- **`b = a` doesn't copy.** Use `a.copy()` or `list(a)`, and a deep copy for nested lists ([shallow vs deep copy](/t/shallow-vs-deep-copy)).
- **`in` is slow on big lists.** It scans every element. Use a set for repeated lookups.
- **Inserting or removing near the start is slow** for array-backed lists.
- **`sort()` changes the list and returns `None`**, a classic Python mistake.
- **Building with a comprehension** is idiomatic: `[x * 2 for x in nums if x > 0]`.

See [indexing](/t/indexing) and [slicing](/t/slicing).
