---
title: "Dashboard Design"
summary: "Building dashboards people actually use."
levels: { data-analyst: mid-level , tech-entrepreneur: growth }
aliases: ["designing dashboards", "dashboard layout", "dashboard best practice"]
prereqs: ["business-intelligence", "chart-selection"]
related: ["bi-dashboard", "chart-selection", "drill-down", "self-service-analytics", "kpi-design", "metric-definitions"]
---

A dashboard is a single screen that answers a recurring question. The design work is deciding which question that is, and then removing everything that does not serve it.

## Why it matters

Most dashboards accumulate. Someone asks for one more chart, then another, and a year later the page has forty tiles, no obvious reading order, and a load time that makes people wait for the number they wanted. **The classic failure is not a bad chart; it is a dashboard with no question at the top.**

## Rules that carry most of the value

- **One question per dashboard, stated in the title.** Not "Sales" — "are we on track this quarter, by region". A dashboard's title is its specification, and if you cannot write the question, the dashboard has no purpose yet.
- Answer at the top, detail below. The reader gets the answer in the first second and only scrolls if they want to know more.
- A small number of KPIs, chosen with [kpi design](/t/kpi-design) and defined once with [metric definitions](/t/metric-definitions). Conflicting numbers on one page are worse than no numbers, because they cost you the reader's trust in the others.
- One chart per panel, each doing a job from [chart selection](/t/chart-selection). A panel with four charts in it is four half-attention charts.
- Show the comparison the reader needs: against target, against the same period before ([period over period](/t/period-over-period)), against the other regions. A number with no reference point is not an answer.
- Say when the data was last updated and where it came from. A dashboard nobody trusts is worse than an empty page — see [data freshness](/t/data-freshness).
- Make it fast. A dashboard that takes a minute to load gets opened once a week instead of daily, which quietly changes the decisions it feeds. That is [query cost](/t/query-cost) and [aggregate tables](/t/aggregate-tables) as a design constraint, not just an engineering one.

## The trade-off

**Scope against usefulness.** A dashboard for one question serves a handful of people and gets used. A dashboard for everyone gets opened once and then remembered as "the dashboard". Keep the number of dashboards smaller than the number of decisions, and retire what nobody opens.

Drill-down from a tile to its detail is covered in [drill-down](/t/drill-down) — that is how a dashboard stops being a status page and starts being a place to work. Where the goal is letting people answer questions without you, that is [self-service analytics](/t/self-service-analytics), and the recurring-report form is a [bi dashboard](/t/bi-dashboard).
