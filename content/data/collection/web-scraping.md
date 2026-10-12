---
title: "Web Scraping"
summary: "Extracting data from websites, and its legal and reliability limits."
levels: { data-engineer: mid-level, backend: mid-level , data-scientist: mid-level }
aliases: ["scraping", "web scraping", "screen scraping"]
prereqs: ["external-data"]
related: ["external-data", "api-ingestion", "sitemap-robots", "html", "user-agent", "bot-protection"]
---

Web scraping is extracting data from web pages programmatically instead of through an API: fetch the HTML, parse it, and pull out the fields you want. People scrape prices, listings, public records and pages that have no API.

The classic mistake is scraping a site that already offers an API or an export. Scraping is more fragile, because pages change and your selectors break, it is slower, and it is often against the site's terms. If an API, a data dump or a partnership exists, use it.

## Doing it responsibly

- Check the rules first. Respect `robots.txt` ([sitemap and robots](/t/sitemap-robots)) and the site's terms of service. Scraping public data is often lawful, but terms, copyright and personal-data rules vary by jurisdiction and use, so this is not legal advice.
- Identify yourself and be polite: a clear [User-Agent](/t/user-agent), a sensible rate limit ([rate limiting](/t/rate-limiting)), retries with backoff, and caching.
- Expect blocks. Sites use [bot protection](/t/bot-protection), CAPTCHAs and IP bans. Avoid hammering; if you are blocked, that is a signal, not a puzzle to defeat.
- Handle reality: pagination, JavaScript-rendered pages that may need a real browser, login walls, and changing markup.
- Store the raw HTML you fetched so you can re-parse when your extraction has a bug, then parse into structured fields and validate.

## Trade-offs

Scraping is a last resort, not a first choice. It is brittle and can break overnight, so budget for monitoring and expect maintenance. Prefer [API ingestion](/t/api-ingestion) or official data when it exists. Treat scraped output as [external data](/t/external-data) with all the licence and quality caveats that brings.
