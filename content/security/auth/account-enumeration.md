---
title: "Account Enumeration"
summary: "Leaking whether an email is registered through login, signup or reset responses."
levels: { backend: mid-level, frontend: senior }
related: [password-reset-flow]
---

Account enumeration is learning whether a particular identifier, usually an email address or username, has an account. Login, registration, invitation, and password-reset endpoints can reveal this through different messages, status codes, response times, or behavior.

For example, “No account found” on a reset request tells an attacker which addresses are registered. That list can support targeted phishing or credential attacks. Prefer a response that does not reveal the distinction, such as “If an account matches, we sent instructions.” Use consistent status and response shape where practical; matching timing perfectly is difficult, so do not promise that it is impossible to infer anything.

The trade-off is usability: a person who mistypes an address may not know why no email arrived. You can improve the experience without disclosing account state to an unauthenticated caller, for example by giving safe next steps and letting the user check their inbox. Apply the same policy across the whole flow, including rate limits and email side effects, or an attacker may infer the answer through another path.

Backend developers should review all response channels, including error codes and logs returned by APIs. Frontend developers should avoid rendering messages that expose distinctions the server intended to hide. This is especially important in a [password reset flow](/t/password-reset-flow), where the endpoint is easy to probe at scale.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
