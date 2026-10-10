---
title: "TOTP"
summary: "Time-based one-time passwords, the 6-digit codes from authenticator apps."
levels: { backend: mid-level }
related: [mfa]
---

TOTP (Time-Based One-Time Password) is a standard method for generating short numeric codes from a shared secret and the current time. An authenticator app and the server independently calculate the code; the user enters it as a second factor during login.

Enrollment usually displays a QR code containing a provisioning URI. That QR code reveals the shared secret, so show it only during setup, require an authenticated setup session, and confirm a generated code before marking the factor active. Store the secret encrypted or otherwise protected, and never log the secret or submitted codes. A server normally accepts a small time window to account for clock skew, but a wider window increases the period in which a code may be accepted.

Codes are phishable: an attacker can relay a current code to the real site. TOTP therefore improves on password-only authentication but does not provide the same origin binding as passkeys or security keys. Provide recovery options, protect factor removal with reauthentication, and rate-limit verification attempts. Explain how users recover an account if they lose the device.

Backend developers should use a tested library and handle replay according to the system's threat model. Frontend developers should make setup, code entry, and recovery accessible. See [MFA](/t/mfa) for factor choices and broader design.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
