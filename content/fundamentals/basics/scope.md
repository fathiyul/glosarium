---
title: "Scope"
summary: "The region of code where a name is visible."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["variable scope", "lexical scope", "local variable"]
prereqs: ["variable", "function"]
related: ["block-scope", "global-variable", "shadowing", "closure", "var-let-const"]
---

Scope is the region of code where a name can be used. Outside that region, the name doesn't exist.

```python
def f():
    x = 10          # local to f
    print(x)

f()
print(x)            # NameError: x isn't visible here
```

## The usual levels

- **Local**: inside a function (or block). Created when it runs, gone afterward.
- **Enclosing**: an outer function's variables, visible to inner functions. This is what makes [closures](/t/closure) work.
- **Global**: top of a file or module, visible everywhere in it ([global variables](/t/global-variable)).
- **Built-in**: names the language provides, like `len` or `console`.

When you use a name, the language looks in the current scope first, then outward. The first match wins.

```python
x = "global"
def f():
    x = "local"      # a new local x; the global is untouched
    return x
```

A local name with the same spelling as an outer one hides it ([shadowing](/t/shadowing)).

## Languages differ

JavaScript's `let` and `const` are block-scoped, but `var` is function-scoped. Python has no block scope: a variable made inside an `if` or `for` is visible after it ([block scope](/t/block-scope)).

## Why it's good

Scope keeps parts of a program from interfering. Variables you can't see can't be changed by accident. Keep variables in the **smallest scope** that works, and "name is not defined" errors usually mean you used a name outside its scope.
