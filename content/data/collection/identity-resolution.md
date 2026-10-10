---
title: "Identity Resolution"
summary: "Stitching anonymous visitors, devices and accounts into one person."
levels: { data-engineer: senior }
aliases: ["ID resolution", "identity stitching", "customer identity resolution"]
prereqs: ["analytics-event-tracking", "pii"]
related: ["identity-architecture", "build-vs-buy-identity", "customer-data-platform", "sessionization", "master-data-management", "data-governance"]
---

Identity resolution is the work of deciding which records across devices, sessions, accounts and systems refer to the same person or entity, then linking them into one identity. It combines anonymous identifiers, such as cookies and device ids, with known identifiers, such as email, phone and login id, into a single view.

A typical flow: an anonymous visitor gets a cookie; when they log in, the cookie is linked to a user id; the same person later appears on a second device, and that device is linked too. The result is a graph of identifiers, where connected components are identities.

The classic mistake is trusting the match. Merge too eagerly and two people who share a family computer or a work laptop become one profile, polluting every metric and campaign. Merge too little and one person looks like three, so counts and attribution are wrong. Both errors are hard to unwind later.

## How matching works

- Deterministic matching links records on an exact shared key, such as the same email, login or order. It is precise but only covers users who identify themselves.
- Probabilistic matching links records on weaker signals, such as a shared device, similar attributes or timing. It covers more but is wrong sometimes, so it needs a confidence threshold and a review path.

## Why it is a senior concern

- It changes what your numbers mean, so the rules must be documented and consistent across systems.
- It handles personal data, so it needs [consent](/t/consent-at-collection), a lawful basis and [governance](/t/data-governance).
- Wrong merges are a data-quality and privacy incident, not just a bug. Keep the identifier map auditable and support splitting an identity.
- You can build it or buy it; CDPs and identity vendors offer it, with the usual [trade-offs](/t/build-vs-buy-identity).

Start from the questions you need to answer and the identifiers you are allowed to use. See [identity architecture](/t/identity-architecture), [sessionization](/t/sessionization) and [master data management](/t/master-data-management).
