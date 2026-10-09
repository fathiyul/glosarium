---
title: "Breaking Change"
summary: "A change that forces clients to update."
levels: { backend: junior, frontend: junior, data-engineer: junior }
prereqs: ["api-design"]
related: ["api-design", "api-naming-conventions", "semantic-versioning", "event-schema-versioning"]
---

A breaking change is one that makes existing clients stop working until they're updated. Examples include removing or renaming a field or an endpoint, making an optional parameter required, changing a field's type, and tightening validation so that previously valid input is rejected.

```
Breaking:       "total": 42.5   becomes   "total": "42.50"    (type changed)
Breaking:       GET /users/{id}/orders   removed
Usually safe:   new optional field "coupon_code" added
```

Adding things is usually safe, as long as clients ignore fields they don't know about. Removing or changing things is the risky part.

When you must make a breaking change, avoid switching everyone at once. Two common approaches are publishing a new version alongside the old one, such as `/v2/orders`, or using an expand-and-contract sequence: add the new field, move clients over, then remove the old one once it's no longer used.

The classic mistake is assuming you control every client. Mobile apps and partner integrations often stay on old versions for months, so a change that looked small can break them. The same idea applies to data: changing a table column or an event's shape can break consumers, which is why [event schema versioning](/t/event-schema-versioning) exists.
