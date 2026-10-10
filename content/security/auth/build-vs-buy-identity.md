---
title: "Build vs Buy for Identity"
summary: "Deciding between an in-house auth system and a provider like Auth0, Keycloak or Cognito."
levels: { backend: staff }
related: [identity-architecture]
---

Build versus buy for identity is the decision to operate authentication and identity capabilities yourself or use a provider. The choice includes more than login screens: account recovery, MFA, federation, session management, audit needs, user lifecycle, and support all matter.

Building offers control over flows and data, but the team must maintain security-sensitive code and respond to protocol, threat, and compliance changes. A provider can supply mature features and integrations, but introduces cost, availability dependency, data-processing considerations, and migration risk. A self-hosted open-source identity service still needs operating, patching, backup, and incident ownership.

For example, a small product may benefit from a provider's password recovery and enterprise SSO rather than creating them from scratch. A regulated or highly specialized environment may need different controls, but should compare the provider's actual capabilities and contracts rather than assuming self-built is automatically safer.

Backend engineers should map integration and failure modes; frontend engineers should evaluate user experience and SDK behavior. Include vendor exit, account portability, custom domains, and support escalation in the decision. Avoid comparing only subscription price to engineering time: include ongoing operations and risk. See [identity architecture](/t/identity-architecture), [identity provider](/t/identity-provider), and [auth migration](/t/auth-migration).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
