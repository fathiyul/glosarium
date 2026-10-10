---
title: "Retention Analysis"
summary: "Measuring whether users come back over time."
levels: { data-analyst: mid-level }
aliases: ["retention analysis", "user retention", "retention curve", "cohort retention"]
prereqs: ["cohort-analysis", "group-by"]
related: ["cohort-analysis", "funnel-analysis", "segmentation", "metric-definitions", "kpi-design", "descriptive-analysis"]
---

Retention analysis asks whether users come back. The unit of analysis is a cohort — usually the group of users who started in the same period — and the output is a curve: the share of that cohort still active one week, two weeks, four weeks, twelve weeks in.

```sql
-- active users per cohort, by weeks since signup
-- (date arithmetic differs between databases)
SELECT cohort_week,
       weeks_since_signup,
       COUNT(DISTINCT user_id) AS active_users
FROM (
  SELECT u.cohort_week,
         a.user_id,
         FLOOR((a.activity_date - u.cohort_week) / 7) AS weeks_since_signup
  FROM cohorts u
  JOIN activity a ON a.user_id = u.user_id
) x
GROUP BY cohort_week, weeks_since_signup;
```

Retention is a curve, not a number. A single "retention rate" hides whether people fall away in week two or in week twelve, and those are completely different products with completely different fixes. What you want to read is the shape, and whether the shape is improving cohort over cohort ([cohort analysis](/t/cohort-analysis)).

Two classic mistakes:

**Comparing a fresh cohort to a mature one.** A cohort that signed up last week cannot be compared to a six-month-old cohort at week twelve — it has not had the chance to be bad yet. Shallow curves at the right-hand edge of a retention table are usually an artefact of age, not a decline. Compare cohorts at the same age.

**Mixing window definitions.** Rolling retention — active in any seven-day window — is always higher than fixed-window retention — active in the specific seventh week. Two dashboards, one reporting a much larger number than the other, both computed correctly. Pick one definition, write it down, and keep it ([metric definitions](/t/metric-definitions)).

Three details that decide the answer: the activity definition (a user who opens the app only to close it is "active" under most definitions), the denominator (everyone who signed up, or only those who were ever active), and the segment, since a channel that brings many low-intent users will drag the curve for everyone ([segmentation](/t/segmentation)). A weak retention curve with a healthy funnel is the pattern that says you are buying users who do not stay ([funnel analysis](/t/funnel-analysis)).
