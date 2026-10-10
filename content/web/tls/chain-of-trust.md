---
title: "Certificate Chain"
summary: "Leaf, intermediate and root certificates linking to a trusted root."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["certificate chain", "chain of trust", "intermediate certificate"]
prereqs: ["certificate-authority", "tls-handshake"]
related: ["certificate-authority", "tls-handshake", "sni"]
---

A TLS certificate is trusted not by itself but by **chain**: the site's leaf certificate is signed by an intermediate, which is signed by (or chains to) a root in the client's trust store. The server sends the leaf plus intermediates; the client walks signatures up to a root it trusts. Break any link and validation fails.

```text
leaf (example.com) ← intermediate (CA) ← root (browser trust store)
server sends: leaf + intermediate. client has: root.
```

Intermediates exist so roots stay offline and safe; issuance happens from intermediates that can be rotated or revoked. Clients may cache or fetch missing intermediates (AIA chasing), but relying on that is fragile — lenient browsers mask a broken chain that strict clients reject.

The classic mistakes:

- Serving only the leaf. Works in browsers that cache intermediates, fails in fresh clients, mobile apps and strict validators. Serve the full chain (leaf + all intermediates).
- Including the root. Harmless but wasteful — clients must already have the root to trust anything. Send leaf and intermediates only.
- Expired or revoked intermediate. Chains break from the middle too, with errors that blame the leaf. Monitor the whole chain, and know your CA's rotation schedule.
- Cross-signed confusion. One leaf chaining to multiple roots (old/new, RSA/ECDSA) behaves differently per client. Test across the clients you actually serve.
- Assuming chain equals authorisation. A valid chain proves the named key holder — nothing about honesty, safety or content. Phishing chains validate fine.
- Private chains in public places. Internal roots work only where distributed. A public client hitting a privately-chained endpoint fails closed, correctly.

**The discipline:** serve complete chains, monitor every link's expiry, test with strict clients (not just your browser), and constrain issuance with CAA. Trust is a chain — every link load-bearing.
