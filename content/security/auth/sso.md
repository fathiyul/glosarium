---
title: "Single Sign-On (SSO)"
summary: "Logging in once with an identity provider and accessing many apps."
levels: { backend: senior, frontend: senior , tech-entrepreneur: growth }
related: [openid-connect, saml]
---

Single sign-on (SSO) lets a user authenticate with an identity provider and then access multiple applications without entering credentials separately into each one. Applications delegate authentication but still make their own authorization decisions and usually maintain an application session.

SSO can simplify account lifecycle management: disabling a user at the identity provider can stop future sign-ins across connected apps. Existing app sessions may remain valid until they expire or are revoked, so plan offboarding, session duration, and token revocation. SSO also concentrates risk: compromise of the central account can affect many services, making MFA and recovery controls especially important.

For example, a company employee signs in through its IdP, and the app receives a protocol assertion. The app must validate issuer, audience, and signature, then map the identity to an account and permitted roles. Matching solely on a changeable email address can create account-linking mistakes.

Backend developers implement trust and session handling; frontend developers manage redirects and error states. SSO requires provider configuration, certificate or key lifecycle, and support for user provisioning. Choose [SAML](/t/saml) or [OpenID Connect](/t/openid-connect) based on ecosystem requirements. See [identity provider](/t/identity-provider) and [identity architecture](/t/identity-architecture).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
