---
title: "Margin of Error"
summary: "The plus-or-minus around a polled number, and why small samples make it large."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["MOE", "margin of error", "error margin"]
prereqs: ["confidence-interval", "standard-error"]
related: ["confidence-interval", "sample-size-calculation", "sampling-bias", "sampling-methods", "statistical-significance", "standard-error"]
---

The **margin of error** is the ± half-width of a [confidence interval](/t/confidence-interval). When
a survey reports "48% ± 3", the 3 is the margin — a 95% one, by most polling convention.

For a proportion it follows directly from the
[standard error](/t/standard-error) of that proportion:

```text
MOE ≈ 1.96 × sqrt( p(1 − p) / n )
```

The 1.96 is the normal multiplier for a 95% level, which is a convention rather than a discovery;
90% and 99% intervals use different multipliers and produce different ± values. The formula is also
an approximation. It behaves best when p is not close to 0 or 1 and n is reasonably large, so for
tiny samples or extreme proportions your software should use an adjusted or exact interval instead
of this plain form.

Illustrative only, so the shape of it is visible: with p = 0.5, n = 100 gives a margin of roughly
0.10, n = 400 gives roughly 0.05, and n = 2,500 gives roughly 0.02. Quadruple the sample to halve
the margin. That is why a poll of a few hundred people carries a wider ± than a poll of a few
thousand, and the same arithmetic drives [sample size](/t/sample-size-calculation) planning.

Two limitations worth saying out loud to your stakeholder.

The first is that **the margin of error covers sampling noise only**. A ±3 around a framed question
or a [biased sample](/t/sampling-bias) is a ±3 around the wrong number. It says nothing about
non-response, about who was left out of the sampling frame, or about how the question was worded
([sampling methods](/t/sampling-methods)).

The second is that it does not cover subgroups or differences. Cutting a sample of 1,000 into four
regions leaves about 250 each, whose margin is roughly double the top-line one, so quoting the
headline ±3 for a regional number overstates how precise it is. And the margin on a *difference*
between two independent groups is not the difference of the two margins — it is closer to the square
root of the sum of their squares, and it does not apply at all when the two estimates are not
independent, such as before-and-after measurements on the same users.
