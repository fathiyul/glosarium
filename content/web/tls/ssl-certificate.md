---
title: "TLS Certificate"
summary: "A file proving a server controls a domain, signed by a trusted authority."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["TLS certificate", "SSL cert", "HTTPS certificate", "X.509 certificate"]
prereqs: ["https", "tls"]
related: ["tls", "certificate-authority", "chain-of-trust", "lets-encrypt", "certificate-expiry", "self-signed-certificate"]
---

A TLS certificate (often still called an SSL certificate) is a file that proves a server controls a domain name, and holds the public key used to set up an encrypted connection. A trusted certificate authority (CA) signs it, so browsers can verify it.

When a browser connects to `https://example.com`, the server shows its certificate, and the browser checks:

- It's **signed by a trusted CA**, through a chain back to a root the browser already knows ([chain of trust](/t/chain-of-trust), [certificate authorities](/t/certificate-authority)).
- It's **valid for this exact name** (`example.com`, or a wildcard `*.example.com`).
- It's **not expired**, and not revoked.

If anything fails, you get a warning page.

## What's inside

- The domain name(s) it covers (subject and alternative names).
- The server's **public key**.
- The issuer (the CA) and its **signature**.
- Validity dates (not before, not after).

```sh
openssl s_client -connect example.com:443 -servername example.com </dev/null | openssl x509 -noout -subject -issuer -dates
```

## Getting one

- **Free and automatic**: [Let's Encrypt](/t/lets-encrypt), or built into hosts and CDNs.
- **Paid**: from commercial CAs, sometimes with extra validation of the organization.
- **Internal**: a private CA for company systems, or a [self-signed certificate](/t/self-signed-certificate) for local development.

## Common problems

- **Expired certificate**: set up automatic renewal and expiry alerts ([certificate expiry](/t/certificate-expiry)).
- **Name mismatch**: the certificate is for `example.com` but you used `www.example.com` or an IP.
- **Incomplete chain**: the server didn't send the intermediate certificate.
- **Untrusted issuer**: a self-signed or private-CA certificate that clients don't trust.
- **Private key exposed**: if it leaks, revoke and replace the certificate.

The certificate is public. The matching **private key** must stay secret on the server. See [TLS](/t/tls) for how it's used.
