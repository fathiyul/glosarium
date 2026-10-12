---
title: "Handling Data Requests"
summary: "Clarifying what an analyst or stakeholder actually needs before building."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["handling data requests", "stakeholder requests", "ad-hoc data requests", "analyst requests", "requirements gathering for data"]
prereqs: ["data-roles"]
related: ["metric-definitions", "self-service-analytics", "documenting-datasets", "metric-discrepancy", "data-ownership", "bi-dashboard"]
core: [data-engineer]
---

A stakeholder writes: *"Can you get me churn by region?"* The words are simple, but **what they actually need is usually something
different** from what they asked for. Clarifying before building saves days of rework.

## Questions to ask

| Question | Why |
|---|---|
| **What decision will this support?** | Reveals what accuracy, detail and speed are needed, and sometimes a better question |
| **What exactly does "churn" mean here?** | Definitions differ: cancelled, inactive for 90 days, downgraded? ([metric definitions](/t/metric-definitions)) |
| **For which population and period?** | All customers or paying ones? Last month, last year? |
| **How granular?** | By region, country, city, per customer? |
| **One-off or recurring?** | A one-off can be a query. Recurring needs a pipeline and a monitored table |
| **How fresh and how exact?** | Is "roughly right by tomorrow" fine, or must it reconcile with finance? |
| **Who will see it?** | Executives? Customers? Sensitive data needs care and approval |
| **When is it needed?** | Real deadline, or "ASAP" by habit? |
| **Does something similar exist already?** | Check existing tables, dashboards and metrics first |

A good habit: **restate what you'll deliver** in a short message, ("churn = customers with a cancelled subscription in the month ÷
customers active at the start of the month, by billing country, for the last 12 months, in a dashboard") and get a yes before you
start.

## While doing it

- **Start small**: show an early result so they can correct the course.
- **Check the numbers** against something known, and be honest about caveats, data gaps and assumptions.
- **Don't quietly invent definitions.** If the definition is ambiguous, ask, or state your choice clearly.
- **Deliver with documentation** of what it is and how it was computed ([documenting datasets](/t/documenting-datasets)).
- **Say no, or "not yet", politely** to requests that can't be done well, explaining why and offering what is possible.

## Beyond the single request

- **Look for patterns.** If five people ask for the same thing, build a reusable table or dashboard.
- **Support self-service** with clean, documented, trusted data, so people can answer simple questions themselves
  ([self-service analytics](/t/self-service-analytics)).
- **Keep a visible queue and priorities**, so requests don't disappear into direct messages.
- When two requesters get different numbers, find where the definitions differ ([metric discrepancy](/t/metric-discrepancy)).

Understanding the question is most of the job. The query is often the easy part.
