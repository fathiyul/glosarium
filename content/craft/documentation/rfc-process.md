---
title: "RFC"
summary: "A request for comments: proposing a significant change for wide review."
levels: { backend: staff, frontend: staff, data-engineer: staff }
aliases: ["RFC", "request for comments", "design doc"]
prereqs: ["writing-clearly", "code-review"]
related: ["architecture-decision-record", "docs-as-code", "readme"]
---

An **RFC** (request for comments) is a written proposal for a significant change, circulated for review *before* anyone commits to building it. It's a design document with a lifecycle: draft, discuss, decide, and finally record the outcome. The discussion happens in writing, asynchronously, so many people can weigh in — and so the reasoning is captured instead of being lost in a meeting.

A typical RFC states the problem, the proposed approach, the alternatives considered, and the trade-offs. Reviewers comment; the author revises; someone with authority accepts or rejects it.

```text
problem → proposal → alternatives → trade-offs
        → comments (async) → decision → kept as a record
```

The value is twofold: better decisions (more perspectives, before irreversible work) and a durable record (future readers can see *why* a choice was made, not just what). It's especially useful for changes that are expensive to reverse — a data model, a public API, a new service boundary, a migration.

The classic mistakes:

- Writing it after deciding. If the decision is already made and the RFC is theatre, reviewers sense it and disengage. Use it genuinely to shape the decision.
- Making it a rubber-stamp. An RFC that's overwhelmingly approved with no real discussion either was trivial or wasn't reviewed. Encourage dissent explicitly.
- Letting it stall forever. Comment-and-revise can loop endlessly. Name a decision-maker and a deadline so it reaches a conclusion.
- Too heavyweight for small changes. Requiring an RFC for every minor change kills momentum; reserve it for significant, hard-to-reverse decisions.
- Not recording the outcome. An RFC that ends in a thread of comments with no decision section helps nobody later. Summarise the decision and its rationale.
- Confusing it with an ADR. An [architecture decision record](/t/architecture-decision-record) is a short record of a decision *made*; an RFC is the proposal and discussion that leads to it. They complement each other: RFC for the debate, ADR for the durable decision.

**When to use it:** for major design decisions that need broad buy-in or carry real risk. Keep it live (see [docs as code](/t/docs-as-code)), write it clearly (see [writing clearly](/t/writing-clearly)), and expect the best ones to change your mind. It's the written counterpart to [code review](/t/code-review), applied to design rather than diffs.
