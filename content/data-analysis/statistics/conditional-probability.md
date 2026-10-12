---
title: "Conditional Probability"
summary: "Updating chances when you learn something new."
levels: { data-analyst: mid-level , data-scientist: junior }
---

Conditional probability is the chance of one event given that another is known: P(A | B) reads "probability of A once we know B happened." It is computed as P(A and B) divided by P(B), and it is the raw material behind almost every number an analyst reports.

Once you condition, the sample space shrinks and answers change completely. Roll two dice: given the *first* die shows 4, the chance the sum is 8 is 1/6. But given the sum is 8, the chance the first die showed 4 is 1/5 — five outcomes make eight and only one starts with a 4. The direction of conditioning matters and the two numbers are generally not equal. Make it "at least one die shows 4" instead of "the first die" and the answer changes again, to 1/11: eleven outcomes contain a 4, one of them sums to eight. Which information you were *given* is half the problem. Confusing them is the single most common analytical slip, and it feeds the [base rate fallacy](/t/base-rate-fallacy).

For analysts, every metric with a denominator is conditional: conversion given visit, churn given signup, precision given a positive alert. Saying "90% of complaints come from plan X" without saying what share of all users are on plan X quotes P(plan X | complaint) while hiding the base rates that would make it meaningful. Data scientists use the same machinery formally: likelihood is P(data | parameter), posterior is P(parameter | data), and [Bayes' theorem](/t/bayes-theorem) converts between them.

Independence is the special case worth recognizing: if P(A | B) = P(A), learning B told you nothing about A. Plenty of models assume precisely that, carelessly, about rows that are anything but independent.

Two practical habits prevent misuse. First, always state what is being conditioned on — the number is meaningless without it. Second, watch the size of the condition: 40% conversion on five users is a conditional probability resting on almost no evidence, and it will not survive the next five visitors. Report the count behind every rate.
