---
title: "Multivariate Testing"
summary: "Changing several things at once and using the design to separate their effects."
core: [data-scientist]
levels: { data-analyst: senior , data-scientist: senior }
aliases: ["mvt", "multivariate test", "factorial experiment"]
prereqs: ["ab-testing", "experiment-design", "statistical-power"]
related: ["ab-testing", "experiment-design", "statistical-power", "minimum-detectable-effect", "sample-size-calculation"]
---

Multivariate testing (MVT) changes several elements at once — a headline, an image, a button label — and uses a factorial design to separate the effect of each element from the others. With two levels per element and three elements you get eight combinations, and a full factorial runs all of them.

The output is not one winner but a set of estimates: a main effect for each element, averaged over the levels of the others, and, where the design can support it, the interactions between elements.

## What it costs in traffic

Every extra arm takes traffic from every other arm. With eight arms and the same daily traffic, each arm gets roughly an eighth of what a two-arm test would give one side, so the [minimum detectable effect](/t/minimum-detectable-effect) for each cell rises, or the test has to run correspondingly longer ([statistical power](/t/statistical-power)). When traffic is tight, a fractional factorial design runs a chosen subset of the combinations and deliberately gives up the ability to separate some effects from each other.

## The classic mistake

Reading a winning cell as three separate wins. If the cell with headline B, image 2 and a red button beat everything else, the design licenses the claim "that combination beat the others". It does not license "headline B is better", "image 2 is better" and "red is better", unless the design can separate them.

And when elements interact, a main effect is an **average over the levels of the others**. "Headline B is better" may be shorthand for "headline B is better with image 2 and worse with image 1", which averages out to something small and positive. Read only the main effects and you will ship a combination that was never actually tested.

## When to use it

MVT suits a small set of discrete, interchangeable options with enough traffic to power every cell, where you want the best combination rather than a verdict on one idea: page layouts, form field order, promotional creative. It is the wrong tool for testing several unrelated ideas, or for a change so large that combining it with other elements is meaningless. For those, separate tests are clearer ([experiment design](/t/experiment-design), [ab testing](/t/ab-testing)).

One more discipline: **decide in advance which comparison decides**. Comparing eight cells against each other after the fact guarantees that something looks best by chance. Set the metric and the decision rule first, and read the interaction terms as diagnostics rather than as a shopping list.
