---
title: "Inbox Pattern"
summary: "Recording received messages so duplicates can be ignored."
levels: { backend: senior, data-engineer: senior }
aliases: ["inbox pattern", "inbox", "idempotent consumer"]
prereqs: ["idempotence", "message-acknowledgement"]
related: ["exactly-once", "idempotency-key", "at-least-once", "transaction"]
---

The **inbox pattern** makes a consumer idempotent by recording every processed message id in an "inbox" table (or store) *in the same transaction* as the message's effects. Before processing, the consumer checks whether the id is already in the inbox; if it is, it skips (or re-acks) the duplicate. Because inbox insert and business write commit together, a duplicate delivery has no second effect.

```text
BEGIN;
  INSERT INTO inbox (message_id) VALUES ($1);   -- fails if already there
  ... apply the message's effects ...
COMMIT;   -- or ROLLBACK → neither happened
```

The problem it solves: at-least-once delivery (the norm) means a message can be delivered more than once — after a retry, a timeout, or a rebalance. Without deduplication, a consumer double-charges, double-sends or double-inserts. The inbox turns "at-least-once in" into "**exactly-once effect**" — the practical version of exactly-once.

It's the counterpart of the outbox pattern (which reliably *publishes* messages alongside a database write).

The classic mistakes:

- Checking and inserting separately. A check-then-insert outside the transaction has a race; two concurrent deliveries both see "not present". The unique constraint on `message_id` (or an atomic insert) is what prevents it (see [unique constraint guard](/t/unique-constraint-guard)).
- Inbox and effects in different transactions. If the inbox insert commits but the effects roll back (or vice versa), you either lose work or process twice. Both must be atomic.
- Unbounded inbox growth. The table grows with every message; prune old ids after a period longer than the maximum redelivery window (retention, not forever).
- Using the wrong id. Dedup must key on a stable, producer-assigned message id, not something the consumer generates. Put it in the message envelope (see [message headers](/t/message-headers)).
- Assuming the broker gives exactly-once. The inbox is *how* you get exactly-once effects on top of at-least-once delivery; it doesn't come free from the broker (see [delivery guarantees](/t/delivery-guarantees)).
- Forgetting downstream side effects. If the consumer calls an external service, the inbox protects the database effect but not the external call; use idempotency keys there too (see [idempotency key](/t/idempotency-key)).

**When to use it:** for any consumer where processing a duplicate would be harmful (payments, notifications, ledger entries) and the message has a stable id. It's the standard, robust way to make at-least-once messaging safe — turning the guarantee you have into the behaviour you want. See [exactly-once](/t/exactly-once).
