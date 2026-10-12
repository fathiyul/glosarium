---
title: "Graceful Degradation"
summary: "Losing non-critical features instead of failing completely."
levels: { backend: senior, frontend: mid-level, data-engineer: senior , data-scientist: senior }
aliases: ["graceful fallback", "degraded mode"]
prereqs: ["fail-fast"]
related: ["fail-fast", "error-boundary", "circuit-breaker", "loading-error-states"]
---

Graceful degradation means that when part of a system fails, the rest keeps working, with the failing feature turned off or replaced by something simpler. A product page that loses its "you may also like" section is still a usable product page. One that shows a blank screen because that section failed is not.

```python
def product_page(product_id):
    product = catalog.get(product_id)           # critical: fail if this breaks
    try:
        suggestions = recommendations.for_product(product_id)
    except TimeoutError:
        suggestions = []                        # non-critical: show the page without them
        metrics.increment("recs.degraded")
    return {"product": product, "suggestions": suggestions}
```

The decision that matters is which parts are critical. The product itself is critical. Recommendations, reviews and badges usually aren't. Once you've decided, the code can say so explicitly.

The trade-off is that degradation can hide a real outage. If the recommendations service is down for a week and nothing reports it, the page looks fine while a feature silently disappears. Count the fallback path, as the metric above does, and alert when it fires often.

The classic mistake is treating every dependency as optional, so a payment or authentication failure also falls back to something that looks like success. Degrade only the features where a partial answer is honest. For the frontend version, an [error boundary](/t/error-boundary) can isolate one widget from the rest of the page.
