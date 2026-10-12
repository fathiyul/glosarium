---
title: "Multiple Regression"
summary: "Fitting several drivers at once so each one is read holding the others still."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["multiple regression", "multiple linear regression", "multivariable regression"]
prereqs: ["linear-regression", "correlation-coefficient"]
related: ["linear-regression", "regression-analysis", "confounding-variable", "residuals", "simpsons-paradox", "causal-inference"]
---

**Multiple regression** extends [linear regression](/t/linear-regression) to several predictors at
once:

```text
y = a + b1·x1 + b2·x2 + ... + bk·xk
```

Each coefficient is read **holding the other predictors still**. With revenue as the outcome and
discount, traffic and season as predictors, the discount coefficient answers "among rows with similar
traffic and season, what does a one-point discount come with?" That conditional reading is the whole
point of the tool, and the reason people fit it.

Why it is worth the trouble: a coefficient from a single-predictor model silently absorbs the effect
of everything correlated with that predictor. Discount and traffic probably move together, so a
single-predictor discount coefficient is partly a traffic coefficient. Fitting both separates them —
at least inside the model.

What the separation does and does not buy:

- It controls only for what you measured. If a variable you did not observe drives both traffic and
  discount, it stays inside both coefficients
  ([confounding variables](/t/confounding-variable)). Adding predictors does not turn an
  observational fit into a causal estimate.
- It controls only up to the form you fitted. If the true relationship is curved, or the effect
  differs by segment, a straight additive coefficient is an average over cases that behave differently
  ([segmentation](/t/segmentation)).
- Correlated predictors make each individual coefficient unstable without introducing a bias into the
  fitted values. When two predictors are near-duplicates, their coefficients swing wildly while the
  predictions stay steady — **the classic symptom of collinearity**. The check is to refit without the
  columns a coefficient is entangled with and see whether the story survives.
- Holding others still is not the same as changing one thing. The coefficients answer a "comparing
  like with like" question about the data you have, not "what would happen if I moved this"
  ([causal inference](/t/causal-inference)).

Two reporting habits. Quote a coefficient together with its uncertainty rather than as a bare number,
and check the [residuals](/t/residuals) before you quote anything, because the interpretation of
every coefficient depends on the specification being right.

For the pooled-versus-split question — one model or one per group — the answer is often the same as in
[Simpson's paradox](/t/simpsons-paradox): fit both and see whether they disagree.
