---
title: "Cryptographic Hash (SHA-256)"
summary: "A hash where finding collisions is infeasible."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

A cryptographic hash maps input of arbitrary length to a fixed-length digest. A secure hash is designed so it is impractical to recover the input from the digest or find two inputs with the same digest; these properties make hashes useful for integrity checks, signatures, and password-hashing constructions.

A plain hash is not encryption: there is no key to decrypt it. It is also not a safe way to store passwords. Common passwords can be guessed and hashed quickly, so password storage needs a deliberately slow, salted algorithm such as Argon2 or bcrypt. For integrity, a digest only proves that bytes match a known digest; if an attacker can replace both the file and the digest, it does not establish authenticity.

For example, a release process can publish a SHA-256 digest so a recipient can detect accidental corruption when the expected digest came from a trusted channel. To authenticate who produced the file, use a [digital signature](/t/digital-signature) or a keyed construction such as [HMAC](/t/hmac).

Backend, frontend, and data engineers encounter hashes in caches, content addressing, artifact verification, and deduplication. Choose a maintained cryptographic library and a current hash intended for the purpose; avoid inventing schemes or assuming that every algorithm named “hash” is collision resistant. See [cryptography](/t/cryptography) and [password hashing](/t/password-hashing).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
