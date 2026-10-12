---
title: "PII"
summary: "Personally identifiable information that needs special care."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: mid-level , tech-entrepreneur: mvp , data-scientist: junior }
also: [data-governance]
aliases: ["personal data", "personally identifiable information", "personal information"]
prereqs: ["data-minimization"]
related: ["gdpr", "data-minimization", "anonymization", "data-retention", "no-sensitive-data-in-logs", "right-to-erasure", "data-governance"]
---

PII is information that identifies a person, directly or in combination with other data: a name, email address, phone number, home address, government ID, IP address, a device ID, a photo. Some laws use the broader term "personal data" and define it a bit differently (see [GDPR](/t/gdpr)), so check which rules apply to you.

Two points trip people up:

- **Combinations count.** A birth date, ZIP code and gender may each look harmless, but together they can point to one person.
- **"Sensitive" is a higher tier.** Health, financial, biometric and similar data usually carry stricter rules than a plain email address.

## Why it matters when you write code

Collecting PII creates duties: protect it, limit who sees it, delete it when it is no longer needed, and tell people what you hold. A leak of PII is also the kind of breach that ends up in the news and in legal trouble.

The habits that cover most of it:

- **Collect less.** If you don't need a birth date, don't ask. Data you never stored can't leak. See [data minimization](/t/data-minimization).
- **Keep it out of logs, URLs and analytics events.** This is the most common accidental leak. See [no sensitive data in logs](/t/no-sensitive-data-in-logs).
- Know where it lives. Databases, backups, caches, search indexes and exports all hold copies, which matters when someone asks you to delete theirs.
- Set retention limits. See [data retention](/t/data-retention).
- Limit access to people who need it.

```python
# Wrong: the email ends up in every log line
logger.info("Login failed for %s", email)

# Better: log an internal ID
logger.info("Login failed for user_id=%s", user_id)
```

Removing a name is not the same as [anonymizing](/t/anonymization) data; records can often be re-linked.
