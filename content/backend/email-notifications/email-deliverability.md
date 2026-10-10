---
title: "Email Deliverability"
summary: "Bounces, spam complaints, sender reputation and staying out of spam folders."
levels: { backend: mid-level }
aliases: ["email deliverability", "deliverability", "inbox placement"]
prereqs: ["sending-email", "spf-dkim-dmarc"]
related: ["sending-email", "spf-dkim-dmarc", "transactional-vs-marketing-email"]
---

**Email deliverability** is whether the mail you send actually reaches recipients' inboxes, rather than their spam folder or a blocklist. It's decided by mailbox providers (Gmail, Outlook, …) using signals about your **sender reputation**, authentication, sending behaviour and content — not by anything you control directly.

The main levers:

- Authentication — SPF, DKIM and DMARC (see [SPF/DKIM/DMARC](/t/spf-dkim-dmarc)) prove you're allowed to send as your domain and that the message wasn't altered. Misconfiguration is a common deliverability killer.
- Sender reputation — built from complaint rates, bounces, and engagement (opens, replies, marks-as-spam). A domain/IP with a bad reputation gets filtered.
- List hygiene — sending to invalid or unengaged addresses (high bounce/complaint rates) damages reputation. Remove hard bounces and inactive recipients.
- Consent and engagement — mail people asked for; spam complaints are the strongest negative signal.
- Volume and warmup — a sudden spike in volume from a new IP/domain looks like spam; ramp up gradually.

```text
authenticate (SPF/DKIM/DMARC) + clean list + consent + steady volume + good engagement
→ inbox.   Any one badly off → spam.
```

The classic mistakes:

- Ignoring authentication. Without SPF/DKIM/DMARC, providers are suspicious (and may reject outright). Set them up before sending at volume.
- Buying or scraping lists. Recipients who didn't opt in mark you as spam, cratering reputation. Never do it.
- Ignoring bounces and complaints. Continuing to send to hard-bounced addresses damages reputation; process bounces and complaints promptly.
- A big blast from a cold domain. A new sender sending 100k emails at once is instantly suspicious. Warm up gradually.
- Overloaded or misleading content. Spammy phrasing, image-only emails, or mismatched "from"/links get filtered. Match content to expectation.
- Using a shared IP carelessly. On a shared sending service, other senders' reputation can affect you; transactional senders often use dedicated IPs.
- Not monitoring. Deliverability problems appear as falling opens and rising bounces/complaints. Track them; don't discover spam-foldering from a user complaint.

**How to stay deliverable:** authenticate your domain, send only to people who asked, keep the list clean, warm up new sending, honour bounces and complaints, and monitor open/bounce/complaint rates. Deliverability is a relationship with mailbox providers — technical setup plus respectful sending behaviour. See [sending email](/t/sending-email) and [transactional vs marketing email](/t/transactional-vs-marketing-email).
