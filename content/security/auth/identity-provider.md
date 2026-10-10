---
title: "Identity Provider (IdP)"
summary: "The service that authenticates users for other apps, like Okta, Auth0 or Google."
levels: { backend: mid-level, frontend: mid-level }
---

An identity provider (IdP) authenticates a person or service and makes an identity assertion that other applications can trust. In a single-sign-on setup, users authenticate with the provider, and applications rely on a protocol such as OpenID Connect or SAML to establish their own session.

The IdP may handle credentials, multifactor checks, account recovery, and organization policy. Your application still has responsibilities: validate the assertion, map a stable identity to a local account, decide what the user may do, and manage the application's own session. A successful login at the IdP is not automatic permission to access every resource in your app.

For example, an enterprise user may arrive with a verified subject and group claims. The application should check that the issuer is expected and that the assertion is meant for this client, then map only the necessary groups into local roles. Do not treat an email address alone as an immutable identity; addresses can change or be reassigned.

Using a provider can reduce the amount of password and recovery machinery you operate, but it adds a dependency and migration considerations. Define what happens during provider outages, account disablement, and offboarding. Backend developers implement protocol validation and account mapping; frontend developers handle redirects and return states without exposing tokens. See [SSO](/t/sso) and [identity architecture](/t/identity-architecture).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
