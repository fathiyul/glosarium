---
title: "Security Review"
summary: "Reviewing a design or change specifically for security risks."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

A security review examines a design, code change, or operational process for risks that ordinary feature review may miss. It can range from a focused check of a sensitive endpoint to a structured threat model of a new system.

Start with the assets and trust boundaries involved, who can make each request, what data is exposed, and how the feature behaves when inputs or dependencies fail. Ask about authentication, resource-level authorization, validation, secrets, logging, abuse limits, and recovery. A review should produce concrete risks, decisions, and owners—not a vague “looks secure” approval.

For example, a new export endpoint needs more than a check that the user is logged in: confirm which records they may export, whether the request can be repeated to exhaust resources, how the file is protected, and whether audit events avoid leaking its contents. Involve engineers who understand both the implementation and product rules.

Backend, frontend, and data engineers should request deeper review when a change crosses trust boundaries or handles sensitive data. Reviews cost time, so scale depth to risk and involve security specialists for unfamiliar or high-impact designs. They complement automated analysis and testing rather than replacing them. See [STRIDE](/t/stride), [SAST](/t/sast), and [penetration testing](/t/penetration-testing).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
