---
title: "Premature Abstraction"
summary: "Generalizing before you have enough examples, creating the wrong abstraction."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["wrong abstraction", "premature generalization"]
prereqs: ["solid"]
related: ["wet-code", "solid", "yagni", "kiss"]
---

A premature abstraction is a generalization written before there are enough real cases to show what the general form should be. The code gains parameters, base classes or configuration for variations that don't yet exist, and the guesses about the shape of the future are usually wrong.

```python
# Written for one case, with a general framework "for later"
class ExportStrategy(ABC):
    @abstractmethod
    def format(self, rows): ...

class CsvExport(ExportStrategy):
    def format(self, rows): return ...

# Only CSV is ever used, so the base class and the registry add nothing yet.
```

Once there is a second real example, the shape of the abstraction becomes clearer, and the code can be written against it with much better odds of being right.

The trade-off is between duplication and the wrong structure. Writing the same thing twice is cheap and easy to see. A wrong abstraction is harder to undo, because callers come to depend on it, and forcing a new case into it makes both worse. Premature abstraction is also what [YAGNI](/t/yagni) warns against: building for a future that may not come.

The classic mistake is letting the first generalization set the design, then bending every new case to fit it. Sandi Metz put this well: prefer duplication over the wrong abstraction. Let the examples accumulate, as described by the [rule of three](/t/wet-code), and generalize when the common shape is visible. Keep the code simple first, following [KISS](/t/kiss).
