---
title: "OAuth 2.0"
summary: "A framework for letting an app act on a user's behalf without seeing their password."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["OAuth 2.0", "OAuth", "OAuth2 flow", "authorization code flow", "delegated authorization"]
prereqs: ["access-token", "authentication-vs-authorization"]
related: ["openid-connect", "pkce", "access-token", "refresh-token", "client-credentials-flow", "jwt", "sso"]
core: [backend, frontend]
---

**OAuth 2.0** is a framework that lets an application **access a user's data on another service, on their behalf, without ever seeing their password**. When an app asks "Connect your Google Calendar" and you approve it on Google's own page, that's OAuth.

It solves the old, bad pattern of asking users for their password to another service, which gave the app full access with no way to limit or revoke it.

## The roles

| Role | Who | Example |
|---|---|---|
| **Resource owner** | The user | You |
| **Client** | The app wanting access | A scheduling app |
| **Authorization server** | Issues tokens after the user consents | Google's login and consent screens |
| **Resource server** | The API holding the data | The Calendar API |

## The Authorization Code flow (with PKCE), simplified

```
1. Client sends the user to the authorization server:  /authorize?client_id=...&redirect_uri=...&scope=calendar.read&state=xyz&code_challenge=...
2. The user logs in THERE and approves the requested scopes.
3. The server redirects back to the client with a short-lived  code.
4. The client exchanges the code (plus the PKCE code verifier) for an access token (and maybe a refresh token) at the token endpoint.
5. The client calls the API with:  Authorization: Bearer <access token>
```

The key properties:

- The app **never sees the user's password**.
- It gets only the **scopes** the user approved (`calendar.read`), not blanket access ([API scopes](/t/api-scopes)).
- The **access token** is short-lived. A **refresh token** can obtain new ones ([access tokens](/t/access-token), [refresh tokens](/t/refresh-token)).
- The user can **revoke** access at any time.
- **PKCE** protects the code exchange, and is recommended for all clients, including single-page and mobile apps ([PKCE](/t/pkce)).

## Other flows

- **Client credentials**: for server-to-server calls with no user ([client credentials flow](/t/client-credentials-flow)).
- Older flows (implicit, and password grant) are discouraged. Use the authorization code flow with PKCE for user-facing apps.

## Common confusions and mistakes

- **OAuth 2.0 is for *authorization* (access to resources), not authentication (who the user is).** "Log in with Google" uses **[OpenID Connect](/t/openid-connect)**, a layer on top that adds an ID token about the user.
- **Don't build it yourself.** Use a well-maintained library or an identity provider ([identity providers](/t/identity-provider)).
- **Validate the `state` parameter** to prevent CSRF, and **register exact redirect URIs**, since loose matching leads to stolen codes.
- **Store tokens carefully** and keep them short-lived. Don't put them in URLs or logs.
- **Request minimal scopes.**
- A [JWT](/t/jwt) is a common *format* for access tokens, but OAuth doesn't require it.

OAuth 2.0 is a framework with many options, so details differ between providers. Read your provider's documentation.
