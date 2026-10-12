---
title: "Landing Page Conversion Rate"
summary: "Sessions on an entry page that convert — where the ad's promise meets the page's delivery."
levels: { data-analyst: junior }
aliases: ["LP CR", "landing page CR"]
prereqs: ["conversion-rate"]
related: ["conversion-rate", "rpv", "landing-page-test", "ab-testing"]
---

Landing-page conversion rate = conversions ÷ sessions *on pages that served as entry points*. It is [site-wide CR](/t/conversion-rate) cut by destination, and its entire value is in the match it audits: the ad made a claim, this page is the receipt.

```text
same ad set, two LPs:
product-page entry   CR 2.8%   (deep link to the exact item)
homepage entry       CR 0.9%   (visitor must re-find the thing)
the ad didn't change — the landing promise did
```

Three readings that carry weight:

- **Channel-to-page pairing.** Paid social's cold traffic lands differently than search's intent traffic; comparing their LP CRs is comparing audiences, not pages. Rank pages *within* a channel.
- **The message-match diagnostic.** LP CR collapsing while [RPV](/t/rpv) holds steady means the page sells *differently*, not *worse* (maybe a higher-consideration basket); both collapsing with flat [CTR](/t/ctr) means the creative started a check-bait the page cashes — fix the promise or the price shown.
- **Campaign-period honesty.** During double-date promos every page's CR moves with the tide; judge a landing page against its own *non-campaign* baseline and the platform-wide lift.

The experiment discipline: the point of splitting CR by landing page is to [test](/t/landing-page-test) against a counterfactual — same traffic mix, same offer, one element changed. Beware the two classic sampling sins: testing on tiny per-page traffic (significance is fictional — pool variants by *intent group*, not by URL), and "redesign uplift" claims measured across a campaign boundary, where the tide carried everyone.

When the metric stops helping: entry pages that exist to *route* (category hubs where value appears on page 2 — measure the path, not the page), and paid landing where the real number is RPV × CPC economics; a 5% CR on Rp 5,000 baskets can lose to 2% on Rp 30,000 baskets. Conversion rate is a diagnostic step, never the scoreboard.
