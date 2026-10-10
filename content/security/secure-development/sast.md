---
title: "SAST"
summary: "Static analysis that looks for security bugs in source code."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Static application security testing (SAST) analyzes source code or compiled artifacts without running the application, looking for patterns associated with security flaws. It may identify unsafe input flows, dangerous API use, secrets, or configuration issues, depending on the tool and language support.

SAST is useful when feedback is close to the code change, but findings need review. A tool may flag safe code because it cannot understand the full context, and it may miss a flaw expressed through runtime configuration or business logic. Tune rules carefully and distinguish a false positive from a real issue with a documented reason.

For example, a scanner might flag a database call that appears to concatenate input. The reviewer should trace whether values are bound as parameters or whether the query builder safely encodes them. Do not “fix” a warning by suppressing it without understanding the data flow.

Backend, frontend, and data engineers should treat SAST as one input in a broader testing strategy. It complements dynamic testing and human review rather than replacing them. Run it on relevant code and keep results actionable so teams do not learn to ignore alerts. See [DAST](/t/dast), [security review](/t/security-review), and [shift-left security](/t/shift-left-security).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
