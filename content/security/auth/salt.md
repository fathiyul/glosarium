---
title: Salt
summary: A random value added to each password before hashing so identical passwords get different hashes.
levels: { backend: junior }
prereqs: [password-hashing]
related: [bcrypt, argon2]
---

Without a salt, two users with the password `password123` get the same hash. An attacker
can then:

- see which users share a password, and
- use a **rainbow table**: a precomputed list of hashes for millions of common passwords,
  so cracking becomes a lookup.

A **salt** is a random value generated per user and mixed into the hash. Same password,
different salt, completely different hash. Precomputed tables become useless, because the
attacker would need a separate table for every salt.

The salt is **not secret**. It's stored next to the hash, and modern algorithms embed it
in the output string:

```
$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$RdescudvJCsgt3ub+b+dWRWJTmaaJObG
          └ parameters ─────┘ └ salt ──┘ └ hash ─────────────────────────┘
```

If you use Argon2 or bcrypt through a library, salting happens automatically. You only
need to understand it, not implement it.

> **Not to be confused with a pepper:** a single secret value shared by all passwords and
> kept *outside* the database (e.g. in a secrets manager). Optional extra defense.
