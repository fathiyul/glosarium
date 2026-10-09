---
title: "Object"
summary: "An instance of a class holding its own state."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["instance", "objects", "object instance"]
prereqs: ["class", "variable"]
related: ["class", "attribute", "method", "mutable-vs-immutable", "equality-vs-identity"]
---

An object is a thing in your program that holds its own data (attributes) and has behavior (methods). Objects are made from a [class](/t/class), and each one is an instance of it.

```python
class Account:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0
    def deposit(self, amount):
        self.balance += amount

a = Account("Ana")      # one object
b = Account("Bo")       # another, with its own balance
a.deposit(100)
a.balance               # 100
b.balance               # 0
```

Each object has its own state, and they share only the class's code.

## Objects in other forms

In JavaScript, you can write an object directly, without a class:

```js
const user = { name: "Ana", greet() { return "Hi " + this.name; } };
```

Python's dictionaries, lists, even numbers and functions are all objects, with methods you can call.

## Things to know

- **Variables hold references.** Two names can point to the same object, and changing it through one shows up through the other ([equality vs identity](/t/equality-vs-identity), [pass by value vs reference](/t/pass-by-value-vs-reference)).
- **Most objects are mutable**, so copies need care ([shallow vs deep copy](/t/shallow-vs-deep-copy)).
- **Identity vs equality.** Two objects with the same contents aren't automatically the same object.
- **Lifetime.** Objects live while something refers to them, and are then cleaned up by the garbage collector.
- **Design objects around responsibilities**, with clear methods, rather than as bags of public fields ([encapsulation](/t/encapsulation)).
