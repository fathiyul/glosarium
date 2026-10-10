---
title: "STRIDE"
summary: "A way to categorize threats: spoofing, tampering, repudiation, disclosure, denial of service, elevation."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

STRIDE is a threat-modeling mnemonic that groups threats into spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege. It helps a team systematically ask what could go wrong in a design, especially at data flows and trust boundaries.

For a file-upload service, spoofing asks whether a caller can impersonate another user; tampering asks whether the file or metadata can be changed; repudiation asks whether important actions can be denied later; disclosure asks who can read the file; denial of service asks whether uploads can exhaust resources; elevation asks whether an upload leads to more privileges. The categories prompt questions—they do not automatically identify every risk.

Draw the system and its trust boundaries, list assets and actors, then use relevant STRIDE categories to develop concrete abuse scenarios. Prioritize by impact and likelihood, and assign mitigations to owners. Do not turn the exercise into a checklist that produces six generic risks with no connection to the design.

Backend, frontend, and data engineers can use STRIDE during design review and revisit it when architecture changes. The framework takes time and can feel heavyweight for a small change; scale the depth to the consequence and novelty of the system. See [attack surface](/t/attack-surface), [trust boundary](/t/trust-boundary), and [security review](/t/security-review).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
