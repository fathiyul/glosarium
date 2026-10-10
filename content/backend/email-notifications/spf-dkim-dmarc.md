---
title: "SPF, DKIM and DMARC"
summary: "DNS records that prove your email is really from you, so it doesn't land in spam."
levels: { backend: mid-level }
aliases: ["SPF DKIM DMARC", "email authentication", "spf dkim dmarc"]
prereqs: ["sending-email", "dns"]
related: ["sending-email", "email-deliverability", "dns"]
---

Three standards work together to stop email spoofing and prove a message really came from your domain. They're configured as DNS records and checked by receiving mail servers.

- **SPF (Sender Policy Framework)** — a DNS record listing which servers are allowed to send email for your domain. A receiving server checks whether the sending IP is in that list. It authenticates the *envelope* sender.
- DKIM (DomainKeys Identified Mail) — your outbound server cryptographically *signs* each message; the public key is published in DNS. The receiver verifies the signature, confirming the message wasn't altered and came from a holder of the key.
- DMARC (Domain-based Message Authentication, Reporting & Conformance) — a policy that ties SPF and DKIM to the visible "From" domain and says what to do when they fail (none / quarantine / reject), plus where to send reports.

```text
SPF:   is this IP allowed to send for the domain?
DKIM:  is the message signed by the domain and unmodified?
DMARC: do SPF/DKIM align with the From domain? what if not?
```

Together they're the foundation of [email deliverability](/t/email-deliverability): providers trust authenticated mail far more, and DMARC enforcement protects your domain from being spoofed in phishing.

The classic mistakes:

- Missing or broken records. A malformed SPF (too many lookups, wrong syntax) or a missing DKIM key silently fails authentication, hurting deliverability. Validate the records.
- Ignoring DMARC alignment. SPF/DKIM must *align* with the visible From domain for DMARC to pass; sending through a third party can break alignment unless configured correctly.
- Jumping straight to `p=reject`. Without first monitoring DMARC reports (`p=none`), an aggressive policy can reject legitimate mail you didn't know existed. Ramp up: none → quarantine → reject.
- Not including all senders. Every service that sends as your domain (transactional provider, marketing, internal) must be covered by SPF/DKIM, or that mail fails.
- Forgetting subdomains and reporting. DMARC policies and reports apply per domain; set them for the right domains and use the reports to find problems.
- Treating them as security only. They're also deliverability features — unauthenticated mail is more likely to be filtered or rejected.

**How to set them up:** publish an SPF record covering all legitimate senders, enable DKIM signing with a published key, and add a DMARC record starting at `p=none` to collect reports, then tighten to quarantine/reject. Use the reports to find misconfigurations. It's the standard authentication trio every domain that sends mail should have. See [DNS](/t/dns) and [sending email](/t/sending-email).
