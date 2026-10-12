---
title: "this / self"
summary: "The reference to the current object inside a method."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["this", "self", "this keyword"]
prereqs: ["class", "method"]
related: ["method", "class", "object", "arrow-function", "this-binding"]
---

Inside a method, `this` (JavaScript, Java, C#) or `self` (Python) is the object the method was called on. It's how the method reaches that object's own data.

```python
class Counter:
    def __init__(self):
        self.count = 0
    def increment(self):
        self.count += 1          # "my" count

a = Counter()
a.increment()                    # self is a
```

```js
class Counter {
  count = 0;
  increment() { this.count++; }
}
```

In Python, `self` is an explicit first parameter of each method. In JavaScript, `this` is implicit.

## The JavaScript surprise

In JavaScript, `this` depends on **how the function is called**, not where it's written:

```js
const c = new Counter();
c.increment();                  // this is c: works
const f = c.increment;
f();                            // this is undefined or the global: breaks
setTimeout(c.increment, 100);   // same problem
```

Fixes:

```js
setTimeout(() => c.increment(), 100);       // call it as a method inside an arrow function
setTimeout(c.increment.bind(c), 100);       // bind it to c
```

[Arrow functions](/t/arrow-function) don't have their own `this`. They use the one from where they were written, which is why they suit callbacks inside methods ([this binding](/t/this-binding)).

## Common mistakes

- **Forgetting `self.`** in Python: `count += 1` inside a method makes a local variable, not the attribute.
- **Losing `this` when passing methods around** as callbacks.
- Using `this` in a plain function or at the top level, where it may be `undefined`.

In Python, the name `self` is a convention, not a keyword, but always use it.
