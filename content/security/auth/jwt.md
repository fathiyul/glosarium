---
title: JWT (JSON Web Token)
summary: A signed, self-contained token carrying claims like user ID and expiry, verifiable without a database lookup.
levels: { backend: junior, frontend: junior }
aliases: [JSON Web Token]
prereqs: [authentication-vs-authorization]
related: [session, bearer-token, jwt-claims, jwt-signing-algorithms, refresh-token]
core: [frontend]
---

A JWT is three Base64URL-encoded parts joined by dots:

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsImV4cCI6MTcwMDAwMDAwMH0.Xk2...signature
└──── header ───────┘ └─────────────── payload ─────────────┘ └── signature ──┘
```

Decoded:

```json
// header
{ "alg": "HS256" }
// payload ("claims")
{ "sub": "42", "exp": 1700000000, "role": "admin" }
```

The server signs header + payload with a secret key. Later, it verifies the signature: if
anyone changed a single character (say `"role": "user"` → `"admin"`), the signature no
longer matches and the token is rejected.

## The two things juniors get wrong

**1. JWTs are signed, not encrypted.** Anyone can decode the payload. Paste one into
[jwt.io](https://jwt.io) and read it. Never put passwords, personal data, or secrets
inside.

**2. You can't easily un-issue one.** Since the server stores nothing, a stolen JWT works
until its `exp`. That's why access tokens are kept short-lived (minutes) and paired with a
[refresh token](/t/refresh-token).

## Always verify properly

Use a maintained library, and check the signature *and* the expiry *and* the expected
algorithm. Decoding without verifying is just reading untrusted input.

```python
jwt.decode(token, key, algorithms=["HS256"])  # pin the algorithm
```
