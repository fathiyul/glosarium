---
title: "Security Champion"
summary: "An engineer on each team who advocates for security."
levels: { backend: staff, frontend: staff, data-engineer: staff }
---

A security champion is an engineer embedded in a product or platform team who helps connect day-to-day development with security expertise. They may help identify risks early, share secure patterns, route questions, and make reviews more effective.

The role works best when champions have time, training, clear escalation paths, and support from security specialists. It should not make one person solely responsible for the team's security or turn them into a gatekeeper for every change. The whole team still owns safe implementation, while security teams provide deeper expertise and organization-wide policy.

For example, a champion can notice that a new export feature crosses a sensitive data boundary and bring the right people into a threat review before implementation is complete. They can also help a team interpret scanner findings and distinguish a real issue from noise, but should not be expected to independently approve unfamiliar cryptographic designs.

Backend, frontend, and data champions need domain-specific context and access to current guidance. Rotate or back up the role so knowledge survives team changes. Measure whether the program improves early questions and remediation, not only the number of meetings. See [security review](/t/security-review) and [shift-left security](/t/shift-left-security).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

For data engineers, apply the same controls to warehouse access, pipeline identities, exported datasets, and the copies that move downstream.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
