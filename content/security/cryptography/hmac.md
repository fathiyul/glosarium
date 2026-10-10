---
title: "HMAC"
summary: "A keyed hash proving a message came from someone holding the secret."
levels: { backend: mid-level, data-engineer: mid-level }
also: [api-design]
---

HMAC (Hash-based Message Authentication Code) combines a cryptographic hash with a shared secret key to authenticate a message and detect changes. A recipient who knows the same secret can recompute the code and compare it; someone without the secret should not be able to create a valid code.

HMAC is useful when two trusted systems share a key and need to verify webhook payloads, signed requests, or message integrity. It is not encryption: the message remains readable. It is also not a digital signature because every verifier holding the shared key can create a valid HMAC. If third parties need to verify without being able to sign, use a public-key signature instead.

Compute the code over a well-defined byte representation, include relevant context such as a timestamp or request path where the protocol calls for it, and compare using a constant-time library function. Ad hoc concatenation and inconsistent serialization can create ambiguity. Include replay protection separately when a valid message must only be accepted once.

Backend and data engineers should use a standard HMAC API, protect and rotate the shared key, and avoid logging it. Do not use a plain hash of a secret plus message as a substitute. See [cryptographic hash](/t/cryptographic-hash), [digital signatures](/t/digital-signature), and [API design](/t/api-design).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
