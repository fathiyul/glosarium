---
title: "Credential Stuffing"
summary: "Automated logins using username/password pairs leaked from other sites."
levels: { backend: senior }
related: [login-rate-limiting, mfa]
---

Credential stuffing is an automated attack that tries username and password pairs exposed in one breach against accounts on other services. It relies on people reusing credentials, rather than guessing every password from scratch.

Defenses include multifactor authentication, checking new passwords against known compromised-password lists, monitoring suspicious login patterns, and applying rate limits across accounts and sources. IP-only limits are insufficient when attempts come from many networks, while aggressive account lockouts can let attackers deny service to victims. Use generic login responses so the endpoint does not confirm which account exists.

For example, an attacker may test a leaked email-password pair at a small rate from many devices. Watch for patterns across accounts, devices, geographies, and failure histories, while being careful not to treat a single signal as proof. Step-up challenges can reduce abuse but should have accessible alternatives and a recovery path.

Backend engineers should make detection and throttling server-side and protect account recovery as carefully as login. Frontend engineers should provide clear user messaging without exposing detection rules. MFA reduces the value of reused passwords; see [login rate limiting](/t/login-rate-limiting), [MFA](/t/mfa), and [account enumeration](/t/account-enumeration).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
