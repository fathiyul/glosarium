---
title: "DAST"
summary: "Testing a running app for vulnerabilities from the outside."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

Dynamic application security testing (DAST) tests a running application from the outside, sending requests and observing responses for vulnerabilities. It can find issues in deployed behavior and configuration that source-only analysis may not see.

DAST needs a reachable test target and careful scope. A scanner can submit unexpected inputs, create records, trigger emails, or place load on the service. Use a test environment or explicitly approved production-safe checks, provide test accounts where needed, and prevent scans from crossing into unrelated systems. Authentication and role configuration affect what the tool can discover.

Findings require validation. A scanner may infer a problem from a response pattern that has another explanation, while issues involving business rules may not be detectable automatically. Reproduce results, identify the affected route and role, and turn confirmed problems into tests or tracked fixes.

Backend, frontend, and data teams should use DAST as one layer alongside code review, unit tests, and [SAST](/t/sast). It does not prove that an application is secure, and a clean scan only describes the paths and payloads tested. Schedule scans after meaningful changes and ensure the scan configuration is maintained as routes evolve. See [penetration testing](/t/penetration-testing).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

For data engineers, apply the same controls to warehouse access, pipeline identities, exported datasets, and the copies that move downstream.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
