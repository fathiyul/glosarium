---
title: "Finite State Machine"
summary: "A model with a fixed set of states and allowed transitions, e.g. an order going from paid to shipped."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["FSM", "state machine"]
prereqs: ["enum"]
related: ["state-management", "option-type", "reducer", "idempotence"]
also: [design-patterns, product-features]
---

A finite state machine (FSM) is a model with a fixed set of states, and a set of allowed transitions between them. At any moment the object is in exactly one state, and an event can move it to another state only if a transition is defined for that pair.

```python
ALLOWED = {
    "pending": {"paid", "cancelled"},
    "paid": {"shipped", "refunded"},
    "shipped": {"delivered"},
}

def transition(order, new_state):
    if new_state not in ALLOWED.get(order["state"], set()):
        raise ValueError(f"cannot go from {order['state']} to {new_state}")
    order["state"] = new_state

order = {"state": "pending"}
transition(order, "paid")
transition(order, "shipped")
# transition(order, "pending")  -> ValueError: cannot go from shipped to pending
```

The transition table is the important part: it lists every legal move in one place, so a bug like "shipped an unpaid order" is rejected instead of quietly happening.

The trade-off is design effort. A simple flag works fine for two states, and an FSM with many states and events can be harder to maintain than the code it replaces. It also makes you decide upfront what every state means, which is good discipline but takes time. Libraries exist for this, though a small table is often enough.

The classic mistake is letting code set the state field directly, bypassing the table, so the rules exist only in people's heads. Route every change through one function, and write tests for the forbidden transitions as well as the allowed ones. [Reducers](/t/reducer) in frontend state management follow the same idea.
