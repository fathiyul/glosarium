---
title: "Audit Logging"
summary: "Recording who did what and when, for accountability."
levels: { backend: mid-level, data-engineer: mid-level , tech-entrepreneur: growth }
---

Audit logging records security-relevant actions with enough context to answer who did what, when, and to which resource. Examples include permission changes, account recovery, access to sensitive records, key operations, and administrative actions. It supports investigations and accountability; it is different from application debug logging.

Logs should be useful without becoming a second database of secrets. Record stable actor and resource identifiers, action, outcome, and relevant context, but avoid passwords, access tokens, full payment details, and unnecessary personal data. Protect logs from unauthorized reading and tampering, define retention, and synchronize clocks sufficiently for events to be correlated.

For example, “role changed” is less useful than recording the actor, target account, previous and new role, timestamp, and success or failure—while keeping the event payload free of credentials. Do not trust a client to report its own audit event for an action the server performs; write the record from the authoritative service path.

Backend and data engineers should define event schemas and monitor delivery failures. Ensure logging does not make a critical action silently succeed without an audit trail when policy requires one. Detailed audit records have storage, privacy, and access costs, so collect events tied to a clear need. See [security review](/t/security-review) and [data minimization](/t/data-minimization).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
