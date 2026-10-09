---
title: "Request Handler / Controller"
summary: "The code that processes a single request."
levels: { backend: junior }
aliases: ["controller", "route handler", "endpoint handler"]
prereqs: ["http-request"]
related: ["request-lifecycle", "mvc", "business-logic", "http-status-codes"]
---

A request handler is the function that runs when a request reaches a particular route, such as `GET /orders/42`. It reads the input, calls the code that does the real work, and returns a response. Frameworks call it a handler, a controller, an endpoint or a view, depending on the design.

```python
@app.get("/orders/<int:order_id>")
def get_order(order_id):
    order = orders.get(order_id)     # illustrative: the work happens elsewhere
    if order is None:
        return {"error": "not_found"}, 404
    return order_to_json(order), 200
```

Keep handlers thin. A good one parses and validates input, calls one piece of [business logic](/t/business-logic), and shapes the response. It shouldn't also query tables, calculate totals and send emails. Thin handlers are easier to read and test.

The classic mistake is letting a handler fail silently or fail loudly in the wrong way. A handler that returns `200 OK` with an error message in the body breaks clients that check status codes. A handler that lets an exception escape can leak a stack trace to the user. Return the right [HTTP status](/t/http-status-codes) and a clean error. For the path a request takes through the whole server, see [request lifecycle](/t/request-lifecycle).
