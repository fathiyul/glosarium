---
title: "Basic Authentication"
summary: "Sending a username and password with every request, Base64-encoded."
levels: { backend: junior, frontend: junior }
aliases: ["HTTP Basic", "Basic auth"]
prereqs: ["credential", "http-headers"]
related: ["base64", "https", "bearer-token", "api-key", "hashing-vs-encryption"]
---

Basic authentication is the simplest HTTP login scheme. The client sends `username:password`, Base64-encoded, in the `Authorization` header on **every** request.

```sh
# "alice:s3cret" encoded with Base64
echo -n 'alice:s3cret' | base64      # YWxpY2U6czNjcmV0
curl https://example.com/api -H "Authorization: Basic YWxpY2U6czNjcmV0"
# or let curl build it:
curl -u alice:s3cret https://example.com/api
```

If the credentials are missing or wrong, the server answers [401](/t/http-401-vs-403) with a `WWW-Authenticate: Basic` header.

## The classic mistake

Thinking [Base64](/t/base64) protects the password. It is an encoding, not encryption: anyone who sees the header can decode it in one line. See [hashing vs encryption](/t/hashing-vs-encryption).

So Basic auth is only acceptable over [HTTPS](/t/https). Over plain HTTP the password is sent in the clear on every request.

## Other drawbacks

- The real password travels with every request, so one leaked log line exposes it.
- No logout: the browser keeps resending the credentials until it is closed.
- No built-in expiry, [MFA](/t/mfa) or per-app permissions.

## Where it still shows up

Quick internal tools, simple service-to-service calls, and some APIs that use the username for an [API key](/t/api-key) and leave the password empty. For anything user-facing, use a [session](/t/session) or a [token](/t/bearer-token).
