---
title: "Probability Basics"
summary: "Reasoning about chance, for sampling, A/B tests and failure rates."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["probability", "basic probability"]
prereqs: ["combinatorics"]
related: ["combinatorics", "discrete-math", "deterministic-tests", "set-theory"]
---

Probability is the measure of how likely an event is, as a number from 0 to 1. For equally likely outcomes, the probability of an event is the number of outcomes in it divided by the total number of outcomes. It shows up in sampling data, comparing experiments and estimating how often a failure happens.

Two independent events combine by multiplication. If a service fails one request in ten, two independent requests both fail with probability 0.1 × 0.1 = 0.01. Getting that right matters, because many failures are not independent: when a shared database is down, every request fails together.

```python
import random
random.seed(0)                       # repeatable sample
flips = [random.random() < 0.5 for _ in range(10000)]
sum(flips) / len(flips)              # close to 0.5 for a fair coin
```

The trade-off is that a probability estimate from a sample is only as good as the sample. A small sample can look very different from the true rate, and a biased sample gives a confident wrong answer.

The classic mistake is multiplying the probabilities of events that are not independent, which underestimates how often things fail together. Check whether the events share a cause before multiplying. For how randomness affects tests, see [deterministic tests](/t/deterministic-tests). The counting behind equally likely outcomes is covered in [combinatorics](/t/combinatorics).
