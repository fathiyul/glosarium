---
title: "Variadic Function"
summary: "A function that accepts any number of arguments."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["varargs", "rest parameters", "*args", "**kwargs"]
prereqs: ["function", "parameter-vs-argument"]
related: ["spread-operator", "parameter-vs-argument", "default-parameter", "destructuring"]
---

A variadic function accepts any number of arguments.

```python
def total(*numbers):              # numbers is a tuple
    return sum(numbers)

total(1, 2, 3)        # 6
total()               # 0
```

```js
function total(...numbers) {      // numbers is an array
  return numbers.reduce((a, b) => a + b, 0);
}
total(1, 2, 3);
```

`print`, `max`, `console.log` and `format` functions are all variadic.

## Keyword arguments

Python's `**kwargs` collects extra named arguments into a dictionary:

```python
def log(message, **fields):
    print(message, fields)

log("saved", user=42, ms=17)      # fields = {'user': 42, 'ms': 17}
```

## Passing a list as arguments

The reverse operation unpacks a collection into separate arguments ([spread and rest](/t/spread-operator)):

```python
nums = [1, 2, 3]
total(*nums)          # same as total(1, 2, 3)
```

```js
total(...nums);
```

## Cautions

- **Fixed parameters should come first**, then the variadic one.
- **Typos pass silently.** A `**kwargs` function accepts misspelled options. Validate known names.
- **Unclear signatures.** If a function can take "anything", callers can't see what's valid. When arguments have different meanings, use named parameters or an options object ([default parameters](/t/default-parameter)).
- **Wrappers** use `*args, **kwargs` to pass everything through, which is common in decorators but hides the real signature.
- Very long argument lists have limits in some languages.
