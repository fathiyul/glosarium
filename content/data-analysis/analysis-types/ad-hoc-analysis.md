---
title: "Ad-Hoc Analysis"
summary: "One-off questions answered quickly, with the right amount of rigour."
core: [data-scientist]
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["ad-hoc analysis", "one-off analysis", "quick analysis"]
prereqs: ["select-query", "asking-good-questions"]
related: ["asking-good-questions", "exploratory-data-analysis", "descriptive-analysis", "stakeholder-management"]
---

**Ad-hoc analysis** is the one-off question from a stakeholder answered in hours or days, not the quarterly report: "why did signups dip Tuesday?", "how many enterprise trials touched the API last month?" Speed is the point — but speed without care produces confident wrong answers delivered faster.

```text
question → clarify what decision it informs → smallest query that answers it
         → sanity-check → answer + caveats, in writing
```

Two habits keep it honest. First, clarify before querying: what will they do differently with each possible answer? A question with no decision attached is curiosity, and curiosity deserves a smaller investment. Second, write the answer down with its caveats — filters used, time window, known gaps — because today's throwaway number becomes next quarter's baseline ([stakeholder management](/t/stakeholder-management)).

The classic mistakes:

- Answering the asked question instead of the real one. "Signups Tuesday" is usually "is something broken, and should we act?" Answer the decision, not just the number.
- No sanity checks. A join that duplicates rows or a timezone slip doubles the answer silently. Check totals against a known figure before sending.
- Analysis that lives only in chat. Unrecorded answers get re-asked monthly, each time slightly differently. Log it where the team finds things.
- Gold-plating. A two-hour question does not need a week of modelling. Match the rigour to the stakes; say what you did not check.

Ad-hoc work is also triage for deeper analysis: a quick look that finds something real becomes [exploratory analysis](/t/exploratory-data-analysis) or a dashboard — but only if the quick version was careful enough to trust.
