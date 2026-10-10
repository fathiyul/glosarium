---
title: "ReDoS"
summary: "Regular expressions that take exponential time on crafted input."
levels: { backend: senior, frontend: senior }
---

Regular-expression denial of service (ReDoS) happens when a pattern takes excessive time on specially crafted input, often because the engine explores many possible ways to match nested or ambiguous repetitions. An attacker may send one long string that ties up a request worker, rather than sending a large volume of requests.

Risky patterns often combine nested quantifiers or overlapping alternatives, but exact behavior depends on the regex engine and its implementation. A seemingly harmless pattern can become expensive only when the input nearly matches and then fails near the end. Test adversarial near-matches, not just typical valid examples.

Prefer simple patterns, bound input length, and use a regex engine or API with appropriate execution limits when available. For complex parsing, use a parser designed for the format instead of encoding the grammar in one expression. A timeout limits impact but should not become an excuse to leave an unbounded hot path.

Backend developers should consider request concurrency and worker model: one expensive match can block a thread or event loop. Frontend developers can also create browser hangs when validating large user-controlled strings. Choose protections based on the actual engine and deployment, and include regression tests for previously problematic inputs. See [DDoS](/t/ddos).

A useful verification habit is to test the boundary from an untrusted caller, not only through the intended interface. Send unexpected values directly to the endpoint, check the response and side effects, and confirm that a denied request does not still change state. Keep a regression test for the failure mode so a refactor or framework update does not quietly reopen it.
