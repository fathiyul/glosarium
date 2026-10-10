---
title: "Signed Commits"
summary: "Cryptographically proving who authored a commit."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["GPG signing", "commit signing", "verified commits"]
prereqs: ["commit"]
related: ["removing-secrets-from-history", "git-hooks", "rewriting-history"]
---

A signed commit carries a cryptographic signature made with a private key. Anyone with the matching public key can check that the commit was signed by that key, and that the commit wasn't changed afterwards. Git supports signing with GPG keys, and recent versions can also sign with SSH keys, depending on your configuration.

```sh
git commit -S -m "fix retry logic"   # sign this commit with your configured key
git log --show-signature -1          # show the signature and whether it verified
```

Hosting services can show a "verified" badge for commits whose signatures match a key registered to the account. The check only tells you which key signed the commit, not whether the code is correct or the person was who they claim to be.

The trade-off is key management. Signing adds setup on each machine, and a lost or stolen key lets someone sign as you until you revoke it. Teams often require signing only for protected branches, where the stakes are highest.

The classic mistake is treating a signature as proof of identity or of safe code. A signature proves possession of a key, and anyone who obtains that key can sign anything. Keep private keys protected, rotate them when someone leaves or a device is lost, and keep review and [CI checks](/t/continuous-integration) as the real safeguards for what gets merged.
