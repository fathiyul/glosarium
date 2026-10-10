---
title: "Null Object"
summary: "A do-nothing object used instead of null checks."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["null object pattern", "do-nothing object"]
prereqs: ["null"]
related: ["null", "option-type", "strategy-pattern", "defensive-programming"]
---

The null object pattern replaces a null reference with an object that has the same interface and does nothing. Code that uses the object can call its methods without checking for `None` first, and the do-nothing version simply produces no effect.

```python
class Logger:
    def info(self, message): ...

class ConsoleLogger(Logger):
    def info(self, message):
        print(message)

class NullLogger(Logger):
    def info(self, message):
        pass                                  # deliberately does nothing

def process(order, logger=NullLogger()):
    logger.info(f"processing {order}")        # no None check needed
    return order.total
```

Callers don't scatter `if logger is not None` checks through the code. The decision that "no logging" is a valid choice is made once, when the object is created.

The trade-off is that a null object can hide a real absence. If a caller expects an object and gets the do-nothing version, nothing fails, and the missing behaviour goes unnoticed. That's a problem when the operation really was required, such as a payment.

The classic mistake is using a null object where the absence matters. Use it for optional behaviour, such as logging, metrics or a default strategy, where doing nothing is the correct answer. For results that may be missing, an [option type](/t/option-type) makes the absence explicit to the caller, and [defensive programming](/t/defensive-programming) covers when to fail instead.
