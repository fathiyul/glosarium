---
title: "Account Deletion"
summary: "Deleting or anonymizing a user across every table and system."
levels: { backend: mid-level, frontend: mid-level , tech-entrepreneur: pmf }
aliases: ["account deletion", "delete account", "account removal"]
prereqs: ["soft-delete", "gdpr"]
related: ["soft-delete", "gdpr", "audit-columns", "backups"]
---

**Account deletion** is a user's request to remove their account and data — a common feature and, under privacy rules like [GDPR](/t/gdpr), often a legal right. The mechanics are more involved than a `DELETE`: you must decide what's removed, what's retained, and how to handle data spread across many tables and systems.

```text
request → grace period (reversible?) → delete/anonymize data → confirm
```

The design questions:

- Immediate or delayed? A **grace period** (or "deactivate then delete") lets users recover from an accidental request and gives you time to cancel subscriptions, stop billing, etc.
- Hard delete or anonymize? Some data must actually go; other data (order history for tax, financial records) must be retained but can be anonymized.
- Cascade and references. The account's data spans many tables and services; deletion must cover all of them (or orphaned data and broken references remain).
- Legal retention. Financial, legal and fraud-prevention obligations may require keeping some records for a period, even after "deletion".

The classic mistakes:

- Deleting the user row and stopping there. Related records across tables/services are left behind, breaking referential integrity or leaving personal data. Map everything tied to the account.
- Deleting data you're legally required to keep. Financial and legal records often must be retained; a blanket delete violates obligations. Distinguish erasable personal data from retainable records.
- No grace period or confirmation. An accidental click permanently destroys an account; a grace period and confirmation prevent that.
- Forgetting billing and subscriptions. Deleting an account without cancelling its subscription keeps charging the user. Cancel billing as part of deletion.
- Ignoring backups. Backups retain deleted data until they expire; your privacy handling must account for that (and say so).
- Missing third parties. Data sent to analytics, CRM, email providers, etc., must also be deleted/requested for deletion (see [third-party integration](/t/third-party-integration)).
- No audit of the deletion. Keep a record that deletion happened and when (without the deleted data) for compliance and support.
- Breaking referential integrity. A hard delete of a parent row can cascade-fail or orphan children; use [soft delete](/t/soft-delete) or anonymization where references must survive.

**How to implement it:** define exactly what's deleted vs anonymized vs retained; span every system; cancel billing; offer a grace period; run it as a robust background job; and record the deletion. It's a routine feature with real legal weight — treat it as a careful, audited process, not a single `DELETE`. See [audit columns](/t/audit-columns).
