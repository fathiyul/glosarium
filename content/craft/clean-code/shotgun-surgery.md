---
title: "Shotgun Surgery"
summary: "One change requiring edits in many scattered places."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["shotgun surgery smell"]
prereqs: ["single-responsibility-principle"]
related: ["god-object", "feature-envy", "single-responsibility-principle", "primitive-obsession"]
---

Shotgun surgery is a code smell where a single conceptual change requires small edits in many unrelated places. Like a shotgun blast, the change scatters across the codebase, and it's easy to miss one of the spots.

```
Change: VAT rate now depends on the buyer's country.
Edits:  invoice.py, checkout.py, email_receipt.py, report.py,
        admin_dashboard.py, tests in six files
```

The problem isn't the size of the change, but its spread. Each place that duplicates the same rule is a place that can go out of date, and reviewers have to hunt for all of them.

The trade-off is that spreading knowledge sometimes reflects a real need. Two modules may apply the same rule because they serve different purposes, and forcing one shared place can make both harder to understand. The smell is a hint to look at why the change is spread out.

The classic mistake is fixing the spread by merging everything into one general class, which becomes a [god object](/t/god-object). Better is to find the concept behind the scattered logic, such as "the tax rule", and give it one home, often a small [value object](/t/primitive-obsession) or a service that everyone calls. Check the [single responsibility principle](/t/single-responsibility-principle) too: when one concern is split across many classes, the boundaries are probably drawn in the wrong place.
