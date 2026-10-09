---
title: "Technical Writing"
summary: "Writing clearly for other engineers."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["writing for engineers", "documentation writing", "clear writing"]
prereqs: ["markdown", "readme"]
related: ["readme", "writing-clearly", "design-doc", "docs-as-code", "diataxis", "explaining-to-non-engineers"]
---

Technical writing is writing that helps someone understand a system or do a task: READMEs, design docs, runbooks, API docs, pull request descriptions, incident reports. For engineers, it's one of the most valuable and underrated skills, because writing scales your knowledge to everyone who reads it.

## Principles

- **Know your reader.** What do they already know, and what are they trying to do? A tutorial for a new hire and a reference for an expert read very differently.
- **Lead with the point.** State the conclusion or the purpose first, then the detail.
- **Be concrete.** Prefer an example, a command or a number to an abstract statement.
- **Use plain words and short sentences.** Cut filler. Define terms the reader might not know.
- **One idea per paragraph.** Use headings and lists so people can scan.
- **Be accurate and current.** Test your instructions on a clean machine. Out-of-date docs mislead.
- **Show, don't only tell**: code blocks, diagrams, screenshots where they help.

```markdown
## Run the tests

    npm ci
    npm test

All tests should pass in under a minute. If `npm ci` fails, check that you're on Node 22 (`node -v`).
```

## Choosing the kind of doc

Different needs call for different documents ([Diátaxis](/t/diataxis)): tutorials (learn by doing), how-to guides (solve a specific task), reference (look things up) and explanation (understand why). Don't mix them in one page.

## Habits

- **Write it down when you learn it.** The newcomer's confusion is the best time to fix the docs.
- **Keep docs near the code** and update them in the same pull request ([docs as code](/t/docs-as-code)).
- **Get a review**, like code: ask someone to follow your steps.
- **Read it aloud** or leave it overnight, then trim.
- Use a consistent structure and tone in your team's templates ([design docs](/t/design-doc), [READMEs](/t/readme)).

Good writing is clear thinking made visible. When you can't explain it simply, you may not understand it yet.
