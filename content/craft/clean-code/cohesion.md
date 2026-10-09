---
title: "Cohesion"
summary: "How closely the parts of a module belong together; more is better."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["high cohesion", "module cohesion", "class cohesion", "functional cohesion"]
prereqs: ["single-responsibility-principle"]
related: ["coupling", "single-responsibility-principle", "separation-of-concerns", "god-object", "feature-envy", "shotgun-surgery"]
core: [backend, frontend]
---

**Cohesion** measures how closely the things **inside** a module, class or function belong together. **High cohesion** means everything in it works toward one clear purpose. Low cohesion
means it's a grab bag.

```python
# Low cohesion: unrelated jobs in one place
class Utils:
    def format_date(self, d): ...
    def send_email(self, to, body): ...
    def calculate_tax(self, amount): ...
    def resize_image(self, img): ...

# High cohesion: each class has a focused purpose, and everything in it relates to it
class TaxCalculator:
    def calculate(self, amount, region): ...
    def rate_for(self, region): ...
```

## Why it matters

Highly cohesive code is **easier to understand** (you can describe it in one sentence), **easier to name**, **easier to test**, **easier to reuse** and **easier to change**, because a change to one
concept lives in one place. Low cohesion produces code with names like `Manager`, `Helper` and `Utils`, and a "god object" that everything depends on ([god object](/t/god-object)).

## How to tell

- Can you name it **precisely** without "and" or "manager"? "OrderTotalCalculator" is cohesive. "OrderManagerAndNotifier" isn't.
- Do **all the methods use the same data**? If half the methods use some fields and half use others, there may be two classes hiding in one.
- When you change one feature, **do you touch the whole file** or only a part of it?
- A function that does several unrelated things is a sign.

## Improving it

- **Split** modules that serve several purposes, along the lines of the different reasons they'd change ([single responsibility](/t/single-responsibility-principle)).
- **Move behavior next to the data it uses** ([feature envy](/t/feature-envy)).
- **Group by feature or domain concept**, not by technical type, when it makes things easier to find.

## Cohesion and coupling

They go together: aim for **high cohesion inside modules and low [coupling](/t/coupling) between them**. Highly cohesive modules tend to need fewer connections to others. Don't take it to the extreme: splitting
into dozens of tiny pieces just to have "one thing each" scatters the logic and makes the system harder to follow ([separation of concerns](/t/separation-of-concerns)).
