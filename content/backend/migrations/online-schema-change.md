---
title: "Online Schema Change Tools"
summary: "Tools like gh-ost for altering huge tables safely."
levels: { backend: senior, data-engineer: senior }
aliases: ["online schema change", "online ddl", "gh-ost pt-online-schema-change"]
prereqs: ["migration-locks", "schema-migration"]
related: ["migration-locks", "migration-tools", "data-migration"]
---

**Online schema change** techniques apply a schema change to a large, busy table without holding a blocking lock for the whole operation. Instead of altering the table in place, tools build a **shadow table** with the new structure, copy existing rows into it while keeping it in sync with ongoing writes (often via triggers), then briefly swap the shadow in for the original.

```text
1. create shadow table with new schema
2. copy rows over, capturing live changes (triggers / binlog)
3. briefly lock → rename (atomic swap) → unlock
4. drop the old table
```

Tools like `gh-ost` and `pt-online-schema-change` automate this for MySQL-family databases; PostgreSQL has improved in-place DDL that is already non-blocking for many operations, so it often needs fewer workarounds.

The classic mistakes:

- Assuming your database needs it. Many modern databases handle common `ALTER`s without long locks already. Reach for online tools only where your engine requires it (classic case: MySQL with large tables). Check first.
- Ignoring the cost and load of the copy. The shadow copy reads every row and applies ongoing changes; it's real I/O and can lag or compete with live traffic. Throttle it.
- Forgetting triggers and their overhead. Trigger-based sync adds write overhead and can have edge cases; verify correctness, especially with concurrent updates.
- A swap that still blocks. The final rename takes a brief lock; if something holds a long transaction open, even the short lock can stall. Drain long transactions first.
- Space and cleanup. The shadow table doubles storage temporarily, and abandoned runs leave shadow tables and triggers behind. Monitor and clean up.
- Not testing the swap path. Rehearse on a realistic copy; a failed swap mid-way needs a recovery plan.
- Using it as a substitute for good migration design. Prefer additive, compatible changes so you rarely need the heaviest machinery (see [migration locks](/t/migration-locks)).

**When to use it:** for large, high-traffic tables on databases whose in-place DDL blocks, when downtime isn't acceptable and the change can't wait for a quiet window. For most schema changes on most databases, well-designed, off-peak, small migrations are simpler — reserve online tools for the genuinely painful cases. See [migration tools](/t/migration-tools).
