---
title: "Customer Data Platform (CDP)"
summary: "Tools like Segment that collect events once and route them to many destinations."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["CDP", "customer data platforms", "customer data hub"]
prereqs: ["analytics-event-tracking"]
related: ["data-ingestion", "reverse-etl", "identity-resolution", "analytics-event-tracking", "tracking-plan", "third-party-integration"]
---

A customer data platform (CDP) is a tool that collects events and customer attributes from your apps and sites once, builds a profile per customer, and routes that data to many destinations. The pitch is "collect once, send everywhere". Common examples include Segment and mParticle, though the category overlaps with analytics and marketing tools.

The classic mistake is adding a separate tracking snippet for every tool. Each new destination means a code change and a redeploy; the same action gets sent with slightly different names and properties; nobody agrees on the numbers. A CDP centralizes collection so the app sends `order_completed` once and the CDP forwards it.

```
app / site ─▶ CDP ─┬▶ analytics
                   ├▶ CRM
                   ├▶ email / marketing
                   └▶ warehouse
```

## What a CDP does and does not do

- Collects events through one SDK or API and fans them out to destinations.
- Often stores a customer profile and may do [identity resolution](/t/identity-resolution) to stitch identifiers.
- May sync audiences to ad and email tools, overlapping with [reverse ETL](/t/reverse-etl).
- It does not fix a bad [tracking plan](/t/tracking-plan), and not every CDP resolves identity well, so check what it actually does.

## Trade-offs

A CDP is another vendor in the critical path: cost, [lock-in](/t/vendor-lock-in), and a single point of failure if it goes down. Some teams self-host to avoid this. For a small stack with two destinations, direct integration may be simpler. Decide based on how many destinations you have, whether you need identity resolution, and who should own the event contract. See [event streaming](/t/event-streaming) for how fan-out is often implemented.
