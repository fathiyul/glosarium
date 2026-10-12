---
title: "BCG Matrix for Catalogs"
summary: "Sorting product lines into stars, cash cows, question marks and dogs by growth and share — borrowed from portfolio strategy, used with care."
levels: { data-analyst: junior }
aliases: ["growth-share matrix", "product portfolio matrix"]
prereqs: ["competitor-analysis"]
related: ["abc-xyz-analysis", "assortment-gap", "long-tail-contribution", "margin-per-sku"]
---

The BCG matrix, from growth-strategy consulting, sorts portfolio units on two axes: **market growth** (is the category expanding?) and **relative share** (are you winning it?). Applied to a product catalog: Stars (growing category, you lead — invest to hold), Cash Cows (mature category, you lead — harvest, fund the rest), Question Marks (growing category, you don't lead — decide: invest or exit), Dogs (neither — delist).

```text
            growing        mature
leading     star          cash cow
lagging     question mark dog
```

The value as an *analyst* tool: it forces a two-dimensional judgment where dashboards tempt you to one — a category with flat sales might be a dog *for you* while the market grows (losing share quietly), or a cow holding share in a shrinking category (harvest, but date the end). "Share" in practice = your category revenue ÷ trackable market revenue — in Indonesian marketplace data that is often [price-index](/t/price-index) scraped categories or platform trend reports; the number's quality is the method's ceiling, state it.

The famous critiques, which are why it is a *lens* and never a budget: cash cows feed stars assumes the money moves freely (in a marketplace store, capital, shelf and *seller rating* are the constraints), and "share of a category you defined" is a self-fulfilling claim — redefine the category narrowly and everything is a star. Add the profit reality: [margin per SKU](/t/margin-per-sku) can make a "star" unprofitable; volume leadership at negative margin is just a faster dog.

The catalog-specific cousin many teams actually run: a growth-share grid by *SKU* is noisy (one item's category share shifts with a single campaign), so classify at **category/line level** and let ABC/XYZ own the SKU-level policy. The quadrant diagram remains a great meeting device because it is legible; the mistake is treating the corner label as a decision when the underlying axes were guessed.
