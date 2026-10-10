---
title: "Post-Quantum Cryptography"
summary: "Algorithms designed to resist attacks from quantum computers."
levels: { backend: principal }
---

Post-quantum cryptography (PQC) refers to cryptographic algorithms designed to resist attacks from both classical computers and sufficiently capable quantum computers. It matters because encrypted data captured today may be stored and decrypted later if future capabilities or cryptographic advances weaken the algorithms protecting it.

The practical response is not to invent or casually swap algorithms. Standards and library support are evolving, and protocols may use hybrid key establishment that combines classical and post-quantum mechanisms during migration. Organizations should inventory where public-key cryptography is used, identify long-lived sensitive data and dependencies, and track the migration plans of their protocol and platform providers.

PQC does not mean every cryptographic primitive is equally threatened. The most immediate migration focus is commonly public-key key exchange and signatures; symmetric encryption and hashes have different considerations. Exact risk depends on algorithm, key size, data lifetime, and attacker capability, so avoid predictions about when a particular attack will become practical.

Backend teams should make crypto dependencies replaceable and understand certificate, client, and service compatibility. Frontend teams may inherit changes through browsers and TLS libraries; data engineers should consider retention periods for encrypted archives. Migration can increase message sizes and operational complexity. Follow current standards and maintained implementations rather than experimental code.

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.
