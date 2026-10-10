---
title: "Database Authentication and TLS"
summary: "How clients prove who they are to the database, and encrypting that connection."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["database authentication", "db auth", "database tls"]
prereqs: ["database", "tls"]
related: ["secrets-management", "least-privilege", "connection-pooling"]
---

**Database authentication** is how a client proves it's allowed to connect: a username and password, a client certificate, or an identity from the platform (e.g. cloud IAM). **TLS** encrypts the connection so credentials and data aren't readable or tamperable in transit. Together they're the front door of the database, and they're frequently the weakest link.

```text
client ──TLS (encrypted)──▶ database: "who are you?" → authenticate → authorise
```

Without TLS, anything on the network path — another host, a load balancer, a compromised node — can read queries and credentials. Without proper authentication, an attacker with network access can connect directly.

The classic mistakes:

- No TLS, or TLS without verification. Encrypting but not verifying the server's certificate allows a man-in-the-middle. Require and verify certificates, don't just "enable SSL".
- A shared superuser for all apps. One account with full rights, reused everywhere, means a single leak is total. Give each app its own account with only the privileges it needs (see [least privilege](/t/least-privilege)).
- Passwords in code or config files committed to git. Use a secret manager or platform identity (see [secrets management](/t/secrets-management)); rotate credentials.
- Exposing the database to the internet. A database reachable from anywhere gets brute-forced. Keep it on a private network, reachable only by the app (see [public vs private subnet](/t/public-private-subnet)).
- Weak or default credentials. "postgres/postgres" and default admin accounts are found instantly by scanners. Set strong credentials and remove defaults.
- No connection limits or auditing. Unlimited connection attempts and no logging make abuse invisible. Log connections and failures, and cap them.

**How to secure it:** TLS with certificate verification, per-application accounts with least privilege, credentials from a secret manager or platform identity, the database on a private network, and connection/failure logging. It's the routine hygiene that protects the data behind every query — see [roles and privileges](/t/db-roles-privileges) and [secrets management](/t/secrets-management).
