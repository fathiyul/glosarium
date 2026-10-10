---
title: "Security Headers"
summary: "HTTP headers that harden browsers against attacks."
levels: { backend: mid-level, frontend: mid-level }
---

Security headers let a server communicate browser policies that reduce the impact of certain attacks. Examples include Content Security Policy (CSP), `Strict-Transport-Security`, `X-Content-Type-Options`, and framing controls such as CSP `frame-ancestors`. They are defense in depth: they do not replace safe application code or authorization.

Set headers deliberately and test the actual responses, including error pages and static assets where relevant. A CSP can restrict script sources and inline execution, but an overly broad policy may provide little protection while a strict policy can break legitimate features. Start with report-only mode when supported, review violations, then enforce a policy suited to the app. HSTS should be enabled only when HTTPS is reliably available for the covered host scope.

The classic mistake is adding a header that looks reassuring but is ineffective or inconsistent. For instance, a CSP that allows every script source does not meaningfully constrain script injection. Browser support and policy details change, so use current browser documentation and test the browsers your product supports.

Backend or edge configuration usually emits these headers; frontend developers can help identify legitimate script, framing, and resource needs. Avoid copying a universal header bundle without understanding side effects. See [XSS](/t/xss-types), [clickjacking](/t/clickjacking), and [HSTS](/t/hsts).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
