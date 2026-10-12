---
title: "Interaction Effects"
summary: "When an effect depends on another variable."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["interaction", "moderation effect", "effect modification"]
prereqs: ["multiple-regression", "linear-regression"]
related: ["multiple-regression", "confounding-variable", "simpsons-paradox", "linear-regression"]
---

An interaction effect means **the effect of one variable depends on the level of another**. A discount might lift conversion by 5 points for new visitors and do nothing for returning ones. There is no single "effect of the discount" — there are two, and averaging them into one number describes no one.

In a [multiple regression](/t/multiple-regression) you model this with a product term: outcome ~ discount + new_visitor + discount × new_visitor. The product's coefficient is the extra kick the discount gets for new visitors. The classic mistake is fitting only the two plain terms and reporting "discounts work" (or "discounts don't work") from that average — or, just as bad, adding the product term and then reading the plain discount coefficient as the overall effect, when it is now the effect only for the reference group.

A quick table beats a paragraph when you present one:

| group | conversion, no discount | conversion, 10% off |
|---|---|---|
| new visitors | 8% | 13% |
| returning | 20% | 20% |

Check the difference of differences (here 5 points vs 0) before believing the average. And rule out a [confounder](/t/confounding-variable): if new visitors also arrive mostly from one campaign, the "interaction" may belong to the campaign, not to newness.

## When not to add them

Each interaction spends data — it is estimated from a slice of a slice — so small segments give noisy, exciting-looking noise. As a data analyst, test one or two interactions your stakeholders named in advance, not every pairwise combination the tool offers. As a data scientist, add them when the science says effects should differ across groups, penalise or pre-register the search otherwise, and watch for a [trend that reverses on aggregation](/t/simpsons-paradox): an interaction you missed is often the explanation.
