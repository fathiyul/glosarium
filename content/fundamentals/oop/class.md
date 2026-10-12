---
title: "Class"
summary: "A blueprint for creating objects."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["classes", "class definition", "blueprint"]
prereqs: ["function", "variable"]
related: ["object", "constructor", "attribute", "method", "inheritance", "encapsulation"]
---

A class is a blueprint for creating objects. It defines what data each object holds (fields) and what it can do (methods).

```python
class Account:
    def __init__(self, owner, balance=0):     # constructor
        self.owner = owner                    # fields
        self.balance = balance

    def deposit(self, amount):                # method
        self.balance += amount

a = Account("Ana")          # create an object (an instance)
a.deposit(50)
print(a.balance)            # 50
```

```js
class Account {
  constructor(owner) { this.owner = owner; this.balance = 0; }
  deposit(amount) { this.balance += amount; }
}
```

The class is the design. Each `Account(...)` call builds one separate object from it, with its own data.

## Why use classes

- **Bundle data with the behavior that goes with it**, so rules live next to what they protect ([encapsulation](/t/encapsulation)).
- **Create many similar things** without repeating code.
- **Model the domain**: `Order`, `User`, `Invoice`.
- **Share and extend** behavior ([inheritance](/t/inheritance)).

## Remember

- **Not everything needs a class.** A plain function or a dictionary is often simpler. Python and JavaScript don't force you to wrap everything.
- **Class-level vs instance data.** Something declared on the class is shared by all objects, which causes bugs with mutable values like lists.
- **`self` / `this`** is the object the method was called on ([this and self](/t/this-self)).
- **Keep classes focused**: one clear job, not a bag of unrelated methods ([single responsibility](/t/single-responsibility-principle)).
