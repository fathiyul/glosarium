---
title: "Decorator"
summary: "Adding behavior to an object by wrapping it."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["decorator pattern", "wrapper pattern"]
prereqs: ["design-pattern"]
related: ["proxy-pattern", "adapter-pattern", "composite-pattern", "chain-of-responsibility"]
---

The decorator pattern adds behaviour to an object by wrapping it in another object with the same interface. The wrapper does its extra work and then calls the object it wraps. Several decorators can be stacked, so the features combine without a subclass for every combination.

```python
class Coffee:
    def cost(self):
        return 2.00

class WithMilk:
    def __init__(self, drink):
        self.drink = drink

    def cost(self):
        return self.drink.cost() + 0.50

class WithSyrup:
    def __init__(self, drink):
        self.drink = drink

    def cost(self):
        return self.drink.cost() + 0.75

order = WithSyrup(WithMilk(Coffee()))
order.cost()   # 3.25
```

Each wrapper has the same `cost` method as the coffee it wraps, so the caller doesn't care how many layers there are.

Python also has a separate feature, the `@decorator` syntax, which applies a function that takes a function and returns a new one. A function such as `@functools.lru_cache` is an example. It's a related idea, but it's a language feature for functions, not the object-wrapping pattern described here.

The trade-off is the number of small classes, and the order of the wrappers can matter. A decorator that changes the result, such as a discount applied before tax, depends on its position in the stack. Debugging a long stack of wrappers can be harder than debugging one class.

The classic mistake is building a subclass for each feature combination, which explodes in number. Use decorators when features combine freely. If the wrapper's job is to control access or create on demand, a [proxy](/t/proxy-pattern) is the better fit, and if it's to match a different interface, use an [adapter](/t/adapter-pattern).
