---
title: "One-Way vs Two-Way Doors"
summary: "Moving fast on reversible decisions and carefully on irreversible ones."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["one-way door", "two-way door", "Type 1 and Type 2 decisions", "reversible decisions", "irreversible decisions"]
prereqs: ["architectural-trade-offs"]
related: ["architectural-trade-offs", "design-doc", "architecture-decision-record", "evolutionary-architecture", "premature-optimization", "yagni"]
core: [backend, frontend, data-engineer]
---

Not all decisions deserve the same amount of care. A useful mental model, associated with Jeff Bezos and Amazon's way of working, splits them into two kinds:

- **One-way doors** (hard to reverse): once you walk through, going back is expensive or impossible. **Decide slowly and carefully.** Gather evidence, consult people, write it down.
- **Two-way doors** (easy to reverse): if it's wrong, you step back with little cost. **Decide quickly**, often with limited information, and learn from the result.

## Examples

| Likely **one-way** | Likely **two-way** |
|---|---|
| A public API contract that many clients use ([API design](/t/api-design)) | An internal function's signature |
| The primary database technology and data model | A UI layout or a copy change behind a feature flag |
| Choosing a cloud vendor and deeply coupling to its services | A library you can swap with a day's work |
| Deleting data, or sending something to a customer | Trying an algorithm or a caching approach |
| Service boundaries that many teams build around | A refactor within a module |
| Security and compliance commitments | An internal tool choice |
| Hiring and organizational structure | Naming and code style |

Many decisions sit in between, and reversibility can be **made cheaper by design**: feature flags, abstraction at integration points, expand–contract migrations, small steps and monitoring ([expand-contract migration](/t/expand-contract-migration)). A decision that looks like a one-way door can often be broken into a reversible experiment.

## Why it matters

**Treating two-way doors like one-way doors** is a common failure: endless meetings, heavy process and slow progress for choices that could simply be tried and undone. It makes organizations slow and risk-averse.

**Treating one-way doors like two-way doors** is the other: a casual choice becomes a permanent constraint. The cost of getting it wrong can be enormous.

The skill is **classifying correctly**, and matching effort to it.

## How to use it in practice

- **Ask first: "How hard would it be to undo this?"** and "What would undoing cost, in time, money and trust?"
- **For two-way doors:** decide with the information you have (a common rule of thumb is that waiting for near-certainty is usually too slow), delegate the decision, try it and check.
- **For one-way doors:** write a [design doc](/t/design-doc) or an [architecture decision record](/t/architecture-decision-record), explore alternatives, test assumptions with prototypes, involve the right people and consider the long-term consequences ([architectural trade-offs](/t/architectural-trade-offs)).
- **Reduce the irreversibility**: add seams, keep options open and avoid unnecessary lock-in, without over-engineering ([YAGNI](/t/yagni)).
- **Revisit.** Something once reversible can become a one-way door as dependencies accumulate.

This idea helps you move fast where it's safe and slow where it matters, which is much of what good engineering judgment is.
