---
title: "Key Management (KMS)"
summary: "Generating, storing, rotating and controlling access to keys."
levels: { backend: senior, data-engineer: senior }
---

Key management covers how cryptographic keys are created, stored, accessed, rotated, revoked, backed up, and eventually destroyed. Strong algorithms cannot protect data if keys are easy to steal, broadly available, or lost without recovery.

Separate key use from key administration where practical. A service may be allowed to request encryption or decryption without being allowed to export the key itself. Limit which identities can use each key, log sensitive operations, and review permissions as services change. Hardware-backed or managed key systems can reduce some risks, but they add availability, cost, and provider dependencies.

Rotation is not simply generating a new key: determine whether old ciphertext must be re-encrypted or can be accessed through a versioned key, how long old keys remain available, and how revocation affects backups. Keep recovery procedures protected and test them; deleting a key may make retained data permanently unreadable.

Backend and data engineers should inventory keys and owners, classify the data each key protects, and include disaster recovery in the plan. Avoid embedding secrets in source code, container images, or logs. There is no universal rotation interval; set it according to risk, exposure, policy, and the cryptographic system. See [secret rotation](/t/secret-rotation) and [envelope encryption](/t/envelope-encryption).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
