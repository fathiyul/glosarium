---
title: "Architecture Fitness Function"
summary: "Automated checks that an architecture keeps its intended qualities."
levels: { backend: staff, frontend: staff }
aliases: ["architecture fitness function", "fitness functions", "architectural fitness"]
prereqs: ["quality-attributes", "non-functional-requirements"]
related: ["quality-attributes", "evolutionary-architecture", "architecture-review"]
---
An **architecture fitness function** is an automated check guarding an architectural characteristic: "no cycles between modules," "p99 checkout under 800ms," "no new direct database access from services," "coupling metrics within bounds." Code asserts behaviour; fitness functions assert architecture — objectively, continuously, in CI.

```text
test:  checkout totals correctly (behaviour)
fitness: services never import the database driver (structure)
fitness: p99 stays budgeted (quality, measured in prod)
```

They span dimensions: structural (dependency rules, layering, API usage), quality (performance budgets, security scans), and process (coverage of decision records, migration progress). Violations fail builds or page owners — architecture enforced rather than hoped.

The classic mistakes:

- Hoped architecture. Characteristics everybody wants and nobody checks erode within quarters. If it matters, function it.
- Brittle structural checks. Overly specific rules ("service A may never import B") shatter on legitimate evolution. Check principles (direction, layering), not instances.
- Fitness without ownership. Failing checks nobody owns get disabled, not fixed. Every function names an owner and a remediation path.
- Static thresholds forever. Budgets and bounds from 2023 constraining 2026 reality either strangle or get ignored. Review thresholds with the architecture, yearly at least.
- Only structural dimension. Dependency checks without performance/security/process functions guard shape while qualities rot. Cover all dimensions that matter.
- Alert fatigue. Hundreds of marginal fitness failures train teams to ignore them all. Few, important, owned functions beat comprehensive noise.
- Confusing with unit tests. Fitness functions assert cross-cutting characteristics over the whole system; unit tests assert component behaviour. Different scope, different suite, both needed.

**How to adopt:** pick the characteristics that actually decide success (3–5, not 50), automate their measurement, gate on violation, review with the architecture. Fitness functions are architecture that defends itself.
