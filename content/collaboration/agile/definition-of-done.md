---
title: "Definition of Done"
summary: "The team's checklist for when work is truly finished."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["DoD", "Definition of Done checklist", "done criteria", "team done checklist"]
prereqs: ["acceptance-criteria"]
related: ["acceptance-criteria", "definition-of-ready", "code-review", "continuous-integration", "user-story", "sprint-review"]
core: [backend, frontend, data-engineer]
---

The **definition of done** (DoD) is a shared checklist the team agrees on for when any piece of work counts as **finished**. It prevents the
"it works on my machine, it's basically done" situation.

An example checklist:

- [ ] Code is written and **reviewed** (approved [pull request](/t/pull-request)).
- [ ] **Tests** are added or updated, and the whole suite passes in CI ([continuous integration](/t/continuous-integration)).
- [ ] The acceptance criteria are met ([acceptance criteria](/t/acceptance-criteria)).
- [ ] No new lint or security warnings.
- [ ] **Documentation** updated (README, API docs, changelog).
- [ ] Deployed to staging and **checked** there.
- [ ] **Monitoring and alerts** in place for anything new that could fail.
- [ ] Feature flags, migrations and config are set up.
- [ ] The product owner has **seen it** working.

## Acceptance criteria vs definition of done

| | Acceptance criteria | Definition of done |
|---|---|---|
| Scope | One story | Every story |
| Says | *What* this feature must do | *How* we ensure the work is complete and releasable |
| Example | "Reset link expires in 1 hour" | "Reviewed, tested, documented, deployed" |

A story is done only when it satisfies both.

## Why teams use one

- **Consistent quality**, with the same bar for everyone, regardless of who did the work.
- **No hidden work.** Without it, "done" stories quietly accumulate untested, undocumented, undeployed leftovers (technical debt, see
  [technical debt](/t/technical-debt)).
- **A shared language** in planning and reviews ([sprint review](/t/sprint-review)).

## Making it work

- **Write it together** as a team, and keep it short enough to be used.
- **Make items verifiable**, not aspirational ("good quality").
- **Apply it honestly.** Calling something "done" with unfinished items just moves the work somewhere less visible.
- **Revisit it** in retrospectives, and tighten it as the team matures. Add automation (CI checks) so that much of it doesn't depend on memory.
- Don't confuse it with the [definition of ready](/t/definition-of-ready), which is about whether a story is clear enough to *start*.
