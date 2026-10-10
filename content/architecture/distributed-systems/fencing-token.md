---
title: "Fencing Token"
summary: "A counter that stops stale lock holders from writing."
levels: { backend: principal, data-engineer: principal }
aliases: ["fencing token", "fence token", "epoch fencing"]
prereqs: ["distributed-lock", "lease"]
related: ["distributed-lock", "lease", "split-brain"]
---
A **fencing token** is a monotonically increasing number handed out with each grant of authority (lock acquisition, leadership term, lease issue); resource servers reject any operation carrying an older token than the latest seen. Stale holders — paused, partitioned, deposed but alive — find their writes refused even though they believe they hold power.

```text
holder A (token 1) pauses… B acquires (token 2), writes
A resumes, writes with token 1 → storage rejects (seen 2)
```

Tokens flow from a single monotonic source (storage increment, lock service counter, consensus term); every guarded write carries its token, and servers persist the maximum seen. The mechanism converts "am I still valid?" (unanswerable locally under partitions) into "does the resource accept my token?" (decidable remotely, monotonically).

The classic mistakes:

- Locks without fencing. Expiry alone can't stop a paused holder resuming post-expiry; the lock is necessary, fencing is sufficient — deploy both.
- Non-monotonic tokens. Wall-clock "tokens" regress under skew; random tokens don't order. Monotonic counters or consensus terms only.
- Unfenced paths. One write path skipping token checks (admin tool, migration script, cache bypass) voids the guarantee. Fence every mutation path or fence none effectively.
- Token source as SPOF. The monotonic issuer failing freezes all guarded work; replicate it (consensus-backed counters) with the availability the workload needs.
- Forgetting read fencing. Stale reads from deposed leaders mislead as surely as stale writes corrupt; fence reads where freshness decisions depend on leadership.
- Token loss on failover. New issuers restarting counters from zero revalidate ancient tokens. Persist counters durably across failover.
- Assuming fencing fixes logic. Fencing orders authority; it doesn't validate operations. Authorisation and validation still apply per request.

**How to deploy it:** monotonic issuance, token-checked mutations on all paths, persisted counters surviving failover. Fencing turns lease expiry from hope into enforcement.
