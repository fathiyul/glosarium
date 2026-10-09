---
title: "bcrypt"
summary: "A widely supported password hashing algorithm with a tunable cost factor."
levels: { backend: junior }
aliases: ["bcrypt hash", "Blowfish password hash"]
prereqs: ["password-hashing", "salt"]
related: ["password-hashing", "argon2", "salt", "cryptographic-hash", "hashing-vs-encryption"]
---

bcrypt is a password hashing algorithm designed to be **slow on purpose**. It is old, widely supported, and a solid choice for storing passwords when you don't have a reason to pick something else. For the bigger picture see [password hashing](/t/password-hashing).

Plain fast hashes like SHA-256 are the wrong tool for passwords: an attacker with a stolen database can try billions of guesses per second. bcrypt adds a **cost factor** that you raise as hardware gets faster, so each guess stays expensive.

```python
import bcrypt

hashed = bcrypt.hashpw(b"correct horse", bcrypt.gensalt(rounds=12))
# e.g. b"$2b$12$Zk3...": version, cost, salt and hash in one string

bcrypt.checkpw(b"correct horse", hashed)   # True
bcrypt.checkpw(b"wrong guess", hashed)     # False
```

## What you get for free

- A random [salt](/t/salt) is generated per password and stored inside the output string, so two users with the same password get different hashes. You store just that one string.
- The cost factor is stored too, so `checkpw` knows how to verify old hashes after you raise it.

## Things to know

- **Pick the cost by measurement.** Choose the highest value that keeps login acceptably fast on your servers, and revisit it every few years.
- **Input length limit.** Implementations commonly only use the first 72 bytes of the password. Some libraries reject or truncate longer input, so check yours.
- **Never write your own** comparison or scheme. Use the library's verify function.

[Argon2](/t/argon2) is the newer design and is often recommended for new systems, but bcrypt remains acceptable.
