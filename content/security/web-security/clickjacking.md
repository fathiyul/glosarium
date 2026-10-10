---
title: "Clickjacking"
summary: "Tricking users into clicking hidden elements inside an iframe."
levels: { backend: mid-level, frontend: mid-level }
---

Clickjacking tricks a person into activating a control on a site they trust while it is visually hidden or disguised beneath another page. A common mechanism is embedding the target site in an iframe and placing deceptive content over it, so the victim's click lands on the real control.

Sensitive actions should not be triggerable merely because a page was embedded. Use a Content Security Policy `frame-ancestors` directive to specify which sites may embed the page, or the older `X-Frame-Options` header where appropriate. Header support and precedence depend on browser behavior, so set and test a deliberate policy rather than relying on a default.

Framing may be a legitimate product feature: payment widgets, support portals, and internal integrations can require it. Allow only the known embedding origins instead of broadly permitting every site. Also protect important state changes with appropriate confirmation, reauthentication, or CSRF defenses; clickjacking protections do not replace authorization.

Backend developers typically configure the response headers. Frontend developers should identify pages that need embedding and test the intended flow in supported browsers. Avoid JavaScript “frame-busting” as the primary defense; it can be bypassed and may break normal navigation. See [security headers](/t/security-headers) and [CSRF](/t/csrf).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
