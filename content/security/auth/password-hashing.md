---
title: Password Hashing
summary: Storing a one-way, deliberately slow fingerprint of a password instead of the password itself.
levels: { backend: junior }
prereqs: []
related: [salt, bcrypt, argon2, credential-stuffing]
core: [backend]
---

Never store passwords. Store a **hash**: the output of a one-way function. At login you
hash what the user typed and compare it to the stored hash. If your database leaks, the
attacker gets hashes, not passwords.

## Not just any hash

General-purpose hashes like MD5 or SHA-256 are designed to be **fast**, which is exactly
wrong here. A GPU can try billions of SHA-256 guesses per second, so leaked hashes of
common passwords fall almost instantly.

Password hashes are designed to be **slow and tunable**:

| Algorithm | Notes |
|---|---|
| **Argon2id** | Current recommendation. Memory-hard, so GPUs don't help much. |
| **bcrypt** | Older, still fine, very widely supported. Max 72-byte input. |
| **scrypt** | Memory-hard, less common in practice. |
| ~~MD5, SHA-1, SHA-256~~ | Not for passwords. |

They also handle the [salt](/t/salt) for you; it's stored inside the output string.

## In practice

Use your framework's or a well-known library's function. Don't write your own.

```python
from argon2 import PasswordHasher
ph = PasswordHasher()

stored = ph.hash("hunter2")      # save this string
ph.verify(stored, "hunter2")     # raises on mismatch
```

A slow hash takes around 100 ms per login on your server: unnoticeable for one user,
crippling for an attacker trying billions.
