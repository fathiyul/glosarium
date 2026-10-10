---
title: "Compensating Transaction"
summary: "Undoing a completed step with a new action, since you can't roll it back."
levels: { backend: senior, data-engineer: senior }
aliases: ["compensating transaction", "compensation", "saga compensation"]
prereqs: ["saga-pattern", "distributed-transaction"]
related: ["saga-pattern", "idempotence", "event-driven-architecture"]
---
A **compensating transaction** semantically undoes a completed step when a later step fails: cancel the reservation, refund the charge, release the hold — not by rolling back bytes (impossible across services) but by executing the business inverse. Sagas are sequences of steps plus their compensations, run in reverse on failure.

```text
book flight ✓ → book hotel ✓ → charge card ✗
→ compensate: unbook hotel, unbook flight (semantic undo)
```

Compensations differ from rollbacks: they run visibly (other systems saw the original action), may themselves fail (retry with their own idempotence), and are business logic (what does "unbook" mean here?) rather than infrastructure. Designing them is designing the failure story, not an afterthought.

The classic mistakes:

- Assuming rollback exists. Cross-service "undo" isn't a database feature; without designed compensations, partial failures leave permanent inconsistency.
- Non-idempotent compensations. Retryable steps need retryable undos — a compensation applied twice must not double-refund. Idempotence everywhere, both directions.
- Compensation ordering wrong. Undos must run in reverse order (LIFO) to unwind dependencies correctly; arbitrary order breaks dependent steps.
- Failing compensations unhandled. A compensation that itself fails needs retry, escalation and manual repair paths — "best effort undo" leaves known-bad state.
- Semantic gaps. Some actions have no true inverse (sent email, fired missile, consumed seat inventory someone else took). Design accepts (apology flows, alternatives) where inverses don't exist.
- Forward recovery ignored. Sometimes completing (retry the failed step) beats compensating; sagas should try forward recovery before unwinding.
- Untested failure paths. Happy-path-tested sagas fail at the first real compensation. Test every step's failure and every compensation's execution.

**How to design them:** every saga step ships with its compensation (idempotent, ordered, tested), plus forward-retry policy and manual repair for the un-un-doable. Failure handling is the saga — the forward path is the easy half.
