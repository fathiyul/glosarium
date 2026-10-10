---
title: "Done Is Better Than Perfect"
summary: "Shipping working software instead of polishing forever."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["done is better than perfect", "shipping over perfection"]
prereqs: ["requirements"]
related: ["deep-work", "requirements", "timeboxing", "edge-cases"]
---

Done is better than perfect means shipping working software that meets the requirement, and improving it afterwards, rather than holding it back until every detail feels right. Software gets value when people can use it, and polish that nobody sees adds no value.

"Done" has a specific meaning, though. It means the agreed requirement works, the change has been tested, and it's safe to release. It doesn't mean every internal detail is ideal.

```
Good enough: the export works for the agreed date range, with tests for the main cases.
Not done:    the export works, but there are no tests and the error message says "Error 500".
Perfect:     a rewrite of the reporting module that nobody asked for.
```

The classic mistake is treating every improvement as required before release. The result is a feature that stays in review for weeks, while the people who needed it have moved on. Ship the working version, and write down the improvements as follow-up work.

Shipping small and often also makes problems easier to fix. Keep the standard high where it matters, such as [edge cases](/t/edge-cases) that could lose data, and let the rest wait. [Timeboxing](/t/timeboxing) helps you decide when to stop.
