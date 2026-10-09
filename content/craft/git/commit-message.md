---
title: "Commit Message"
summary: "A summary line plus a body explaining why a change was made."
levels: { backend: junior, frontend: junior }
aliases: ["git commit message", "commit messages", "commit subject"]
prereqs: ["commit"]
related: ["conventional-commits", "atomic-commit", "git-log", "pr-description", "squash"]
core: [backend, frontend]
---

A commit message explains a change to the person reading history later, which is often you
in six months, with no memory of why you did it.

The common format:

```
Reject expired password-reset tokens

Tokens were only checked for existence, so a link from last week
still worked. Compare expires_at against the current time and
return 400 for expired tokens.

Fixes #482
```

- **Subject line**: a short summary, around 50 characters. It's what `git log --oneline`
  and most tools show.
- **Blank line**, then an optional **body** explaining *what and why*, wrapped at a sensible
  width.
- Reference an issue number if there is one.

## Habits

- **Imperative mood** in the subject: "Add search", "Fix timeout", not "Added" or "Fixes".
  A common test: it should complete the sentence "If applied, this commit will ...".
- **Explain why, not just what.** The diff already shows *what* changed. The message is the
  only place to say *why*.
- **Be specific.** "Fix bug" and "updates" tell the reader nothing. "Fix off-by-one in page count" does.
- **One topic per commit**, so the message can describe it clearly (see
  [atomic commits](/t/atomic-commit)).

Many teams add a format on top, such as [Conventional Commits](/t/conventional-commits)
(`fix: reject expired tokens`). Follow your team's convention if there is one.

For a longer message, run `git commit` without `-m`; it opens your editor.
