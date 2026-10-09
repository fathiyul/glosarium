---
title: "Dependency Injection"
summary: "Passing dependencies in instead of creating them inside."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["DI", "dependency injection", "inversion of control", "IoC", "constructor injection"]
prereqs: ["coupling", "class"]
related: ["dependency-inversion-principle", "test-double", "coupling", "program-to-interface", "mock", "framework-independence"]
core: [backend]
also: [backend-basics]
---

**Dependency injection** (DI) means a class **receives** the things it depends on from outside, instead of creating them itself.

```python
# Without DI: the class builds its own dependency (hard-wired)
class ReportService:
    def __init__(self):
        self.db = PostgresDatabase("postgres://prod-db/shop")     # fixed, can't be swapped or faked

# With DI: the dependency is passed in
class ReportService:
    def __init__(self, db):
        self.db = db

service = ReportService(PostgresDatabase(url))       # production
service = ReportService(FakeDatabase())              # test: no real database needed
```

The most common style is **constructor injection**, as above. Dependencies can also be passed as function parameters, or set through setters.

## Why use it

- **Testability**: swap real dependencies for [fakes or mocks](/t/test-double) without patching internals.
- **Loose coupling**: the class depends on an interface ("something that can run queries"), not on a specific implementation ([coupling](/t/coupling),
  [dependency inversion](/t/dependency-inversion-principle)).
- **Flexibility**: change the implementation (a different cache, a new email provider) in one place, where you assemble the objects.
- **Explicit dependencies**: a constructor lists exactly what the class needs.

## Where objects get wired together

Create objects at the application's entry point (the "composition root"), and pass them down:

```python
def main():
    db = PostgresDatabase(os.environ["DATABASE_URL"])
    mailer = SmtpMailer(os.environ["SMTP_HOST"])
    checkout = Checkout(orders=OrderRepository(db), notifier=EmailNotifier(mailer))
    run_server(checkout)
```

This manual wiring is perfectly fine, and it's enough for many applications.

## DI containers and frameworks

Frameworks automate the wiring. Spring (Java), NestJS (TypeScript), ASP.NET Core (C#) and FastAPI (`Depends`) can create objects and inject them for you based on declared types. They save
boilerplate in big applications. They also add magic, which can make errors and flow harder to follow, so understand the manual version first.

## Pitfalls

- **Service locator**: reaching into a global registry to fetch dependencies (`Registry.get("db")`) hides what a class needs and brings back hidden coupling. It's usually worse than DI.
- **Too many constructor parameters** (seven dependencies) suggest the class does too much ([single responsibility](/t/single-responsibility-principle)).
- **Interfaces for everything**, even with one implementation, add noise. Introduce an abstraction where you have a real reason to swap or fake something.
- Don't inject trivial values and pure functions. Inject things with side effects or choices: I/O, clocks, randomness, external services.

DI is simply a technique for passing dependencies in. It's a practical way to follow [program to an interface](/t/program-to-interface).
