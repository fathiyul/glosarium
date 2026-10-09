---
title: Session
summary: Server-side memory of a logged-in user, referenced by a random ID the browser sends on each request.
levels: { backend: junior, frontend: junior }
aliases: [Server-side session]
prereqs: [authentication-vs-authorization]
related: [cookie, jwt, session-fixation, csrf]
core: [backend]
also: [backend-basics]
---

HTTP is stateless: each request arrives with no memory of the previous one. A **session**
is how the server remembers that you logged in.

1. You log in with a correct password.
2. The server creates a session record (`session_id → user 42, expires 18:00`) in a
   database or Redis.
3. It sends the random `session_id` to the browser in a [cookie](/t/cookie).
4. The browser sends that cookie with every request; the server looks it up and knows
   who you are.

Logging out means deleting the record. The ID is now worthless.

## Sessions vs tokens

The common alternative is a self-contained token like a [JWT](/t/jwt), where the user info
is *inside* the token and the server stores nothing.

| | Session | JWT |
|---|---|---|
| Server stores state | Yes | No |
| Log out / revoke instantly | Easy: delete it | Hard: token valid until expiry |
| Lookup per request | Yes | No (verify signature) |
| Good for | Classic web apps | APIs, mobile, service-to-service |

Sessions are simpler and safer by default. Don't reach for JWTs just because they're
popular.

## The ID must be unguessable

Generate session IDs with a cryptographically secure random generator (frameworks do this
for you). A predictable ID like an incrementing number lets anyone become anyone.
