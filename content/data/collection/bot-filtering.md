---
title: "Bot and Test Traffic Filtering"
summary: "Keeping crawlers, monitoring checks and internal users out of the numbers."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["bot traffic filtering", "filtering bots", "test traffic filtering"]
prereqs: ["instrumentation"]
related: ["bot-protection", "analytics-event-tracking", "synthetic-monitoring", "real-user-monitoring", "user-agent", "client-vs-server-tracking"]
---

Bot and test traffic filtering is removing non-human or unwanted traffic from analytics: search engine crawlers, uptime and [synthetic monitoring](/t/synthetic-monitoring) checks, internal employees, scrapers, and automated bots. The goal is that reports describe real users.

The classic mistake is not filtering at all, then wondering why a traffic chart spikes at a suspiciously regular interval or why "active users" jumped after monitoring was added. One synthetic check that loads the homepage every minute adds roughly 1,440 events a day from a single robot; a handful of them distort every number.

## What to filter

- Known crawlers: match the [User-Agent](/t/user-agent) against a list of search and social bots. Lists go stale, so combine them with other signals.
- Monitoring and health checks: tag them at the source with a property such as `is_test: true`, instead of guessing later.
- Internal traffic: your office and VPN IP ranges, and staff accounts.
- Obvious bots: missing headers, no mouse or touch, impossible navigation speed, headless browsers. Treat each as a hint, not proof.

## Where to filter

Filter in the pipeline, not only in the tracking code, and keep the raw events. Store a flag on each event rather than deleting rows, so you can change the rule later and re-filter history. Define the rule once and apply it everywhere downstream ([tracking plan](/t/tracking-plan)).

## When not to over-filter

Aggressive rules drop real people. A privacy browser, a corporate proxy, or a legitimate automation tool can look like a bot, and a real user on a shared IP can be caught by an IP rule. Prefer conservative rules, review large changes by hand, and be explicit about what you excluded. See [bot protection](/t/bot-protection), which blocks abuse rather than filtering analytics, and [client vs server tracking](/t/client-vs-server-tracking).
