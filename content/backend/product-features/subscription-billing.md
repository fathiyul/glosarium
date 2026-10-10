---
title: "Subscription Billing"
summary: "Plans, trials, renewals, failed payments and dunning."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["subscription billing", "recurring billing", "subscriptions"]
prereqs: ["payment-integration", "invoices-receipts"]
related: ["payment-integration", "invoices-receipts", "proration", "entitlements"]
---

**Subscription billing** charges a customer repeatedly for an ongoing plan — monthly or annually — instead of a one-off payment. It's the mechanics behind SaaS pricing, and it's more than "charge again every month": it involves renewal cycles, plan changes, failed payments, trials and proration.

The main concerns:

- Cycle and renewal — bill on a schedule; handle a cycle that starts mid-month.
- Plan changes — upgrades/downgrades mid-cycle need [proration](/t/proration) (charge or credit the partial period).
- Failed payments (dunning) — a declined card shouldn't immediately cancel service; retry, notify, and give a grace period before suspending.
- Trials and discounts — free trials that convert, and coupons applied to some cycles (see [coupons](/t/coupons-discounts)).
- Invoices — each cycle produces an invoice/receipt (see [invoices and receipts](/t/invoices-receipts)).

The classic mistakes:

- Reimplementing the payment gateway's subscription engine badly. Billing has a lot of edge cases (retries, proration, tax, disputes); most teams are better served by a billing provider than by hand-rolled recurring charges, unless billing *is* the product.
- No dunning. Cancelling on the first failed charge loses customers to a temporary card issue. Retry over days and notify.
- Proration errors. Upgrading mid-cycle without proration either overcharges or undercharges; the partial amount must be computed and invoiced correctly.
- Webhook and state mismatches. The gateway is authoritative for payment status; not reconciling your state with its webhooks causes access that doesn't match payment (see [payments integration](/t/payment-integration)).
- Granting service before payment confirms. Offer access on a *confirmed* successful charge, not on an optimistic assumption — or you give away service.
- Time zones and cycle dates. "Renews on the 1st" is ambiguous across time zones; define the cycle boundary precisely (see [timezone](/t/timezone)).
- Ignoring upgrades/downgrades and entitlements. A plan change must update what the customer can do (see [entitlements](/t/entitlements)).
- No idempotency. Retried charges or duplicate webhooks can double-bill; make charge operations idempotent (see [idempotency key](/t/idempotency-key)).

**How to build it:** define cycles and proration rules, use a billing provider's subscription engine where possible, implement dunning, generate invoices, reconcile via verified webhooks, and update entitlements on plan changes. It's [payments integration](/t/payment-integration) extended over time, and correctness is financial — treat every edge case (failures, changes, time zones) deliberately. See [payment integration](/t/payment-integration).
