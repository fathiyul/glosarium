---
title: "OpenID Connect (OIDC)"
summary: "An identity layer on top of OAuth 2.0 that adds login and a standard ID token."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["OIDC", "OpenID Connect", "ID token", "Sign in with Google", "OpenID"]
prereqs: ["oauth2", "jwt"]
related: ["oauth2", "sso", "identity-provider", "jwt-claims", "pkce", "saml", "jwks"]
core: [backend]
---

**OpenID Connect (OIDC)** is an **identity layer built on top of OAuth 2.0**. OAuth 2.0 answers "may this app access this resource?". OIDC answers "**who is the user, and did they just log in?**". It's the standard behind "Sign in with Google / Microsoft / Apple" and most single sign-on setups ([SSO](/t/sso)).

## What it adds to OAuth

- An **ID token**: a [JWT](/t/jwt) signed by the identity provider, containing claims about the authentication and the user.
- A standard **`openid` scope** (and `profile`, `email`) to request identity data.
- A **UserInfo endpoint** to fetch more claims.
- **Discovery** (`/.well-known/openid-configuration`) so clients can find endpoints and keys automatically.

```json
// decoded ID token payload
{
  "iss": "https://accounts.example.com",
  "sub": "248289761001",                   // stable, unique user ID at this provider
  "aud": "my-client-id",                   // the app it was issued for
  "exp": 1717243200,
  "iat": 1717239600,
  "nonce": "n-0S6_WzA2Mj",
  "email": "ana@example.com",
  "email_verified": true
}
```

## The flow

The same **authorization code flow with PKCE** as OAuth ([OAuth 2.0](/t/oauth2), [PKCE](/t/pkce)), with `scope=openid email profile`. At the end, the app receives an **ID token** (to learn who logged in) and an **access token** (to call APIs).

## What your app must verify

Don't just decode the ID token. **Validate it**:

- The **signature**, using the provider's public keys (published at a JWKS endpoint, see [JWKS](/t/jwks)).
- **`iss`** matches the provider you expect, and **`aud`** is your client ID.
- It's **not expired** (`exp`), and the **`nonce`** matches the one you sent (prevents replay).

Use a maintained library for this. It's easy to get subtly wrong.

## Practical points

- **Identify users by `sub` (together with `iss`), not by email.** Emails can change, and may not be verified or unique across providers.
- **The ID token is for the client app.** Don't send it to your APIs as an access token. Use the access token for APIs.
- **OIDC authenticates at the provider.** Your app still needs its own session after login ([sessions](/t/session)).
- Use it instead of building your own password system when possible ([identity providers](/t/identity-provider), [build vs buy](/t/build-vs-buy-identity)).
- Older enterprise SSO often uses [SAML](/t/saml). OIDC is the more modern, JSON/JWT-based option.
