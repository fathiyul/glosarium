---
title: "Certificate Expiry"
summary: "Expired certificates as a classic cause of outages, and automating renewal."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["certificate expiry", "cert expiry", "expired certificate"]
prereqs: ["tls", "certificate-authority"]
related: ["tls-termination", "monitoring", "certificate-authority"]
---

Every TLS certificate carries a not-after date, and clients reject expired ones outright. **Certificate expiry** outages are a genre unto themselves: the site is fine, the app is fine, but every visitor sees a warning because nobody renewed a file. Public certificates now live months, not years — expiry is frequent by design.

```text
valid:  not-before … now … not-after   ✓
expired: now > not-after               ✗ (hard failure in every client)
```

The fix is automation plus monitoring: ACME-based renewal (short-lived certs renewed automatically), deployed across every terminator (CDN, load balancer, ingress, internal services) — and independent expiry alerting, because automation silently breaks.

The classic mistakes:

- Manual renewal. A calendar reminder to renew a cert is an outage scheduled for the day someone's on holiday. Automate issuance and reload.
- Renewing but not reloading. The new cert sits on disk while the server keeps serving the old one from memory. Renewal must trigger a reload (or use a store the server reads live).
- Monitoring the wrong endpoint. Alerting on the origin while the CDN serves its own cert (or vice versa) misses the actual expiry. Monitor every name clients touch, from outside.
- Forgetting internal certs. Internal services, webhooks receivers, and staging environments expire too — and their failures surface as mysterious integration errors, not browser warnings.
- Long-lived certs as strategy. Clinging to multi-year certificates avoids automation and concentrates risk. Short-lived + automated is the modern posture.
- Clock skew confusion. "Not yet valid" errors on fresh certs are usually client clock skew, not CA problems. Check the time before rotating anything.
- No inventory. Certificates scattered across teams and terminators can't all be renewed. Keep a list of every cert, where it terminates, and how it renews.

**The posture:** automated renewal everywhere, external expiry monitoring with lead time, and an inventory of all terminators. Expiry outages are 100% preventable — that's what makes them embarrassing.
