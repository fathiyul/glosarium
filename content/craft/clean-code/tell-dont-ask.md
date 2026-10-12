---
title: "Tell, Don't Ask"
summary: "Tell objects what to do instead of querying their state and deciding for them."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["tell don't ask", "TDA"]
prereqs: ["encapsulation"]
related: ["law-of-demeter", "feature-envy", "encapsulation", "command-query-separation"]
---

Tell, don't ask is the guideline that you should tell an object to do something, rather than asking it for its data and then deciding what to do with that data outside it. The object is the one with the knowledge, so it should be the one that acts.

```python
# Ask: fetch the state, then decide outside the account
if account.balance >= amount:
    account.balance -= amount

# Tell: the account decides, and keeps its own rules together
account.withdraw(amount)
```

In the first version, every caller has to remember the rule that a withdrawal needs enough balance. In the second, `withdraw` owns the rule, and a change to it happens in one place.

The trade-off is that a "tell" method can grow into a large object with many commands, and not every query is a problem. Reading a value to display it is fine. The guideline is most useful when a decision based on the data is made outside the object that owns it.

The classic mistake is treating every getter as a smell, then wrapping plain data in methods that only forward values. Use it where a rule is at stake, such as money, permissions and state transitions. This is closely related to the [law of Demeter](/t/law-of-demeter), since asking one object for another's internals and then deciding is how that rule gets broken, and a [feature envy](/t/feature-envy) method is often the sign that the decision belongs to the other object.
