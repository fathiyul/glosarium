---
title: "SMTP"
summary: "The protocol for sending email between servers."
levels: { backend: mid-level }
aliases: ["SMTP", "simple mail transfer protocol", "smtp server"]
prereqs: ["sending-email", "email-deliverability"]
related: ["sending-email", "email-deliverability", "spf-dkim-dmarc"]
---

**SMTP** (Simple Mail Transfer Protocol) is the standard for *sending* and **relaying** email. When your application sends a message, it hands it to an SMTP server (a relay), which connects to the recipient's mail server and delivers it. The recipient later *reads* it via a different protocol (see [IMAP/POP3](/t/imap-pop3)).

```text
app → SMTP relay → recipient's mail server → recipient's mailbox
```

Key pieces: the **envelope** (the actual sending/recipient addresses used for delivery, separate from the visible "To"/"From" headers) and the relay's credentials/auth. In practice, most applications don't run their own SMTP server; they use a transactional email provider's SMTP endpoint or API (see [sending email](/t/sending-email)).

The classic mistakes:

- Running your own SMTP server to send bulk mail. Deliverability from a self-run server is hard (reputation, IP warmup, blocklists); a transactional provider handles it. Run your own only for specific needs.
- Confusing sending (SMTP) with reading (IMAP/POP3). SMTP sends; IMAP/POP3 retrieve from a mailbox. Mixing them up leads to wrong integrations.
- Ignoring authentication and port/TLS choices. Modern relays require authentication and an encrypted connection; using the wrong port or no TLS gets rejected or leaks credentials.
- Trusting the visible "From". SMTP delivers based on the envelope; spoofing the visible From is easy without [SPF/DKIM/DMARC](/t/spf-dkim-dmarc). Authenticate your domain.
- No bounce handling. The relay reports bounces; ignoring them means sending to dead addresses and damaging reputation (see [email deliverability](/t/email-deliverability)).
- Blocking the request on SMTP send. Sending email synchronously in a request ties up the user and can fail on relay slowness; queue it (see [job queue](/t/job-queue)).

**How to use it:** for most apps, connect to a transactional email provider over SMTP (or its API), authenticate and encrypt the connection, queue sends rather than doing them inline, and handle bounces. SMTP is the transport; deliverability (authentication, reputation, list hygiene) is the harder part layered on top. See [sending email](/t/sending-email).
