---
title: "OAuth Scopes and Permissions"
summary: "Limiting what a token can do, e.g. read-only access."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["scopes", "oauth scopes", "api permissions"]
prereqs: ["openid-connect", "bearer-token"]
related: ["rbac", "least-privilege", "api-key", "api-contract"]
---

**OAuth scopes** are labels attached to an access token that say what the token may do — `read:orders`, `write:users`, `admin`. When a user or client authorises your app, they grant specific scopes, and the API checks the token's scopes before each action. It's how a single token can be powerful for some operations and powerless for others, following [least privilege](/t/least-privilege).

```text
token: scopes ["read:orders"]
GET /orders     → allowed
POST /orders    → 403 (needs write:orders)
```

Scopes are coarse-grained *capabilities*: they answer "may this token perform this kind of action?" They complement identity and roles — a token identifies the caller; scopes limit what that caller may do in this request.

The classic mistakes:

- Scopes too broad. A token for reading a profile that also has `write:*` is a leak waiting to happen. Request and grant the narrowest set needed.
- Confusing scopes with roles. Scopes are what a *specific token* can do; roles (see [RBAC](/t/rbac)) are what a *user* is allowed to do in the app. Both apply: check permission and scope.
- Checking scopes but not ownership. Having `read:orders` doesn't mean reading *anyone's* orders. Always verify the caller may see the specific resource.
- Ignoring scope on tokens from partners. A third-party integration should get its own scoped token, not a shared key with broad access.
- No scope granularity in the API design. If every action maps to one giant scope, you can't grant narrowly. Design scopes around meaningful capabilities.
- Silent scope mismatch. Returning a generic 403 without saying a scope is missing makes integration painful; document required scopes per endpoint.

**How to design them:** define scopes as a small, stable set of capabilities; require the minimum per endpoint; document which are needed; and always check ownership separately. Scopes are your API's least-privilege mechanism — enabling a token to be powerful exactly where it should be, and nothing more. See [API keys](/t/api-key) and [bearer tokens](/t/bearer-token) for the credential side.
