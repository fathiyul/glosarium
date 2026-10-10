---
title: "Release Notes"
summary: "A user-facing explanation of what changed in a release."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["changelog", "release log"]
prereqs: ["release-branch"]
related: ["release-branch", "semantic-versioning", "breaking-change", "git-log"]
---

Release notes explain what changed in a release, written for the people who use the software: customers, operators and other developers. They describe what someone will notice, not every commit. A changelog is a closely related file, usually longer and more complete.

A useful entry groups changes by kind and says what the reader needs to do:

```
## 1.4.0

### Added
- Customers can save a card for next time.

### Fixed
- Checkout no longer fails for orders over $500.

### Breaking
- The `/v1/orders` endpoint now requires an `Idempotency-Key` header.
  Update clients before upgrading.
```

Put breaking changes first among the notes, with the action needed. A [breaking change](/t/breaking-change) that isn't flagged clearly is the most common reason an upgrade causes an outage.

The trade-off is effort against usefulness. Writing good notes takes time at release, and the temptation is to paste the commit log. Commit messages are written for developers reviewing code, so they rarely explain impact to a user. Automating the list of changes saves time, but someone still needs to rewrite the result for readers.

The classic mistake is publishing the raw `git log` as release notes. The reader has to work out what matters. Write each entry from the user's side, link to the relevant issue or pull request for detail, and keep the version number consistent with your [versioning scheme](/t/semantic-versioning).
