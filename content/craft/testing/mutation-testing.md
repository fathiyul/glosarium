---
title: "Mutation Testing"
summary: "Changing code on purpose to check that the tests notice."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["mutation testing", "mutation test", "mutant"]
prereqs: ["test-coverage", "unit-test"]
related: ["tdd", "regression-test", "flaky-test", "testing-trophy"]
---

**Mutation testing** measures how good your tests are by deliberately breaking the code and checking whether the tests fail. The tool makes small "mutations" — flips a `<` to `<=`, changes `+` to `-`, removes a call, replaces a return value — and runs the tests. If a mutation survives (tests still pass), your tests didn't actually check that behaviour.

The result is a **mutation score**: the share of mutants your tests killed. It's a far stronger signal than line coverage, because it asks whether tests would *catch a real bug*, not merely whether they executed the line.

```text
original: if (score >= 60) pass()
mutant:   if (score > 60)  pass()   → only caught by a test at score == 60
mutant:   if (true)        pass()   → caught by any failing-score test
```

The classic mistakes:

- Chasing a perfect score. Some mutants are **equivalent** — they change the code without changing behaviour — so they *can't* be killed. 100% is often impossible; aim to raise the score and investigate survivors.
- Confusing coverage with quality. A line can be 100% covered and utterly unasserted. Mutation testing exposes that gap, which is exactly why it's worth the extra cost over coverage alone.
- Running it everywhere, all the time. Mutation testing is slow — every mutant means a test run — so it's expensive to run on a whole codebase constantly. Scope it to critical modules or run it periodically, not on every commit.
- Ignoring survivors. A surviving mutant in payment logic is a real warning: a bug there might slip through. Read what survived and add the missing assertion.
- Chasing numbers for management. Like all metrics, a mutation score used as a target gets gamed by writing tests that kill mutants without testing meaning.

**When to use it:** on the code where a missed bug is costly and the logic is complex — pricing, permissions, state machines. It tells you where your tests are decorative, which is more useful than another coverage percentage. It pairs naturally with [test-driven development](/t/tdd) (which tends to produce mutation-resistant tests) and helps spot [flaky tests](/t/flaky-test) that pass for the wrong reasons.
