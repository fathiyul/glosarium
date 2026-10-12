---
title: "Onboarding Yourself"
summary: "Using code, docs and history to learn a new codebase."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["learning a codebase", "codebase onboarding"]
prereqs: ["learning-how-to-learn"]
related: ["engineering-journal", "learning-how-to-learn", "onboarding-yourself"]
---

Onboarding yourself means learning a codebase mostly on your own, using the code, the docs and the project's history, before you ask a question. Asking is still important, and you'll do it, but a few minutes of reading first makes your questions better and saves your colleagues' time.

Start with the outside of the project. Read the README and any setup notes, then get it running on your own machine. Next, find the entry point, such as the main route, the page or the job, and follow one real request through the code.

```sh
git log --oneline -20 -- src/billing/   # what changed recently, and why
git blame src/billing/invoice.py        # who last touched a line, and in which commit
```

History is often more useful than the code itself. A commit message or a pull request discussion can explain a decision that the code doesn't show.

The classic mistake is reading everything from the top, hoping it will make sense. Pick a small, real task, and learn the code it needs. Write notes as you go, as described in [keeping an engineering journal](/t/engineering-journal). When you do ask a colleague, say what you've already tried, so they can answer the actual question.
