---
title: "Static Member"
summary: "A field or method that belongs to the class rather than an instance."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["static method", "static field", "class method", "class variable"]
prereqs: ["class", "method"]
related: ["class", "method", "object", "global-variable", "constant"]
---

A static member is a field or method that belongs to the class itself, not to any one object. You use it through the class name, without creating an instance.

```java
class MathUtil {
    static final double TAX = 0.2;                       // static field (a constant)
    static int square(int n) { return n * n; }           // static method
}

MathUtil.square(5);       // 25, no object needed
```

```python
class Temperature:
    @staticmethod
    def c_to_f(c):                    # no self: it doesn't use an object
        return c * 9 / 5 + 32

    @classmethod
    def from_kelvin(cls, k):          # receives the class; handy as an alternative constructor
        return cls(k - 273.15)
```

```js
class Id { static next = 1; static generate() { return Id.next++; } }
```

## Static vs instance

| | Instance member | Static member |
|---|---|---|
| Belongs to | one object | the class |
| Has its own copy per object | yes | one shared copy |
| Can use `this` / `self` | yes | no |

## When to use

- **Utility functions** that don't depend on object state.
- **Constants** shared by all instances.
- **Factory methods** (`User.from_json(...)`).

## Cautions

- **Shared mutable static state is a [global variable](/t/global-variable)** in disguise: hard to test and unsafe across threads or requests.
- **Hard to replace in tests.** Code that calls static methods directly can't easily be swapped for a fake.
- **Overuse** turns a class into a bag of functions. A plain module may be clearer.
