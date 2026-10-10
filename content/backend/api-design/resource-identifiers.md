---
title: "Opaque Resource Identifiers"
summary: "Not leaking database IDs or internal structure in URLs."
levels: { backend: mid-level }
aliases: ["opaque identifiers", "opaque ids", "unguessable ids"]
prereqs: ["uuid-vs-autoincrement", "api-contract"]
related: ["backward-compatibility", "api-contract"]
---

An **opaque resource identifier** is an ID that reveals nothing about the underlying record — no sequence, no structure, no count. A random UUID or ULID ("`f47ac10b-...`") is opaque; a sequential integer ("`42`") is not: it tells the client how many records exist and invites guessing the next one.

```text
guessable:  /invoices/42   → try 41, 43, ...
opaque:     /invoices/f47ac10b-58cc-...   → nothing to infer
```

Two reasons to prefer opaque IDs in public APIs:

- Security by not exposing enumeration. Sequential IDs make it trivial to probe other users' records unless every request is authorisation-checked. That check must exist anyway, but opaque IDs remove an easy path.
- Stability and decoupling. An opaque ID is a name, not a promise about internal storage. Whether the database uses a sequence, UUID or composite key is an implementation detail the API needn't reveal.

```text
client sees:  /orders/01H8X...     (the API's name)
server stores: orders.id = 918273  (internal, irrelevant to the client)
```

The classic mistakes:

- Exposing internal primary keys. Leaking sequence numbers or composite keys ties clients to your schema and reveals volume. Map to an external ID.
- Assuming opaque IDs solve authorisation. They don't. You must still check that the caller may see the record; opacity only removes trivial enumeration. This is a common and dangerous misreading.
- Changing the ID format later. Once clients store a resource's ID, changing its *shape* breaks them. Treat identifier format as part of the [contract](/t/api-contract) and choose a form you can keep (see [backward compatibility](/t/backward-compatibility)).
- Making them meaningful. Encoding type or tenant into the ID ("user-42") re-exposes structure. Keep them opaque.
- UUID vs auto-increment confusion. This is the API-visible face of that choice: even if you use integers internally, expose ids that don't leak. See [UUID vs auto-increment IDs](/t/uuid-vs-autoincrement).

**The default for a public API:** use an opaque, unguessable external ID for every resource, keep internal keys internal, and always authorise each access. It closes an easy enumeration gap and leaves your storage free to change.
