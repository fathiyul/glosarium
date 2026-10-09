---
title: "Constructor"
summary: "The method that initializes a new object."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["constructors", "__init__", "initializer"]
prereqs: ["class"]
related: ["class", "object", "attribute", "default-parameter", "dependency-injection"]
---

A constructor is the method that runs when a new object is created, and sets up its starting state.

```python
class User:
    def __init__(self, name, email):      # Python's constructor
        self.name = name
        self.email = email
        self.active = True

u = User("Ana", "ana@example.com")
```

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
const u = new User("Ana", "ana@example.com");
```

```java
class User {
    User(String name, String email) { ... }    // same name as the class
}
```

## What belongs in one

- Storing the arguments as fields.
- Setting default values.
- Checking that the arguments make sense, so an invalid object can't exist (raise an error on a negative quantity, an empty name).

## What doesn't

- **Slow or risky work**: network calls, reading files, starting threads. A constructor that can fail in complicated ways is hard to test and use. Use a factory function (`User.from_row(...)`) or an explicit `connect()` step.
- **Complicated logic.** Keep it simple.

## Related ideas

- **Default arguments** make constructors flexible ([default parameters](/t/default-parameter)).
- **Dependencies passed in** instead of created inside make code testable ([dependency injection](/t/dependency-injection)).
- **Subclasses** call the parent constructor (`super().__init__(...)`) so the parent's setup still runs ([inheritance](/t/inheritance)).
- Some languages allow several constructors (overloading), while Python and JavaScript have one, so people use default arguments or class methods.
- A forgotten `new` in JavaScript, or a forgotten `self.` in Python, are classic mistakes.
