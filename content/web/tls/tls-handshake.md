---
title: "TLS Handshake"
summary: "How client and server agree on keys before sending data."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["tls handshake", "ssl handshake", "tls negotiation"]
prereqs: ["tls", "certificate-authority"]
related: ["chain-of-trust", "sni", "tls-termination"]
---

The **TLS handshake** turns an insecure connection into an authenticated, encrypted channel: the client and server negotiate versions and ciphers, the server proves identity with its certificate chain, and both derive session keys — with TLS 1.3 doing it in one round trip (zero on resumption), and older versions taking two.

```text
ClientHello (versions, ciphers, SNI, key share)
  → ServerHello (chosen params, key share) + certificate + finished
Client finished → encrypted session (1 RTT in TLS 1.3)
```

Everything after is symmetric-key encryption (fast); the handshake's asymmetric work happens once per connection — which is why session resumption, keep-alive and 0-RTT exist, and why handshake cost dominates short-connection latency.

The classic mistakes:

- Old TLS versions enabled. TLS 1.0/1.1 (and weak ciphers generally) are broken; supporting them for "compatibility" exposes everyone. Floor at 1.2, prefer 1.3.
- Paying full handshakes repeatedly. No resumption, no keep-alive, fresh connections everywhere — handshake latency multiplied by every request. Reuse connections and sessions.
- 0-RTT for mutations. Replayable early data is safe only for idempotent requests. Never enable 0-RTT on non-idempotent endpoints.
- Cipher sprawl. Enabling every cipher for compatibility includes the weak ones attackers negotiate down to. Curate a short, strong list.
- Ignoring the chain in handshake failures. Most "handshake failure" alerts are certificate problems (expired, wrong name, incomplete chain) — check the chain before the ciphers.
- No SNI handling. Multi-tenant servers need the client's SNI to select certificates; missing or wrong SNI fails before HTTP begins.
- Measuring only success. Handshake latency distribution (p99, failures, version mix) reveals client and middlebox problems invisible in averages.

**The essentials:** modern versions only, strong ciphers, complete chains, resumption and keep-alive to avoid repaying setup, and 0-RTT restricted to safe replays. The handshake is a few round trips that secure everything after — get it right once, amortise it everywhere.
