---
title: "API Key"
summary: "A long random secret identifying a calling application rather than a user."
levels: { backend: junior, frontend: junior }
also: [api-design]
aliases: ["API token", "app key", "access key"]
prereqs: ["credential"]
related: ["bearer-token", "secrets-management", "secrets-in-git", "rate-limiting", "api-scopes"]
---

An API key is a long random string that identifies the **application** calling an API, not a person. You get one from the provider's dashboard and send it with each request, usually in a header.

```sh
curl https://api.example.com/v1/orders \
  -H "Authorization: Bearer sk_live_9f2c..."   # header name varies by provider
```

The server looks the key up, finds which account it belongs to, and applies that account's limits and permissions. Providers differ on where the key goes (header, query string) and what it's called, so check their docs.

## Treat it like a password

Anyone who has the key can act as your application. The classic mistakes:

- **Committing it to Git.** Bots scan public repos for keys within minutes, and deleting the file later doesn't remove it from history. See [secrets in Git](/t/secrets-in-git).
- **Putting it in frontend code.** Anything shipped to a browser or mobile app can be extracted. Call the API from your server instead.
- **Putting it in a URL.** URLs end up in logs, browser history and proxies. Use a header.

Keep keys in [environment variables](/t/environment-variable) or a secrets manager (see [secrets management](/t/secrets-management)), never in source code.

## Limits of API keys

A key says *which app* is calling, not *which user* is behind it. For user-level access use [OAuth 2.0](/t/oauth2) or a [session](/t/session). If a key leaks, revoke it and issue a new one. Good providers let you create several keys, scope them to what each needs ([least privilege](/t/least-privilege)), and rotate them without downtime.
