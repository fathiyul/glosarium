---
title: Refresh Token Rotation
summary: Issuing a new refresh token on every refresh and invalidating the old one, so reuse of an old token reveals theft.
levels: { backend: senior, frontend: senior }
prereqs: [refresh-token]
related: [token-revocation, credential-stuffing]
core: [backend]
---

With plain [refresh tokens](/t/refresh-token), a stolen token works silently until it
expires: the attacker and the real user both keep refreshing, and nothing looks wrong.

**Rotation** changes the rule: each refresh token can be used **once**. Every call to the
refresh endpoint returns a new access token *and* a new refresh token, and the old refresh
token is invalidated.

## Reuse detection

The real value comes from what happens when an old token shows up again:

1. Attacker steals refresh token **R1**.
2. The real user refreshes first: R1 → **R2**. R1 is now marked used.
3. The attacker tries R1. The server sees a **used** token being replayed.
4. Since it can't tell who's who, it revokes the **whole token family** (R1, R2, and
   everything descended from them). Both parties are logged out; the real user logs in
   again, the attacker can't.

(If the attacker refreshes first, the same thing happens when the real user's turn comes.)

So you need to store, per token: its family ID, whether it's been used, and its parent.

## Trade-offs to handle

- **Races.** A mobile app firing two requests at once may refresh twice with the same token
  and log the user out. Common fix: a short grace period (a few seconds) where the previous
  token still returns the *same* new token.
- **Network failures.** If the response with R2 is lost, the client still only has R1.
  The grace period covers this too.
- **Storage writes on every refresh.** Fine for most systems; worth knowing at scale.

Rotation with reuse detection is recommended for public clients (SPAs, mobile) in the
OAuth 2.0 security best practices (RFC 9700).
