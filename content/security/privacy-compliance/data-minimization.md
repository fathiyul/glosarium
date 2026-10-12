---
title: "Data Minimization"
summary: "Collecting only the data you actually need."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: senior , data-scientist: mid-level }
---

Data minimization means collecting, using, and retaining only the personal or sensitive data needed for a stated purpose. It reduces the amount of information that can be exposed in a breach, misused, or become expensive to govern.

Start by writing down why each field is needed, who uses it, and how long it must be kept. A form that asks for a full birth date when an age range is sufficient creates extra risk without clear value. The same reasoning applies to analytics events, logs, support exports, and test datasets. “We might need it later” is not a purpose or a retention plan.

Minimization can conflict with product needs, fraud controls, or legal retention requirements. Document those cases, restrict access, and collect the least detailed information that supports the need. Deleting a field from the user-facing database is not enough if copies remain in backups, warehouses, logs, and vendor systems.

Backend and frontend developers can reduce collection at the point of entry. Data engineers should trace copies and derived fields and build deletion into pipelines. Review minimization when features change rather than treating it as a one-time form audit. Jurisdictional duties vary, but limiting unnecessary data is a useful engineering default. See [privacy by design](/t/privacy-by-design), [GDPR](/t/gdpr), and [data retention](/t/data-retention).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
