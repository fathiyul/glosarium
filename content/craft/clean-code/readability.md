---
title: "Readability"
summary: "Code is read far more often than it's written."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["code readability", "readable code"]
prereqs: ["naming"]
related: ["clean-code", "naming", "code-style-consistency", "comment", "kiss", "code-review"]
core: [backend, frontend, data-engineer]
---

Code is read far more often than it's written: by teammates, by reviewers and by you in six
months. Making it easy to read is one of the best investments in a codebase.

Readable code lets the reader understand *what it does* and *why* without needing to run it or
ask the author.

## What helps

**Names that say what things are** ([naming](/t/naming)):

```python
# Hard
if u.s == 2 and d > 30:
    ...

# Clear
if user.status == Status.SUSPENDED and days_suspended > MAX_SUSPENSION_DAYS:
    ...
```

**Short, focused functions.** If you need a comment to mark sections inside a function, those
sections are probably functions with names.

**Flat structure.** Use [guard clauses](/t/guard-clause) instead of deep nesting.

**No magic values.** Put `86400` and `3` into named constants (see
[magic numbers](/t/magic-number)).

**Consistent formatting.** Let a [formatter](/t/formatter) handle it so nobody argues about style.

**Comments for the why.** Explain decisions and surprises the code can't, such as "the API
returns dates in local time, so we convert here". Don't narrate the obvious ([comments](/t/comment)).

## How to tell

Read your code the next day, or ask a teammate to explain what a piece does without
telling them first. Reviews are the best readability test: if a reviewer asks "what does this
do?", rewrite the code (or add a comment) instead of just replying in the thread.

Readability isn't about being verbose. A short function with clear names beats a long one,
and a long clear function beats a short cryptic one.
