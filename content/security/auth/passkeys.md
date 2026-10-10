---
title: "Passkeys (WebAuthn)"
summary: "Phishing-resistant login with device-bound key pairs instead of passwords."
levels: { backend: senior, frontend: senior }
related: [mfa]
---

Passkeys use public-key cryptography through WebAuthn and related platform mechanisms to authenticate a user without a reusable password. The authenticator keeps a private credential and the service stores a corresponding public key; the browser or device helps bind the assertion to the legitimate site.

This origin binding makes passkeys resistant to common phishing pages that can capture passwords or one-time codes. The private key is not sent to the service. User experience and synchronization behavior depend on the authenticator ecosystem and platform, so design account recovery and device changes deliberately rather than assuming one device is always available.

A passkey login still needs server-side challenge validation, origin and relying-party checks, and replay protection. Enrolling a new credential is a sensitive account change: require an authenticated context, explain what is being added, and notify the user through an appropriate channel. Do not confuse a passkey with a biometric; a biometric may unlock a credential locally but is not itself sent to the server.

Backend engineers implement credential registration and assertion verification with a tested WebAuthn library. Frontend engineers handle browser APIs, accessibility, and fallback flows. Recovery choices can weaken the overall design, so protect them at least as carefully as login. See [MFA](/t/mfa) and [identity provider](/t/identity-provider).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
