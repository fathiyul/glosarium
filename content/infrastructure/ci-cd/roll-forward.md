---
title: "Roll Forward"
summary: "Fixing a bad deploy with a new deploy instead of reverting."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["roll forward", "fix forward", "forward fix"]
prereqs: ["deployment", "rollback"]
related: ["hotfix", "feature-flags", "blue-green-deployment", "canary-release", "postmortem"]
---

When a deploy goes wrong you have two directions. **Roll back** returns to the previous version. **Roll forward** keeps moving: you fix the problem and deploy a new version on top of the bad one.

Rolling forward is often the better choice when reverting is hard or slow. If the bad release included a database migration, going back to the old code may not work against the new schema — so the reliable path is a small fix forward. The same is true when the previous version is itself insecure, or when recreating the old state would take longer than fixing the bug.

```text
roll back:  v2 bad → deploy v1 again        (needs v1 to still work)
roll forward: v2 bad → deploy v2.1 with fix (needs a fix ready)
```

The classic mistake is rolling back blindly. A [rollback](/t/rollback) of code that isn't backward-compatible can turn a small visible bug into a data or availability problem. Before you roll back, ask whether the old version still functions against the current database and configuration.

The other mistake is rolling forward *without a fix in hand*, leaving a broken version live for however long the fix takes. If you can't fix it quickly, roll back to buy time — or, better, turn the feature off with a [feature flag](/t/feature-flags) so the bad part stops while you work.

Both approaches lean on the same safety net. A [canary release](/t/canary-release) or [blue-green deployment](/t/blue-green-deployment) limits how much traffic sees the bad version, and a [hotfix](/t/hotfix) is the small change you deploy forward. Whatever you choose, follow up with a [postmortem](/t/postmortem): "roll forward" is a tactic, not a fix for the process that shipped the bug.
