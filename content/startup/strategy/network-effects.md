---
title: "Network Effects"
summary: "A product becoming more valuable as more people use it."
levels: { tech-entrepreneur: pmf }
aliases: ["network effects", "network effect", "nfx"]
prereqs: ["moat", "two-sided-marketplace"]
related: ["moat", "viral-loop", "two-sided-marketplace", "switching-costs"]
core: [tech-entrepreneur]
---

**Network effects** make each new user raise the product's value for existing users: more buyers attract more sellers (marketplaces), more members improve matching (dating, hiring), more contributors enrich content (reviews, code, data). Past a threshold, growth self-fuels — the product sells itself because everyone is already there.

```text
direct:   your friends joining makes YOUR experience better (messaging, social)
indirect: more riders attract more drivers → shorter waits → more riders (marketplace flywheel)
data:     more usage trains better models/recommendations for everyone
```

Not all scale is network effects: bulk purchasing and brand awareness help big companies without users adding value *to each other*. The test is defection-shaped — if half the users left, would the remainder's experience degrade? If yes, network effects; if merely lonely, scale effects.

The classic mistakes:

- Claiming network effects for scale economies. "More users = cheaper servers" is purchasing power, not a network effect — and it rarely defends anything. Apply the defection test honestly.
- Cold-start blindness. Network effects cut both ways: empty networks repel (why join nothing?). Seed supply, subsidize early density, fake initial liquidity — the ignition strategy IS the strategy ([chicken-and-egg](/t/chicken-and-egg-problem)).
- Assuming effects persist. Multi-tenanting (users on several networks), interoperability mandates and shifting use cases all decay effects over time. Defend actively; measure defection sensitivity, not just growth.
- Local effects mistaken for global. Dense-city liquidity does not transfer across regions; language-group networks do not span languages. Effects are usually local — expand cluster by cluster, not by flag-planting.
- Monetizing the effect away. Aggressive take-rate hikes and ad loads degrade the experience driving the effect. Harvest sustainably or kill the goose ([take rate](/t/take-rate)).

**Build for:** density first (one cluster humming beats ten thin), defection-proof value second, monetization third — in that order, always. See [seven powers](/t/seven-powers) for where networks sit among durable advantages.
