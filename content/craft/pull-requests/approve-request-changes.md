---
title: "Approve vs Request Changes"
summary: "The review states and what each one signals."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["approve", "request changes", "review states"]
prereqs: ["code-review", "pull-request"]
related: ["code-review", "giving-code-review", "review-comment-nits", "protected-branch", "receiving-code-review"]
---

When you finish reviewing a pull request, you submit it with one of three verdicts. Each tells the author something different.

| Verdict | Meaning |
|---|---|
| **Comment** | I have thoughts or questions, but I'm not approving or blocking |
| **Approve** | I'm happy for this to merge (perhaps after small optional fixes) |
| **Request changes** | I found problems that must be fixed before this can merge |

## Choosing

- **Request changes** for real problems: bugs, security issues, missing tests for risky logic, a design that won't work. Say clearly what must change.
- **Approve with comments** when remaining points are minor or optional ([nits](/t/review-comment-nits)). Trust the author to handle them, and don't make them wait for another round.
- **Comment** when you've only partly reviewed, have questions, or aren't the person who should decide.

```
Approve: "LGTM. One nit on naming, no need to block on it."
Request changes: "This query runs per item and will time out on large orders. Please batch it (see line 42)."
```

## Habits

- **Be explicit** about what's blocking and what's optional.
- **Don't hold approval for personal preference.** If it's correct and fits the codebase, approve.
- **Don't approve without reading.** A rubber stamp helps nobody ([giving code review](/t/giving-code-review)).
- **Re-review promptly** after changes, so the PR doesn't stall.
- Many teams protect `main` with a required number of approvals, and new commits can dismiss earlier ones ([protected branches](/t/protected-branch)).
- As the author, treat "request changes" as feedback on the code, not you ([receiving code review](/t/receiving-code-review)).
