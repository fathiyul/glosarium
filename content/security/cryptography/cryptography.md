---
title: "Cryptography"
summary: "The math of keeping data secret and verifying it."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Cryptography uses mathematical techniques and keys to protect information and establish trust. It supports confidentiality (encryption), integrity (detecting modification), and authenticity (checking who created or approved data), but each goal requires the right construction and correct key handling.

A common mistake is using encryption when the real need is a signature, or assuming an encrypted value is also authenticated. Modern protocols combine carefully designed primitives and metadata; composing algorithms yourself can introduce subtle flaws. Prefer well-reviewed libraries and standard protocols such as TLS rather than designing a custom cipher or handshake.

For example, encrypting a backup can keep its contents private, but you still need to know that the backup has not been altered. Authenticated encryption can provide both confidentiality and integrity for a message, while digital signatures let others verify origin using a public key. These mechanisms solve different trust problems.

Backend, frontend, and data engineers should understand the guarantees and limitations at the system boundary: what is protected, from whom, and for how long? Cryptography does not protect data after an authorized application decrypts it, prevent weak passwords, or save a key that has been exposed. Key generation, storage, access, rotation, and recovery are part of the design. See [symmetric encryption](/t/symmetric-encryption), [public-key cryptography](/t/public-key-cryptography), and [key management](/t/key-management).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
