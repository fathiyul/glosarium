---
title: "Active Record"
summary: "Objects that know how to save themselves to the database."
levels: { backend: mid-level }
aliases: ["Active Record pattern", "ActiveRecord"]
prereqs: ["relational-database"]
related: ["data-mapper", "repository-pattern", "relational-database", "schema"]
also: [sql]
---

Active Record is a pattern where an object represents a row in a database table and also knows how to load, save and delete itself. The class holds the data and the persistence code together, so `user.save()` writes the user's row.

```python
class User:
    def __init__(self, id=None, name=None):
        self.id = id
        self.name = name

    def save(self, db):
        if self.id is None:
            self.id = db.insert("users", {"name": self.name})
        else:
            db.update("users", self.id, {"name": self.name})
```

Frameworks such as Ruby on Rails popularized the approach, and the result is a short, readable path from code to database.

The trade-off is coupling. The domain object now depends on the database layout, so its tests need persistence, and the business rules are mixed with SQL-shaped concerns. A change to a column can ripple through the object's logic. For simple records with little behaviour, that coupling costs little. For a rich domain, it becomes a burden.

The classic mistake is using Active Record for objects with complex rules and many relationships, then finding the business logic tangled with saving and loading. The alternative is a [data mapper or repository](/t/repository-pattern), where the object knows nothing about the database and a separate class moves it in and out. Choose by how much behaviour the object carries. Keep the [schema](/t/schema) and its [constraints](/t/constraint) in the database either way.
