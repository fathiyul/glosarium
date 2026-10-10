---
title: "Deploying Schema and Code Together"
summary: "Ordering migrations and code changes so neither breaks the other."
levels: { backend: senior, data-engineer: senior }
also: [migrations]
aliases: ["schema and code deploys", "expand and contract", "parallel change"]
prereqs: ["migration-tools", "database"]
related: ["transaction", "rollback", "continuous-delivery", "deploy-vs-release", "blue-green-deployment"]
---

Database changes and application code rarely ship at the same instant, and during a rollout both old and new code run at once. If you change the database and the code together in one step, there's always a window where one can't understand the other. The fix is to make changes **backward-compatible** and stage them.

The usual technique is **expand and contract** (also called parallel change):

1. Expand — add the new column, table or index alongside the old. Nothing stops working; old code ignores it.
2. Migrate and dual-write — deploy code that writes to both old and new (or backfills data), while old code keeps reading the old shape.
3. Switch reads — deploy code that reads the new shape. Old readers are gone.
4. Contract — once nothing uses the old shape, drop it in a later deploy.

```text
expand  → dual-write/backfill → switch reads → contract (drop)
             each step is independently deployable and reversible
```

That way every deploy is compatible with the version before and after it, and a rollout or [rollback](/t/rollback) never lands on a schema it can't handle.

The classic mistakes:

- Renaming or dropping in one step. Renaming a column breaks the old code still running during the rollout. Add the new, switch, then remove the old.
- Assuming the migration and deploy are atomic. They aren't. There is always a window with mismatched versions.
- Not making it reversible. If step two is wrong and step four already dropped the old column, you can't go back. Keep the old shape until you're sure.
- Ignoring transactions and locking. A large migration can lock a table and stall the app; run changes incrementally (see [transactions](/t/transaction)).

**When it matters most:** with [progressive delivery](/t/progressive-delivery) — canaries, [blue-green](/t/blue-green-deployment) — old and new versions coexist by design, so backwards compatibility is mandatory. The same discipline makes [continuous delivery](/t/continuous-delivery) safe.
