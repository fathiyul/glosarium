---
title: "Anonymization vs Pseudonymization"
summary: "Irreversibly vs reversibly removing identity from data."
levels: { backend: senior, data-engineer: mid-level , data-analyst: mid-level }
also: [data-governance]
---

Anonymization attempts to transform data so people can no longer reasonably be identified, while pseudonymization replaces direct identifiers with tokens or codes but leaves a way to reconnect them. Pseudonymized data can still be personal data because a separate mapping or other information may restore the link.

Removing a name alone is rarely enough. A combination of location, dates, job role, or unusual behavior may identify someone when joined with other datasets. Assess the whole release and plausible auxiliary information, not just obvious columns. Techniques such as aggregation, suppression, generalization, and noise each reduce detail and utility in different ways.

For example, replacing customer IDs with random codes may prevent casual recognition, but if the organization retains a lookup table, the dataset is pseudonymized, not anonymized. Protect the mapping separately, limit access, and document how re-identification risk was assessed. Stronger privacy transformations can reduce analytical usefulness and may still require legal review.

Backend developers should preserve deletion and access controls around mapping tables. Data engineers should track transformed data through exports and derived datasets. Legal definitions and obligations depend on jurisdiction and context, so do not label a dataset anonymous as a shortcut around privacy duties. See [data minimization](/t/data-minimization), [GDPR](/t/gdpr), and [privacy by design](/t/privacy-by-design).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.
