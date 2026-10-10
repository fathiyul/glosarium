---
title: "Special Methods"
summary: "Methods the language calls implicitly, like __eq__ or toString."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["dunder methods", "magic methods", "__eq__"]
prereqs: ["class"]
related: ["interface", "truthy-falsy", "equality-vs-identity", "operator"]
---

Special methods are methods the language calls for you when it needs to do something with an object. In Python they have double underscores on both sides, which is why they're called dunder methods. Defining `__len__` lets `len(obj)` work, and defining `__eq__` lets `==` compare your objects.

```python
class Money:
    def __init__(self, cents):
        self.cents = cents

    def __eq__(self, other):
        return isinstance(other, Money) and self.cents == other.cents

    def __lt__(self, other):
        return self.cents < other.cents

    def __repr__(self):
        return f"Money({self.cents})"

Money(5) == Money(5)              # True
sorted([Money(9), Money(2)])      # [Money(2), Money(9)]
```

These methods make your type behave like the built-in ones, so code that uses it reads naturally. A `__repr__` that shows useful detail makes debugging much easier.

The trade-offs are about consistency. If you define `__eq__` in Python without `__hash__`, the class becomes unhashable, so it can't go in a set or be a dict key. That's deliberate, but it surprises people. Ordering methods should agree with equality, and comparing objects of different types should return `NotImplemented` or a clear error rather than guessing.

The classic mistake is making operators do something surprising, such as `+` meaning "merge with a database", or making `__eq__` expensive. Readers expect these operators to behave like arithmetic and equality. Use special methods to make a type fit its natural meaning, and nothing beyond that. See [interfaces](/t/interface) for the wider idea of agreeing on behaviour.
