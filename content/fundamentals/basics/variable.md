---
title: "Variable"
summary: "A named reference to a value stored in memory."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["variables", "identifier"]
prereqs: ["data-type"]
related: ["constant", "scope", "data-type", "naming", "mutable-vs-immutable"]
---

A variable is a name that refers to a value, so you can use and change that value later.

```python
age = 30                 # create age, referring to 30
age = age + 1            # now refers to 31
name = "Ana"
```

`=` means assign: take the value on the right, and let the name on the left refer to it. It isn't the equality of mathematics.

## Declaring and typing

- **Python, JavaScript** (`let x = 1`): you just assign. The value has a type, the variable doesn't ([static vs dynamic typing](/t/static-vs-dynamic-typing)).
- **Java, Go, TypeScript**: the variable usually has a declared type, which is checked before the program runs.

```ts
let count: number = 0;
```

## Variables hold references

Assigning one variable to another copies the value for simple types, but for lists and objects both names refer to the same thing ([pass by value vs reference](/t/pass-by-value-vs-reference)):

```python
a = [1, 2]
b = a
b.append(3)
print(a)      # [1, 2, 3]
```

## Good habits

- **Choose descriptive names**: `retry_count`, not `x` ([naming](/t/naming)).
- **Use constants** for values that never change ([constants](/t/constant)).
- **Keep scope small.** Declare variables near where they're used ([scope](/t/scope)).
- **Initialize before use.** Reading an unassigned variable is an error or `undefined`.
- **Don't reuse one variable for two meanings.**
- Follow the language's naming style (`snake_case`, `camelCase`).
