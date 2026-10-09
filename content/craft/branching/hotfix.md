---
title: "Hotfix"
summary: "An urgent fix shipped outside the normal release cycle."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["hotfix branch", "emergency fix", "urgent fix"]
prereqs: ["branch", "deployment"]
related: ["rollback", "incident", "github-flow", "git-tag", "mitigate-first"]
also: [ci-cd, production-work]
---

A hotfix is an urgent fix for a serious problem in production, shipped outside the normal schedule. Think of a payment bug, a security hole, or an outage, where waiting for the next release costs too much.

## The usual flow

```sh
git switch main                      # or the release branch / tag that's in production
git pull
git switch -c hotfix/checkout-crash
# make the smallest change that fixes it, plus a test
git push -u origin hotfix/checkout-crash
# fast review, merge, deploy, tag
```

If the release branch has drifted from `main`, branch from the production tag, then apply the fix to both so it isn't lost in the next release.

## Principles

- **Fix only the problem.** No refactors, no extra features. A smaller change is easier to review and less risky.
- **Consider a rollback first.** If the last release caused it, rolling back is often faster and safer ([rollback](/t/rollback), [mitigate first](/t/mitigate-first)).
- **Still review and test**, but streamlined. A second pair of eyes catches mistakes made under pressure.
- **Add a regression test** so it can't return ([regression tests](/t/regression-test)).
- **Deploy carefully and watch**: check error rates after release.
- **Port it everywhere**: merge the fix back into `main` (and any other maintained branches).
- **Tag the release** ([tags](/t/git-tag)).
- **Communicate**: tell stakeholders, and follow up with a [postmortem](/t/postmortem) if it was an incident.

## Cautions

- Hotfixes done in a rush create their own bugs. If the process is too fast, it's a risk.
- If you have many hotfixes, the real problem is upstream: testing, release process or review.
- A good deployment pipeline makes hotfixes boring, since the same path works at any speed ([continuous delivery](/t/continuous-delivery)).
