---
title: "Single Responsibility Principle (S)"
summary: "A module should have one reason to change."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["SRP", "single responsibility", "one reason to change", "S in SOLID"]
prereqs: ["cohesion", "class"]
related: ["solid", "cohesion", "separation-of-concerns", "god-object", "open-closed-principle", "interface-segregation-principle"]
core: [backend]
---

The **single responsibility principle** (the **S** in [SOLID](/t/solid)) says a module or class should have **one reason to change**. Robert C. Martin later phrased it around people: a module should
answer to **one actor**, meaning one group of people who'd ask for changes to it.

```python
# Three reasons to change in one class:
#   - the business rules for invoices change (finance)
#   - the PDF layout changes (design)
#   - the storage changes (platform team)
class Invoice:
    def calculate_total(self): ...
    def render_pdf(self): ...
    def save_to_database(self): ...
```

A change to the PDF layout risks breaking the tax calculation, because they share a class, and perhaps the same variables. Split by reason to change:

```python
class Invoice:                  # data and business rules
    def calculate_total(self): ...

class InvoicePdfRenderer:       # presentation
    def render(self, invoice): ...

class InvoiceRepository:        # persistence
    def save(self, invoice): ...
```

Each piece changes for one reason, can be tested alone, and can be understood without reading the others.

## It does not mean "does only one thing"

A common misreading is "each function must do exactly one tiny thing", leading to hundreds of one-method classes. The principle is about **reasons for change**, not size. A class with ten methods can have a single
responsibility if they all serve the same concern ([cohesion](/t/cohesion)).

## How to apply it

- Ask: **who would ask me to change this, and why?** If the answer is "the finance team *and* the design team", consider splitting.
- Spot **god objects** and "Manager" classes with unrelated methods ([god object](/t/god-object)).
- Notice code that's **hard to name** without "and".
- Notice when a change for one feature keeps touching the same file for different, unrelated reasons.

## Cautions

- Don't split speculatively. Wait until you actually see different reasons to change, since over-splitting adds indirection ([YAGNI](/t/yagni)).
- It applies to functions, modules, services and even teams ([separation of concerns](/t/separation-of-concerns)).
- It's a guide for judgment, not a rule to enforce mechanically.
