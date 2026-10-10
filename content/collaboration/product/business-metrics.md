---
title: "Business Metrics"
summary: "Revenue, retention, conversion: what the business measures."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-analyst: junior }
---

Business metrics are measures used to understand how an organization or product is performing, such as revenue, retention, conversion, or support cost. A metric becomes useful when its definition, source, time window, and intended decision are clear.

“Active customer” can mean a paying account, a user who logged in, or an organization that completed a key action. If teams use different definitions, dashboards can disagree while each calculation is internally consistent. Write down the numerator, denominator, population, exclusions, and event timing, then check that instrumentation captures them correctly.

Metrics describe parts of a system; they do not explain causation by themselves. A change in conversion may reflect seasonality, a tracking change, or a product effect. Avoid optimizing one number in a way that harms the broader user outcome—for example, increasing sign-ups while reducing successful activation.

Backend and frontend engineers affect event semantics and user flows; data engineers help maintain trustworthy models and lineage. Product and business partners should connect the measure to a decision and revisit it when the strategy changes. See [north-star metric](/t/north-star-metric), [business intelligence](/t/business-intelligence), and [experimentation culture](/t/experimentation-culture).

Connect the discussion to a user or business decision, and make assumptions that could change the solution explicit. Revisit the choice when new evidence arrives instead of preserving a plan only because work has started. Backend developers can surface reliability and integration costs, frontend developers can test usability assumptions, and data engineers can check whether the evidence is trustworthy.

Revisit the decision when user evidence or operating costs change, and keep the assumptions visible to anyone using the result.
