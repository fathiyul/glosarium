---
title: "Sequential Testing"
summary: "Testing rules designed so you can look repeatedly without inflating the false-positive rate."
levels: { data-analyst: senior }
aliases: ["sequential testing", "sequential test", "always-valid p-value", "alpha spending"]
prereqs: ["hypothesis-testing", "peeking-problem", "statistical-significance"]
related: ["peeking-problem", "decision-rule", "hypothesis-testing", "statistical-significance", "bayesian-vs-frequentist"]
core: [data-analyst]
---

Sequential testing covers the family of procedures that keep their **stated error rate** when you look at the data more than once. The standard fixed-horizon guarantee — "if nothing is happening, a significant result occurs about as often as the threshold says" — is a property of one look at one pre-planned time. Sequential methods move the boundary so the guarantee holds across the whole sequence of looks.

## The shapes it takes

- Group sequential and alpha spending. Pre-specify a small number of interim looks and divide the error budget across them, so each look carries a stricter threshold than a single final test would.
- Always-valid inference. P-values and confidence sequences that remain valid at any stopping time, not only at a pre-chosen one.
- Bayesian monitoring. Track the posterior and stop on a pre-agreed probability threshold. Bayesian updating has the property that the posterior depends on the data observed and the prior, not on the rule that decided when to stop, so repeated looks are coherent; the frequentist error rate of a stopping rule is a separate question and needs its own justification ([bayesian vs frequentist](/t/bayesian-vs-frequentist)).

## What it costs

None of this is **free**. For the same true effect, the same data and the same threshold, a sequential rule needs either a more extreme result to stop or more data than a fixed-horizon test would. The reason is arithmetic: allowing more chances to cross a line means the line has to sit further out to keep the overall error rate where you set it.

Nor is it a licence to peek. The procedure has to be fixed in advance — which looks, what boundary, what stops the test — or you are back to choosing the test after seeing the data ([decision rule](/t/decision-rule), [peeking](/t/peeking-problem)).

## When it earns its keep

- Tests that must be monitored for harm, where waiting for a pre-set end date to notice a broken guardrail is not acceptable ([guardrail metrics](/t/guardrail-metrics)).
- Long-running experiments where a fixed end date is hard to justify and the team will look anyway.
- Any setting where the honest description of your process is "we will check this regularly" and you would rather have a guarantee than good intentions.

What it does not fix is broken data. A sequential test with a sample ratio mismatch or a mis-defined metric gives you a valid inference about the wrong thing ([hypothesis testing](/t/hypothesis-testing), [statistical significance](/t/statistical-significance)).
