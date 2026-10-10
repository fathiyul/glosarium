---
title: "Token Revocation"
summary: "Strategies for invalidating tokens before they expire: denylists, versioning, short lifetimes."
levels: { backend: senior }
related: [refresh-token, jwt]
---

Token revocation makes a credential unacceptable before its natural expiry. The need arises when a user signs out, an account is disabled, a token is stolen, or permissions change. How quickly revocation takes effect depends on how the token is checked and where state is stored.

Opaque tokens can be checked against a server-side store or introspection endpoint, which enables central revocation but adds availability and latency dependencies. Self-contained signed tokens may be verified locally without a lookup, so immediate revocation often needs a denylist, token version, short lifetime, or another state check. Each approach trades request cost, complexity, and revocation speed.

For example, deleting a refresh token may prevent future access tokens but does not necessarily invalidate an access token already issued. Define logout semantics explicitly and distinguish revoking one device session from disabling all sessions. Avoid assuming that removing a token from frontend storage invalidates it at the API.

Backend engineers should design revocation around the threat model and test behavior across services and caches. Frontend developers should clear local credentials and handle rejected tokens without infinite retry loops. Store revocation data with appropriate expiry and availability. See [token expiry](/t/token-expiry), [refresh token](/t/refresh-token), and [JWT](/t/jwt).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
