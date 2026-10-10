---
title: "Feature Envy"
summary: "A method more interested in another class's data than its own."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["feature envy smell"]
prereqs: ["code-smell"]
related: ["encapsulate-what-varies", "cyclomatic-complexity", "broken-windows", "command-query-separation"]
---

Feature envy is a code smell where a method spends most of its effort on another object's data, reading a lot of its fields and doing little with its own. The method probably belongs in the class that owns that data. Martin Fowler's refactoring catalogue names it.

Before, a function outside the class reads everything from the invoice:

```python
def invoice_total(invoice):           # envies Invoice's data
    subtotal = sum(i.price * i.qty for i in invoice.items)
    return subtotal * (1 + invoice.tax_rate)
```

After, the behaviour lives in the class that owns the data it uses:

```python
class Invoice:
    def __init__(self, items, tax_rate):
        self.items = items
        self.tax_rate = tax_rate

    def total(self):                  # now uses its own fields
        subtotal = sum(i.price * i.qty for i in self.items)
        return subtotal * (1 + self.tax_rate)
```

Keeping the logic next to the data it reads makes it easier to change both together, and it removes the need for outside code to know how the object works inside.

The trade-off is that a method sometimes genuinely uses another object's data because it coordinates several objects. Moving it into one of them would tie that class to the others. In that case, the method belongs in a service or a function that sits above them, and the smell is only a hint.

The classic mistake is moving methods to the data by reflex, so an object collects logic from unrelated parts of the system and becomes a God class. Check whether the method uses one object's data mainly, and whether its natural home is that object. The check is cheaper with the [cyclomatic complexity](/t/cyclomatic-complexity) of the method in view, since long, envious methods often have both problems.
