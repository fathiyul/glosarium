---
title: "JWKS"
summary: "JSON Web Key Set: a published endpoint of public keys used to verify signed tokens."
levels: { backend: senior }
related: [jwt-signing-algorithms, signing-key-rotation]
---

JWKS (JSON Web Key Set) is a JSON document containing public keys that a service publishes so other systems can verify signed tokens. A verifier may use a token's key identifier to select a matching key from the issuer's set. JWKS is commonly used with asymmetric signing, where verifiers need public keys but should not receive the issuer's private signing key.

Treat the JWKS endpoint as part of the trust configuration. Pin the expected issuer and audience, validate the signature with an explicitly allowed algorithm, and handle unknown key identifiers safely. Do not fetch a key URL chosen by an untrusted token header; that can create network or trust problems. Caching reduces repeated fetches, but stale caches can delay rotation, so follow the protocol and issuer guidance.

During key rotation, issuers often publish old and new public keys during an overlap so existing tokens remain verifiable while new tokens use the new key. Plan cache refresh and failure behavior rather than assuming every verifier sees an update immediately.

Backend engineers should use a maintained JWT/OIDC library and monitor key-fetch errors without logging bearer tokens. JWKS proves which public key verifies a signature; it does not by itself establish that the issuer should be trusted. See [JWT signing algorithms](/t/jwt-signing-algorithms), [signing key rotation](/t/signing-key-rotation), and [JWT claims](/t/jwt-claims).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
