---
title: "Digital Signature"
summary: "Proving who created data and that it hasn't been changed."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

A digital signature lets a verifier check that data was signed by someone holding a particular private key and that the signed data has not changed since. The signer uses a private key; verifiers use the corresponding public key. A signature does not usually hide the data, and it does not prove a real-world identity unless the public key is trusted and bound to that identity.

Signatures are useful for software releases, signed tokens, and messages that need verification across organizational boundaries. The verifier must check more than “signature valid”: it should trust the right key, understand what exact bytes or structured fields were signed, and apply expiry or revocation rules where relevant. Canonicalization and encoding differences can otherwise make two parties interpret signed content differently.

Do not use a signature where shared-secret authentication is simpler and appropriate, and do not implement signing primitives yourself. Use a standard library and protocol. Protect private keys; if a signing key is stolen, an attacker can create apparently valid signatures until verifiers stop trusting it.

Backend, frontend, and data engineers may verify signed artifacts or tokens, but key distribution is part of the threat model. A valid signature proves possession of a key, not that the signed statement is true or safe. See [public-key cryptography](/t/public-key-cryptography), [JWT signing algorithms](/t/jwt-signing-algorithms), and [HMAC](/t/hmac).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.

Frontend developers should make the user flow clear without treating browser-side checks as a security control.
