---
title: "Domain-Driven Design"
summary: "Modeling software closely on the business domain and its language."
levels: { backend: senior, frontend: senior }
aliases: ["DDD", "Domain Driven Design", "domain-driven", "Eric Evans DDD", "strategic and tactical DDD"]
prereqs: ["ubiquitous-language", "bounded-context"]
related: ["bounded-context", "ubiquitous-language", "aggregate", "domain-event", "context-map", "strategic-vs-tactical-ddd", "event-storming"]
core: [backend]
---

**Domain-driven design (DDD)** is an approach to building software for **complex business domains** by putting the **domain and its language at the center**, and having developers and domain experts model it together. It was set out in Eric Evans' 2003 book and is widely used for designing services and modules.

The core belief: the hardest part of most software isn't technology. It's **understanding the business problem**, and code should reflect that understanding in the same words the business uses.

## Two sets of ideas

**Strategic design**: the big picture, for carving up large systems ([strategic vs tactical](/t/strategic-vs-tactical-ddd)).

- **[Ubiquitous language](/t/ubiquitous-language)**: one shared vocabulary between developers and domain experts, used in conversation *and* in the code, with no translation layer. If the business says "policy lapses", the code has `Policy.lapse()`.
- **[Bounded contexts](/t/bounded-context)**: explicit boundaries inside which a model and its terms are consistent.
- **[Context maps](/t/context-map)**: how contexts relate and integrate, including an [anti-corruption layer](/t/anti-corruption-layer) to protect a clean model from a messy one.
- **Subdomains**: core (your competitive advantage, invest here), supporting and generic (buy or keep simple).

**Tactical design**: patterns for modeling inside a context.

- **Entities**: objects with identity that persists over time ([entities](/t/ddd-entity)).
- **[Value objects](/t/value-object)**: defined by their values, immutable (`Money`, `DateRange`).
- **[Aggregates](/t/aggregate)** with a root: a cluster of objects treated as one unit for consistency, changed only through the root ([aggregate root](/t/aggregate-root)).
- **[Domain events](/t/domain-event)**: something meaningful that happened ("OrderShipped").
- **Repositories, domain services** ([domain services](/t/domain-service)), and factories.

```python
class Order:                                  # aggregate root: enforces the rules of the whole order
    def add_item(self, product_id, quantity, price: Money):
        if self.status != "draft":
            raise DomainError("Cannot modify a submitted order")
        self.items.append(OrderItem(product_id, quantity, price))
```

Business rules live in the domain model, not scattered in controllers and database triggers (avoid the [anemic domain model](/t/anemic-domain-model), where objects are just data bags).

## How it's practiced

Collaborative modeling with domain experts, such as [event storming](/t/event-storming), where people map business events on a wall. The conversation matters more than the diagrams.

## When it's worth it

- **Complex domains** with many rules, where understanding the business is the main challenge (insurance, logistics, finance, healthcare).
- Large systems and teams that need clear boundaries.

## When it isn't

- **Simple CRUD applications**: the overhead of heavy tactical patterns gives little. Use the strategic ideas (language, boundaries) lightly.
- **Teams without access to domain experts.**
- Applying every pattern everywhere. Over-engineering is the main failure mode. Many teams get the most value from **ubiquitous language and bounded contexts**, and apply tactical patterns only to the complex core.
