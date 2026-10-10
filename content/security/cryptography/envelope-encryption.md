---
title: "Envelope Encryption"
summary: "Encrypting data with a data key, then encrypting that key with a master key."
levels: { backend: senior, data-engineer: senior }
---

Envelope encryption encrypts data with a data-encryption key, then encrypts that key with a separate key-encryption key or master key. The encrypted data and wrapped data key can be stored together, while the master key remains under tighter control in a key-management system.

This arrangement avoids using one high-value master key directly for every data operation. It can support key rotation: rewrapping data keys under a new master key may avoid decrypting and re-encrypting all data, though the exact process depends on the service and format. It also creates dependencies: if the key service is unavailable or access is misconfigured, applications may be unable to read data.

Plan key identifiers, permissions, rotation, backups, and recovery. Keep ciphertext and wrapped keys associated unambiguously, and do not log plaintext keys. Encryption should include integrity protection, and each data key must be generated and used according to the selected algorithm's requirements.

Backend and data engineers should understand whether the storage platform manages envelopes automatically or expects application code to do so. Avoid building your own key hierarchy without a clear need. Test restoration of encrypted backups, because a backup is useless if its keys are lost or inaccessible. See [encryption at rest](/t/encryption-at-rest) and [key management](/t/key-management).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
