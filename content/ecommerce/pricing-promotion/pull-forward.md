---
title: "Pull-Forward Effect"
summary: "The post-promo dip: sales borrowed from next month, arriving early with a discount attached."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["forward buying", "promo hangover", "demand borrowing"]
prereqs: []
related: ["cannibalization", "promo-dependence", "promo-uplift", "stock-out-rate"]
---

Pull-forward is the decline that follows a promotion: customers who stocked up early leave a hole in next period's demand. A campaign that "returned" +Rp 500M can have pulled Rp 200M out of the following two weeks — the honest lift is smaller, slower and sometimes negative on profit.

```text
baseline 100/wk · promo wk +300 · then 70, 65, 80 → 100
true incremental ≈ (300) − (−30 −35 −20) ≈ 215
   ...and it arrived at campaign margin, not baseline margin
```

The shape tells you what kind of demand you have. Non-perishables with long use cycles (detergent, diapers, coffee, skincare refills) pull forward heavily — households *can* stockpile; impulse and perishable demand pulls forward little. A store selling big-ticket with financing barely pulls (you can't buy three fridges for a flash sale) — which is one reason double-date campaigns skew toward FMCG carts.

Measuring it properly means reading the *post-period against forecast*, not against last year's post-period (last year also had a promo; that is the [promo-dependence](/t/promo-dependence) trap). Holdouts make it visible instantly: a region that saw no campaign doesn't dip afterward — the whole dip is the promo's shadow.

Why finance remembers: pull-forward distorts the calendar itself. Quarter-end campaigns borrow from Q+1's opening weeks; a team that ends Q4 strong "for the third quarter in a row" may be running a permanent borrowing scheme where every quarter starts in the red. Watch the *two-quarter* window, not the promo week.

Operational note for the inventory brain: if your [stock-out](/t/stock-out-rate) planning assumes campaign demand was new demand, you will over-reorder into a valley nobody predicted. Forecasting the hangover — subtracting the borrowed base — is the mature move; [forecast bias](/t/forecast-bias) tracks exactly this error.

When not to care: deliberate clearance (converting tomorrow's slow sales into this month's cash *is* the point), and acquisition campaigns where stocked-up *new* customers are the real asset — the dip is the entry fee, judge the cohort's [repeat rate](/t/repeat-purchase-rate).
