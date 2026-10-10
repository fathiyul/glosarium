---
title: "Symmetric Encryption"
summary: "One shared key both encrypts and decrypts, as with AES."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Symmetric encryption uses the same secret key, or closely related secret material, to encrypt and decrypt data. It is efficient for protecting large amounts of data and is used inside many storage and communication systems.

The hard part is often not selecting a cipher but handling the key and using the algorithm safely. Prefer authenticated encryption modes or high-level library APIs that provide confidentiality and integrity together. Encryption without authentication may let an attacker alter ciphertext in ways that affect decrypted data. Do not reuse a nonce or initialization value where the chosen mode requires uniqueness; the requirement depends on the algorithm and mode.

For example, a service might encrypt a database field using a data key protected by a key-management service. The application still needs authorization around decryption, key rotation, and a recovery plan. If the key is available to every process that can read the ciphertext, it does not protect against compromise of those processes.

Backend and data engineers should let a maintained library manage formats, nonces, and authentication tags rather than composing primitives. Frontend developers should avoid inventing client-side encryption schemes unless the product has a specific threat model and key lifecycle. Symmetric encryption requires secure key distribution; [public-key cryptography](/t/public-key-cryptography) can help establish or wrap keys. See [encryption at rest](/t/encryption-at-rest) and [envelope encryption](/t/envelope-encryption).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
