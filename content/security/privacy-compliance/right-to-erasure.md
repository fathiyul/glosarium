---
title: "Right to Erasure"
summary: "Deleting a user's data on request, across every system."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
---

A right-to-erasure request asks an organization to delete personal data when applicable law and circumstances grant that right. The request may have exceptions, so systems should support a reviewable process rather than assuming every request means immediate removal of every record.

The technical challenge is discovering where data lives: primary databases, search indexes, event streams, analytical stores, caches, exports, and processors. Maintain identity mapping and lineage so a request can find related records. Decide how to handle immutable backups: data may age out under a documented retention cycle, but restored backups must not silently reintroduce data that was already deleted from live systems.

For example, deleting a customer row while leaving their identifiable events in a warehouse is incomplete if those events remain linkable. Conversely, removing a transaction needed for legal or accounting purposes may not be permitted. Separate legal retention exceptions from ordinary product retention and record the decision.

Backend and data engineers should design deletion workflows with idempotency, auditability, and downstream propagation. Frontend teams should explain the request process without promising an outcome before review. Legal interpretation depends on jurisdiction and facts; consult counsel. See [GDPR](/t/gdpr), [data minimization](/t/data-minimization), and [data retention](/t/data-retention).

Make the requirement traceable to data and owners. Record the purpose, systems in scope, retention or access decision, and how an exception is reviewed. Include copies held by vendors, logs, backups, and analytical pipelines rather than checking only the primary application database. Revisit the design when the product purpose or the jurisdictions it serves change.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
