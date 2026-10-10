---
title: "Secret Rotation"
summary: "Regularly replacing credentials."
levels: { backend: senior, data-engineer: senior }
---

Secret rotation replaces a credential or cryptographic secret with a new one, then removes or disables the old value according to a planned transition. Secrets include API keys, database passwords, signing keys, certificates, and tokens used by services.

Rotation limits how long an exposed credential remains useful, but a rotation process that causes an outage or leaves the old secret active forever is incomplete. A safe transition often allows both old and new credentials briefly: deploy consumers that can use the new value, verify they work, then revoke the old one. The exact sequence depends on whether the provider supports overlapping credentials and how services reload configuration.

Keep secrets out of source control, logs, images, and support tickets. Know where each secret is used before changing it, and monitor authentication failures during rollout. Automate rotation where feasible, but verify that automation can recover from partial failure and that the new value is not written to an insecure location.

Backend and data engineers should inventory owners, scope, and dependencies, then test revocation and recovery. Frequent rotation has operational cost and is not a substitute for access control or rapid revocation after suspected compromise. Set cadence according to risk, policy, and provider capability. See [key management](/t/key-management) and [signing key rotation](/t/signing-key-rotation).

Make the control operational: name an owner, decide how failures are escalated, and keep evidence that the check ran on the artifact or system that actually ships. A policy that exists only in a document is easy to bypass, while an automated gate with no exception path is likely to be disabled. Review the control when the system or threat changes.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
