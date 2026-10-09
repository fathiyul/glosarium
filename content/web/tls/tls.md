---
title: "TLS"
summary: "The protocol that encrypts and authenticates network connections."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["Transport Layer Security", "SSL", "SSL/TLS", "TLS encryption", "TLS 1.3"]
prereqs: ["https"]
related: ["tls-handshake", "certificate-authority", "chain-of-trust", "certificate-expiry", "tls-termination", "ssl-certificate"]
core: [backend]
---

**TLS** (Transport Layer Security) is the protocol that **encrypts and authenticates** a network connection. It's what puts the "S" in [HTTPS](/t/https), and it also protects email, databases, message
brokers and service-to-service traffic. (**SSL** is its obsolete predecessor. People still say "SSL certificate" out of habit, but modern systems use TLS.)

It provides three things:

- **Confidentiality**: eavesdroppers can't read the data.
- **Integrity**: tampering is detected.
- **Authentication**: the client can verify it's talking to the genuine server (and optionally the other way round, see mutual TLS below).

## How a connection starts

The [TLS handshake](/t/tls-handshake), in outline:

1. The client says which TLS versions and cipher suites it supports.
2. The server replies with its **certificate**, which proves its identity.
3. The client **validates the certificate**: signed by a trusted authority, not expired, issued for this hostname ([chain of trust](/t/chain-of-trust)).
4. Both sides agree on **session keys** using key exchange.
5. Everything afterwards is encrypted with those keys.

TLS 1.3 (the current version) completes the handshake in fewer round trips than 1.2 and removes old, weak options. TLS 1.2 is still widely used. Versions before that are deprecated.

## Where you'll deal with it

- **Certificates**: getting them, renewing them and not letting them expire ([certificate expiry](/t/certificate-expiry), [Let's Encrypt](/t/lets-encrypt)).
- **Termination**: often a load balancer or proxy decrypts TLS, and forwards plain traffic inside a private network ([TLS termination](/t/tls-termination)).
- **Errors**: expired certificate, hostname mismatch, untrusted issuer (such as a [self-signed certificate](/t/self-signed-certificate)), or incomplete chain.
- **Internal services**: mutual TLS, where both sides present certificates ([mTLS](/t/mtls)).

## Debugging

```sh
openssl s_client -connect example.com:443 -servername example.com    # shows the certificate chain and errors
curl -v https://example.com                                           # shows the handshake summary
```

## Never "fix" errors by turning verification off

Settings like `verify=False` in Python's `requests`, or `NODE_TLS_REJECT_UNAUTHORIZED=0`, remove the authentication part and make you vulnerable to man-in-the-middle attacks. Fix the underlying problem
(install the right CA, correct the hostname, renew the certificate) instead. If you must use one for local development, don't let it reach production.
