---
title: "Architecture Review"
summary: "Reviewing designs across teams before they're built."
levels: { backend: staff, frontend: staff }
aliases: ["architecture review", "architecture review board", "design review"]
prereqs: ["software-architecture", "quality-attributes"]
related: ["quality-attributes", "fitness-function", "evolutionary-architecture"]
---
An **architecture review** examines a design before (and during) construction: fitness to requirements, quality-attribute trade-offs, failure modes, operability, security and cost — by people outside the building team who ask the questions familiarity blinds. Lightweight ADRs-plus-discussion for most decisions; formal boards for the irreversible few.

```text
propose (context, options, trade-offs) → review (challenge, risks, alternatives)
→ decide (recorded) → follow up (did reality match?)
```

Good reviews are collaborative risk-reduction, not approval gates: reviewers probe failure handling ("what happens when X dies?"), attribute conflicts ("which -ility loses here?"), operational reality ("who runs this at 3am?"), and reversibility ("what's expensive to undo?"). The record matters as much as the verdict.

The classic mistakes:

- Review as gatekeeping. Boards that approve/deny without accountability slow delivery while adding little wisdom. Review advises and records; teams decide and own.
- Rubber stamps. Reviews where nothing is ever challenged waste everyone's time and bless bad designs. Require substantive questions; track finding resolution.
- Ivory-tower reviewers. Reviewers detached from operations and code realities prescribe unworkable purity. Staff reviews with builders and operators, not just architects.
- Reviewing too late. Examining finished implementations (rather than proposed designs) can only bless or demand rewrites. Review at decision time, when change is cheap.
- No follow-up. Decisions recorded and never revisited let reality diverge silently. Revisit significant decisions post-launch; update records with outcomes.
- Everything reviewed formally. Heavyweight process for every change strangles velocity. Tier: chat for small, written proposal for significant, board for irreversible.
- Findings without owners. "Someone should fix the SPOF" fixes nothing. Every finding gets an owner and a date, tracked like any defect.

**How to run them:** tiered by irreversibility, staffed with builders and operators, recorded as decisions, followed up with reality. Reviews buy down the costliest risks while change stays cheap.
