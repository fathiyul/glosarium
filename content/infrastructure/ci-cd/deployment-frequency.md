---
title: "Deployment Frequency"
summary: "How often a team ships; a key DevOps metric."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["deployment frequency", "deploy frequency", "ship rate"]
prereqs: ["continuous-delivery", "ci-pipeline"]
related: ["dora-metrics", "release-train", "rollback", "deployment-freeze", "continuous-integration"]
---

**Deployment frequency** is how often a team deploys to production. It's one of the four [DORA metrics](/t/dora-metrics), and it's interesting because it tends to move together with the others: teams that deploy often usually also have shorter lead times and fewer failed changes. That's not because frequency is a goal in itself, but because shipping small changes frequently makes each change easier to test, review and reverse.

```text
rare, big releases:  many changes batched → hard to test → scary to deploy
frequent, small:      one change at a time → easy to verify → boring to deploy
```

The real lever isn't "deploy more"; it's **smaller batch size**. A release containing one change is easier to reason about than one containing fifty, and if it's wrong you know exactly what to roll back. Frequency tends to follow from that, plus automation and confidence.

The classic mistakes:

- Optimising the number. Chasing a frequency target by splitting work into meaningless deploys, or deploying trivial changes to look good, misses the point. The metric is a signal, not a score.
- Batching to feel safe. Holding changes for a weekly window feels controlled but makes each release larger and riskier. It's usually the opposite of safer.
- Using it to compare people. Metrics that rank individuals get gamed and distort behaviour. Use them at team or system level, to find where delivery is stuck.
- Ignoring the balance. Frequency without stability is just churn. Watch it alongside change failure rate and [recovery time](/t/mttr).

**When it's naturally low:** regulated environments, mobile [app store releases](/t/app-store-releases), or systems with heavy approval. That can be legitimate — but if the constraint is process rather than safety, reducing it usually improves both speed and quality. [Trunk-based development](/t/trunk-based-development) and [continuous delivery](/t/continuous-delivery) raise frequency by making each deploy small and routine.
