---
title: "Abstract Class"
summary: "A class that can't be instantiated and leaves some methods to subclasses."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["abstract base class", "ABC"]
prereqs: ["inheritance"]
related: ["interface", "mixin", "inheritance", "composition-over-inheritance"]
---

An abstract class is a base class you can't create objects from directly. It declares one or more methods without an implementation, and each subclass must provide them. It can also include concrete methods and shared state that every subclass inherits.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    def describe(self):
        return f"{self.__class__.__name__} with area {self.area():.2f}"

    @abstractmethod
    def area(self):
        ...

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14159 * self.r ** 2

Circle(2).describe()   # e.g. "Circle with area 12.57"
Shape()                # TypeError: can't instantiate abstract class
```

The abstract base holds the shared logic (`describe`), and each subclass fills in what differs (`area`). That's useful when several classes truly share behaviour and state.

The trade-off is that a subclass is tied to its parent. Inheritance is a single chain in many languages, so a class can inherit from only one abstract base, and changes to the base ripple into every subclass. If you find yourself adding many abstract methods, or a subclass only needs part of the base, you may want an [interface](/t/interface) or [composition](/t/composition-over-inheritance) instead.

The classic mistake is building a deep hierarchy of abstract classes to share a few lines of code. Each level adds coupling, and the code becomes hard to follow. Use an abstract class when a real "is-a" relationship exists and the shared behaviour is substantial, and keep the hierarchy shallow.
