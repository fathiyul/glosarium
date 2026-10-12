---
title: "Law of Demeter"
summary: "Only talk to your immediate neighbors; avoid a.b().c().d()."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["principle of least knowledge", "LoD"]
prereqs: ["encapsulation"]
related: ["tell-dont-ask", "feature-envy", "encapsulation", "coupling"]
---

The law of Demeter, also called the principle of least knowledge, says a method should only call methods on its own object, on objects it was given, and on objects it creates. It shouldn't reach through one object into another's internals. Karl Lieberherr proposed it in the late 1980s.

```python
# Reaches through three objects to get one value
city = order.customer.address.city

# Asks the nearest neighbor for what the caller needs
city = order.shipping_city()
```

In the first version, the caller knows how an order, a customer and an address are built. If the address moves elsewhere, every such line must change. In the second, `Order` hides that structure, so only `Order` needs updating.

The trade-off is that the rule can produce many small wrapper methods that simply forward calls. Those wrappers add code, and if every class forwards every call, the design becomes more indirect without becoming easier to change. Chained calls over plain data, such as a list of records or a configuration tree, are often fine.

The classic mistake is following the rule by letting an object hand out its internal objects, so the caller can still reach through them. The rule is about the knowledge a caller needs, not the number of dots. Ask the object for the result, and let it decide how to get it. This is closely related to [tell, don't ask](/t/tell-dont-ask), and a long chain of calls is often a sign of [feature envy](/t/feature-envy).
