---
title: "Field / Property"
summary: "A piece of data stored on an object."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["field", "property", "member variable", "instance variable"]
prereqs: ["class"]
related: ["class", "object", "getter-setter", "constructor", "access-modifier"]
---

An attribute (also called a field or property) is a piece of data stored on an object.

```python
class Product:
    def __init__(self, name, price):
        self.name = name          # attributes
        self.price = price

p = Product("Kettle", 29.99)
p.name                            # "Kettle"
p.price = 24.99                   # change it
p.stock = 12                      # Python lets you add new ones on the fly
```

```js
const p = { name: "Kettle", price: 29.99 };    // object literal
p.name;
```

Each object has its own copy of its attributes, so two `Product` objects can hold different prices.

## Kinds

- **Instance attributes**: belong to one object (`self.price`).
- **Class attributes**: shared by every object of the class (`Product.tax_rate`). Be careful with mutable ones such as lists, because all instances share them.
- **Computed properties**: look like attributes, but are calculated when read ([getters and setters](/t/getter-setter)).

```python
@property
def price_with_tax(self):
    return self.price * 1.2
```

## Naming

Many languages use different words for similar things: *field* (Java, C#), *property* (JavaScript, C#), *attribute* (Python), *member variable* (C++). They all mean data on an object.

## Habits

- **Initialize every attribute in the constructor**, so objects start complete ([constructors](/t/constructor)).
- **Keep internal ones private** by convention or modifier ([access modifiers](/t/access-modifier)).
- **Don't store what you can compute** (a total from line items), or it can go out of sync.
- **Misspelled names create silent bugs** in dynamic languages: `p.pric = 5` adds a new attribute.
