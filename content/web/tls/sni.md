---
title: "SNI"
summary: "Telling the server which hostname you want during the TLS handshake."
levels: { backend: senior }
aliases: ["sni", "server name indication", "tls sni"]
prereqs: ["tls-handshake", "certificate-authority"]
related: ["tls-handshake", "chain-of-trust", "tls-termination"]
---

**SNI** (Server Name Indication) is the hostname the client sends *inside the TLS handshake's first message*, before encryption starts — so a server hosting many domains on one IP can pick the right certificate. Without it, one IP meant one certificate; with it, virtual hosting works for HTTPS.

```text
ClientHello (+ SNI: shop.example.com) → server selects shop's cert → handshake
```

The catch is privacy: SNI travels in cleartext, so observers see which hostname you're contacting even though the content stays encrypted. Encrypted Client Hello (ECH) closes this leak where both ends support it, but plaintext SNI remains the common case — and the basis for SNI-based filtering and censorship.

The classic mistakes:

- Legacy clients without SNI. Ancient clients omit it and get the default certificate — wrong-cert errors on multi-tenant IPs. Ensure a sane default cert and know your client floor.
- Assuming SNI is private. It leaks the destination hostname to the path. Threat models requiring metadata privacy need ECH or tunnelling (VPN/Tor), not just TLS.
- SNI-based routing as security. Routing or filtering on an attacker-controlled plaintext field is policy, not authentication. Authorise behind TLS, not on SNI alone.
- Wildcard/default cert confusion. A default cert that doesn't match the SNI name fails validation loudly. Align defaults with what clients actually request.
- Forgetting SNI at the edge. Multi-domain termination, ingress routing and CDN configs all key off SNI — a missing or mismatched server name breaks the handshake before HTTP exists.
- ECH partial deployment. Enabling ECH server-side without client support changes nothing; both ends and DNS records must align. Track adoption, don't assume coverage.

**How to treat it:** the routing label that makes multi-tenant TLS possible and the metadata that TLS doesn't hide. Configure it deliberately at every terminator, and look to ECH where hostname privacy matters.
