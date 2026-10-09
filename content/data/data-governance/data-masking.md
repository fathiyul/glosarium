---
title: "Data Masking"
summary: "Hiding sensitive values while keeping data usable."
levels: { data-engineer: mid-level }
aliases: ["masking", "PII masking", "dynamic data masking", "static data masking", "obfuscation"]
prereqs: ["pii", "data-classification"]
related: ["anonymization", "tokenization-privacy", "column-level-security", "data-classification", "pii", "data-minimization"]
core: [data-engineer]
---

**Data masking** means **hiding or altering sensitive values while keeping the data usable**, so people and systems that don't need the real values never see them. It's one of the main controls for protecting personal and confidential data in analytics, test environments and support tools.

```
Original:   Ana Putri | ana.putri@example.com | 4111 1111 1111 1111 | 1990-03-14
Masked:     A*** P*** | a***@example.com      | **** **** **** 1111 | 1990-**-**
```

## Common techniques

| Technique | What it does | Example |
|---|---|---|
| **Redaction / nulling** | Removes the value | `NULL` |
| **Partial masking** | Shows only part | Last 4 digits of a card |
| **Substitution** | Replaces with realistic fake values | A random but plausible name |
| **Hashing** | Replaces with a one-way hash, keeping equal values equal (so joins and counts still work) | `SHA-256(salt + email)` |
| **Tokenization** | Replaces with a token, with the real value stored in a secure vault ([tokenization](/t/tokenization-privacy)) | `tok_8f3a2c` |
| **Generalization** | Reduces precision | Exact age → age band, birthday → year |
| **Shuffling** | Moves real values among rows | Break the link to the person |

## Static vs dynamic

- **Static masking** creates a **masked copy** of the data, such as a test or development database, or a dataset for analysts. The sensitive values never leave production.
- **Dynamic masking** applies masks **at query time** based on who is asking: an analyst sees `a***@example.com`, while an authorized support agent sees the full email ([column-level security](/t/column-level-security)).

## Where it's used

- **Development and test data**: use masked or synthetic data, never raw production copies ([dev and prod environments](/t/dev-prod-data-environments)).
- **Analytics** where individuals' identities aren't needed ([data minimization](/t/data-minimization)).
- **Sharing** data with partners or vendors.
- **Support and operations tools** that need partial visibility.

## Things to get right

- **Mask consistently**, in every system where the data lands: warehouse, lake, backups, logs, exports. One forgotten copy defeats the control.
- **Preserve what the use case needs**: formats (so validation still works), referential integrity (the same person masks to the same token everywhere), and distributions.
- **Hashing isn't anonymization.** Low-entropy values (emails, phone numbers, national IDs) can often be reversed by guessing and hashing candidates. Use salted or keyed hashing, tokenization, or true anonymization where the risk requires it ([anonymization](/t/anonymization)).
- **Re-identification risk**: combinations of "harmless" fields (postcode, birth date, gender) can identify people.
- **Classify first**: you can't mask what you haven't found ([data classification](/t/data-classification), [PII](/t/pii)).
- **Control access to unmasked data**, and log it.

Masking reduces exposure. It doesn't replace access control, minimization and retention limits.
