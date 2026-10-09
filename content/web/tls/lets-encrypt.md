---
title: "Let's Encrypt"
summary: "A free, automated certificate authority."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Let's Encrypt", "certbot", "ACME"]
prereqs: ["ssl-certificate", "https"]
related: ["ssl-certificate", "certificate-authority", "certificate-expiry", "tls", "tls-termination"]
---

Let's Encrypt is a free, automated certificate authority (CA). It issues the TLS certificates that let sites use HTTPS, with no fees and no manual paperwork. It made HTTPS the default for most of the web.

It works through the **ACME** protocol: software on your server proves to the CA that you control the domain, and gets a certificate automatically.

```sh
sudo certbot --nginx -d example.com -d www.example.com
# proves control of the domain, installs the certificate, sets up renewal
```

## How the proof works (challenges)

- **HTTP-01**: you serve a specific file at `http://example.com/.well-known/acme-challenge/...`.
- **DNS-01**: you create a specific DNS TXT record. This is needed for **wildcard** certificates (`*.example.com`).

## Important details

- **Certificates are short-lived** (currently about 90 days), which is deliberate: it limits damage from compromised keys. So **automatic renewal is essential**. The usual tools run a scheduled job.
- **An expired certificate takes a site down** with browser warnings, so monitor expiry ([certificate expiry](/t/certificate-expiry)).
- **Rate limits** apply, such as limits on certificates per domain per week. Use the staging environment for testing.
- **It proves domain control only**, not who you are. Certificates are "domain validated", as with most others ([certificate authorities](/t/certificate-authority)).
- **Private keys stay on your server.** Never share them ([secrets management](/t/secrets-management)).

## When you don't need to run it yourself

Most hosting platforms, CDNs and cloud load balancers obtain and renew Let's Encrypt (or similar) certificates for you automatically. For Kubernetes, tools like cert-manager do it.

## When it's not the right tool

Internal-only services without public DNS names, or organizations needing extended validation or specific CA contracts, may use a private CA or paid certificates ([self-signed certificates](/t/self-signed-certificate)).

See [TLS certificates](/t/ssl-certificate) and [HTTPS](/t/https).
