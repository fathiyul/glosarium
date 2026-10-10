---
title: "Idempotency in Distributed Systems"
summary: "Making retries safe when you can't know whether the first attempt worked."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["idempotency in distributed systems", "exactly-once processing", "duplicate delivery"]
prereqs: ["idempotence", "at-least-once"]
related: ["idempotency-key", "inbox-pattern", "exactly-once"]
---
**Idempotency in distributed systems** is the discipline of making repeated execution safe: retries, redeliveries, replays and failovers mean every operation may run more than once, so systems must produce the once-effect from possibly-many attempts. At-least-once delivery plus idempotent receivers is the industry's practical "exactly-once."

```text
attempt → attempt → attempt (retry storm, redelivery, replay)
idempotent receiver → single effect (dedupe by key, conditional apply)
```

Techniques compose: idempotency keys on requests (keys stored with results; repeats return stored outcomes), inbox tables consumed transactionally with effects, natural idempotence (set-to-value vs increment), and version-conditioned writes. The key insight is keying — dedupe needs stable operation identity across attempts.

The classic mistakes:

- Assuming exactly-once transport. Networks duplicate; brokers redeliver; clients retry. The transport promises at-least-once at best — safety lives in receivers.
- Keys that aren't stable. UUID-per-attempt defeats dedupe; the key must identify the *operation* across retries (client-generated, carried through).
- Dedupe windows too short. Keys expiring before late duplicates arrive re-applies ancient operations. Retention must exceed maximum redelivery horizons.
- Non-atomic check-and-apply. Separate dedupe-check and effect-write races under concurrency; the inbox pattern (same-transaction insert + effects) closes it.
- Side effects outside the transaction. Database deduped but emails sent twice — external calls need their own idempotency (provider keys) since transactions can't cover them.
- Read-modify-write receivers. "Read balance, add amount" double-applies on retry; conditional and absolute writes survive repetition.
- Testing the happy path only. Idempotence failures hide until the first retry storm. Test duplicates, replays and concurrent repeats deliberately.

**The standard:** at-least-once everywhere, idempotent receivers with stable keys and transactional dedupe, retries safe by construction. Assume repetition; engineer single effect.
