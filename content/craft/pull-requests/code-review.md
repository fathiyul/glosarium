---
title: "Code Review"
summary: "Teammates reading your change to catch bugs and share knowledge."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["code reviews", "peer review", "reviewing code"]
prereqs: ["pull-request"]
related: ["giving-code-review", "receiving-code-review", "self-review", "small-prs", "pr-description"]
core: [backend, frontend, data-engineer]
---

In **code review**, a teammate reads your change before it's merged. The aim is to catch bugs,
keep the code understandable and spread knowledge about how the system works.

On most teams it happens in a [pull request](/t/pull-request): reviewers read the diff, leave
comments on specific lines and either approve or ask for changes.

## What reviewers look for

- **Correctness**: does it do what it should, including edge cases and errors?
- **Tests**: is the new behavior covered?
- **Readability**: can someone else understand it in a few months?
- **Design**: does it fit the code around it, or add needless complexity?
- **Risk**: security, data loss, performance on large inputs.

Style details that a formatter or linter can check shouldn't need a person.

## As the author

- Keep changes [small](/t/small-prs). Huge diffs get skimmed, not reviewed.
- Explain the *why* in the [PR description](/t/pr-description).
- [Read your own diff first](/t/self-review).
- Respond to every comment, and see [receiving code review](/t/receiving-code-review).

## As a reviewer

- Be kind and specific. Comment on the code, not the person.
- Ask questions when something is unclear instead of assuming a mistake.
- Separate must-fix issues from optional suggestions ("nit: ...").
- Respond promptly. A change waiting days costs the whole team.

Juniors should review too. You can't be wrong by asking "why is this done this way?", and
reading other people's code is one of the fastest ways to learn. See
[giving code review](/t/giving-code-review).
