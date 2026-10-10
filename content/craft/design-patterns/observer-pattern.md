---
title: "Observer"
summary: "Notifying subscribers when something changes."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["observer pattern", "listener pattern"]
prereqs: ["design-pattern"]
related: ["pub-sub-pattern", "state-pattern", "strategy-pattern", "event"]
---

The observer pattern lets one object, the subject, notify a list of observers when its state changes. The subject keeps references to the observers it knows about, and calls each one directly. Observers register themselves with the subject, and the subject doesn't know what they do with the notification.

```python
class Stock:
    def __init__(self):
        self._price = 0
        self._observers = []

    def attach(self, observer):
        self._observers.append(observer)

    def set_price(self, price):
        self._price = price
        for observer in self._observers:      # the subject calls each observer itself
            observer.price_changed(price)

class PriceAlert:
    def price_changed(self, price):
        print(f"price is now {price}")

stock = Stock()
stock.attach(PriceAlert())
stock.set_price(42)    # price is now 42
```

The subject and its observers are linked in one process, and the subject must hold references to each one.

The trade-off is coupling. The subject depends on the observer interface and must keep the list in step with reality. A slow or failing observer can hold up the whole notification loop, and removing observers correctly is easy to forget.

The classic mistake is letting observers forget to detach, so the subject keeps notifying objects that are no longer needed, which is a [memory leak](/t/memory-leak). Attach and detach in matching places, and consider weak references where the lifetimes differ. If publishers and subscribers should not know about each other at all, and a channel sits between them, that's the [publish-subscribe pattern](/t/pub-sub-pattern).
