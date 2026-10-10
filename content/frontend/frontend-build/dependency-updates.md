---
title: "Keeping Dependencies Updated"
summary: "Upgrading regularly, with tools like Dependabot or Renovate."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["dependency updates", "keeping dependencies updated", "updates"]
prereqs: ["npm-pnpm-yarn", "semantic-versioning"]
related: ["peer-dependency", "semantic-versioning", "supply-chain-security"]
---

**Keeping dependencies updated** balances security and feature freshness against breakage risk: a cadence (weekly minor/patch batches, deliberate majors), automation (renovate/dependabot PRs with CI verdicts), and policy (pinning, ranges, lockfiles) that keeps updates flowing instead of accumulating into terrifying leaps.

```text
weekly: automerge green patches/minors → monthly: review grouped updates
quarterly: plan majors (codemods, migration windows)
```

Stale dependencies compound: security holes unpatched, majors piling into one big-bang migration, ecosystem drift making every update an expedition. Small continuous updates are cheaper than rare heroic ones — the same logic as small deploys.

The classic mistakes:

- Pinning everything forever. Frozen versions feel safe while vulnerabilities and incompatibilities accumulate silently. Pin strategically (lockfiles pin; manifests range).
- Automerge without CI teeth. Auto-merging updates on weak test suites ships breakage automatically. Automation needs tests that actually verify; otherwise review manually.
- Major-update pileup. Skipping majors for years turns each into a rewrite (React 15→19 in one jump). Budget majors continuously; migrate incrementally.
- Ignoring transitive updates. Direct deps current while transitive vulnerable copies linger. Audit the tree (`npm audit`, lockfile review), not just package.json.
- No rollback story. An update breaking production needs instant revert (redeploy previous lockfile), not forward-fix panic. Lockfiles versioned; deploys repeatable.
- Changelog blindness. Merging without reading breaking-change notes misses migration steps. Majors get changelog review; minors get CI verdicts.
- Update theatre. Bumping versions without running the app's actual flows verifies nothing. Updates validate through real test suites and smoke checks.

**The cadence:** automate the small (patches/minors with CI), schedule the big (majors with migration plans), pin with lockfiles, review transitives. Freshness as habit, not heroics.
