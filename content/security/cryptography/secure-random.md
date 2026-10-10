---
title: "Secure Random Numbers"
summary: "Cryptographically secure randomness for tokens and keys."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Cryptographically secure random generation produces values that are difficult for an attacker to predict, even when they know previous outputs or other details of the system. Use it for session identifiers, reset tokens, nonces where required, and cryptographic keys. A general-purpose pseudo-random generator intended for simulations may be predictable and is not a substitute.

A common failure is deriving a token from a timestamp, sequential ID, username, or ordinary random function. Such values may look irregular but can be guessed. Use the platform's cryptographic random API or a library's secure token generator, and follow its guidance for appropriate size and encoding.

Randomness is only one part of security. A secure reset token still needs expiry, single-use behavior, account binding, and safe transport. A secure key still needs access control, storage, and rotation. Do not seed a cryptographic generator manually with a predictable value; operating systems and runtime libraries handle entropy collection.

Backend and frontend developers should choose APIs supported by their runtime and test that production environments provide them. Data engineers may need secure randomness for identifiers or sampling, but should distinguish security tokens from reproducible analytical samples. Avoid publishing sensitive random material in logs or URLs. See [password reset flow](/t/password-reset-flow) and [nonce / IV](/t/nonce-iv).

Treat the surrounding lifecycle as part of the cryptographic design: identify who can access key material, how it is backed up, and what happens when a key is rotated or suspected compromised. Test verification failures as carefully as successful operations. Keep formats and algorithms explicit so another service can interpret the data without guessing, and avoid logging plaintext or secrets during troubleshooting.

Backend developers should enforce this policy at the service boundary and test denied as well as allowed actions.
