---
title: "GDPR"
summary: "The EU regulation on personal data: consent, access and deletion rights."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: senior , tech-entrepreneur: pmf , data-scientist: mid-level }
---

The General Data Protection Regulation (GDPR) is a European Union data-protection law that governs processing of personal data in its scope. It sets obligations for organizations and rights for individuals, including transparency, access, correction, and in some circumstances erasure or portability. Applicability depends on the organization, people, and processing involved.

Engineering work often turns legal and product decisions into system behavior: recording purposes and lawful bases, limiting collection, honoring access or deletion requests, controlling processors, and protecting data. A user ID can still be personal data if it can be linked to a person; removing a name does not automatically take information outside scope.

For example, a deletion request may require finding a person's records across operational databases, event stores, exports, and processors while respecting applicable retention exceptions. Build data lineage and ownership so requests do not rely on one engineer remembering every copy. Do not promise automatic deletion from immutable backups without a designed retention and restore process.

Backend, frontend, and data engineers should involve privacy and legal specialists when requirements are unclear. GDPR obligations depend on facts and jurisdiction; this page is not legal advice and should not replace counsel. See [right to erasure](/t/right-to-erasure), [data minimization](/t/data-minimization), and [anonymization](/t/anonymization).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
