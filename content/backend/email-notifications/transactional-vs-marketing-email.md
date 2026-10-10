---
title: "Transactional vs Marketing Email"
summary: "Password resets vs newsletters, and why they're sent separately."
levels: { backend: junior }
aliases: ["transactional email", "marketing email"]
prereqs: ["sending-email"]
related: ["sending-email", "signup-email-verification", "dns"]
---

Transactional email is sent because of something a user just did or a change to their account: a password reset, an order receipt, a login alert. Marketing email is promotional, such as a newsletter or a sale announcement. The two look similar, but they have different purposes and different rules.

Transactional messages are expected, so users are usually waiting for them, and they need to arrive quickly. Marketing messages go to people who may not have asked for them, so they usually need the recipient's consent, a clear way to unsubscribe, and compliance with the laws of the countries you send to. Those laws vary, so check them for each market you serve.

The practical reason to keep them apart is reputation. Mail providers track complaints and bounces per sending domain and stream. If marketing sends generate many complaints through the same domain as password resets, the resets can land in spam. Use separate sending domains or streams for each, with their own [DNS](/t/dns) records.

The classic mistake is adding a promotion to a password reset email, or sending a newsletter through the account-notification sender. A user who only wanted to reset a password then sees an ad, and the mail provider may start filtering all messages from that sender.
