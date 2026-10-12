---
title: "Aspect-Based Sentiment"
summary: "Sentiment per *part* of the product experience — 'fast courier, bad packaging' becomes two findings."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["ABSA", "aspect mining"]
prereqs: ["sentiment-analysis"]
related: ["sentiment-analysis", "return-rate", "courier-performance", "product-conversion-rate"]
---

Aspect-based sentiment analysis splits a review into its *targets* — packaging, size/fit, product quality, delivery speed, price, service — and scores sentiment *per aspect*. E-commerce text is inherently multi-subject; whole-document polarity ("positive") is an aggregate that deletes the very information reviews exist to carry.

```text
review: "bahan bagus, jahitan rapi, cuma ukurannya kebesaran
         dan ongkirnya mahal"
aspects: material + · stitching + · size − · shipping cost −
```

The output format that matters is a table, not a score: aspect × period × SKU/category × volume-weighted negativity. That table answers the questions plain sentiment can't: which category's *sizes* drive returns (feed the [return-rate](/t/return-rate) reason split), which listings' "mahal" complaints cluster while the price is actually [competitive](/t/price-index) (perceived-value and anchor problem, not price), and which courier lanes carry the delivery-speed negativity that never appears in OTD because the parcel *was* technically on time.

Implementation honesty: ABSA is harder than polarity — it needs aspect *detection* plus per-aspect classification plus the language handling from [sentiment analysis](/t/sentiment-analysis); rule/keyword approaches (regex on "lama", "rusak", "kekecilan") are a legitimate v1 in Indonesian marketplaces and often outperform imported generic models on code-switched text; modern LLM-assisted extraction makes aspect labeling practical, but the eval is still a human-labeled sample per aspect — the model inherits your taxonomy, not the truth.

Taxonomy discipline is the real work: aspect sets must map to *owners* (packaging → warehouse, size → merchandising, speed → courier selection) or the dashboard produces opinion without action. Freeze aspect definitions across periods; a taxonomy edit mid-quarter kills trend comparisons silently.

When it's overkill: categories where reviews are boilerplate ("bagus,推荐" spam, single-word ratings), and low volume where structured signals (return reasons, ticket categories) already carry the same message with zero modeling.
