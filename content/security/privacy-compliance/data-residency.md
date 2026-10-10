---
title: "Data Residency"
summary: "Requirements that data stays within certain countries."
levels: { backend: staff, data-engineer: staff , data-analyst: senior , tech-entrepreneur: growth }
---

Data residency describes where data is stored or processed geographically, often because of law, contract, customer policy, or operational requirements. It is distinct from data sovereignty, which can concern which jurisdiction's laws apply and who has control; organizations may use these terms differently.

A residency requirement can involve more than the primary database. Backups, logs, support access, analytics exports, disaster recovery copies, and subprocessors may also move or expose data across borders. Map the data lifecycle and verify provider configuration and contractual commitments rather than relying on a region selector alone.

For example, keeping a production database in one country does not necessarily keep its backups or support diagnostics there. A team may need region-specific processing, access restrictions, and evidence of where copies reside. Replication for availability can conflict with a strict locality requirement, so design the trade-off before enabling global failover.

Backend and data engineers should understand storage and processing paths and keep regional boundaries explicit in architecture and infrastructure code. Locality can add cost and limit service options; do not promise residency without validating every relevant component. Legal interpretation varies by jurisdiction and data category. See [GDPR](/t/gdpr), [compliance as code](/t/compliance-as-code), and [encryption at rest](/t/encryption-at-rest).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
