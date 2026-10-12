---
title: "Reproducing a Bug"
summary: "Getting the bug to happen reliably before trying to fix it."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["reproducing a bug", "repro steps", "steps to reproduce", "reproduce the issue"]
prereqs: ["debugging"]
related: ["minimal-reproducible-example", "debugging", "binary-search-debugging", "heisenbug", "debugging-production"]
core: [backend, frontend, data-engineer]
---

Before you try to fix a bug, make it happen **on demand**. If you can trigger it reliably,
you can tell whether your fix worked. If you can't, any fix is a guess.

## Steps

1. **Collect what you know**: the exact error, which user, what they clicked, what data,
   which browser or environment, and when it started.
2. **Write the steps** as a short numbered list that someone else could follow.
3. **Match the conditions**: same input, same version, same configuration. Many bugs only
   appear with particular data (an empty list, a very long name, a time zone).
4. **Trigger it and watch**: see the real error, not the report of it.
5. **Shrink it**: remove steps and data until you have the smallest case
   ([minimal reproducible example](/t/minimal-reproducible-example)).
6. **Write it as a test** if you can, so it fails now and passes after your fix.

```
1. Log in as a user with no orders
2. Open /orders
3. Click "Export CSV"
Expected: empty file with headers
Actual: 500 error, "IndexError: list index out of range"
```

## When it won't reproduce

- Compare environments: versions, config, data volume, feature flags.
- Add logging to learn more the next time it happens.
- Look for **timing and ordering** causes: concurrency, caches, time zones, random values
  (see [Heisenbugs](/t/heisenbug)).
- Ask the reporter for more detail, or for a screen recording.
- For production-only problems, see [debugging production](/t/debugging-production).

Reporting a bug is the mirror image. Write steps, expected vs actual and your environment, so
the next person can reproduce it right away.
