---
title: "HSTS"
summary: "A header telling browsers to always use HTTPS for a site."
levels: { backend: mid-level, frontend: mid-level , data-scientist: junior }
aliases: ["hsts", "strict transport security", "http strict transport security"]
prereqs: ["https", "tls"]
related: ["certificate-authority", "content-security-policy", "tls-termination"]
---

**HSTS** (HTTP Strict Transport Security) is a response header through which a site tells browsers: *only ever contact me over HTTPS* — for this long, including subdomains. After the first visit, the browser upgrades any `http://` URL itself and refuses to click through certificate errors.

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

It closes the gap TLS alone leaves: the first, unprotected `http://` visit where an attacker could intercept or downgrade. With HSTS remembered, there is no plaintext request to attack — and no "proceed anyway" bypass for users to be tricked through.

The classic mistakes:

- Deploying with a long max-age immediately. A mistake (broken TLS, a subdomain not ready for HTTPS) then locks browsers out for a year. Ramp up: short max-age, verify, then lengthen.
- `includeSubDomains` before subdomains are ready. One internal HTTP-only subdomain breaks the moment the parent sets this. Audit every subdomain first.
- Forgetting preload is forever-ish. Submitting to the browser preload list bakes the policy into browsers themselves — removal takes months. Only for domains certain about permanent HTTPS.
- Assuming it protects the first visit. HSTS is learned over HTTPS; a first-ever plaintext visit is still interceptable. Preload (or HTTPS-only links everywhere) covers that window.
- Mixed content alongside it. HSTS upgrades navigation but doesn't fix `http://` subresources — browsers block those separately. Serve everything over HTTPS.
- No redirect from HTTP anyway. HSTS needs an initial HTTPS response to learn from; keep the port-80→HTTPS redirect so the upgrade path exists.

**How to deploy it:** HTTPS working everywhere including subdomains, short max-age first, then lengthen with `includeSubDomains`, preload only when permanent. It's a one-line header that removes an entire class of downgrade attacks.
