---
title: "Sampling Methods"
summary: "Choosing who or what you measure so the result stands for the whole population."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["sampling method", "sampling design", "sampling strategy"]
prereqs: ["sampling-bias", "statistics-basics"]
related: ["sampling-bias", "sampling-data", "confidence-interval", "margin-of-error", "segmentation", "data-profiling"]
---

A **sampling method** is the rule by which you decide which rows or people get measured. The method
determines how far the result can be pushed — whether a number computed from the sample can be
quoted as a number about the whole.

The common designs:

| Method | How it picks | Strength | Weakness |
|---|---|---|---|
| Simple random | every row equally likely | unbiased and easy to analyse | can miss small subgroups entirely |
| Systematic | every nth row from an ordered list | simple, spreads evenly | periodicity in the ordering biases it |
| Stratified | a sample inside each defined group | guarantees subgroup estimates | needs the groups defined before you start |
| Cluster | whole groups sampled together | cheap when the population is scattered | wider intervals than a simple random sample of the same size |
| Convenience | whatever is easiest | no effort | no basis for generalising at all |

The first thing to check is the **sampling frame** — the list you drew from. It is not always the
population you care about: a survey sent to registered users has silently excluded everyone who
churned before registration. A frame that omits part of the population produces
[sampling bias](/t/sampling-bias) that no amount of extra sampling repairs.

Reporting conventions worth carrying:

- Name the sampling unit. Randomising by user and randomising by session answer different questions —
  see [randomisation unit](/t/randomization-unit).
- State the sample size next to every estimate. The
  [margin of error](/t/margin-of-error) and the
  [confidence interval](/t/confidence-interval) are meaningless without it.
- When you have all the rows, say so. If you have every row for the quarter, that is a census and the
  sampling statistics no longer apply; what remains is uncertainty about measurement
  ([data quality](/t/data-quality)).
- Stratify where you will report. If the deliverable breaks out by region and plan, sample inside
  those groups, or the small cells will come back empty or unusable.

Working on a subset purely to move faster — a 2% sample to iterate on a query, say — is a different
activity with a different name ([working with a data sample](/t/sampling-data)) and those numbers are
not meant to be reported.
