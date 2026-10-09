---
title: "Nits"
summary: "Minor, optional review comments, labeled so they don't block."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["nit", "nitpick", "nits in code review", "nit comments"]
prereqs: ["code-review"]
related: ["giving-code-review", "receiving-code-review", "approve-request-changes", "code-style-consistency", "formatter"]
---

A "nit" is a minor, optional comment in a code review, usually about style or preference, and it's labeled `nit:` so the author knows it shouldn't block the merge.

```
nit: could rename `d` to `delay` for clarity.
nit: stray blank line here.
nit (non-blocking): this comment is out of date.
```

## Why label them

Without the label, every comment looks like a requirement. The author can't tell "this will crash on empty input" from "I'd have named it differently", so they spend time on both, or feel the review dragging on. The word `nit:` says: *take it or leave it*.

## For reviewers

- **Use sparingly.** A review full of nits buries the important points. If you have only nits, say the PR is fine.
- **Don't nitpick what tools can check.** Formatting, import order and quote style belong to a [formatter](/t/formatter) and [linter](/t/linter), not people.
- **Separate must-fix from preference** ([approve vs request changes](/t/approve-request-changes)). Approve with nits attached.
- **Be kind about wording**, and offer a suggestion when you can (GitHub's suggestion blocks let the author accept it in a click).
- **Don't re-litigate settled style.** Follow the team's conventions ([code style consistency](/t/code-style-consistency)).

## For authors

- Fix the quick ones. They cost you a minute and improve the code.
- It's fine to **decline** with a short reason, or say "will do in a follow-up".
- Don't take them personally ([receiving code review](/t/receiving-code-review)).
- If you see the same nit often, fix the habit, or ask for a lint rule.

Related prefixes some teams use: `question:`, `suggestion:`, `blocking:`, `praise:`. See [giving code review](/t/giving-code-review).
