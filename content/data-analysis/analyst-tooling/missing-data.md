---
title: "Missing Data"
summary: "Blank values that arrive for reasons, and what the reason does to your analysis."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["missing data", "missing values", "blank values", "nulls in analysis"]
prereqs: ["data-profiling", "data-cleaning"]
related: ["imputation", "data-cleaning", "null-in-sql", "segmentation", "data-quality-check", "data-quality-dimensions"]
---

Missing data is blank values that arrive for reasons. The reason is the whole subject, because it decides whether a blank is noise to be cleaned or a finding to be read.

The useful distinction:

- The blank is the result of something unrelated to the value itself: a dropped event, a page that never loaded, a survey question skipped by chance. Dropping these rows is usually harmless, and analysts call the case **missing at random**.
- The blank exists because of the thing you are measuring: a user who never logged in has no last-login date, a customer with no end date has not churned, a product with no rating may simply have no ratings. These blanks carry information, and treating them as "no value" deletes the signal. This is **informative missingness**, and it is the case that breaks naive handling.

That is why the first step is not a fill but a question: ask what a blank means in this column, and look at whether the blanks cluster in one segment, one region, one month or one product ([segmentation](/t/segmentation)).

Then choose a handling, deliberately:

- List-wise deletion: drop rows with blanks in the columns you are using. Simple, honest and fine when the missing share is small. It becomes biased when rows are not missing at random, and it can quietly delete exactly the cases you wanted to study.
- Imputation: fill the blanks and keep the row. It shrinks variance and distorts relationships, and done before a train/test split it leaks information ([imputation](/t/imputation)).
- Model the missingness: sometimes the best predictor of a value is whether it is missing at all.

Two things to check before any of it. Profile the column: is the null rate stable, or did it jump this month ([data profiling](/t/data-profiling))? A rate that goes from a few percent to a large one in a single month is an upstream incident, not a statistics problem ([data quality checks](/t/data-quality-check)). And hunt the sentinels: `-1`, `9999-12-31`, `"unknown"`, `"N/A"` and `""` are missing data wearing a costume, and most tools will happily average them ([data cleaning](/t/data-cleaning), [NULL in SQL](/t/null-in-sql)).
