---
title: "SAML"
summary: "An older XML-based standard for enterprise SSO, still common in B2B."
levels: { backend: senior }
related: [sso]
---

SAML (Security Assertion Markup Language) is an XML-based standard used to exchange authentication and attribute assertions between an identity provider and a service provider. It remains common in enterprise single sign-on, where a customer's identity system authenticates employees for business applications.

A typical browser flow sends the user to the identity provider, then returns a signed assertion to the application. The service must validate the signature, issuer, audience, recipient, time conditions, and request correlation as required by the chosen profile. XML signature and canonicalization details are easy to mishandle, so use a maintained implementation and the provider's configuration guidance.

Do not treat any validly signed assertion as authorization for every role. Map approved attributes or groups to local permissions with explicit rules, and handle account linking carefully. Certificate rotation, clock skew, logout behavior, and multiple identity-provider configurations need operational planning.

Backend engineers usually configure assertion validation and account mapping; frontend engineers handle redirects and user-facing errors. SAML's enterprise ecosystem can be valuable, but it is complex and verbose compared with newer options. Use the protocol your customers and provider support rather than building protocol logic from scratch. See [SSO](/t/sso) and [identity provider](/t/identity-provider).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
