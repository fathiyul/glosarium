---
title: "JWT Claims"
summary: "The fields inside a JWT payload, such as sub, exp, iat, iss and aud, and which to check."
levels: { backend: mid-level }
related: [jwt]
---

JWT claims are the named values in a JSON Web Token payload. Registered claims such as `iss` (issuer), `sub` (subject), `aud` (audience), `exp` (expiry), and `iat` (issued-at time) have widely used meanings; applications can also define private claims for their own needs.

A signed token is usually readable by its holder. A signature can show that the payload was not changed, but it does not hide the claims. Do not put passwords, secrets, or unnecessary personal data in them. Claims may also become stale before the token expires, so avoid using a long-lived token as a live copy of mutable permissions.

Validation is not just “the signature is valid.” The API should require the expected issuer and audience, check expiration and any relevant not-before time, and interpret authorization claims according to a documented schema. For example, a token minted for a profile API should not automatically be accepted by an admin API. Use a maintained JWT library and configure the accepted algorithm rather than trusting token-provided choices. The [JWT](/t/jwt) overview covers the token structure; [JWT signing algorithms](/t/jwt-signing-algorithms) covers key choices.

Backend developers should define which claims are required and fail closed when they are absent or malformed. Keep claim names and meanings stable across services, and remember that the exact validation API differs by library.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
