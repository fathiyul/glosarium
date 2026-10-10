---
title: "Nines (99.9%, 99.99%)"
summary: "How much downtime each level of availability allows."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["nines of availability", "99.9%", "availability nines"]
prereqs: ["availability", "slo"]
related: ["availability", "error-budget", "slo"]
---
**Nines** quantify availability as 9s in the percentage: 99.9% (three nines) allows ~43 minutes of monthly downtime; 99.99% allows ~4 minutes; 99.999% allows ~26 seconds. Each nine shrinks the error budget tenfold — and raises the engineering cost roughly tenfold with it.

```text
99%       ≈ 7h 18m  monthly budget (two nines)
99.9%     ≈ 43m     (three nines — the common serious target)
99.99%    ≈ 4m      (four nines — redundancy everywhere, tested constantly)
99.999%   ≈ 26s     (five nines — specialised, expensive, rarely needed)
```

Nines only mean something scoped: which service, which requests, measured how, over what window, excluding what. Unscoped nines ("the platform is four nines") collapse the moment anyone asks what counts as down.

The classic mistakes:

- Nines without scope or measurement. Targets nobody measures are aspirations. Define SLI, window, exclusions — then the nines follow from data.
- Chasing unneeded nines. Four nines on an internal batch dashboard wastes the budget that checkout needs. Tier by criticality; spend nines where downtime costs.
- Ignoring the window. Yearly 99.9% (~9h) tolerates a bad day; monthly 99.9% (43m) doesn't. Windows shape behaviour — monthly/rolling windows keep urgency honest.
- Excluding everything. "Excluding planned maintenance, dependencies, acts of cloud…" eventually excludes all downtime. Exclusions need user-legitimacy, not comfort.
- Dependency nines unmultiplied. Three 99.9% dependencies in series yield 99.7% — composition degrades. Budget end-to-end from the chain, not per link.
- Error budget as decoration. Budgets nobody enforces (ship freely at zero budget) change nothing. Gate releases and risk-taking on remaining budget.
- Confusing nines with reliability. Availability is one facet; correctness, durability and latency have their own budgets. Nines measure serving, not perfection.

**How to use them:** scope, measure, tier by criticality, enforce via error budgets. Nines are a spending discipline for downtime — allocate where it buys the most trust per dollar.
