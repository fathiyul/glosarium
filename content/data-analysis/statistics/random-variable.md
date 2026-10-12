---
title: "Random Variables"
summary: "Quantities whose values come from chance."
levels: { data-analyst: mid-level , data-scientist: junior }
---

A random variable is a number determined by chance: tomorrow's error count, a customer's order total, the latency of one request. Formally it is a function from uncertain outcomes to numbers, and its probability distribution says how likely each value or range of values is.

Two families cover most of your day. Discrete variables take countable values — clicks per session, defects per batch — and give real probability to exact outcomes: P(exactly 3) means something. Continuous ones — revenue, latency, temperature — fill a range, and only intervals get probability; density at a point is not a probability, a mix-up that turns "the peak is at 200 ms" into the wrong claim "most requests take exactly 200 ms."

For analysts, every reported number is a random variable's realization: this week's conversion rate is one draw from a sampling distribution, which is exactly why [confidence intervals](/t/confidence-interval) and [standard error](/t/standard-error) exist. Publishing a KPI with no sense of its natural wobble invites people to react to noise. Data scientists use the same objects under different names: a feature column is a set of realizations, a label is a draw from an outcome distribution, and a model's prediction estimates a conditional [expected value](/t/expected-value).

The classic confusion is between the variable, its distribution, and the sample you happened to get. The column's average estimates the variable's mean; its spread estimates the [variance](/t/variance). With few rows those estimates wobble badly; with many they tighten — slowly, and governed by the [law of large numbers](/t/law-of-large-numbers), not by the hope that big numbers are automatically right.

A good reflex when reading any statistic: name the random variable behind it and how it was sampled. Half the misuse of dashboards and model metrics dies at that question.
