---
title: "Client Credentials Flow"
summary: "The OAuth 2.0 flow for machine-to-machine calls with no user involved."
levels: { backend: senior }
related: [oauth2, mtls]
---

The OAuth 2.0 client credentials flow lets a confidential client obtain an access token for its own identity, without a user signing in. It is commonly used for service-to-service calls where one workload acts on its own behalf.

The client authenticates to the authorization server, receives a token with a defined audience and scope, then presents it to the target API. Keep the credential in a secret manager or workload identity mechanism, not in source code or a frontend bundle. A browser application cannot keep a client secret private and should not use this flow as if it were a user login.

Grant only the permissions the service needs and validate the token at the resource server, including issuer, audience, expiry, and scopes. A stolen client credential can let an attacker act as the service, so use rotation or short-lived workload credentials where supported and monitor unusual use. Exact client authentication methods depend on the authorization server.

Backend engineers should distinguish this machine identity from an end user's identity; the API should not infer a human user from a service token. Use [mTLS](/t/mtls) or another supported client-authentication method when appropriate. See [OAuth 2.0](/t/oauth2) and [access tokens](/t/access-token).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
