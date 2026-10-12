---
title: "Hash Function"
summary: "A function mapping data of any size to a fixed-size value."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["hashing", "hash", "checksum"]
prereqs: ["function"]
related: ["hash-table", "hash-collision", "hashing-vs-encryption", "password-hashing", "merkle-tree"]
---

A hash function takes input of any size (a string, a file, a record) and produces a fixed-size value, called a hash or digest. The same input always gives the same output, and a tiny change in the input produces a very different output.

```python
import hashlib
hashlib.sha256(b"hello").hexdigest()
# '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
hashlib.sha256(b"hellp").hexdigest()
# a completely different value
```

## Properties

- **Deterministic**: same input, same hash.
- **Fast to compute.**
- **Fixed-size output**, however big the input.
- **Spreads values evenly**, so different inputs rarely share a hash (a [collision](/t/hash-collision)).
- For cryptographic hashes: **one-way** (you can't recover the input from the hash) and collision-resistant.

## Two families, with different jobs

| Kind | Examples | Used for |
|---|---|---|
| **Non-cryptographic** | the hash behind dictionaries, MurmurHash, xxHash | [hash tables](/t/hash-table), partitioning, quick checks |
| **Cryptographic** | SHA-256, SHA-3 | integrity checks, signatures, content addressing |
| **Password hashes** | Argon2, bcrypt | deliberately slow, for storing passwords ([password hashing](/t/password-hashing)) |

## Common uses

- **Dictionaries and sets**: the hash picks where to store a key.
- **Integrity**: compare a file's hash to a published one to detect corruption or tampering.
- **Deduplication and caching**: identify identical content or cache keys.
- **Sharding**: choose a partition from `hash(key) % N`.
- **Git** names objects by their hash.

## Cautions

- **Hashing is not encryption.** You can't decrypt a hash ([hashing vs encryption](/t/hashing-vs-encryption)).
- **Don't use fast general-purpose hashes (MD5, SHA-256) for passwords**, and don't use broken ones (MD5, SHA-1) for security.
- **Don't invent your own.**
- Python randomizes string hashes between runs, so don't store `hash(x)` or depend on its value.
