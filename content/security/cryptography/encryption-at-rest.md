---
title: "Encryption at Rest"
summary: "Encrypting stored data on disk."
levels: { backend: mid-level, data-engineer: mid-level }
---

Encryption at rest protects stored data by encrypting it on disk or in the storage layer, so someone who obtains raw media or certain backups cannot immediately read the contents. It is commonly provided by a database, filesystem, cloud storage service, or application, with details varying by platform.

It reduces exposure from lost devices, discarded disks, snapshots, and some infrastructure-level access. It does not stop an attacker who has compromised an application that is authorized to read the data; the application can usually request decryption. Access controls, audit trails, secure transport, and application-level protections still matter.

Decide what is encrypted, who controls the keys, how keys are rotated, and how backups and replicas inherit protection. If a key is stored beside the ciphertext with the same permissions, encryption may offer little separation. Conversely, losing the only decryption key can make data unrecoverable, so key backups and recovery procedures need protection and testing.

Backend developers should know whether encryption is transparent at the database or storage layer and whether specific sensitive fields need stronger protection. Data engineers should include extracts, staging areas, and exported files in the scope. Encryption can add operational work and sometimes affect performance, but it is not a substitute for limiting who can access data. See [key management](/t/key-management) and [envelope encryption](/t/envelope-encryption).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.
