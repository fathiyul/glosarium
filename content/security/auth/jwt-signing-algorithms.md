---
title: "JWT Signing Algorithms"
summary: "HS256 (shared secret) vs RS256/ES256 (key pair), and when each fits."
levels: { backend: mid-level }
related: [jwt, jwks]
---

JWT signing algorithms determine how a token's signature is produced and verified. With a symmetric algorithm such as HMAC, the issuer and every verifier share a secret. With an asymmetric algorithm such as RSA- or elliptic-curve-based signing, the issuer holds a private key and verifiers can use the corresponding public key.

A shared secret is operationally simple for a small system, but every service that can verify tokens also has material that can mint them if compromised. Public-key signing lets verifiers receive only public keys, which can make trust boundaries easier to manage. It also introduces key publication, caching, and rotation concerns. Neither family is automatically right for every deployment; align the choice with who issues tokens and which services verify them.

Use a well-maintained JWT library and configure an explicit allowlist of acceptable algorithms. Never accept whatever algorithm the token header asks for, and never reuse a key across unrelated purposes without a deliberate design. Verifiers need a safe way to select the correct key during rotation, often using a key identifier and a published [JWKS](/t/jwks) endpoint.

Backend developers should test rejection of wrong algorithms, unknown keys, and malformed signatures, not just a happy-path token. See [JWT claims](/t/jwt-claims) for the separate question of which signed values to trust. Exact algorithm availability and operational guidance vary by library and environment.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
