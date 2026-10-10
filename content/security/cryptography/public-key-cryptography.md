---
title: "Public-Key Cryptography"
summary: "A public key encrypts or verifies; a private key decrypts or signs."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Public-key cryptography uses a related pair of keys: a public key that can be shared and a private key that must be protected. Depending on the algorithm and protocol, the pair can support encryption/decryption, digital signatures, or key agreement. These operations are related by mathematics but are not interchangeable.

It helps solve the key-distribution problem of symmetric encryption: a sender can use a recipient's public key without first sharing a secret through a secure channel. In practice, systems often use public-key cryptography to establish or protect a short-lived symmetric key, because symmetric algorithms are efficient for bulk data. TLS is a familiar example of a protocol combining cryptographic mechanisms.

A public key is not automatically trustworthy just because it is public. The system needs a way to bind that key to the intended person or service, such as certificates or a previously trusted key. If a private key is exposed, confidentiality or authenticity guarantees tied to it may fail; rotation and revocation procedures matter.

Backend, frontend, and data engineers should select a standard protocol and let a maintained library handle key formats and operations. Avoid hand-rolled cryptography and avoid treating “encrypt with public key” as a complete system design. See [symmetric encryption](/t/symmetric-encryption), [digital signatures](/t/digital-signature), and [key management](/t/key-management).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
