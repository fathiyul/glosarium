---
title: "Tokenization"
summary: "Replacing sensitive values with tokens that map back only through a secure vault."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["tokenization", "data tokenization", "vault tokenization", "tokenized data"]
prereqs: ["data-masking", "pii"]
related: ["data-masking", "anonymization", "hashing-vs-encryption", "key-management", "encryption-at-rest", "pii"]
---

Tokenization replaces a sensitive value, such as a card number or a national ID, with a surrogate token, and stores the mapping between token and real value in a separate, hardened vault. The token itself reveals nothing about the original; to reverse it you need access to the vault. Systems that handle tokenized data can process and join it without holding the sensitive value.

The classic mistake is storing the vault, or the mapping table, in the same database as the tokenized data, with the same access controls. That hands the real values back to anyone who can read the data, and the tokenization buys nothing. The whole point is that the mapping lives somewhere stricter than the data.

## Tokenization, encryption and hashing

The differences matter for compliance:

- Encryption is reversible with a key, and the ciphertext is a function of the plaintext. Format-preserving encryption can keep the original format.
- Tokenization replaces the value with an unrelated token; reversal is a lookup in the vault. Tokens can be random strings, or format-preserving so they fit columns sized for the original.
- Hashing is one-way and deterministic, which is useful for joins, but low-entropy values (phone numbers, national IDs) can be guessed and hashed by an attacker ([hashing vs encryption](/t/hashing-vs-encryption)).

Unlike [masking](/t/data-masking), which hides a value for display, tokenization keeps a working stand-in that systems can store and join on.

## How it is used

- Payment systems, where card data is tokenized so the rest of the estate never stores the primary account number.
- Sharing data with partners or analytics teams, who need to join records about the same person without seeing who that person is.
- Pseudonymisation under privacy law: a token is a pseudonym, and because re-identification is possible with the vault, the data usually remains personal data ([GDPR](/t/gdpr), [anonymization vs pseudonymization](/t/anonymization)).

## Trade-offs and cautions

**The vault is now critical.** It needs high availability, tight access control, auditing and [key management](/t/key-management) ([encryption at rest](/t/encryption-at-rest) protects it). If it is unavailable, de-tokenization fails.

**Referential integrity needs a stable mapping.** If the same input must always produce the same token (for joins), the tokenization has to be deterministic; random tokens need the vault for every lookup.

**Tokenize at the point of capture.** If raw values reach logs, caches, backups or exports first, the control is already defeated.

**It is not anonymization.** As long as the vault exists, re-identification is possible, so keep the data in scope for privacy and retention rules.

Vault lookups add latency and a dependency, so design bulk and cached paths where it matters.

Tokenization is strongest when combined with classification, least privilege and [data minimization](/t/data-minimization), so the real values are collected and kept as little as possible.
