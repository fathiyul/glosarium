---
title: "Responsible Disclosure"
summary: "Reporting vulnerabilities privately before going public."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

Responsible disclosure is a process for reporting a vulnerability privately to the affected organization so it can investigate and prepare a fix before details are made broadly public. Organizations may also publish a coordinated disclosure policy that describes how researchers should contact them and what response to expect.

A clear reporting channel matters. Security contact information, encryption options, scope, and acknowledgment expectations help researchers send useful details without exposing users. The receiving team should preserve the report, reproduce it safely, assess impact, communicate progress, and coordinate a release or mitigation. Avoid demanding silence indefinitely; timelines and disclosure expectations should be discussed and handled fairly.

Researchers should avoid accessing or changing data beyond what is needed to demonstrate the issue, and stop if testing risks service or user harm. Organizations should not treat good-faith reports as ordinary abuse when they follow stated rules, while legal obligations and safe-harbor wording vary by jurisdiction.

Backend, frontend, and data engineers may be asked to reproduce and fix a report. Keep communication factual and do not send sensitive production records back to the reporter. A process is only useful if someone monitors it and can act. See [bug bounty](/t/bug-bounty) and [security review](/t/security-review).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
