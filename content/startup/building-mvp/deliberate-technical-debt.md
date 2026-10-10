---
title: "Deliberate Technical Debt"
summary: "Taking shortcuts on purpose to learn faster, and keeping track of them."
levels: { tech-entrepreneur: mvp }
aliases: ["deliberate technical debt", "intentional tech debt", "strategic tech debt"]
prereqs: ["scope-cutting", "technical-debt"]
related: ["technical-debt", "startup-tech-stack", "iteration-speed", "managing-technical-debt"]
---

**Deliberate technical debt** is shortcutting on purpose — hardcoding, skipping tests, single-server deploys — to learn faster, with the debt *recorded* rather than accidental. The difference from ordinary mess is intent and a ledger: you know what you owe, why you borrowed, and what triggers repayment.

```text
deliberate:  "auth is a single table until 100 users — then proper roles" (written down)
accidental:  auth is a single table and nobody remembers deciding that
```

Pre-product-market fit, speed of learning beats code quality almost every time — most code will be deleted anyway when the product pivots. The debt becomes dangerous only when forgotten: unrecorded shortcuts compound silently until velocity collapses.

The classic mistakes:

- Debt with no ledger. "We'll fix it later" without writing what "it" is. Keep a visible debt list with triggers (user count, revenue, date) for each item.
- Borrowing against the wrong things. Skimp on UI polish, admin tools and scale — never on backups, security basics ([baseline](/t/startup-security-baseline)) or data integrity. Some debts bankrupt; most merely inconvenience.
- Repaying too early. Refactoring code that next month's pivot deletes is waste disguised as craftsmanship. Repay on triggers, not on guilt.
- Confusing deliberate with incompetent. Deliberate debt is a scoped trade by people who know the clean way. Skipping what you never learned is just a gap — learn it before deciding it is unnecessary.

**Manage it:** ledger with triggers, review monthly, repay when triggers hit or when velocity visibly suffers. See [managing technical debt](/t/managing-technical-debt) for the grown-up version of this discipline.
