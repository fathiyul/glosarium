---
title: "CCPA"
summary: "California's consumer privacy law."
levels: { backend: senior, data-engineer: senior }
---

The California Consumer Privacy Act (CCPA), as amended, is a California privacy law that gives covered consumers rights concerning certain personal information and places obligations on covered businesses. Its scope, definitions, exceptions, and operational requirements depend on the organization and processing; teams should check current regulations and legal guidance.

Engineering systems may need to support notices, access and deletion requests, correction, and choices related to certain sharing or targeted advertising. The details differ from other privacy regimes, so avoid assuming a single generic “privacy request” endpoint satisfies every law. Keep data inventories, identify service providers and recipients, and map identity across systems so requests can be handled reliably.

For example, if a person requests access, the organization needs to locate relevant data in product databases, customer-support tools, and analytics stores, while applying lawful exclusions and protecting other people's information. An email address alone may not identify every copy if data has been transformed or pseudonymized.

Backend and data engineers should make systems traceable and support purpose-aware workflows; frontend teams should present choices accurately and accessibly. Legal interpretation and thresholds change, so involve privacy counsel and avoid treating this summary as legal advice. See [GDPR](/t/gdpr), [data minimization](/t/data-minimization), and [right to erasure](/t/right-to-erasure).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
