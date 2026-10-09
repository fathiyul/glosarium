---
title: "ORM"
summary: "Mapping database tables to objects in code."
levels: { backend: junior }
aliases: ["object-relational mapper", "object relational mapping", "Django ORM", "SQLAlchemy", "Hibernate", "ActiveRecord"]
prereqs: ["relational-database", "table-row-column"]
related: ["orm-vs-raw-sql", "query-builder", "n-plus-one-query", "prepared-statement", "database-connection"]
core: [backend]
also: [sql]
---

An **ORM** (object-relational mapper) lets you work with database tables as objects in your programming language, instead of writing SQL
by hand. Examples: Django ORM, SQLAlchemy, Hibernate, ActiveRecord, Prisma, TypeORM.

```python
# Django-style
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    total_cents = models.IntegerField()
    status = models.CharField(max_length=20)

big = Order.objects.filter(status="paid", total_cents__gt=10000).order_by("-id")[:10]
```

The ORM translates that into SQL and turns the resulting rows back into `Order` objects. Saving works the same way:
`order.status = "shipped"; order.save()` runs an `UPDATE`.

## What you gain

- **Less repetitive code** for the usual create, read, update and delete.
- **Safe parameter handling**, which protects against SQL injection when used properly
  ([prepared statements](/t/prepared-statement)).
- **Relationships** as attributes (`order.customer.name`).
- **Portability** across database engines, to a degree.
- Often **migrations**, schema tools built in.

## What to watch out for

**The N+1 query problem.** Looping over objects and touching a relationship can fire one query per row:

```python
for order in Order.objects.all():      # 1 query
    print(order.customer.name)         # +1 query per order!
```

Fetch related data up front (`select_related`, `joinedload` or your ORM's equivalent). See
[N+1 queries](/t/n-plus-one-query).

**Not knowing the SQL.** An ORM doesn't remove the need to understand the database: indexes, transactions and joins
still decide performance. Print or log the generated SQL and look at it.

**Loading too much.** Fetching whole objects when you need two columns, or whole tables into memory.

**Leaky complexity.** Complex reports and bulk operations are often easier and faster in plain SQL, and ORMs let you drop to
it when needed ([ORM vs raw SQL](/t/orm-vs-raw-sql)). Lighter alternatives are
[query builders](/t/query-builder).

Learn SQL first, or alongside. It makes you much better at using any ORM.
