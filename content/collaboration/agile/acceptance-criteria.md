---
title: "Acceptance Criteria"
summary: "The conditions a story must meet to be done."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["AC", "acceptance criteria for user stories", "story acceptance criteria", "done criteria for a story"]
prereqs: ["user-story"]
related: ["definition-of-done", "user-story", "given-when-then", "bdd", "definition-of-ready", "acceptance-test"]
core: [backend, frontend, data-engineer]
---

**Acceptance criteria** are the specific conditions a **single** piece of work (usually a [user story](/t/user-story)) must meet to be accepted
as done. They turn "reset password" into something you can build and verify without guessing.

> **Story:** As a user who forgot my password, I want to reset it by email, so that I can get back into my account.
>
> **Acceptance criteria:**
> - Given I enter a registered email, when I submit the form, then I receive a reset link within 1 minute.
> - The link works once and expires after 1 hour.
> - Given I enter an unregistered email, I see the same confirmation message (no account discovery).
> - The new password must meet the password rules, and I see why when it doesn't.
> - After a successful reset, all my existing sessions are logged out.

## What good criteria look like

- **Specific and testable.** Someone can say yes or no for each one. "Fast" and "easy to use" aren't criteria, and "the page responds within 500 ms at p95" is.
- **About behavior (what), not implementation (how).** "Link expires after 1 hour", not "use a Redis TTL".
- **Include the unhappy paths**: errors, empty states, permissions and edge cases ([given-when-then](/t/given-when-then) is a common
  format).
- **Agreed before work starts**, by the people who build it, test it and ask for it.
- **Short enough to fit a story.** Fifteen pages of criteria mean the story is too big.

## Why they matter

They give a shared definition of "this story is finished", prevent "that's not what I meant" at the end, guide what to test
([acceptance tests](/t/acceptance-test), [BDD](/t/bdd)), and help estimate.

## Don't confuse with the definition of done

Acceptance criteria differ for **each story**. The [definition of done](/t/definition-of-done) is a **team-wide checklist** that applies to **every**
story (code reviewed, tests pass, documentation updated, deployed). A story is done when it meets both.

When criteria are unclear, ask before coding. It's much cheaper than rewriting.
