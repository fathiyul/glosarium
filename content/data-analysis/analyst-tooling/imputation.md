---
title: "Imputation"
summary: "Filling blanks with a stand-in value, and what that costs you in certainty."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["imputation", "imputing missing values", "filling missing values", "mean imputation"]
prereqs: ["missing-data", "statistics-basics"]
related: ["missing-data", "train-test-split", "data-cleaning", "central-tendency", "outliers", "correlation-coefficient"]
---

Imputation fills a blank with a stand-in value so the rest of the row can be used: a mean, a median, a zero, a most-common category, or a value predicted from the other columns. The alternative is to drop the row, which analysts call list-wise deletion.

It is a trade, not a fix. Deleting rows loses data and biases the sample when the blanks are not random; imputing keeps the row count and adds invented values. What imputation costs is specific enough to name:

- Every imputed value is the same number, so the column looks more concentrated than it is and standard deviations come out too small. **Filling with a constant shrinks variance.**
- The imputed rows sit at the mean of one variable and not at the mean of the other, so the relationship between them looks weaker than it is. **Imputation biases correlations toward zero** ([correlation coefficient](/t/correlation-coefficient)).
- The distortion grows with the share of blanks. Filling a few percent is usually survivable; filling a large fraction is a different analysis wearing the same clothes.

Mean and median are not interchangeable. The median is the safer default when a column is skewed or carries outliers, because a handful of extreme values drag the mean, and every imputed row with it ([outliers](/t/outliers), [central tendency](/t/central-tendency)).

The classic mistake is imputing **before** splitting. Compute the fill value on the whole dataset, fill the blanks, then split into train and test, and your test rows have partly been built from information that came from the training rows. Fit the imputation on the training set and apply the same rule to both ([train/test split](/t/train-test-split)).

Two habits cost nothing. Add an indicator column saying "this value was filled", so the fact of missingness survives — it is often the useful part ([missing data](/t/missing-data)). And report how many values you filled and with what. An imputation nobody knows about is a number nobody can defend.
