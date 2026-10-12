---
title: "Deterministic Tests"
summary: "Controlling time, randomness and network so tests always behave the same."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["non-flaky tests", "hermetic tests"]
prereqs: ["acceptance-test"]
related: ["flaky-test", "heisenbug", "acceptance-test", "bdd"]
---

A deterministic test gives the same result every time it runs with the same code. Flaky tests, which pass and fail at random, waste time and teach people to ignore failures. Most flakiness comes from three sources the test doesn't control: the current time, random numbers and the network.

Seeding the random number generator makes random values repeatable. A seeded generator gives the same sequence each run:

```python
import random

def make_token(rng):
    return f"{rng.getrandbits(32):08x}"

def test_token_is_repeatable():
    assert make_token(random.Random(7)) == make_token(random.Random(7))
```

Time works the same way. Pass the current time into the function instead of reading the clock inside it, so the test can choose the moment:

```python
def is_expired(expires_at, now):
    return now >= expires_at

def test_expired_at_deadline():
    assert is_expired(expires_at=100, now=100)
```

The trade-off is that fakes can differ from the real thing. A fake clock or a stubbed network call can hide a problem that only appears with real timing or real latency, so keep some tests against the real systems. Injecting dependencies also adds setup code.

The classic mistake is using `sleep` to wait for something to finish, which is slow and still racy. Wait for an explicit signal, such as a future or an event, or poll with a timeout. A test that fails once in a hundred runs should be fixed or quarantined rather than rerun until it passes. For bugs that only appear some of the time, see [heisenbugs](/t/heisenbug).
