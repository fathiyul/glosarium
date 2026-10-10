---
title: "Token Expiry"
summary: "Choosing how long tokens live, and handling what happens when they run out."
levels: { backend: mid-level, frontend: mid-level }
related: [access-token, refresh-token]
---

Token expiry is the point after which a verifier should reject a credential, even if its signature or other proof is valid. Expiry limits how long a lost or stolen token can be used, but it also means clients need a plan for renewal and for the user-visible case where renewal fails.

Choose lifetime based on the token's sensitivity, exposure, and operational needs rather than copying a universal duration. A long-lived [access token](/t/access-token) is convenient but extends the theft window. A short-lived one reduces that window but can increase refresh traffic and cause interruptions if the refresh path is unavailable. [Refresh tokens](/t/refresh-token) need their own rotation, storage, and revocation design; they are not harmless just because they are used less often.

Verifiers should check expiry using trusted server time and reject expired tokens consistently. Avoid relying on a frontend timer as the security boundary; the API must enforce it. Allow only a deliberate clock-skew tolerance, because a generous grace period weakens the limit.

Backend developers should decide what happens to active sessions after account changes or suspected compromise. Frontend developers should handle expiry without loops: attempt renewal only under the intended conditions, then return the user to a clear sign-in path. Token format and expiry semantics vary, so follow the issuing system's protocol.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
