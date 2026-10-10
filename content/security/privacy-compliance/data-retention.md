---
title: "Data Retention"
summary: "How long to keep data, and when to delete it."
levels: { backend: senior, data-engineer: mid-level , data-analyst: mid-level }
aliases: ["retention policy", "data retention policy", "retention periods", "data deletion policy", "data lifecycle"]
prereqs: ["pii", "gdpr"]
related: ["right-to-erasure", "data-minimization", "gdpr", "anonymization", "storage-lifecycle", "data-retention-tiers"]
core: [data-engineer]
also: [data-governance]
---

**Data retention** is deciding **how long you keep each kind of data, and when and how you delete it**. Keeping everything forever feels safe, but it creates cost, risk and legal exposure.

## Why limit retention

- **Privacy law**: regulations such as GDPR require that personal data is kept no longer than necessary for its purpose ([GDPR](/t/gdpr), [data minimization](/t/data-minimization)). You must be able to justify your periods.
- **Smaller blast radius**: data you don't have can't be leaked or subpoenaed. Old data is a liability in a breach.
- **Cost**: storage, backups and processing add up.
- **Performance**: smaller tables and indexes are faster.
- **User trust** and the right to have data erased ([right to erasure](/t/right-to-erasure)).

## Why you can't just delete everything

- **Legal and regulatory duties to keep** certain records for a period: invoices and tax records, financial and audit logs, medical records. These requirements vary by country and industry.
- **Business needs**: support history, fraud analysis, disputes.
- **Debugging and security forensics**: logs for a reasonable window.
- **Legal holds**: litigation can require you to preserve data.

So retention is a balance, and the answer is different for each data category.

## A retention schedule

| Data | What drives the period | Then |
|---|---|---|
| Application logs | Debugging and security needs; usually weeks to a few months | Delete |
| Closed support tickets | How long history stays useful for support | Delete or anonymize |
| Invoices and financial records | Tax and accounting law in your jurisdictions | Archive, then delete |
| Inactive user accounts | Your policy and what users were told | Delete or anonymize |
| Raw analytics events | How long raw detail is needed vs aggregates | Aggregate, then delete the raw data |
| Backups | Your recovery needs, and how deletions propagate | Expire on a rolling schedule |

The actual periods must come from your legal and compliance teams, so don't guess them.

## Implementing it

- **Define it per data type, in writing**, with an owner.
- **Automate deletion.** Scheduled jobs, TTLs on tables and storage lifecycle rules ([storage lifecycle](/t/storage-lifecycle), [retention tiers](/t/data-retention-tiers)). Manual cleanup doesn't happen.
- **Make data deletable**: tag it with dates and owners, and avoid scattering personal data in places you can't find.
- **Cover everything**: replicas, caches, search indexes, data warehouses, logs, exports and **backups** (which expire on their own schedule).
- **Consider anonymization** to keep statistics without personal data ([anonymization](/t/anonymization)).
- **Soft delete is not deletion** if the row stays forever.
- **Verify and log** deletions, and handle legal holds as exceptions.

Plan retention when you design a feature, since it's much harder to add after the data is scattered across systems.
