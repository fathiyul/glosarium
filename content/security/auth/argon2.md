---
title: "Argon2"
summary: "The current recommended password hashing algorithm; memory-hard to resist GPU cracking."
levels: { backend: mid-level }
related: [password-hashing, bcrypt]
---

Argon2 is a password-hashing function designed to make each guess expensive in both computation and memory. Unlike fast general-purpose hashes such as SHA-256, it is deliberately costly so a database leak does not let an attacker test guesses at very high speed. Argon2id combines resistance to different classes of attacks and is a common choice for password storage when available through a maintained library.

Hash each password with a unique random salt and store the encoded result, including the algorithm parameters needed to verify it. On login, the library recomputes the hash from the submitted password and stored salt, then compares safely. Never invent a custom format or encrypt passwords for later recovery; password storage should be one-way. See [password hashing](/t/password-hashing) and compare the operational choice with [bcrypt](/t/bcrypt).

The cost settings matter. Too low makes offline guessing cheaper; too high can make legitimate logins slow or enable resource exhaustion if unauthenticated requests trigger large amounts of work. Choose parameters using the library's guidance and test under expected load on the machines that will run authentication. Exact recommendations evolve with hardware and implementations, so avoid copying an old constant without review.

Backend teams should plan to rehash on successful login when parameters are upgraded. Argon2 does not protect a weak password from guessing, prevent credential reuse, or replace rate limiting and multifactor authentication.

Operational check: exercise the normal flow, a failed attempt, expiration or revocation, and recovery in tests. Verify that secrets are never included in logs or analytics, and make failure messages useful without revealing account state. Document which service owns the decision so a future client or integration cannot silently bypass it. Changes to identity flows should include a rollback or account-support plan.
