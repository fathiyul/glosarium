---
title: "Method Overriding"
summary: "A subclass replacing a parent class's method."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["overriding", "override"]
prereqs: ["inheritance", "method"]
related: ["inheritance", "polymorphism", "method-overloading", "abstract-class", "liskov-substitution-principle"]
---

Method overriding is when a subclass provides its own version of a method that the parent class already defines. Calls on the subclass use the new version.

```python
class Notifier:
    def send(self, msg):
        print("log:", msg)

class EmailNotifier(Notifier):
    def send(self, msg):                 # overrides Notifier.send
        print("email:", msg)

n = EmailNotifier()
n.send("hi")                             # email: hi
```

The parent's version still exists, and you can call it:

```python
class LoggingEmail(EmailNotifier):
    def send(self, msg):
        super().send(msg)                # parent behavior, plus more
        audit(msg)
```

## Why it matters

It's the mechanism behind [polymorphism](/t/polymorphism). Code written against `Notifier` works with any subclass, and each runs its own `send`:

```python
def alert(notifier: Notifier):
    notifier.send("disk full")           # whichever kind it really is
```

## Rules to follow

- **Keep the same meaning.** The override must still do what callers of the parent expect (same inputs, a compatible result, no surprising errors), or substituting the subclass breaks things ([Liskov substitution](/t/liskov-substitution-principle)).
- **Keep the same signature.** Different parameters make it a different method, or an [overload](/t/method-overloading).
- **Mark intent where the language allows**: `@Override` in Java, `override` in C# and TypeScript, so a typo can't create a new method silently.
- **Call `super` when the parent's work is still needed.**
- **Parents should say what's meant to be overridden**, or use an [abstract class](/t/abstract-class) to require it.

Prefer composition when you override a lot ([composition over inheritance](/t/composition-over-inheritance)).
