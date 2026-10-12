---
title: "Access Modifiers"
summary: "public, private and protected: who may see a member."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["access modifiers", "public private protected", "visibility modifiers"]
prereqs: ["class"]
related: ["encapsulation", "class", "getter-setter", "interface", "attribute"]
---

Access modifiers control which code may see or use a member of a class (a field or method). The usual three:

| Modifier | Who can access it |
|---|---|
| `public` | anyone |
| `private` | only code inside the same class |
| `protected` | the class and its subclasses |

```java
class Account {
    private double balance;                 // hidden
    public void deposit(double amount) {    // the allowed way in
        if (amount > 0) balance += amount;
    }
}
```

Code outside can call `deposit`, but can't set `balance` directly. That keeps the rules in one place ([encapsulation](/t/encapsulation)).

## Languages differ

- **Java, C#, TypeScript, C++**: enforced by the compiler, with keywords.
- **Python**: by convention. A leading underscore (`_balance`) means "internal, please don't touch". A double underscore triggers name mangling, but is still not true privacy.
- **JavaScript**: `#balance` makes a truly private field in classes. Before that, underscores were a convention.
- **Go**: capitalized names are exported, lowercase ones aren't.

## Guidelines

- **Make things private by default**, and expose only what callers need. You can open up later, but taking things away breaks users.
- **Public members are a promise.** Once other code depends on them, changing them is a breaking change.
- **Don't expose fields** just to read them. Offer a method or property ([getters and setters](/t/getter-setter)).
- **Protected is easy to overuse.** Subclasses often get tightly coupled to a parent's internals ([inheritance](/t/inheritance)).
- Private is not security. It protects against accidental misuse, not attackers.
