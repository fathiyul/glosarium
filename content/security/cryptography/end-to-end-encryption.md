---
title: "End-to-End Encryption"
summary: "Only the communicating users can read the data, not the server."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

End-to-end encryption (E2EE) means that the communicating endpoints encrypt and decrypt messages so the service relaying them cannot read the plaintext under the intended design. The provider may still see metadata such as who communicated and when, depending on the system.

E2EE shifts trust to client software and key management. If a device is compromised while a message is readable, encryption in transit does not protect it. If a user loses all keys and recovery material, data may be unrecoverable. Adding server-side search, moderation, backups, or multi-device sync can be difficult because those features often need access to content or additional key protocols.

Do not label a system end-to-end encrypted merely because its connection uses TLS or its database is encrypted at rest. Those controls protect different boundaries and usually leave the service able to access plaintext. A secure E2EE protocol also needs authenticated key exchange, identity verification, forward-security considerations, and safe implementation; use a reviewed protocol and library rather than designing one.

Backend developers may operate relays and encrypted storage without holding content keys. Frontend developers must protect local plaintext, key material, and recovery flows. Data engineers should recognize that encrypted payloads may be unavailable for ordinary warehouse processing. See [encryption at rest](/t/encryption-at-rest) and [key management](/t/key-management).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.
