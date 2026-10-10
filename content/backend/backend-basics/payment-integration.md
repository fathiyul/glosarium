---
title: "Payments Integration"
summary: "Using providers like Stripe safely, with webhooks and idempotency."
levels: { backend: mid-level, frontend: mid-level }
also: [product-features]
aliases: ["payments integration", "payment gateway", "taking payments"]
prereqs: ["idempotency-key", "webhooks"]
related: ["idempotence", "subscription-billing", "ledger", "third-party-integration"]
---

**Payments integration** is wiring your application to a payment provider so users can pay. The mechanics vary, but the hard parts are the same everywhere: network calls fail, providers retry, and money must not be charged twice or lost. Payments code is where correctness matters most, because mistakes are financial and often irreversible.

A typical flow:

1. Your server creates a **payment intent / charge** with the provider, sending an [idempotency key](/t/idempotency-key) so a retried request isn't charged twice.
2. The client confirms the payment (often with the provider's client library, so card data never touches your server).
3. The provider sends a **webhook** — the authoritative signal that payment succeeded or failed.
4. Your system records the result and fulfils the order; a **reconciliation** job later compares your records with the provider's.

The classic mistakes:

- Trusting the client's "success" callback. The browser can close, the network can drop, and the user can be untruthful. Fulfil on the provider's verified webhook or an explicit server-side status check, never on a client message alone.
- Not using idempotency keys. A retry after a timeout can create a second charge. Send an idempotent key with every create request so duplicates collapse.
- Processing webhooks without verification. Anyone can POST to a public endpoint. Verify the provider's signature and treat the webhook as untrusted until you do.
- Assuming webhooks arrive exactly once or in order. They can be duplicated, delayed or reordered. Make handling [idempotent](/t/idempotence) and keyed by the provider's event ID.
- No reconciliation. When your state and the provider's disagree — and eventually they will — you need a reconciliation process to find and fix mismatches.

How to stay safe: treat the provider as the source of truth for money movement, fulfil on verified server-side signals, make everything idempotent, and reconcile regularly. It's a [third-party integration](/t/third-party-integration) with unusually high stakes, sitting alongside [subscription billing](/t/subscription-billing) and the accounting [ledger](/t/ledger).
