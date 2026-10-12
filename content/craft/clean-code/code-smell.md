---
title: "Code Smell"
summary: "A surface sign that the design may have a deeper problem."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["code smells", "smell", "bad smell"]
prereqs: ["clean-code"]
related: ["refactoring", "long-method", "god-object", "feature-envy", "primitive-obsession", "technical-debt"]
core: [backend, frontend, data-engineer]
---

A **code smell** is a surface sign that the design might have a deeper problem. It isn't a
bug (the code may work fine), but it's a hint to look closer, like noticing a smell in the
kitchen.

## Common smells

| Smell | What it looks like |
|---|---|
| [Long method](/t/long-method) | A function you have to scroll through |
| [God object](/t/god-object) | One class that knows and does everything |
| Duplicated code | The same logic copied in several places |
| [Feature envy](/t/feature-envy) | A method that mostly uses another class's data |
| [Primitive obsession](/t/primitive-obsession) | Using raw strings and ints for concepts like money or email |
| Long parameter list | Functions taking six or seven arguments |
| [Shotgun surgery](/t/shotgun-surgery) | One change requires edits across many files |
| [Dead code](/t/dead-code) | Unused functions and branches |
| Magic numbers | Unexplained constants like `if status == 3` |

```python
def process(order, user, address, coupon, gift, express, notify, retries):  # smell
    ...
```

## What to do about one

A smell is a **prompt, not a verdict**. Ask whether it actually hurts: is this code hard to
change, hard to test, a source of bugs? Then:

- If it's in code you're about to change, [refactor](/t/refactoring) it as part of that work.
- If it's stable code nobody touches, leave it alone.
- If it needs more than a quick fix, note it as [technical debt](/t/technical-debt).

Don't hunt for smells everywhere, or rewrite working code just because it looks unfashionable.
The skill is noticing them in code you work with, and choosing a fix that is proportionate.
Make small, safe steps with tests passing.
