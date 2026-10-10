---
title: "Certificate Authority"
summary: "An organization trusted to sign certificates."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["certificate authority", "CA", "certificate issuer"]
prereqs: ["tls", "dns"]
related: ["tls-handshake", "certificate-expiry", "chain-of-trust"]
---

A **certificate authority (CA)** issues the TLS certificates that bind a domain name to a public key. Browsers ship a store of trusted root CAs; a certificate chains up to one of those roots, and the browser accepts the site as genuine. The whole system is delegated trust: you trust the site because you trust the CA that vouched for it.

```text
site cert ← intermediate ← root CA (in the browser's trust store)
```

Issuance validation comes in levels: domain validation (prove control of the domain — the norm, often automated via ACME), organisation validation, and extended validation (deep identity checks, now barely surfaced in browsers). Mis-issuance is constrained by Certificate Transparency logs and by CAA records limiting which CAs may issue for your domain.

The classic mistakes:

- Ignoring CAA. Without a CAA record, any trusted CA can issue for your domain. Restrict issuance to the CAs you actually use.
- Assuming CA = safety. A valid certificate proves the connection reaches the *named* domain's key holder — not that the site is honest. Phishing sites have valid certificates too.
- Private services with public CAs. Internal names that can't pass public validation need a private CA (distributed to your devices), not workarounds. Conversely, public sites need public CAs — private roots in users' stores are a deployment nightmare.
- Forgetting intermediates. Servers must serve the full chain minus the root; a missing intermediate breaks some clients while working in lenient browsers. Test the chain, not just your browser.
- Choosing EV for trust theatre. Extended validation no longer gets prominent UI; spend the effort on automation and monitoring instead.
- No CA-agility. If your only CA has an outage or distrust event, issuance stops. Know your backup path before you need it.

**How to use them:** automated DV issuance (ACME) from a reputable CA, CAA records restricting issuance, full-chain serving, and expiry monitoring. The CA system is imperfect but load-bearing — constrain it with transparency and CAA, and automate everything around it.
