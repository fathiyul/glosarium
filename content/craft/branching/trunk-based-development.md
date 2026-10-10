---
title: "Trunk-Based Development"
summary: "Everyone merges small changes to main frequently."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["trunk based", "TBD", "trunk development"]
prereqs: ["branch"]
related: ["long-lived-branch", "feature-flags", "continuous-integration", "branching-strategy"]
---

Trunk-based development is a branching model where everyone integrates into one main line, usually `main` or trunk, in small, frequent changes. Branches, if used at all, live for hours or a day or two, not weeks. The team's safety comes from automated tests and fast feedback rather than from long-lived branches.

Unfinished work reaches `main` behind a [feature flag](/t/feature-flags), so the code is merged but turned off for users:

```python
if flags.enabled("new_checkout", user_id):
    return new_checkout(cart)
return old_checkout(cart)      # still the default until the flag is turned on
```

This keeps `main` releasable at all times, and it keeps the gap between any two developers' code small.

The trade-off is discipline. The approach depends on a [continuous integration](/t/continuous-integration) pipeline that is fast and reliable, good test coverage, and a habit of splitting work into small pieces. Without those, merging to `main` often means merging broken code. Flags also need cleanup, or old branches in the code pile up.

The classic mistake is adopting the model in name while still working on week-long branches, or merging to `main` without tests and calling it trunk-based. The practice is the small, frequent integration itself. If a change is too big to merge in a day, split it, and use flags to ship it in parts. See [long-lived branches](/t/long-lived-branch) for what happens when that doesn't happen.
