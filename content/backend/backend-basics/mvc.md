---
title: "MVC"
summary: "Model-View-Controller: separating data, presentation and input handling."
levels: { backend: junior, frontend: junior }
aliases: ["Model-View-Controller"]
prereqs: ["backend"]
related: ["business-logic", "request-handler", "backend", "request-lifecycle"]
---

MVC splits an application into three parts, so each one has a single job:

- **Model:** the data and the rules about it, such as what an order is and when it can be cancelled.
- **View:** what the user sees, such as an HTML template or the shape of a JSON response.
- **Controller:** receives the request, asks the model to do the work, and picks the view to show.

Here's the idea in a Python web framework (the method names are illustrative, and yours will differ):

```python
# Controller: receives the request and chooses the response
@app.get("/orders/<int:order_id>")
def show_order(order_id):
    order = Order.find(order_id)                        # model: data and rules
    return render_template("order.html", order=order)   # view: presentation
```

Frontend frameworks use the same separation under other names. The labels matter less than the principle: keep the rules apart from the code that handles input and output.

The classic mistake is the "fat controller", where pricing rules, database queries and email sending all sit inside the request handler. That code is hard to reuse and hard to test without a running server. Move the rules into the model or a service, and keep the controller thin. [Business logic](/t/business-logic) is the part that most needs to be separated, and [request handlers](/t/request-handler) are where the split shows up in practice.
