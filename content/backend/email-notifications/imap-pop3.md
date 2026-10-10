---
title: "IMAP and POP3"
summary: "Protocols for reading email from a mailbox."
levels: { backend: senior }
aliases: ["IMAP and POP3", "IMAP", "POP3"]
prereqs: ["sending-email", "smtp"]
related: ["sending-email", "smtp", "third-party-integration"]
---

**IMAP** and **POP3** are the protocols for *retrieving* email from a mailbox — the reading counterpart to [SMTP](/t/smtp), which sends. They matter when an application needs to *receive* email: a shared support inbox, a ticketing system that ingests mail, or a mail-fetching integration.

- POP3 — downloads messages to a client and (typically) removes them from the server. Simple, but it's a one-device, one-way model; folders and read state aren't synced.
- IMAP — keeps messages on the server and syncs the mailbox's state (folders, read/unread, flags) across clients. It's the modern standard for accessing a mailbox and supports searching, moving and partial fetches.

```text
SMTP  → send mail
IMAP  → read & sync a mailbox (server-side state)
POP3  → download mail (client-side, simple)
```

The classic mistakes:

- Confusing reading with sending. SMTP sends; IMAP/POP3 read. An app that needs to *receive* email uses IMAP/POP3 (or a provider's inbound webhook), not SMTP.
- Choosing POP3 for multi-client access. POP3's download-and-delete model breaks with multiple clients or devices; IMAP syncs properly. Use IMAP unless the need is truly simple.
- Polling IMAP too aggressively. Fetching frequently is heavy; use IDLE/push where supported, or sensible intervals (see [polling](/t/polling)).
- Ignoring server flags and folders. IMAP exposes read/unread/moved state; a naive client that mark-reads or moves messages can disrupt humans using the same mailbox. Handle flags carefully.
- Storing credentials poorly. Mailbox access uses a password or app password/OAuth token; store it securely and scope it (see [secrets management](/t/secrets-management)).
- Assuming reliability of fetching. Connections drop, messages arrive out of order, attachments are large; fetching must be robust and idempotent.
- Preferring raw IMAP over a provider API. Many email providers offer inbound parsing via webhooks (email → HTTP POST) that's far simpler than maintaining an IMAP client; consider it first.

**When to use them:** when you must read and process a mailbox — support automation, email-to-ticket, parsing replies. For simple inbound handling, a provider's inbound webhook that turns email into an HTTP request is usually easier than an IMAP client. See [third-party integration](/t/third-party-integration) and [sending email](/t/sending-email).
