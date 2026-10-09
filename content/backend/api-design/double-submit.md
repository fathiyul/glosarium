---
title: "Double Submission"
summary: "A user clicking twice and creating two orders, and how to prevent it."
levels: { backend: junior, frontend: junior }
aliases: ["double submission", "double click", "duplicate submission", "duplicate requests", "double-click problem"]
prereqs: ["http-methods"]
related: ["idempotency-key", "unique-constraint-guard", "idempotence", "race-condition", "safe-idempotent-methods"]
core: [backend, frontend]
also: [product-features]
---

A user clicks "Pay" twice, or their connection is slow, the page seems frozen and they click again. The browser
sends two requests, and the server creates **two orders**, or charges the card twice. This happens a lot, and
it's the user-visible face of retries and duplicates.

It's worse than double clicks: mobile apps retry after timeouts, load balancers and clients retry on failures, and
networks sometimes deliver a message twice. **Assume every request can arrive more than once.**

## Defend at both layers

**1. In the UI (good manners, not security):**

```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  button.disabled = true;               // block the second click
  try { await save(); }
  finally { button.disabled = false; }
});
```

Disable the button, show a loading state and ignore events while a request is pending. This stops most accidents, but it
doesn't stop retries, two tabs or someone calling your API directly.

**2. On the server (this is the real protection):**

- **Idempotency key**: the client generates a unique key per *intended* action and sends it with the request. The server
  stores the result by that key, so a repeat returns the same response instead of doing the work again
  ([idempotency key](/t/idempotency-key)).

```http
POST /orders
Idempotency-Key: 6f1c0b9e-3f6a-4f45-9a07-1d2b4c5e7a10
```

- **A unique constraint** that makes a duplicate impossible: for example a unique `(user_id, client_request_id)`, or one
  open cart per user. The database rejects the second insert
  ([unique constraints as a guard](/t/unique-constraint-guard)).
- **Make operations naturally idempotent**: "set status to shipped" can be repeated safely, unlike "add one to
  quantity".

## What `POST` does here

`POST` isn't idempotent by definition, so retries need these extra measures
([safe and idempotent methods](/t/safe-idempotent-methods)). Without a guard, the check "does this order already exist?"
followed by an insert is a [race condition](/t/race-condition) that two simultaneous requests can both pass.

Rule: **disable the button for the user, and enforce uniqueness in the database for the system.**
