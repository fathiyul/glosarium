---
title: "Stacked PRs"
summary: "A chain of dependent pull requests, each reviewable on its own."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["stacked PRs", "stacked pull requests", "PR stack"]
prereqs: ["pull-request", "branch"]
related: ["code-review", "rebase", "trunk-based-development", "force-push"]
---

**Stacked PRs** split a large change into a chain of small pull requests, where each one builds on the one below it. The first PR changes a base; the second stacks on top of it; the third on top of that. Each PR is small enough to review on its own, and they merge in order from the bottom up.

```text
main
 └── PR 1  (refactor: extract interface)      ← merge first
      └── PR 2  (add new implementation)      ← then this
           └── PR 3  (switch callers over)    ← then this
```

The motivation is reviewability. A single huge PR that touches everything is hard to read and slow to approve, so people either rubber-stamp it or stall. A stack keeps each step focused, and reviewers can see intent incrementally. It's a close cousin of [trunk-based development](/t/trunk-based-development) with many small changes.

The classic mistakes:

- **Ignoring that lower changes ripple up.** If a reviewer asks for a change in PR 1, PR 2 and PR 3 must be rebased on it. Rebase the whole stack, and expect to [force-push](/t/force-push) the upper branches (safely, since they're yours).
- **Merging out of order.** PR 2 can't merge before PR 1 or it'll contain PR 1's changes too. Land the bottom first.
- **Stacking too deep.** A ten-deep stack is as hard to manage as one giant PR. Keep stacks short.
- **Doing it by hand badly.** Manually rebasing a stack is error-prone; tooling exists that tracks the dependencies and rebases the chain for you. Use it rather than fighting branches.
- **Reviewer confusion.** Make clear which PR is the base and what each layer adds, or reviewers review the same base diff three times.

**When it's worth it:** when a change is naturally sequential (refactor → implement → switch) and you want to keep each step reviewable. When the change is genuinely independent, separate PRs are simpler. Stacks are a tool for large work that doesn't fit into one reasonable review.
