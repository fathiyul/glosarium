---
title: "NoSQL"
summary: "Databases not built on the relational table model."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["non-relational database", "NoSQL database"]
prereqs: ["relational-database"]
related: ["document-database", "key-value-store", "relational-database", "relationship-types"]
---

NoSQL is a broad label for databases that don't use the relational table model. It covers several different designs, including [document databases](/t/document-database), [key-value stores](/t/key-value-store), wide-column stores and graph databases. What they share is the idea that the data model fits the access pattern, rather than forcing every kind of data into tables.

Some teams choose NoSQL for flexible fields, for very simple lookups by key, or for scaling writes across many machines. Those are real benefits in the right setting. Many systems don't need them, though, and a [relational database](/t/relational-database) handles joins, constraints and transactions well.

The classic mistake is choosing NoSQL to avoid designing a schema. You still need to know what data you store and how you read it. Without that, you end up doing joins in application code, or finding out late that the access pattern you chose can't answer the question. Pick the store after you know the queries, and not because it sounds more modern.
