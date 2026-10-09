---
title: Authentication & Authorization
summary: Proving who someone is, then deciding what they're allowed to do.
order: 10
---

Almost every backend has to answer two questions on each request: **who is this?**
(authentication) and **are they allowed to do this?** (authorization). Get the first wrong and
attackers log in as your users. Get the second wrong and a logged-in user reads someone
else's data, which is the more common bug in practice.

As a junior, focus on the basics: hash passwords, understand sessions vs tokens, and return
the right status codes. Token lifecycles, OAuth, and permission models come next. Key
management and identity architecture can wait until you own a system.
