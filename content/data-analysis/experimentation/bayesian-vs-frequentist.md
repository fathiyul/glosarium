---
title: "Bayesian vs Frequentist Testing"
summary: "Two readings of probability that give different answers to the same experiment."
core: [data-scientist]
levels: { data-analyst: senior , data-scientist: senior }
aliases: ["bayesian vs frequentist", "frequentist vs bayesian", "frequentist inference"]
prereqs: ["hypothesis-testing", "bayes-theorem", "confidence-interval"]
related: ["bayes-theorem", "p-value", "confidence-interval", "sequential-testing", "decision-rule"]
---

Both schools analyse the same experiment. They disagree about what "probability" means, and the disagreement shows up in what they report.

A frequentist treats probability as the **long-run frequency of a repeated procedure**. The true conversion rate of a variant is a fixed unknown number; the data is random. So a 95% confidence interval means: if you repeated this test many times under the same conditions, the interval computed this way would cover the true value about 95% of the time. It is a statement about the procedure, not about your one interval.

A Bayesian treats probability as **a degree of belief given what you know**. The unknown rate is itself uncertain, so it gets a distribution. You start from a prior, update it with the observed data, and get a posterior ([bayes-theorem](/t/bayes-theorem)). A 95% credible interval means: given the model and the prior, there is a 95% probability the value lies in that range. That is the sentence most people think a confidence interval is already saying.

```text
same data, two questions
  frequentist → how surprising is this data if nothing is happening? → p-value
  bayesian    → given this data, what do I now believe about the effect? → posterior
```

## What that changes in practice

- Repeated looks. A Bayesian posterior is a function of the data you have and the prior, not of the rule that decided when to stop, so continuous monitoring is natural. Frequentist error guarantees are properties of a pre-planned procedure, which is why fixed-horizon testing has the peeking problem and why sequential methods exist ([sequential testing](/t/sequential-testing)).
- The prior. It makes assumptions explicit and lets you carry over what you already know. It also means the answer depends on it, most strongly when the data is weak.
- What you can say. A p-value answers a narrow question about the data under a null; a posterior answers "how likely is this effect, and how big" ([p-value](/t/p-value)).
- Defaults differ between tools. The same dataset fed to two calculators can produce two different-looking summaries, and which quantity a given tool reports varies. Read which number you are being handed before quoting it.

## Choosing

Neither is correct. They answer different questions. If you need an error-rate guarantee that holds across a long series of decisions, frequentist machinery gives you that directly. If you want a probability statement about this change, or want to monitor continuously without pre-committing an end date, Bayesian fits better.

Whichever you pick, put the quantity you are reporting and the rule you will act on in writing before the data arrives ([decision rule](/t/decision-rule), [hypothesis testing](/t/hypothesis-testing)).
