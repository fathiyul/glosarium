---
title: "PR Description"
summary: "Explaining what changed, why, and how to test it."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["pull request description", "PR template", "PR body"]
prereqs: ["pull-request"]
related: ["commit-message", "code-review", "small-prs", "self-review", "draft-pr"]
core: [backend, frontend, data-engineer]
---

The description is the first thing a reviewer reads. A good one saves them from reverse
engineering your intent from the diff.

A simple structure that works:

```markdown
## What
Add a rate limit of 5 attempts per minute to POST /login.

## Why
Credential-stuffing attempts were hitting the endpoint (see #512).

## How
Counter in Redis keyed by IP + username; returns 429 with Retry-After.

## Testing
- New unit tests for the limiter.
- Manually: 6 wrong passwords in a row → 429 on the sixth.

## Notes
Limits are in config; not tuned for mobile NAT yet.
```

## What to include

- **What changed and why**, in plain words. The title should say it in one line.
- **Link to the issue or ticket** so the context is one click away.
- **How you tested it**, and how the reviewer can.
- **Screenshots or a short recording** for UI changes (before and after).
- **Anything risky or unfinished**: migrations, config changes, areas where you want
  extra scrutiny.

## Habits

- Write it for someone who hasn't seen the ticket.
- Keep it updated if the PR changes during review.
- If you can't explain the change briefly, the PR may be [too big](/t/small-prs).
- Use [draft PRs](/t/draft-pr) for work in progress.

Many repositories provide a PR template; fill every section instead of deleting them.
