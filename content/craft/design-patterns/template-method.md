---
title: "Template Method"
summary: "A base algorithm whose steps subclasses fill in."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["template method pattern", "hook method"]
prereqs: ["inheritance"]
related: ["strategy-pattern", "abstract-class", "inheritance", "open-closed-principle"]
---

The template method pattern defines the skeleton of an algorithm in a base class, and lets subclasses supply some of its steps. The overall order of the steps stays fixed, and each subclass changes only the parts that vary.

```python
from abc import ABC, abstractmethod

class ReportJob(ABC):
    def run(self):                       # the template: fixed order, not overridden
        data = self.load()
        cleaned = self.clean(data)
        return self.render(cleaned)

    @abstractmethod
    def load(self): ...

    def clean(self, data):               # default step, subclasses may override
        return [row for row in data if row]

    @abstractmethod
    def render(self, rows): ...

class CsvReport(ReportJob):
    def load(self):
        return ["a,1", "", "b,2"]

    def render(self, rows):
        return "\n".join(rows)

CsvReport().run()   # "a,1\nb,2"
```

Every report runs load, clean and render in the same order. Only the steps that differ are written in the subclass.

The trade-off is inheritance. The subclass depends on the base class's structure, and the base class's changes can break every subclass. Deep chains of template classes are hard to follow, and a subclass that overrides too much ends up unrelated to the template it inherits from.

The classic mistake is letting subclasses reorder or skip the fixed steps, which defeats the point. Mark the template method as final where your language allows it, and keep hooks small. When the varying part is a whole algorithm rather than a few steps, the [strategy pattern](/t/strategy-pattern) with composition is often easier to test and change, and [abstract classes](/t/abstract-class) are the mechanism behind this pattern in many languages.
