---
title: "Entitlements and Plan Limits"
summary: "Deciding which features and quotas each plan unlocks."
levels: { backend: mid-level, frontend: mid-level , tech-entrepreneur: pmf }
aliases: ["entitlements", "plan limits", "feature entitlements"]
prereqs: ["subscription-billing", "rbac"]
related: ["subscription-billing", "rbac", "usage-metering", "feature-flags"]
---

**Entitlements** are the capabilities and limits a customer gets from their plan: which features are unlocked, how many seats, how much storage, how many API calls. They're the runtime answer to "is this customer allowed to do/use this?" — checked throughout the product, not just at billing.

```text
plan "pro" → features { sso: true, api: true }, limits { seats: 20, storage_gb: 100 }
check(entitlement, current_usage) → allowed? deny?
```

They connect several systems: **billing** sets the plan; **entitlements** translate the plan into capabilities; the application checks them at the point of use; and **usage metering** tracks consumption against limits. They should be one source of truth, not scattered `if plan == 'pro'` checks.

The classic mistakes:

- Hard-coding plan checks everywhere. `if plan == 'pro'` sprinkled through the codebase means every new plan or feature change touches many places, and they drift. Centralise entitlements.
- Entitlements only in the UI. Hiding a button isn't enforcement; the server must check the entitlement too, or users bypass it via the API. Enforce on the backend (see [authorization](/t/authentication-vs-authorization)).
- Confusing entitlements with [RBAC](/t/rbac). Entitlements are what the *plan* allows (a paying feature); RBAC is what a *user's role* allows (who can do what). Both apply; keep them separate.
- No grace/overage handling. What happens when a customer exceeds a limit mid-month? Block, allow with overage billing, or warn? Decide and implement (see [usage metering](/t/usage-metering)).
- Stale entitlements. After an upgrade/downgrade, the new capabilities must take effect (and be revoked on downgrade); caching entitlements needs invalidation (see [cache consistency](/t/cache-consistency)).
- Losing usage on plan change. When a plan changes mid-cycle, limits and [proration](/t/proration) must interact correctly.
- No audit. Which plan a customer was on, and when, matters for disputes and support; keep a history.

How to design it: define entitlements as data (per plan), evaluate them centrally, enforce on the server, track usage against limits, and keep plan history. It's the layer that turns "they pay for X" into "the product actually lets them do X" — the practical bridge between [subscription billing](/t/subscription-billing) and the feature itself. See [feature flags](/t/feature-flags).
