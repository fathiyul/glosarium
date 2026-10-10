---
title: "Notification Preferences"
summary: "Letting users choose which messages they get, on which channel."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["notification preferences", "notification settings", "opt-in opt-out"]
prereqs: ["sending-email", "transactional-vs-marketing-email"]
related: ["sending-email", "push-notifications", "transactional-vs-marketing-email", "gdpr"]
---

**Notification preferences** are the settings that let a user control which notifications they get, by type and by channel (email, push, SMS), plus things like digest frequency and quiet hours. Storing and honouring them is what turns "we send everything to everyone" into communication users accept.

```text
user preferences: { marketing_email: off, push: on, security_alerts: on, digest: daily }
```

They connect several concerns:

- Consent and compliance. Marketing messages need opt-in and easy unsubscribe; ignoring preferences is a legal (and reputation) problem (see [GDPR](/t/gdpr)).
- Channel choice. A user may want a push but not an email; the same event may route differently per user. The send path must check the preference for that type+channel.
- Reducing complaints. Too many messages → unsubscribes, spam reports, app uninstalls. Granular preferences reduce this.
- Transactional vs marketing. Security and receipt emails are usually non-optional; marketing is optional. Preferences should distinguish them (see [transactional vs marketing email](/t/transactional-vs-marketing-email)).

The classic mistakes:

- One global on/off. A single toggle forces users to disable everything (including important alerts) to stop marketing. Offer per-type and per-channel granularity.
- Notifications that ignore preferences. A code path that sends without checking the preference list defeats the whole system — and can violate consent. Centralise the "should we send this?" check.
- Hard to reach settings. Preferences buried or only in an email footer frustrate users. Make them findable in-app.
- No easy unsubscribe. Legally required for marketing, and its absence drives complaints. Provide a one-click opt-out.
- Transactional messages caught in "unsubscribe all". If a user turns off all email, do security alerts still send? Decide deliberately and document it.
- Defaults that over-send. Defaulting everything to on (especially marketing) invites complaints. Default conservatively and let users opt in.
- Forgetting delivery failures. A bad email address or expired push token should eventually stop being retried and be flagged (see [email deliverability](/t/email-deliverability)).

**How to design it:** store per-user, per-type, per-channel preferences; centralise the send decision so nothing bypasses it; distinguish transactional from marketing; make settings and unsubscribe easy; and default conservatively. It respects users, keeps channels healthy, and keeps you compliant — see [push notifications](/t/push-notifications).
