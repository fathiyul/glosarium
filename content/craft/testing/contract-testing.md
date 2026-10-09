---
title: "Contract Testing"
summary: "Verifying that services agree on the API contract between them."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["consumer-driven contract testing", "Pact", "CDC testing", "consumer driven contracts", "API contract tests"]
prereqs: ["integration-test", "api-contract"]
related: ["api-contract", "mock-server", "end-to-end-test", "microservices", "schema-evolution", "openapi"]
core: [frontend]
also: [api-design]
---

In a system of services, one service (the **consumer**) calls another (the **provider**). **Contract testing** verifies that the two **agree on how they talk to each other**, without needing to run both together in a full end-to-end environment.

The problem it solves: with microservices, you want to deploy each service independently, but a provider changing a response field could silently break its consumers. [End-to-end tests](/t/end-to-end-test) across all the services would catch it, but they're slow, flaky and hard to run for every change. Contract tests catch it earlier and faster.

## Consumer-driven contracts (the common approach)

1. The **consumer's tests** describe exactly what it needs from the provider: requests it sends, and the parts of the response it relies on. These expectations are recorded as a **contract** (a file).
2. The consumer's tests run against a **stub** of the provider built from the contract, so they're fast and self-contained.
3. The contract is shared (often via a broker).
4. The **provider** replays the contract against its real implementation, in its own CI, and checks that every consumer's expectations still hold.

```
Consumer tests ──► generate contract ──► (shared) ──► Provider build verifies it
 (mock the provider)                                    (real provider, replayed requests)
```

Pact is a widely used tool for this, with implementations in many languages. Some tools also offer a "can I deploy?" check, which asks whether a given version is compatible with the versions of its partners that are in production.

```python
# consumer side (Pact-style, simplified)
(pact
 .given("order 917 exists")
 .upon_receiving("a request for order 917")
 .with_request("GET", "/orders/917")
 .will_respond_with(200, body={"id": 917, "status": Like("paid")}))   # only the fields this consumer uses
```

## What you gain

- **Independent deployments with confidence**: a provider change that breaks a consumer fails the provider's build.
- **Fast, reliable feedback** compared with end-to-end tests.
- **Documentation of real usage**: the provider learns which fields consumers depend on, so it can change the rest safely ([schema evolution](/t/schema-evolution), [API versioning](/t/api-versioning)).
- **Better conversations** between teams.

## Limits and pitfalls

- It checks the **shape of the interaction**, not the full business behavior. You still need other tests ([testing pyramid](/t/testing-pyramid)).
- **Over-specifying** (asserting exact values and every field) makes contracts brittle. Match only what the consumer truly needs, using type matchers instead of fixed values.
- **It needs process**: sharing contracts, running verification in CI and acting on failures. Without discipline, it decays.
- **Provider states** (the data needed for each scenario) must be set up for verification, which takes work.
- For public APIs with unknown consumers, rely on an [OpenAPI](/t/openapi) specification and compatibility checks instead.

Contract tests complement, rather than replace, [integration tests](/t/integration-test) and good [API contracts](/t/api-contract).
