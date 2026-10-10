---
title: "SOC 2"
summary: "An audit of how a company protects customer data."
levels: { backend: staff, data-engineer: staff }
---

SOC 2 is an independent attestation framework for controls related to security and, depending on scope, availability, confidentiality, processing integrity, and privacy. An audit examines a defined service boundary and period; it is not a certification that a company or product is completely secure.

Engineering teams may need to provide evidence that access is reviewed, changes are approved, incidents are handled, and systems are monitored. Controls must operate consistently, not only exist in a policy document. Define system scope and owners so evidence can be gathered from the systems that actually support the service.

For example, a change-management control needs a trace from a production deployment to its review and approval records. A spreadsheet assembled just before an audit may not prove the process operated throughout the period. Automating evidence collection can reduce manual work, but the data source and control interpretation still require review.

Backend and data engineers should understand which systems and subprocessors are in scope and avoid claiming that an audit covers unrelated products. Reports are generally shared under controlled conditions, and customer requests should follow the organization's process. This is not legal or audit advice. See [compliance as code](/t/compliance-as-code), [audit logging](/t/audit-logging), and [security review](/t/security-review).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
