---
title: "Extract Class"
summary: "Splitting a class that does too much."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["extract class refactoring", "split class"]
prereqs: ["god-object"]
related: ["god-object", "single-responsibility-principle", "feature-envy", "legacy-code"]
---

Extract class is a refactoring where a group of related fields and methods moves out of one class into a new one. It's the usual fix for a [god object](/t/god-object), and it's guided by the [single responsibility principle](/t/single-responsibility-principle): the new class takes the part that changes for its own reason.

```python
# Before: a Customer that also manages its address formatting
class Customer:
    def __init__(self, name, street, city, postcode):
        self.name, self.street, self.city, self.postcode = name, street, city, postcode

    def mailing_label(self):
        return f"{self.name}\n{self.street}\n{self.city} {self.postcode}"

# After: the address has its own class, and the customer delegates to it
class Address:
    def __init__(self, street, city, postcode):
        self.street, self.city, self.postcode = street, city, postcode

    def formatted(self):
        return f"{self.street}\n{self.city} {self.postcode}"

class Customer:
    def __init__(self, name, address):
        self.name, self.address = name, address

    def mailing_label(self):
        return f"{self.name}\n{self.address.formatted()}"
```

The address rules now live together, and the customer no longer needs to know how addresses are formatted.

The trade-off is that the new class needs a clear name and a clear reason to exist. Moving code to satisfy a metric can produce a class that's just a grab bag. Each extraction also changes callers, so a refactoring of this size needs tests in place first, especially in [legacy code](/t/legacy-code).

The classic mistake is extracting a class that only holds a few fields and has no behaviour of its own. Look for a group of data that always travels together and a set of methods that use only that data. If the methods mostly touch the other class, the logic may belong there instead, which is the [feature envy](/t/feature-envy) signal. Also check that the new class has a single reason to change.
