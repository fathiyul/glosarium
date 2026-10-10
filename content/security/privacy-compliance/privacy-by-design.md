---
title: "Privacy by Design"
summary: "Building privacy in from the start."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

Privacy by design means considering privacy goals and risks throughout a system's design and operation instead of bolting controls on after data has already spread. It includes choices about what to collect, why, where it flows, who can access it, and when it should be removed.

A practical review starts with the feature's purpose and data flow. Could an aggregate answer the product question instead of individual records? Can an identifier be scoped or pseudonymized? Who needs access, and how will a user request be handled? These choices can be cheaper before APIs, events, and downstream consumers depend on a broad schema.

For example, an analytics event may need a coarse region and product action, not a full address and free-text account details. Minimizing those fields at collection prevents copies from appearing in warehouses and vendor tools later. Privacy by design does not mean avoiding all data; it means justifying and protecting the data that serves a legitimate purpose.

Backend, frontend, and data engineers should make privacy requirements visible in design reviews, defaults, and tests. Controls can add effort and constrain future reuse, so document trade-offs and revisit them when purposes change. Legal obligations vary, and privacy specialists should help interpret them. See [data minimization](/t/data-minimization), [GDPR](/t/gdpr), and [anonymization](/t/anonymization).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
