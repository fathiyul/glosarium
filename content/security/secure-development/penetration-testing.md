---
title: "Penetration Testing"
summary: "Authorized simulated attacks to find vulnerabilities."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

Penetration testing is an authorized assessment in which testers actively probe a system to find and demonstrate security weaknesses. It may be scoped to an application, infrastructure, mobile client, or particular attack scenarios; it is not simply running an automated scanner.

Agree on scope, dates, permitted techniques, test accounts, data handling, emergency contacts, and stop conditions before testing begins. A test against production can affect availability or create real user data, so choose a suitable environment and safeguards. The report should explain impact and reproducible evidence without exposing more sensitive data than necessary.

A penetration test is a snapshot. It can find issues in the tested paths but cannot guarantee the absence of flaws, especially after the system changes. Triage findings, assign owners, fix root causes, and retest important remediations. Avoid treating a passed test as a substitute for secure development practices or monitoring.

Backend, frontend, and data engineers should participate in scoping and remediation; the people who know the system can help distinguish a real issue from an assumption while remaining open to evidence. Choose testers with relevant expertise and clarify independence where assurance matters. See [bug bounty](/t/bug-bounty), [DAST](/t/dast), and [security review](/t/security-review).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
