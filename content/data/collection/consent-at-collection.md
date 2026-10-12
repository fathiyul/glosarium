---
title: "Consent at Collection"
summary: "Only collecting what users agreed to, and recording that they agreed."
levels: { data-engineer: mid-level, backend: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["collection-time consent", "consent capture", "consent recording"]
prereqs: ["instrumentation", "tracking-plan"]
related: ["cookie-consent", "gdpr", "privacy-by-design", "data-minimization", "pii", "right-to-erasure"]
---

Consent at collection means only collecting personal data for which the user has actually given permission, and recording that permission as part of the data. It is the opposite of collecting everything and promising to filter later.

The classic mistake is honouring an opt-out only in the analytics dashboard while the raw events, including identifiers, are still stored. Once personal data is collected it is already a liability: you must protect it, retain it correctly, and delete it on request. Under laws such as [GDPR](/t/gdpr) and [CCPA](/t/ccpa) you need a lawful basis for processing, and consent is only one basis.

A practical rule is that the consent decision travels with the event:

```
event: page_viewed
consent: { analytics: true, marketing: false, policy_version: "2026-03" }
```

If marketing consent is false, do not attach advertising identifiers. Record what the user agreed to, when, and which version of your policy, so you can prove it later.

## Trade-offs

- Enforcing strictly at collection can lose data for users who consent later; you cannot backfill what you never recorded. That is usually the right trade for personal data.
- Not all data needs consent. Data necessary to deliver a service may rest on a different basis, and the rules differ by jurisdiction and purpose, so check rather than assume.
- Consent is not the same as deletion. You still need [data minimization](/t/data-minimization), [retention](/t/data-retention) limits and a [right to erasure](/t/right-to-erasure) process.

For backend developers, the API boundary is the natural place to enforce this: reject or strip fields the caller is not allowed to send. See [cookie consent](/t/cookie-consent) and [privacy by design](/t/privacy-by-design).
