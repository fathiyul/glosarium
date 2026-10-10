---
title: "PKCE"
summary: "An OAuth extension that stops stolen authorization codes from being exchanged by attackers."
levels: { backend: mid-level, frontend: mid-level }
related: [oauth2]
---

PKCE (Proof Key for Code Exchange) strengthens the OAuth 2.0 authorization-code flow. The client creates a random verifier, sends a derived challenge when starting authorization, and later presents the original verifier when exchanging the returned code. The authorization server checks that it matches.

This protects against an attacker who intercepts an authorization code but does not have the verifier. It is especially important for public clients such as native apps and browser-based apps, which cannot safely keep a client secret. PKCE does not replace TLS, redirect URI validation, state/nonce protections where applicable, or careful token handling; it addresses a specific code-interception risk.

A common implementation mistake is generating a predictable verifier, storing it where another app or script can read it, or failing to bind the callback to the login attempt. Use a maintained OAuth library and follow the provider's supported flow. Do not implement the cryptographic transformation by hand unless you have a strong reason and tests.

Frontend developers need to preserve the verifier across the redirect without exposing it to unrelated code, and validate the returned state before completing login. Backend developers configuring the authorization server should require the challenge and verifier to match for clients using this flow. See [OAuth 2.0](/t/oauth2) for the broader protocol context.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
