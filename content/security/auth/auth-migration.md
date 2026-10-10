---
title: "Auth System Migration"
summary: "Moving users to a new identity system or hashing scheme without forcing everyone to log in again."
levels: { backend: staff }
related: [build-vs-buy-identity, password-hashing]
---

An authentication migration moves users, credentials, sessions, or identity records from one system to another. Reasons include changing providers, replacing a password-hashing scheme, consolidating accounts, or moving from legacy authentication to a new protocol.

Plan for coexistence and rollback. For password-hash upgrades, a system may verify an old hash at login and rehash with the new scheme after a successful authentication, so users do not need a forced reset immediately. This only works if the old verifier is still available and trustworthy. Provider migrations may instead require account linking, verified-email rules, and staged user communication.

Inventory identifiers, MFA factors, recovery methods, active sessions, and service integrations before moving data. Never export plaintext passwords or weaken password checks to simplify migration. Be especially careful with account matching: linking two identities based only on a mutable email can merge accounts incorrectly.

Backend teams should test partial migration, duplicate identities, rollback, and session invalidation. Frontend teams should make reauthentication and recovery clear and accessible. A gradual migration reduces disruption but extends the period in which both systems must be maintained. See [build vs buy identity](/t/build-vs-buy-identity), [password hashing](/t/password-hashing), and [identity architecture](/t/identity-architecture).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
