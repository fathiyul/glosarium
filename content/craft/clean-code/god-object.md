---
title: "God Object"
summary: "A class that knows and does too much."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["God class", "blob"]
prereqs: ["single-responsibility-principle"]
related: ["single-responsibility-principle", "extract-class", "feature-envy", "shotgun-surgery"]
---

A god object is a class that knows about, and does, far too much. It holds state for many unrelated features, calls into many other parts of the system, and changes for many different reasons. It usually starts as one reasonable class that kept collecting responsibilities, until nobody dares to touch it.

```python
class AppManager:
    def create_user(self, data): ...
    def send_invoice(self, order): ...
    def render_report(self, month): ...
    def sync_inventory(self): ...
    def log_event(self, event): ...
```

Each method belongs to a different concern. A change to invoices now means reading and testing code about reports and inventory as well, and every test has to set up the whole class.

The trade-off is that a big class is easy to find things in, since everything is in one place. That convenience disappears as the class grows. Splitting it means deciding where each method belongs, and that takes thought about data and callers, so it's rarely a quick change.

The classic mistake is answering a new feature with one more method on the same class, because it's the closest place to put it. Each addition makes the next split harder. When a class has several unrelated groups of methods, use the [single responsibility principle](/t/single-responsibility-principle) as the test: who would ask for a change to each group? Then move each group into its own class with [extract class](/t/extract-class). Look also for [feature envy](/t/feature-envy), since methods that mostly use another object's data often belong in that object.
