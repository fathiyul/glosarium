---
title: "Parameter vs Argument"
summary: "Parameters are in the definition; arguments are the values passed at the call."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["formal parameter", "actual argument", "parameters and arguments"]
prereqs: ["function"]
related: ["function", "default-parameter", "variadic-function", "return-value", "pass-by-value-vs-reference"]
---

Both words describe the values that flow into a function, but from two different points of view.

- A **parameter** is the name listed in the function's definition. It's a placeholder.
- An **argument** is the actual value passed in when the function is called.

```python
def greet(name, greeting):          # name, greeting: parameters
    return f"{greeting}, {name}"

greet("Ana", "Hello")               # "Ana", "Hello": arguments
```

People often use the words interchangeably, and you'll be understood. The distinction helps when reading error messages: *"takes 2 positional arguments but 3 were given"* is about the call.

## Ways to pass arguments

```python
greet("Ana", "Hi")                  # positional: matched by order
greet(greeting="Hi", name="Ana")    # keyword: matched by name, order doesn't matter
```

Keyword arguments make calls self-explanatory, especially for booleans ([flag arguments](/t/flag-argument)).

## Related features

- [Default parameters](/t/default-parameter) fill in missing arguments.
- [Variadic functions](/t/variadic-function) accept any number (`*args`, `...rest`).
- Whether a change to an argument inside the function affects the caller depends on the language and the type ([pass by value vs reference](/t/pass-by-value-vs-reference)).

## Common errors

- Wrong number of arguments.
- Arguments in the wrong order (two strings swapped, and nothing complains).
- Passing a value of the wrong type.
