---
title: "Password Reset Flow"
summary: "Designing reset links that are single-use, short-lived and don't leak account existence."
levels: { backend: mid-level, frontend: mid-level }
related: [account-enumeration]
also: [product-features]
---

A password-reset flow lets a user regain access without knowing the old password. It typically sends a single-use link or code to a previously verified channel, then allows the user to choose a new password.

Treat the reset token as a temporary credential. Generate it with a cryptographically secure random source, bind it to the intended account and purpose, expire it after a short period, and invalidate it after successful use. Store a verifier or hash rather than the raw token where practical. Build reset URLs from trusted configuration, not an untrusted `Host` header, or an attacker may cause emails to contain links to a domain they control.

Do not reveal whether an account exists in the initial response. Show a generic confirmation and apply rate limits to requests and token attempts. On success, consider invalidating existing sessions or refresh credentials and notifying the account owner; exact behavior depends on product risk. The flow should not silently sign the user in unless that is an intentional, protected design.

Backend developers own token generation, validation, single-use behavior, and audit events. Frontend developers should avoid third-party scripts on pages that handle reset tokens, remove tokens from visible URLs after processing where feasible, and give clear completion/error states. See [account enumeration](/t/account-enumeration) and [token expiry](/t/token-expiry).

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
