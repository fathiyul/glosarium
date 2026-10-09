---
title: "Secrets in Git"
summary: "Why passwords and keys must never be committed, and what to do when one is."
levels: { backend: junior, frontend: junior }
aliases: ["committed secrets", "leaked credentials in git", "API key in repo", "hardcoded secrets"]
prereqs: ["git", "credential"]
related: ["removing-secrets-from-history", "gitignore", "secrets-management", "secret-rotation", "environment-variable", "ci-secrets"]
core: [backend, frontend]
---

A **secret** is anything that grants access: passwords, API keys, tokens, private keys, database URLs with credentials.
**Never commit them to Git.** Not in a private repo, not "just for now", not in a file you plan to delete.

## Why this goes wrong so badly

- **Git remembers everything.** Deleting the file in a later commit doesn't remove it from history. Anyone with the repo
  (or a clone from last month) can read it.
- **Repos get shared.** Private repos become public, are cloned to laptops, forked, pasted into tickets and
  given to contractors.
- **Attackers scan.** Automated bots watch public code hosting for new commits containing keys, and exploitation can
  start within minutes of a push. Treat a public leak as an immediate compromise.

```python
# never
STRIPE_KEY = "sk_live_51H..."
db_url = "postgres://admin:hunter2@prod-db/app"
```

## What to do instead

- Read secrets from the **environment** or a **secrets manager** at runtime
  ([environment variables](/t/environment-variable), [secrets management](/t/secrets-management)).
- Add `.env` and key files to **`.gitignore` from the start** ([.gitignore](/t/gitignore)). Commit a `.env.example` with fake values.
- Use **separate secrets per environment**, so a leaked development key can't touch production.
- In CI, use the platform's encrypted secrets ([CI secrets](/t/ci-secrets)).
- Add a **secret scanner** as a pre-commit hook and in CI (tools like gitleaks and the secret scanning built into
  code hosts catch common key formats).

## If one gets committed

1. **Revoke or rotate the secret immediately.** This is the step that actually fixes it ([secret rotation](/t/secret-rotation)).
   Assume it's compromised, even if you removed it a minute later.
2. **Check for misuse**: look at the provider's access logs and billing.
3. **Then** clean up: remove it from history if you want to (rewriting history is disruptive, see
   [removing secrets from history](/t/removing-secrets-from-history)), and tell your team.
4. **Find out how it happened** and add a guard so it can't again.

Deleting a leaked secret from Git without rotating it only hides the evidence. The key still works.
