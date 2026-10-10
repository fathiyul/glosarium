---
title: "Multi-Cloud"
summary: "Using several cloud providers, and whether it's worth it."
levels: { backend: staff, data-engineer: staff }
aliases: ["multi-cloud", "multi cloud", "cloud portability"]
prereqs: ["cloud-computing", "cloud-providers"]
related: ["vendor-lock-in", "multi-cluster", "egress-costs", "managed-vs-self-hosted", "regions-azs"]
---

**Multi-cloud** means using more than one cloud provider — running workloads on AWS and Google Cloud, or Azure and a smaller provider, at the same time. The usual motivations: reducing dependence on one vendor, meeting a resilience or regulatory requirement, or picking the best service from each. It's a significant architectural choice with real costs.

```text
one cloud:   one skill set, one network, one bill, one control plane
multi-cloud: N of each, plus data moving between them
```

The costs are easy to underestimate. You duplicate expertise, tooling and security practices; you pay for data leaving one provider ([egress](/t/egress-costs)); you get latency between clouds; and you lose the easy integration that comes from using one provider's networking and identity end to end. Operating two clouds is not twice the work of one — it's closer to two independent operations.

The classic mistakes:

- Multi-cloud for its own sake. Adopting it as a goal, or to look sophisticated, without a concrete driver. The complexity lands on the team and rarely pays back.
- Assuming it removes lock-in. Running the *same* managed service on two providers may still mean two incompatible APIs. True portability usually means leaning on open standards — [containers](/t/oci), standard protocols — and accepting less of each provider's unique value.
- Treating it as a failover plan. A [status page](/t/status-page) listing other providers' outages is not the same as being able to run on them.
- Confusing multi-cloud with multi-region. Several regions of one provider already gives geographic resilience and is far simpler. Multi-cloud is only needed for provider-level independence.
- Forgetting the operational layer. Without consistent deployment, policy and observability, you get two fragile setups instead of one robust one.

**When it's justified:** a regulatory or resilience requirement that one provider can't meet, a genuine best-of-breed need, or negotiating leverage. Even then, be deliberate about what runs where. For most teams, one provider with multiple [regions](/t/regions-azs), plus [portable building blocks](/t/vendor-lock-in) to keep exit possible, gets most of the benefit at a fraction of the cost.
