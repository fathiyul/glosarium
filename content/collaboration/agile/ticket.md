---
title: "Ticket / Issue"
summary: "A tracked unit of work in Jira, Linear or GitHub Issues."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["issue", "task ticket", "Jira ticket", "GitHub issue", "work item", "story ticket"]
prereqs: ["backlog"]
related: ["user-story", "bug-report", "acceptance-criteria", "clarifying-tickets", "breaking-down-tasks", "triage"]
core: [backend, frontend, data-engineer]
---

A **ticket** (also called an *issue* or *work item*) is a tracked unit of work in a tool such as Jira, Linear, GitHub Issues or Azure DevOps. It
could be a feature, a bug, a chore or a question. It gives the work a name, an owner and a status that everyone can see.

A useful ticket contains:

- **A clear title** that says the outcome: "Reset-password email not sent for addresses with a plus sign".
- **Context**: why this matters, who asked, links to designs, conversations or related tickets.
- **What "done" means** ([acceptance criteria](/t/acceptance-criteria)).
- **For bugs**: steps to reproduce, expected vs actual behavior ([bug reports](/t/bug-report)).
- **Ownership and status**: assignee, and where it is (to do, in progress, in review, done).

```
Title: Show error when file upload exceeds 10 MB
Why: Users see an endless spinner; support got 14 complaints this month.
Done when:
 - Files over 10 MB are rejected before upload with "File is too large (max 10 MB)".
 - Server also rejects with 413 if the check is bypassed.
 - Covered by a test.
```

## How you'll use them

- **Pick up** work from the [backlog](/t/backlog), and move the ticket's status as you go, so the team sees reality.
- **Link everything**: put the ticket ID in your branch name, commit messages and pull request, so code and context stay connected.
- **Add notes as you learn.** What you tried, what you decided, and why. Future you will be grateful.
- **Ask in the ticket** when something's unclear ([clarifying tickets](/t/clarifying-tickets)), so the answer is recorded.
- **Split** tickets that are too big ([breaking down tasks](/t/breaking-down-tasks)).
- **Close the loop**: note how it was solved, and update the ticket when scope changes.

## Pitfalls

- **Vague tickets** ("Improve performance") that nobody can finish or verify.
- **Stale tickets** that no longer reflect reality. Tidy the board ([triage](/t/triage)).
- **Treating the ticket as the whole truth.** It's a starting point for a conversation, not a substitute for talking to people.
