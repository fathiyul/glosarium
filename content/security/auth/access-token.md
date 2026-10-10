---
title: "Access Token"
summary: "A short-lived token sent with each API request to prove the caller is authenticated."
levels: { backend: mid-level, frontend: mid-level }
related: [refresh-token, bearer-token]
---

An access token is a credential a client presents to an API to show that it has been authenticated and, often, to carry authorization context. It is usually sent in an `Authorization: Bearer …` header, but token formats and transport rules depend on the protocol and system.

Treat an access token as a **bearer secret**: whoever obtains it may be able to use it until it expires or is otherwise rejected. Do not put it in URLs, analytics events, logs, crash reports, or browser storage without considering the threat model. Use TLS in transit and restrict the token's audience and permissions so a token issued for one API is not accepted by unrelated services.

A common design pairs a relatively short-lived access token with a more tightly protected [refresh token](/t/refresh-token). When an access token expires, the client obtains another rather than asking the user to sign in again. Short lifetimes limit exposure, but do not by themselves make theft harmless: an attacker can use a stolen token during its valid period.

For backend developers, validate the token at every protected boundary: signature or introspection result, issuer, audience, expiry, and required scopes or permissions. For frontend developers, treat it as sensitive state, handle expiry and failed refreshes predictably, and avoid exposing it to third-party scripts. A [JWT](/t/jwt) is one possible token format, not a synonym for access token; opaque tokens are also common.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
