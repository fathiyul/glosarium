---
title: "Sending Email"
summary: "Transactional email through a provider, and deliverability basics."
levels: { backend: junior }
prereqs: ["background-job"]
related: ["background-job", "dns", "idempotence"]
also: [email-notifications]
---

Transactional email is the message your application sends because of something a user did or a state that changed: a password reset, a receipt, an order confirmation. Most teams send it through an email provider, which accepts your message over an API or SMTP and handles delivery to the recipient's mail server.

```python
# Illustrative: the exact call depends on the provider's library
send_email(
    to="ada@example.com",
    subject="Your order has shipped",
    body="Order #1042 is on its way.",
)
```

Deliverability is whether the message reaches the inbox rather than the spam folder. Mail servers check the sending domain's DNS records, usually SPF, DKIM and DMARC, to decide whether the sender is authorized. Sending from your application's own server address rarely gets good results, so use the provider's domain setup and follow its instructions.

The classic mistake is sending email inside the request that triggered it. If the provider is slow or down, the user's request hangs or fails even though their action succeeded. Put the send onto a [background job](/t/background-job) with retries, and make the job [idempotent](/t/idempotence), so a retry doesn't send the same password reset twice. Never put secrets or full account data into an email you don't need to.
