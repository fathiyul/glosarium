---
title: "Method"
summary: "A function that belongs to an object or class."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["member function", "instance method"]
prereqs: ["function", "class"]
related: ["class", "object", "this-self", "static-member", "method-overriding"]
---

A method is a function that belongs to a class or object. It works on that object's data.

```python
class Cart:
    def __init__(self):
        self.items = []

    def add(self, item):                 # a method
        self.items.append(item)

    def total(self):
        return sum(i.price for i in self.items)

cart = Cart()
cart.add(book)          # called on an object
cart.total()
```

The object is passed in automatically, and shows up as `self` (Python) or `this` (JavaScript, Java) inside the method ([this and self](/t/this-self)).

## Kinds

| Kind | Belongs to | Example |
|---|---|---|
| Instance method | one object, can use its data | `cart.add(item)` |
| Static / class method | the class itself, no object needed | `Cart.from_json(text)` ([static members](/t/static-member)) |

## Function or method?

If it needs the object's data, make it a method. If it doesn't use any, a plain function (or a static method) is often clearer. Not everything has to live in a class.

## Common mistakes

- Forgetting `self` as the first parameter in Python, and getting "takes 1 positional argument but 2 were given".
- Passing a method as a callback and losing its object. In JavaScript, `button.onclick = obj.handle` calls it with the wrong `this` ([this binding](/t/this-binding)).
- Methods that do too much. Name them for one action (`add`, `total`), and keep them short.
- A parent's method can be replaced in a subclass ([method overriding](/t/method-overriding)).
