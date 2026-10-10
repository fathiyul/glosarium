---
title: "Session Fixation"
summary: "An attack where the attacker sets a victim's session ID before login; fixed by rotating the ID on login."
levels: { backend: senior }
related: [session]
---

Session fixation is an attack where a victim is induced to use a session identifier known to the attacker. If the application keeps that same identifier after the victim logs in, the attacker may be able to use it as the authenticated session.

The key defense is to issue a fresh session identifier after authentication and after privilege changes such as MFA completion. Invalidate the old identifier so it cannot continue to work. Use framework session facilities and secure cookie attributes; do not accept session IDs from URLs or let clients choose arbitrary IDs.

For example, an attacker might create or learn an anonymous session and persuade a victim to visit a link that carries it. If login upgrades the existing session in place, the attacker may inherit the victim's authenticated state. Rotating identifiers breaks that link. Ensure rotation does not lose legitimate session state unexpectedly, and test the actual behavior in your framework.

Backend developers should rotate on login and privilege elevation, enforce idle and absolute expiry where appropriate, and invalidate sessions on logout. Frontend developers should avoid exposing session identifiers in application state or telemetry. This is different from session hijacking, where an attacker obtains an already-authenticated session credential.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
