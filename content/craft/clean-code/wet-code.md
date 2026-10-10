---
title: "Rule of Three"
summary: "Tolerating duplication until the third time, to avoid the wrong abstraction."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["WET code", "write everything twice", "rule of three"]
prereqs: ["premature-abstraction"]
related: ["premature-abstraction", "dry", "shotgun-surgery", "yagni"]
---

WET stands for "write everything twice", and it's the opposite of DRY, "don't repeat yourself". The rule of three is a practical guide between them: tolerate a duplicate the first time, notice it the second time, and abstract it on the third, when the common shape is clear.

```python
# Two similar functions: leave them alone and watch what changes
def format_invoice_line(item):
    return f"{item.name:<20}{item.price:>8.2f}"

def format_receipt_line(item):
    return f"{item.name:<20}{item.price:>8.2f}"

# A third case shows which parts are really shared, and then the helper is worth writing
```

Duplication is cheap to fix later, while a bad abstraction is expensive to undo, because other code starts to depend on its shape. Two copies also let the two cases diverge naturally, so you see which differences are real.

The trade-off is that repeated code can drift. A bug fixed in one copy stays in the others, and the copies become a maintenance cost. The rule is about waiting for evidence, not about accepting duplication forever.

The classic mistake is treating every repetition as a violation of DRY and merging near-identical code the moment it appears. The merged function then gains flags and special cases for each caller, which is worse than the duplication it replaced. Wait for the third example, and extract only the part that actually stays the same. Pairs of duplicates are often fine. See [premature abstraction](/t/premature-abstraction) for what goes wrong when the abstraction comes too early.
