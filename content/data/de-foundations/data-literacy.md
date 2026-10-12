---
title: "Data Literacy"
summary: "An organization's ability to read, question and use data."
levels: { data-analyst: staff , data-scientist: staff }
---

Data literacy is an organization's working ability to read, question and act on data correctly — not a training module, but a property of how teams decide. It shows up in ordinary moments: someone asks what "active user" counts, checks when the dashboard last refreshed, and treats a rate on ten samples as weak evidence. Absent literacy, the same reports become talismans: numbers are trusted because they are printed.

The failure modes staff-level people recognize: two teams quoting different "churn" from different definitions and each assuming a bug; a metric that silently stopped counting one platform; dashboards steering decisions no one checked against their sources; the executive reading a chart with a truncated axis as a trend. None of these are math problems — they are literacy and governance problems, which is why [metric definitions](/t/metric-definitions) and a shared [semantic layer](/t/semantic-layer) are infrastructure, not bureaucracy.

Building it is mostly boring plumbing plus culture. Plumbing: a [data catalog](/t/data-catalog) people can actually find, documented freshness and ownership, [quality checks](/t/data-quality) wired into the tools analysts use. Culture: the habit of asking "what would change my mind about this number?" and the safety to answer "I don't know what this counts" without embarrassment. Self-service [analytics](/t/self-service-analytics) fails without this: access to data in the hands of people who cannot read it just automates confident errors.

As the staff-level owner, the leverage is designing defaults that make the literate path the easy path — definitions embedded where queries start, provenance one click away, anomaly checks built into refresh pipelines — and measuring the capability honestly: can a new analyst answer the same question two teams disagree on? Do postmortems ever cite a definition error? For data scientists at staff level, literacy includes your deliverables: publish models with the metric definitions they assume, flag the columns whose meaning drifted, and treat a colleague's misuse of your notebook output as documentation debt, not user error. Treat literacy as the precondition for every other data investment; no platform buys it secondhand.
