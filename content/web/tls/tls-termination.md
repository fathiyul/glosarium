---
title: "TLS Termination"
summary: "Decrypting TLS at a load balancer or proxy in front of your app."
levels: { backend: mid-level }
aliases: ["tls termination", "ssl termination", "terminating tls"]
prereqs: ["tls", "load-balancer"]
related: ["reverse-proxy", "cdn", "certificate-expiry"]
---

**TLS termination** ends the encrypted connection at the edge — load balancer, CDN, ingress, reverse proxy — and forwards plain HTTP to backends inside the private network. The edge holds the certificates and pays the handshake cost; backends stay simple and fast.

```text
client ═TLS═▶ edge (decrypt) ──plain HTTP──▶ app servers (private net)
```

Variants: termination with **re-encryption** (edge→backend over a second TLS connection — still authenticated, still private), and passthrough (encrypted bytes forwarded untouched; the backend holds the certs and the edge can't inspect). Most setups terminate at the edge and optionally re-encrypt behind it.

The classic mistakes:

- Plaintext beyond the edge without thinking. Terminated traffic crossing untrusted networks (another region, a shared fabric) should be re-encrypted. "Inside" is a trust claim — verify it.
- Losing the client's identity. After termination, the backend sees the edge's connection; original IP, protocol and host must be forwarded explicitly (`X-Forwarded-*`, PROXY protocol) and the app must be configured to trust *only* the edge's headers.
- Trusting forwarded headers from anyone. If backends accept `X-Forwarded-Proto` from arbitrary clients, attackers spoof "https" and IPs. Strip and set these headers at the edge.
- Certs only at the edge, forgotten behind. Re-encryption needs valid backend certs too — with their own expiry and renewal. Or terminate honestly and keep the backend network genuinely private.
- Passthrough when you need inspection. A WAF or L7 router can't see inside passthrough TLS. Choose termination where the edge must route, filter or cache.
- Session and SNI assumptions. Passthrough preserves SNI routing naturally; termination must re-derive routing from the decrypted request. Know which your edge does.

**How to decide:** terminate at the trust boundary (the edge you control), re-encrypt across anything you don't fully trust, forward client context explicitly, and manage certificates at *every* TLS endpoint — not just the public one.
