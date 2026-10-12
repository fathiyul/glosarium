---
title: "AI-Assisted Code Review"
summary: "Using AI reviewers as a first pass, not a replacement for human review."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["AI code review", "automated review"]
prereqs: ["pull-request"]
related: ["pull-request", "review-turnaround", "codeowners", "prompt-injection"]
---

AI-assisted code review means using a language model to read a change and comment on it before, or alongside, a human reviewer. It's useful as a first pass: it can point out an unused variable, a missing null check, an unclear name, or a test that doesn't cover the error path.

It can also be wrong in both directions. It can miss a real bug, and it can invent a problem that isn't there, such as a function that looks unsafe but is only ever called with safe input. Its comments read with the same confidence whether they're right or not, so a comment is a claim to check, not a fact.

```
AI comment:  "This query is vulnerable to SQL injection."
Reviewer:    The value is an integer from our own enum. Not exploitable here.
             Suggest a comment explaining why, so the next reviewer doesn't ask.
```

The trade-off is speed against trust. An automated first pass gives the author feedback in minutes rather than hours, which helps [review turnaround](/t/review-turnaround). But it's easy to lean on it too much, and a silent AI reviewer is not the same as a reviewed change.

The classic mistake is treating "the AI found nothing" as approval. A human still owns the decision, especially for security, data handling and behaviour changes. Keep the human review as the required step, and avoid sending confidential code or secrets to a tool your team hasn't approved for that data.
