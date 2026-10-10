---
title: "Open Redirect"
summary: "A redirect parameter abused to send users to malicious sites."
levels: { backend: mid-level, frontend: mid-level }
---

An open redirect is an endpoint that redirects to a destination controlled by request input without checking where it points. Attackers can wrap a malicious destination in a trusted-looking application URL, making phishing links appear to come from a known domain.

Avoid accepting arbitrary redirect URLs. Prefer a relative path within the application, or map a short server-side destination key to a known target. If external redirects are required, parse and validate the destination against an allowlist of exact trusted origins; string-prefix checks such as “starts with ourdomain.com” can accept lookalike hosts or crafted URL syntax.

For example, `?next=https://attacker.example/login` should not be followed simply because the user has just authenticated. A safe flow can restrict `next` to an internal route and fall back to a fixed landing page when it is invalid. Also consider encoded, scheme-relative, and nested URL forms when testing validators.

Backend developers should enforce validation at the redirect endpoint and avoid leaking tokens in redirect parameters. Frontend developers should not assume a branded link is safe merely because its first hop uses the application's domain. Blocking arbitrary destinations can constrain integrations, so provide explicit, reviewed destinations where needed. OAuth flows have their own redirect URI validation requirements; follow the authorization server's protocol guidance.

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
