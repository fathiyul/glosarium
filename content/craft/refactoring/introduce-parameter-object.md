---
title: "Introduce Parameter Object"
summary: "Grouping parameters that travel together into one object."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["parameter object", "data clump refactoring"]
prereqs: ["extract-class"]
related: ["extract-class", "primitive-obsession", "data-type", "code-smell"]
---

Introduce parameter object is a refactoring where several parameters that always travel together are replaced by one object that holds them. It shrinks long argument lists and gives the group a name, which often reveals a concept the code didn't have before.

```python
# Before: the same three values are passed around together
def book_room(start, end, guests):
    ...

def price_room(start, end, guests):
    ...

# After: the group is a named type, and functions take one argument
from dataclasses import dataclass
from datetime import date

@dataclass(frozen=True)
class Stay:
    start: date
    end: date
    guests: int

def book_room(stay: Stay):
    ...

def price_room(stay: Stay):
    ...
```

The new type can also hold rules about the group, such as "the end date must be after the start", which would otherwise be repeated in every function.

The trade-off is that a parameter object couples the functions to one shape. A function that needs only the start date now depends on the whole `Stay`, and an object created only to avoid a long argument list adds a type without much meaning. Sometimes the simpler fix is to pass fewer values.

The classic mistake is creating a bag of unrelated fields and calling it a parameter object. The group should be a real concept, such as a stay, a range or a money amount. If the group is really a value with rules, it's a candidate for a [value object](/t/primitive-obsession). Extracting it may also reveal that the functions belong to the new type, which is a job for [extract class](/t/extract-class).
