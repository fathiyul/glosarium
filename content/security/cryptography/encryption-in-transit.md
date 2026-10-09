---
title: "Encryption in Transit"
summary: "Encrypting data as it travels, with TLS."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["data in transit", "TLS encryption", "encryption on the wire"]
prereqs: ["https"]
related: ["tls", "https", "tls-handshake", "encryption-at-rest", "hsts", "end-to-end-encryption", "certificate-authority"]
---

Encryption in transit protects data while it moves between two systems, such as a browser and your server, so anyone watching the network (public Wi-Fi, a compromised router) sees only unreadable bytes. In practice this almost always means [TLS](/t/tls), the protocol behind [HTTPS](/t/https).

Without it, passwords, session cookies and personal data cross the network as readable text, and an attacker in the middle could also change the traffic.

## What TLS gives you

- **Confidentiality**: the contents can't be read.
- **Integrity**: tampering is detected.
- **Authentication of the server**: a [certificate](/t/ssl-certificate) from a [certificate authority](/t/certificate-authority) proves you reached the real site and not an imposter.

## The classic mistake: only encrypting the front door

Teams secure the browser-to-server connection and then leave the rest unprotected: the call from your app to the database, to another service, to a third-party API. Traffic inside a private network is still traffic someone can potentially observe. Use TLS for internal connections too (databases and message brokers usually support it with a setting).

```python
# e.g. connecting to Postgres with TLS required (psycopg2)
conn = psycopg2.connect(host="db.internal", dbname="app", sslmode="verify-full")
```

Note that `verify-full` also checks the server's certificate and hostname. Settings like "don't verify" or `verify=False` keep the encryption but lose the proof of who you are talking to, which defeats much of the point.

## Related habits

- Redirect HTTP to HTTPS and use [HSTS](/t/hsts).
- Renew certificates before they expire.
- Remember it only covers data moving. Stored data needs [encryption at rest](/t/encryption-at-rest). Keeping data unreadable even to the server in the middle is [end-to-end encryption](/t/end-to-end-encryption).
