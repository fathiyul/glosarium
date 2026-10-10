---
title: "CVSS"
summary: "A score rating how severe a vulnerability is."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

CVSS (Common Vulnerability Scoring System) is a framework for describing characteristics and severity of a software vulnerability. A CVSS score summarizes factors such as attack vector, required privileges, and impact; it is not a direct measurement of the risk to your specific service.

Use the score to support triage, not to sort a remediation queue blindly. A vulnerability with a high score may affect a component you do not deploy, while a lower-scored issue could be critical in an internet-facing path with sensitive data. Consider exploit availability, exposure, compensating controls, business impact, and whether the vulnerable code is reachable.

For example, a scanner may report a severe library issue in a build-only tool that never reaches production. Another issue with a lower score may be reachable through a public endpoint that handles account recovery. Record why you prioritize one over another so the decision is reviewable.

Backend, frontend, and data engineers should read the vector and assumptions behind a score rather than repeating just the number. CVSS versions and scoring interpretations can change, so include the version and source when tracking results. Do not treat a score as a legal or compliance deadline unless policy explicitly says so. See [CVE](/t/cve) and [dependency scanning](/t/dependency-scanning).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
