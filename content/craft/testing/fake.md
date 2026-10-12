---
title: "Fake"
summary: "A working but simplified implementation, like an in-memory database."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["fake object", "in-memory fake"]
prereqs: ["test-double"]
related: ["test-double", "stub-double", "mock", "test-database", "testcontainers"]
---

A fake is a test double with a real, working implementation that is simplified for testing. It really stores and retrieves data, but it does it in memory, or in some other cheap way, instead of using the production system. Unlike a [stub](/t/stub-double), which returns fixed answers, a fake behaves like the real thing, just more simply.

```python
class FakeUserRepo:
    def __init__(self):
        self.users = {}

    def save(self, user):
        self.users[user.id] = user

    def find(self, user_id):
        return self.users.get(user_id)

def test_renames_user():
    repo = FakeUserRepo()
    repo.save(User(id=1, name="Ada"))
    rename(repo, user_id=1, new_name="Ada Lovelace")
    assert repo.find(1).name == "Ada Lovelace"
```

The test checks the outcome in the repository, so it doesn't care how `rename` reads and writes the data. That's the point of a fake: it lets the test check behaviour, not calls.

The trade-off is that a fake is code you have to maintain. It must match the real system closely enough for the tests to mean something. A fake that skips rules the real database enforces, such as unique constraints or transaction behaviour, will pass tests that production then fails. Fakes can also grow into a second implementation, which is expensive to keep in step.

The classic mistake is writing a fake for a dependency that a real in-memory or containerized version would serve better. If a real database can run quickly in a test, use it, through [test databases](/t/test-database) or [Testcontainers](/t/testcontainers). Use a fake when the real thing is slow or unavailable, and keep some tests against the real system.
