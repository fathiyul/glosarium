---
title: "Reviewing AI-Generated Code"
summary: "Reading and testing AI output as critically as a stranger's PR."
levels: { backend: junior, frontend: junior }
aliases: ["AI code review", "reviewing AI output", "reviewing generated code", "verifying AI code"]
prereqs: ["code-review", "ai-coding-assistant"]
related: ["hallucination", "ai-learning-pitfalls", "ai-code-review", "self-review", "prompting-for-code"]
core: [backend, frontend]
---

Treat code written by an AI assistant like a pull request from a stranger who is fluent and
fast, sometimes wrong, and doesn't know your project. You're still responsible for it once
you commit it.

## Read it all

Don't accept what you haven't read. The diff is usually small enough to read line by line; if
it's not, ask for smaller steps.

## What to check

- **Does it run, and do the tests pass?** Then check that the tests really test something.
  Generated tests may assert whatever the code happens to do.
- **Do the things it calls exist?** Look for invented functions, methods or options, and for
  deprecated or version-mismatched APIs ([hallucination](/t/hallucination)). Check the official docs.
- **Does it solve the actual problem?** Confirm it didn't answer an easier question, or
  quietly change behavior elsewhere.
- **Edge cases and errors**: empty input, `None`, failures, large inputs.
- **Security**: SQL built from strings, unvalidated input, missing authorization checks,
  secrets in code, overly broad permissions.
- **Fit with your codebase**: your conventions, existing helpers (did it reinvent one?), your
  dependencies. It can't know unless it was told ([agent instructions](/t/agent-instructions-file)).
- **Unnecessary extras**: unrequested rewrites, new dependencies, dead code, over-engineering.
- **Licenses and sensitive data** if you paste code or data into a tool.

```python
# Plausible, but is `parse_iso` really a method of datetime?
dt = datetime.parse_iso(value)     # the real one is datetime.fromisoformat(value)
```

## Habits

- Ask for small changes, and review each before the next.
- Run it yourself. "It looks right" isn't verification.
- Ask the tool to explain parts you don't follow, then verify that against the docs.
- If you can't explain it in review, don't commit it.

Reviewers on your team will review it as *yours*. "The AI wrote that" isn't an answer to a
review comment. See also [self-review](/t/self-review).
