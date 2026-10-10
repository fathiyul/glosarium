---
title: "Login Rate Limiting"
summary: "Slowing or blocking repeated login attempts to stop password guessing."
levels: { backend: mid-level }
related: [credential-stuffing]
---

Login rate limiting restricts repeated authentication attempts so password guessing and automated abuse become harder. A limit can apply to an account identifier, source network, device signal, or a combination; each choice has blind spots. Limiting only by IP is easy to evade with distributed traffic and can block users behind shared networks.

Use graduated responses where possible: slow repeated attempts, add a challenge, or temporarily restrict a risky path rather than permanently locking an account after a few guesses. A strict lockout can itself become a denial-of-service tool if an attacker can lock out a victim. Return generic errors so the limiter does not expose whether an account exists, and avoid telling users a precise threshold that helps attackers tune attempts.

Rate limiting is one layer, not a substitute for strong authentication. Monitor patterns across accounts and sources, and consider breached-password checks and MFA to reduce the impact of reused credentials. [Credential stuffing](/t/credential-stuffing) uses pairs leaked elsewhere, while ordinary guessing may try likely passwords against one account; defenses overlap but are not identical.

Backend developers should enforce limits on the server or edge, make them resilient to multiple application instances, and ensure the limiter itself cannot be trivially bypassed by changing a header. Frontend developers should make challenge and retry states understandable without leaking internal risk signals.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
