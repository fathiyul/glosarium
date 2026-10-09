---
title: "Hashing vs Encryption vs Encoding"
summary: "A one-way fingerprint vs reversible with a key vs just a different format."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["hashing vs encryption", "encoding vs encryption vs hashing", "hash vs encrypt"]
prereqs: ["bits-and-bytes"]
related: ["cryptographic-hash", "symmetric-encryption", "base64", "password-hashing", "hmac", "public-key-cryptography"]
---

Three things that look alike (unreadable-looking output from readable input) and do very different jobs.

| | Hashing | Encryption | Encoding |
|---|---|---|---|
| Reversible? | No, one-way | Yes, with the key | Yes, by anyone |
| Needs a key? | No | Yes | No |
| Purpose | Fingerprint, verify, check equality | Keep data secret | Change the format |
| Example | SHA-256, bcrypt | AES | [Base64](/t/base64), [URL encoding](/t/url-encoding) |

## Hashing: a fingerprint

A [cryptographic hash](/t/cryptographic-hash) maps any input to a fixed-size value. The same input always gives the same output, and you can't work backwards from the output.

```python
import hashlib
hashlib.sha256(b"hello").hexdigest()
# '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
```

Use it to verify a download wasn't corrupted or to store passwords (with a slow, salted algorithm, see [password hashing](/t/password-hashing)).

## Encryption: a lock

[Encryption](/t/symmetric-encryption) scrambles data so only someone with the key can read it. Use it when you must get the original data back later: stored files, messages, tokens.

## Encoding: just a different format

No secrecy at all. It exists so data fits somewhere, such as bytes inside JSON.

## The classic mistakes

- **Calling Base64 "encryption".** It hides nothing.
- **Encrypting passwords** instead of hashing them. If the key leaks, every password leaks. Passwords should never be recoverable.
- **Using a plain fast hash like SHA-256 for passwords.** It is one-way but far too quick to guess against.
- **Hashing to hide small sets of values** such as phone numbers. An attacker can simply hash every possible value and compare.
