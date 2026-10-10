---
title: "Zero-Day"
summary: "A vulnerability exploited before a fix exists."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

A zero-day vulnerability is a software flaw for which the affected maintainers or defenders have no broadly available fix at the time it is being discussed; the exact usage of the term varies. It may be unknown to the vendor, known but unpatched, or actively exploited before a patch is available.

When a credible report appears, first determine whether your systems use the affected product and whether the vulnerable feature is exposed. Follow vendor and trusted incident-response guidance. Possible mitigations include disabling a feature, restricting access, adding a temporary network rule, or isolating affected systems. These are risk reductions, not necessarily complete fixes.

Keep an inventory of software and owners before a crisis. Without it, teams spend valuable time discovering whether an affected version is deployed. Monitor advisories through trusted channels and prepare a process for emergency changes that still includes review, testing, and rollback planning.

Backend, frontend, and data engineers may need to coordinate across application, infrastructure, and vendor teams. Do not publish unverified exploit details or claim a system is safe solely because no alert fired. Temporary mitigations may break legitimate behavior, so communicate scope and revisit them after an official update. See [CVE](/t/cve), [security review](/t/security-review), and [incident response](/t/incident-response).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
