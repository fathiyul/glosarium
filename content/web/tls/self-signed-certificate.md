---
title: "Self-Signed Certificate"
summary: "A certificate not signed by a trusted authority, used in development."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["self-signed certificate", "self signed cert", "snakeoil cert"]
prereqs: ["tls", "certificate-authority"]
related: ["tls-termination", "certificate-authority", "tls-handshake"]
---

A **self-signed certificate** is signed by its own key rather than by a trusted CA. It still *encrypts* the connection perfectly well — the cryptography is identical — but no browser trusts it, because nothing vouches for the identity. Visitors get the full warning page.

```text
self-signed:  encrypts ✓   identity proof ✗ (browser warns)
CA-issued:    encrypts ✓   identity proof ✓ (chains to a trusted root)
```

Legitimate uses: local development (HTTPS on localhost), bootstrapping, and internal services behind a **private CA** — where you distribute your own root to your own devices and get both encryption and trust without public issuance. What's never legitimate: a public-facing site on self-signed, or training users to click through warnings.

The classic mistakes:

- Click-through culture. Every "just accept the warning" habit trains people to ignore the exact signal that catches real attacks. Never normalise it.
- Production on self-signed. Public users cannot and should not install your root. Public names get public CA certificates — automated and free.
- Confusing encryption with trust. "It's encrypted so it's fine" misses the point: without identity, you're securely talking to *someone* — possibly a middlebox.
- Private CA without distribution. A private root works only on devices that trust it. Forgetting phones, containers, or CI runners produces scattered TLS failures.
- mkcert and friends in CI. Local-trust tools solve localhost; committed self-signed certs in repos solve nothing and leak keys. Generate per-environment.
- Expiry on internal certs. Self-signed and private-CA certs expire too — often with no public monitoring watching. Track them like any other.

**The rule:** self-signed for local development, private CA for internal fleets, public CA for anything users touch. Match the trust mechanism to the audience, and never let warning-fatigue become policy.
