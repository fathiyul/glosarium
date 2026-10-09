---
title: "Keeping Sensitive Data Out of Logs"
summary: "Never logging passwords, tokens or personal data."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["PII in logs", "logging secrets", "redacting logs", "log redaction", "sensitive data logging"]
prereqs: ["logging"]
related: ["logging", "structured-logging", "audit-logging", "secrets-in-git", "least-privilege", "log-levels"]
core: [backend]
---

Logs are copied everywhere: files on servers, log platforms, support screenshots, backups, monitoring tools, the laptops of
anyone who debugs. They're kept a long time and read by many people. So **anything you write in a log is effectively public inside your company**, and
sometimes outside it. Don't log what shouldn't be widely seen.

## What not to log

- **Passwords and secrets**: API keys, tokens, session IDs, private keys, `Authorization` headers.
- **Payment data**: full card numbers and security codes.
- **Personal data** you don't need: national IDs, health information, full addresses, precise locations. Even emails
  and phone numbers can be restricted by privacy laws.
- **Full request and response bodies** by default, because they usually contain several of the above.

```python
log.info("login attempt for %s", username)           # ok
log.info("login attempt %s / %s", username, password)  # never

log.info("request headers: %s", request.headers)     # leaks Authorization and Cookie
```

## Where it sneaks in

- **Logging the whole object**, or `repr(request)`, so unexpected fields come along.
- **Exceptions and stack traces** that contain values (a failed SQL statement with the parameters, a validation error
  that echoes the input).
- **URLs with tokens or emails in the query string**, which web servers and proxies log automatically. Another reason not to put
  secrets in URLs.
- **Debug logging left on in production**.
- **Analytics and error tracking tools** that capture request data.

## How to prevent it

- **Log identifiers, not content.** `user_id=42` instead of the user's name and email.
- **Whitelist fields** to log rather than dumping objects.
- **Redact automatically**: most logging libraries support filters that mask known patterns and field names (`password`,
  `token`, `card_number`) ([structured logging](/t/structured-logging)).
- **Mask partially** when needed: the last 4 digits of a card, `a***@example.com`.
- **Set retention limits** and restrict who can read production logs.
- **Review new log lines** in code review with this question in mind.

## If it already happened

Treat a logged secret as leaked: **rotate it** ([secret rotation](/t/secret-rotation)), and purge or restrict the log data.
Logs sometimes need to record *who did what* for security. That's a deliberate [audit log](/t/audit-logging) with its own
access controls, which is different from dumping debug output.
