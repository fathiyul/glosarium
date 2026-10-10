---
title: "Identity Architecture"
summary: "Designing how identity, sessions and permissions work across many services and teams."
levels: { backend: staff }
related: [sso, rebac]
---

Identity architecture is the design of how people and services are represented, authenticated, authorized, and managed across an application or organization. It covers identifiers, credentials, sessions, roles or relationships, account lifecycle, federation, and how identity context flows between services.

A good design separates identity from permissions. A user may authenticate through an external provider, map to a stable internal subject, and receive permissions based on current organization membership. Do not use email as the sole primary identity if it can change, and do not propagate a broad role claim indefinitely when permissions can be revoked.

For example, a user belongs to two customer organizations and has different roles in each. The API must know which organization the request concerns and authorize the action within that context. Service identities need their own lifecycle and least-privilege permissions rather than borrowed human credentials.

Backend engineers should define trust between services, token audiences, and policy enforcement points. Frontend engineers handle login, account linking, and session UX without becoming the security authority. Centralized identity can improve consistency but creates dependency and concentration risk; plan outages, recovery, and migration. See [SSO](/t/sso), [ReBAC](/t/rebac), and [zero trust](/t/zero-trust).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
