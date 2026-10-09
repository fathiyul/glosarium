---
title: "Don't Roll Your Own Crypto"
summary: "Use vetted libraries; homemade cryptography is almost always broken."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["never roll your own crypto", "don't invent your own cryptography"]
prereqs: ["cryptography"]
related: ["cryptography", "hashing-vs-encryption", "symmetric-encryption", "password-hashing", "secure-random", "key-management", "timing-attack"]
---

Don't design your own encryption algorithms, protocols or schemes, and don't assemble standard parts in a homemade way either. Use well-reviewed libraries and follow their recommended usage.

Why the rule exists: cryptography is easy to get **almost** right. A homemade scheme usually works in a demo, encrypts and decrypts fine, and looks random. The flaws show up only when someone attacks it, often years later. Public algorithms survive because many experts tried to break them in the open.

## What "rolling your own" looks like in practice

- Inventing a cipher, or "improving" a known one by adding steps.
- Using a real cipher incorrectly: reusing a [nonce/IV](/t/nonce-iv), picking a mode without checking what it guarantees, or encrypting without any integrity check so data can be tampered with.
- Using `random` instead of a [secure random](/t/secure-random) source to generate keys or tokens.
- Storing passwords with a fast hash instead of [password hashing](/t/password-hashing).
- Comparing secrets with `==`, which can leak information through timing. See [timing attack](/t/timing-attack).

```python
# Homemade "encryption": XOR with a short repeating key. Trivially broken.
bytes(b ^ key[i % len(key)] for i, b in enumerate(data))
```

## What to do instead

1. Pick the **highest-level** tool that does the job: TLS for network traffic, a password hashing library for passwords, a managed secrets or key service for keys.
2. If you must encrypt data yourself, use a well-known library with safe defaults for authenticated encryption, rather than combining low-level pieces.
3. Keep keys out of code. See [key management](/t/key-management).

Writing your own is fine as a learning exercise. Just don't ship it.
