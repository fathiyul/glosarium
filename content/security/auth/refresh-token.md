---
title: Refresh Token
summary: A long-lived credential used only to get new short-lived access tokens without logging in again.
levels: { backend: mid-level, frontend: mid-level }
prereqs: [jwt, bearer-token]
related: [access-token, token-expiry, refresh-token-rotation, token-revocation]
core: [backend, frontend]
---

Short-lived [access tokens](/t/access-token) limit the damage of a leak, but nobody wants to
log in every 15 minutes. The fix is two tokens:

| | Access token | Refresh token |
|---|---|---|
| Lifetime | Minutes (e.g. 15 min) | Days to months |
| Sent to | Every API call | Only the token endpoint |
| Usually | A [JWT](/t/jwt), verified without lookup | Opaque, stored and checked in the DB |

The flow:

1. Login returns both tokens.
2. The client calls APIs with the access token.
3. When the access token expires (API returns [401](/t/http-401-vs-403)), the client sends
   the refresh token to `POST /auth/refresh` and gets a new access token.
4. On logout, the server deletes the refresh token. Within minutes, every access token
   it could produce has expired too.

## Why it helps

The refresh token is sent rarely and to one endpoint, so it's exposed far less. And because
the server *stores* it, you get back the ability to revoke a session, which pure JWTs lack.

## Where to keep it

- **Browsers:** an `HttpOnly`, `Secure` [cookie](/t/cookie), scoped to the refresh path.
  Not `localStorage`, where any XSS can read it.
- **Mobile:** the OS keychain / keystore.

If a refresh token is stolen, the attacker can mint access tokens for its whole lifetime.
[Refresh token rotation](/t/refresh-token-rotation) is the standard defense.
