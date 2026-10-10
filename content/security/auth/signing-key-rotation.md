---
title: "Signing Key Rotation"
summary: "Replacing token signing keys regularly without invalidating every live token."
levels: { backend: senior }
related: [jwks]
---

Signing-key rotation replaces a private key used to sign tokens with a new key while allowing verifiers to validate tokens that were legitimately signed before the change. It limits long-term exposure and supports response to suspected compromise, but it requires issuer and verifier coordination.

A common planned approach is to publish the new public key, begin signing with the new private key, and retain the old public key long enough to verify still-valid tokens. After the maximum relevant token lifetime and propagation period, remove the old public key. Exact overlap depends on token lifetimes, caching, and the key distribution mechanism. If compromise is suspected, waiting for normal overlap may be unsafe; revoke or invalidate affected credentials according to the incident plan.

Use key identifiers and a maintained verification library. Ensure verifiers fail safely when they see an unknown key, and do not let a token direct them to arbitrary key material. Keep private keys in a protected key-management system and audit access.

Backend engineers should test rotation, cache refresh, rollback, and emergency revocation before relying on them. Rotation can briefly increase complexity and key storage, so automate it carefully. See [JWKS](/t/jwks), [token revocation](/t/token-revocation), and [key management](/t/key-management).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
