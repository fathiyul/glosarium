---
title: "Property-Based Testing"
summary: "Generating many inputs to check that properties always hold."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["property-based testing", "property testing", "generative testing"]
prereqs: ["unit-test"]
related: ["fuzz-testing", "regression-test", "tdd", "given-when-then"]
---

**Property-based testing** flips the usual test around. Instead of writing one input and its expected output, you state a **property** — something that should hold for *all* valid inputs — and the framework generates many inputs to try to falsify it. If one fails, it **shrinks** the input to the smallest example that still fails, so you get a minimal counterexample instead of a random blob.

```text
property: "reversing a list twice gives back the original"
for many random lists L:  assert reverse(reverse(L)) == L
```

Other typical properties: a sort's output is ordered and is a permutation of the input; encoding then decoding a value returns the original (round-trip); an operation never increases a total by more than its input. You assert relationships and invariants, not specific values.

The classic mistakes:

- Weak or absent properties. If the property is "the function doesn't crash", you've built a [fuzzer](/t/fuzz-testing), not a property test. The value comes from meaningful invariants that can actually fail.
- Not constraining generators. Generating inputs outside the function's domain produces false failures. Describe valid inputs (e.g. non-empty lists) so failures mean real bugs.
- Ignoring the shrink result. The shrinking is the payoff: a failing `[7]` is instantly understandable where a random 40-element list wasn't. Read and add it as a regression test.
- Assuming randomness means flaky. Because a failing input is shrunk and reproducible (frameworks print a seed), property tests are meant to be deterministic when they fail — capture the case and it stays caught.
- Using it for everything. Some behaviour is genuinely example-based ("this specific request returns this response"). Property tests complement [unit tests](/t/unit-test); they don't replace them.

**When it shines:** pure logic with clear invariants — parsers, serializers, data structures, math, algorithms. That's where "for all x" properties find the edge cases you'd never enumerate. It shares DNA with fuzzing (both generate inputs) but differs in intent: fuzzing hunts crashes, property testing hunts *wrong answers*.
