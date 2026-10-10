---
title: "Nonce / IV"
summary: "A value used once so encrypting the same data gives different output."
levels: { backend: senior }
---

A nonce or initialization vector (IV) is an input used by some cryptographic algorithms so repeated encryption does not produce the same result. The exact requirement depends on the algorithm and mode: some require uniqueness under a key, some require unpredictability, and some have different constraints.

The critical mistake is treating a nonce as an optional random decoration. Reusing a nonce with certain modes under the same key can reveal relationships between plaintexts or undermine authentication. A nonce often does not need to be secret, but it must satisfy the construction's rules and be stored or transmitted so decryption can use it. Consult the selected library's documentation rather than generalizing one mode's rule to all encryption.

Prefer a high-level API that generates or manages nonces safely. If your system creates them, design for multiple processes, retries, restarts, and key rotation; a counter that resets can repeat values. Do not reuse an IV because two records happen to have the same plaintext.

Backend developers should review nonce lifecycle alongside data keys and authenticated encryption. Data engineers handling encrypted files should preserve the nonce and authentication tag with the ciphertext. See [symmetric encryption](/t/symmetric-encryption) and [secure random](/t/secure-random).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.
