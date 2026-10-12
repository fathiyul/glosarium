---
title: "Ingesting from APIs"
summary: "Pulling data from REST APIs with pagination, rate limits and retries."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["ingesting from APIs", "REST API ingestion", "pulling data from APIs", "API extraction", "API connectors"]
prereqs: ["data-ingestion", "rest"]
related: ["pagination", "rate-limiting", "retry-with-backoff", "http-429", "timeouts", "ingestion-connectors"]
core: [data-engineer]
---

Many sources (payments, CRM, ad platforms, support tools) only expose their data through a **REST API**. API ingestion means calling
it repeatedly, politely and robustly, and storing what comes back.

```python
import time, requests

def fetch_all(url, token):
    params = {"limit": 100, "updated_since": last_watermark()}
    while True:
        r = requests.get(url, params=params, timeout=(3, 30),
                         headers={"Authorization": f"Bearer {token}"})
        if r.status_code == 429:                       # rate limited
            time.sleep(int(r.headers.get("Retry-After", 5)))
            continue
        r.raise_for_status()
        page = r.json()
        save_raw(page["data"])                         # store the raw response first
        if not page.get("next_cursor"):
            break
        params["cursor"] = page["next_cursor"]
```

## What to handle

- **[Pagination](/t/pagination)**: loop through pages until there's no next one. Cursor-based is more reliable than offset when
  data changes while you read.
- **[Rate limits](/t/rate-limiting)**: respect `429 Too Many Requests` and the `Retry-After` header
  ([HTTP 429](/t/http-429)). Slow down proactively instead of hitting the limit.
- **Retries**: transient errors (timeouts, `5xx`) need [retry with backoff](/t/retry-with-backoff) and a limit.
  Don't retry client errors like 400 or 401 endlessly.
- **[Timeouts](/t/timeouts)** on every call.
- **Authentication**: tokens expire, so refresh them. Keep secrets in a secrets manager, not in code.
- **Incremental pulls**: use filters like `updated_since` or a cursor you store, instead of fetching everything every time
  ([full vs incremental](/t/full-vs-incremental-load)).
- **Deleted records**: many APIs don't tell you what was deleted. Check whether there's a "deleted" feed, or reconcile.
- **Schema changes**: APIs add and rename fields, and nested objects change ([schema drift](/t/schema-drift)).
- **Partial failures**: if page 40 of 100 fails, you should be able to **resume**, not restart from zero or lose pages silently.
- **Idempotency**: running the same extraction twice shouldn't duplicate data.

## Habits

- **Save the raw JSON** to the [landing zone](/t/landing-zone) as received, with metadata (request time, parameters), and parse it later.
  APIs often can't be re-queried for old states.
- **Log requests, status codes and counts**, and alert when a run returns zero rows.
- **Read the documentation** for quirks: limits, time zones, field meanings, deprecation notices.
- **Use a maintained connector** if one exists ([ingestion connectors](/t/ingestion-connectors)), and write your own when it doesn't
  cover what you need.
- Be a good citizen: schedule heavy pulls off-peak, and don't hammer someone else's API.
