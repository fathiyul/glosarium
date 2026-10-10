---
title: "Natural vs Surrogate Key"
summary: "Using real-world data as the key vs a generated ID."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["natural key", "surrogate key", "natural vs surrogate"]
prereqs: ["primary-key", "relational-model"]
related: ["uuid-vs-autoincrement", "foreign-key", "constraint"]
---

Every table needs a **primary key**, and there are two flavours. A **natural key** is a real-world attribute that identifies the row — an email address, an ISBN, a tax ID. A **surrogate key** is a value generated purely to identify the row — an auto-increment integer or a UUID — with no meaning beyond identity.

```text
natural:    users.email is the key            (real, meaningful, can change)
surrogate:  users.id (bigint) is the key       (generated, meaningless, stable)
```

The classic tension is stability. Natural keys are meaningful and let you avoid an extra column, but they can change (people change email addresses), they're often wider (a string), and pulling them from the real world ties your schema to external rules.

Surrogate keys are stable and narrow, and changing a real-world attribute (an email) doesn't cascade through every foreign key. The cost is an extra, meaningless column and the need for a separate uniqueness constraint on the natural attribute.

The classic mistakes:

- Using a mutable natural key as the primary key. An email as primary key means changing it updates every referencing table and breaks external references. Use a surrogate key and a unique constraint on the email.
- No uniqueness on the natural attribute. If you use a surrogate key but forget to enforce that emails are unique, you can have two accounts with the same email. You need both: a stable surrogate key *and* a unique natural key.
- Inferring meaning from the surrogate. Auto-increment ids leak row order and count; code that assumes `id=1` is the first user becomes wrong. Never derive business meaning from a surrogate.
- Composite natural keys everywhere. A multi-column natural key propagates through all referencing tables; a single surrogate id is easier to reference — though composite keys are legitimate when the natural pair is truly stable.
- Confusing this with UUID vs auto-increment. That's a sub-choice *within* surrogate keys (see [UUID vs auto-increment](/t/uuid-vs-autoincrement)); natural-vs-surrogate is the higher-level decision.

**The common default:** a surrogate primary key (integer or UUID) for stability and referencing, plus unique constraints on the natural identifiers that matter. See [primary keys](/t/primary-key), [foreign keys](/t/foreign-key) and [constraints](/t/constraint).
