---
title: "Transaction Boundaries"
summary: "Deciding where a transaction should start and end."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["transaction boundaries", "transaction scope", "transaction boundary"]
prereqs: ["transaction", "service-layer"]
related: ["atomicity", "connection-pooling", "idempotence", "savepoint"]
---

**Transaction boundaries** are the points where you open and close a transaction — deciding exactly which operations form one atomic unit. Getting them right is central to correctness and performance: too loose and you hold locks and connections too long; too tight and a logical change can fail halfway.

Good boundaries match a **unit of work**: one request or use case, containing the writes that must all succeed or all fail.

```text
request → BEGIN → validate, write order, write payment → COMMIT
        (not: BEGIN → write → call external API (slow) → write → COMMIT)
```

The classic mistakes:

- Holding a transaction across an external call. Calling a slow third-party API inside a transaction keeps row locks and a database connection held for the duration, blocking others and risking timeouts. Do external calls *outside* the transaction.
- Beginning too early. Opening a transaction before validation or fetching unrelated data wastes a connection and lengthens the transaction for no reason.
- One transaction for the whole request by default. Frameworks sometimes auto-wrap the entire request; a slow step then holds a connection, and any external side effect isn't rolled back anyway.
- Too-small boundaries. Splitting a logically atomic change into separate transactions means a failure between them leaves partial state (see [atomicity](/t/atomicity)). Group the writes that belong together.
- Long transactions and MVCC. Long transactions block cleanup of dead row versions (see [VACUUM](/t/vacuum)) and can pin the database's ability to reclaim space.
- Leaking connections. A transaction that stays open on a pooled connection ties it up; under load, connections exhaust and requests queue (see [connection pooling](/t/connection-pooling)).
- Assuming side effects roll back. Emails, messages and API calls within a transaction persist on rollback — use an outbox pattern for reliable side effects (see [inbox pattern](/t/inbox-pattern)).

**How to set them:** one transaction per unit of work; external I/O and slow work outside it; validation and non-writing reads outside where possible; and always closed (committed or rolled back) promptly. The [service layer](/t/service-layer) is the natural place to define the boundary, since it knows where the use case begins and ends.
