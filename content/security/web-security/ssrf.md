---
title: "SSRF"
summary: "Tricking a server into making requests to internal systems."
levels: { backend: senior }
---

Server-side request forgery (SSRF) occurs when an attacker can make your server issue a request to a destination the attacker chooses or influences. The server may have access to internal services, metadata endpoints, or private networks that the attacker cannot reach directly.

A feature that fetches an image from a URL, imports a webhook, or previews a link can create this risk. Validating only that a string begins with `https://` is insufficient: hostnames can resolve to private addresses, redirect to another destination, or use unusual encodings. Restrict destinations to an allowlist when possible. Otherwise validate parsed host and address information, block prohibited ranges, and re-check after DNS resolution and redirects according to the platform's behavior.

Run outbound requests through controlled egress, avoid forwarding ambient credentials, set timeouts and response-size limits, and use a dedicated network identity with minimal access. Cloud and network configurations differ, so do not rely on one metadata endpoint safeguard as the sole defense.

Backend developers own URL parsing and network access controls; frontend developers should not assume a URL preview endpoint is harmless. SSRF fixes can constrain product features, so define permitted destinations clearly. See [trust boundary](/t/trust-boundary) and [open redirect](/t/open-redirect), which is related in name but a different direction of attack.

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
