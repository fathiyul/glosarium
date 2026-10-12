---
title: "First-Class Functions"
summary: "Functions treated as values that can be stored, passed and returned."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["first-class functions", "functions as values", "functions as first class citizens"]
prereqs: ["function", "variable"]
related: ["higher-order-function", "arrow-function", "closure", "lambda", "callback"]
---

A language has first-class functions when functions are values like any other: you can store them in variables, pass them as arguments, return them from other functions, and keep them in lists.

```python
def shout(text):
    return text.upper() + "!"

f = shout                         # store a function in a variable
f("hi")                           # "HI!"

def apply_twice(func, x):         # pass a function as an argument
    return func(func(x))

apply_twice(shout, "hi")          # "HI!!"

def make_adder(n):                # return a function
    return lambda x: x + n

add5 = make_adder(5)
add5(10)                          # 15

handlers = {"upper": str.upper, "lower": str.lower}     # functions in a dictionary
handlers["upper"]("abc")
```

Python, JavaScript, Go, Rust and most modern languages work this way.

## Why it's powerful

- **Callbacks**: tell a library what to do when something happens (`button.onclick = save`).
- **Strategy choices without classes**: pick behavior from a dictionary instead of a chain of `if`s.
- **Configuration with behavior**: pass in how to sort, filter or retry.
- **Building blocks**: functions that make or combine functions ([higher-order functions](/t/higher-order-function), [closures](/t/closure)).

## Remember

- **Pass the function, don't call it.** `onclick = save`, not `onclick = save()`, which runs it immediately and passes its result.
- A function passed around keeps access to the variables where it was defined ([closures](/t/closure)).
- In languages where functions aren't first-class (older Java, C), you use interfaces or function pointers instead.
