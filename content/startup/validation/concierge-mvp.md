---
title: "Concierge MVP"
summary: "Delivering the service by hand to a few customers before automating anything."
levels: { tech-entrepreneur: idea }
aliases: ["concierge MVP", "concierge test", "manual-first MVP"]
prereqs: ["problem-solution-fit", "design-partners"]
related: ["wizard-of-oz-mvp", "pre-selling", "design-partners", "do-things-that-dont-scale"]
---

A **concierge MVP** delivers the service manually to a handful of customers: you are the algorithm, the onboarding team and the support desk. Users get real value; you learn what the product must actually do — including the edge cases no spec would have caught — before writing production code.

```text
customer asks → you do it by hand (spreadsheets, manual emails, late nights)
             → note every repeated step → those notes become the spec
```

It works because quality is high (a human does it perfectly) while cost is contained (few customers). The manual pain is the point: whatever hurts most at five customers is exactly what to automate first, and whatever nobody uses was never needed.

The classic mistakes:

- Concierge as a business, not a test. Hand-serving fifty customers is a services company wearing a startup costume. Cap the cohort and set the automation trigger in advance.
- Hiding the manual work. Customers who think it is automated judge reliability; customers who know it is personal forgive and teach. Be honest that a human is behind the curtain.
- Learning nothing systematic. Doing the work without recording it wastes the tuition. Log every request, exception and workaround — that log is the product spec.
- Scaling the unscalable. Hiring an ops team to keep hand-serving instead of automating. The concierge phase ends with code, not headcount (see [wizard of oz](/t/wizard-of-oz-mvp) for the next step up in realism).

**Graduate when:** the manual steps are stable, repeated and well understood. Automate the most painful step first, keep hand-delivering the rest, and repeat until the product stands alone.
