---
title: "Sentiment Analysis"
summary: "Reading opinions at scale from reviews, chats and social — with the bias audit that comes first."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["opinion mining", "sentiment scoring"]
prereqs: []
related: ["aspect-based-sentiment", "review-rate", "net-promoter-score", "csat"]
---

Sentiment analysis classifies free text (reviews, chat logs, social mentions) as positive/negative/neutral — or scores a continuum — so opinion becomes a *column* you can trend, segment and alert on. The pipeline in production: collect the text you already own (reviews, tickets), label a sample, train or prompt a classifier, and **validate against the Indonesian reality**: models built on English behave poorly on mixed Indonesian–English–regional code-switching; models fine-tuned on local review data ([IndoBERT-family encoders](/t/aspect-based-sentiment) are the common approach) markedly outperform generic sentiment APIs.

```text
review text: "packing aman, kurir ramah, tapi barangnya lama
              banget dateng 8 hari padahal kilat"
polarity:    neutral-positive   ← WRONG without aspect split
aspects:     packaging + / courier + / speed −   ← the finding
```

That failure mode *is* the lesson: e-commerce text is one sentence of praise wrapped around the actual complaint. Positive/negative labeling alone drowns signal in mixed reviews — which is why aspect-based extraction (next page) isn't an upgrade, it's the minimum viable reading.

The bias audit that must happen before anyone quotes the numbers: reviewers are self-selected (the happy majority rarely writes), incentivized reviews skew positive ([review-rate](/t/review-rate) hygiene), and the classifier inherits whatever the labeling sample missed. Quantify the error on a *human-labeled* holdout, and report sentiment as "share of *texts*, among *willing writers*, classified by a model at ~X accuracy" — the honest sentence beats the dashboard headline every time the complaint arrives.

Uses that change decisions: shipping-lane monitoring (sentiment trend per courier region catches degradation before ratings drop), listing fixes ("gambar tidak sesuai" clusters → photo audit, not a discount), and campaign reaction (brand-lift text mining after a KOL launch reads *what* resonated, not just volume).

When not to bother: when structured signals already carry the answer ([return reasons](/t/return-rate), [OTD](/t/otd-rate)) — text mining is for the signal that exists *only* in text.
