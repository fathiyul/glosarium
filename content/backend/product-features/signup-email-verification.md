---
title: "Sign-Up and Email Verification"
summary: "Creating accounts and confirming the user owns the email address."
levels: { backend: junior, frontend: junior }
aliases: ["email confirmation", "account verification"]
prereqs: ["sending-email"]
related: ["sending-email", "ttl", "transactional-vs-marketing-email", "authentication-vs-authorization"]
---

Email verification confirms that the person signing up controls the email address they entered. The usual flow looks like this:

1. The user submits the sign-up form, and the account is created in a pending state.
2. The server generates a random token, stores it, and emails the user a link containing it.
3. The user opens the link, and the server checks the token, marks the account verified, and invalidates the token.

```
https://example.com/verify?token=8f3c1a...
```

The token must be long and random, expire after a set time, and work only once. Store a hash of it rather than the token itself where you can, so a leaked database doesn't leak working links. Tokens that never expire, or that can be reused, let anyone with an old email get back in later.

The classic mistake is treating the click as enough to log the user in without any other checks, or letting unverified accounts do things that should wait. Decide what a pending account can do, and enforce that on the server. Send the verification email as a [transactional email](/t/transactional-vs-marketing-email), and [sending email](/t/sending-email) covers delivery problems you'll need to handle, such as messages landing in spam.
