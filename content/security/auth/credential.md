---
title: "Credential"
summary: "Anything used to prove identity: a password, key, token or certificate."
levels: { backend: junior, frontend: junior }
aliases: ["credentials", "login credentials"]
prereqs: ["authentication-vs-authorization"]
related: ["api-key", "bearer-token", "password-hashing", "mfa", "secrets-management", "secrets-in-git"]
---

A credential is anything you present to **prove who you are**: a password, an [API key](/t/api-key), a [token](/t/bearer-token), a certificate, a passkey. It is the "authentication" half of [authentication vs authorization](/t/authentication-vs-authorization).

Common kinds, by what they rely on:

| Kind | Examples |
|---|---|
| Something you know | Password, PIN |
| Something you have | Hardware key, phone with an authenticator app, client certificate |
| Something you are | Fingerprint, face |
| Issued to a program | API key, access token |

## Why it matters

Whoever holds a credential **is** that identity as far as the system can tell. That is why so many breaches start with a leaked or guessed credential rather than a clever exploit.

The habits that follow from this:

- **Never store passwords as plain text.** Store a salted slow hash (see [password hashing](/t/password-hashing)).
- **Keep credentials out of code and Git.** A key committed once should be treated as leaked. See [secrets in Git](/t/secrets-in-git).
- **Don't log them.** Request logs, error messages and analytics events are common accidental leaks.
- **Make them revocable and short-lived** where you can, so a stolen one stops working.
- **Add a second factor** ([MFA](/t/mfa)) so a password alone isn't enough.

Credentials you hand to your own software at runtime belong in a secrets store; see [secrets management](/t/secrets-management).
