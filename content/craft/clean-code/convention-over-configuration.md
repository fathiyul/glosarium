---
title: "Convention over Configuration"
summary: "Sensible defaults so you only configure what's unusual."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["CoC", "convention over config"]
related: ["web-framework", "principle-of-least-astonishment"]
---

Convention over configuration means a framework or tool assumes sensible defaults, so you only write configuration for the things that differ from them. Ruby on Rails popularized the idea. A model named `User` maps to a table named `users`, and a file in a known folder is loaded automatically, without a config line for each.

```python
# Convention: the file app/models/user.py holds class User,
# which maps to the users table, with no mapping config written by hand.
class User(Model):
    name: str
```

The benefit is less boilerplate and a shared vocabulary. New team members find things where they expect, and projects look alike. The defaults encode the choices most projects make anyway.

The trade-off is that conventions are invisible until you break one. When the magic doesn't match what you need, the behaviour can be hard to trace, and overriding a convention may mean learning a second layer of rules. A tool with strong conventions is harder to adopt when your project is unusual.

The classic mistake is fighting the convention instead of learning it, such as renaming files and tables by hand until nothing lines up. Follow the convention where it fits, and override it explicitly where it doesn't, with a comment saying why. Write down the conventions your own team uses, so they don't depend on memory. The idea is close to the [principle of least astonishment](/t/principle-of-least-astonishment).
