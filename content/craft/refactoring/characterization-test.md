---
title: "Characterization Test"
summary: "A test that captures current behavior before you change legacy code."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["characterisation test", "golden master test", "approval test"]
prereqs: ["legacy-code"]
related: ["legacy-code", "chestertons-fence", "deterministic-tests", "unit-test"]
---

A characterization test records what the code currently does, not what it's supposed to do. You run the existing code with some inputs, capture the outputs, and assert that the code still produces them. The test documents the present behaviour, so you can change the code and notice any difference.

```python
def test_price_calculation_matches_current_behaviour():
    # Recorded from the current implementation, not from a spec
    assert legacy_price(qty=3, tier="gold") == 84.6
    assert legacy_price(qty=1, tier="basic") == 10.0
```

Such a test is useful when no specification exists, or when the existing behaviour is the one customers depend on, including its odd cases. If the output looks wrong, you have found something to investigate, and the test pins it down until you decide.

The trade-off is that a characterization test locks in whatever the code does, including bugs. The test passes and tells you nothing about correctness, and some teams are tempted to treat a green run as proof. Its job is to protect the current behaviour during a refactor, after which real tests should replace it with the intended behaviour.

The classic mistake is writing a characterization test, then forgetting to decide whether the behaviour is right. Record the surprising results and note them as open questions. Before you delete a strange-looking branch, check it with the [Chesterton's fence](/t/chestertons-fence) principle. Use the [deterministic test](/t/deterministic-tests) techniques, since a characterization test that depends on the clock or random numbers will fail for the wrong reasons.
