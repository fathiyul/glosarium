---
title: "HIPAA"
summary: "US rules for protecting health information."
levels: { backend: senior, data-engineer: senior }
---

HIPAA is a United States law that includes rules for protecting certain health information handled by covered entities and their business associates. Whether an organization, dataset, or service is covered depends on specific legal relationships and information, not simply on whether the product involves health.

Engineering controls may include role-based access, auditability, secure transmission and storage, workforce procedures, and agreements with service providers. The right design depends on the applicable rules and organizational role. Do not assume that removing a person's name automatically makes health data de-identified or outside the law; combinations of information may still identify someone.

For example, a vendor hosting a covered organization's records may have contractual and security responsibilities that differ from a consumer wellness app. Classify the data and relationship before choosing architecture. Build access and audit controls around actual workflows, and ensure support, analytics, backups, and test environments are included in the review.

Backend and data engineers should involve privacy, security, and legal teams early. Compliance claims require evidence and ongoing operational practices; encryption alone is not proof of compliance. This is general information, not legal advice. See [data classification](/t/data-classification), [audit logging](/t/audit-logging), and [data residency](/t/data-residency).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
