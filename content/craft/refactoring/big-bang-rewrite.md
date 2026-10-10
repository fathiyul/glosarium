---
title: "Big Bang Rewrite"
summary: "Replacing a whole system at once, and why it usually fails."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["big bang rewrite", "full rewrite", "rewrite from scratch"]
prereqs: ["refactoring", "legacy-code"]
related: ["strangler-fig", "technical-debt", "microservices"]
---

A **big bang rewrite** throws away an existing system and builds a replacement **from scratch**, switching over all at once when the new one is "done". It's the most tempting response to a legacy system — the old code is messy, the new one will be clean — and one of the most reliably disappointing.

Why it tends to fail:

- The old system keeps changing. While you rebuild, requirements, fixes and features continue to land in the old code. The new system chases a moving target and is often out of date before it ships.
- The knowledge is missing. The legacy system encodes years of accumulated edge cases and business rules, many undocumented. "Clean" rewrites quietly drop them, and the bugs surface after launch.
- No feedback until the end. You don't find out whether the new system works until you switch over — when it's most expensive to be wrong. All the integration risk is concentrated at the deadline.
- The end is far away. Big rewrites run long, morale dips, leadership changes, and the project is cancelled or shipped half-finished.

```text
big bang:  build new (long, silent) → switch everything → find all bugs at once
strangler: route piece → verify → route next → old shrinks, always working
```

The classic mistakes:

- Rewriting to avoid understanding. "The old code is bad" is often "we don't understand the old code". A rewrite without understanding re-creates the same problems, or worse.
- Treating "clean" as the requirement. Users need the behaviour, not the tidiness. Preserving behaviour is the hard part; new code doesn't automatically preserve it.
- No parallel run. A big bang skips the side-by-side comparison that would catch behavioural differences.
- Confusing it with a necessary replatform. Sometimes you truly must move (a dead vendor, an unsupported runtime) — but even then, incremental migration beats a single switch where possible.

The alternative is the [strangler fig](/t/strangler-fig): route pieces of traffic to new code, verify, and retire the old incrementally, so both systems run and you learn continuously. It's slower-looking and far safer. Big bang rewrites occasionally work, but they're a high-risk bet against [Gall's law](/t/galls-law).
