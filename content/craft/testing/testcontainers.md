---
title: "Testcontainers"
summary: "Spinning up real databases and services in Docker for tests."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["testcontainers library", "docker tests"]
prereqs: ["test-database"]
related: ["test-database", "fake", "integration-test", "docker-image"]
---

Testcontainers is a library family that starts real services, such as a database, a message broker or a cache, in Docker containers for the duration of a test. The test connects to the actual engine, and the container is discarded afterwards. Versions exist for several languages.

```python
# Illustrative: the API differs slightly between language libraries
from testcontainers.postgres import PostgresContainer

def test_saves_user():
    with PostgresContainer("postgres:16") as db:
        url = db.get_connection_url()
        # run migrations and the test against `url`
```

Because the engine is the real one, the test catches problems a stand-in would miss, such as SQL that only works in one database, or constraints that behave differently. Each run starts from a known state.

The trade-off is that containers need Docker, so tests need a machine or CI runner that can run it, and each container takes time to start. Running many containers in parallel can strain a small machine. Pinning the image version keeps results stable, while using `latest` makes them change without warning.

The classic mistake is starting a new container for every test function. Startup costs dominate, and the suite becomes very slow. Share a container across a test session when tests can isolate their data, as described in [test databases](/t/test-database). For a lighter option without Docker, see [fakes](/t/fake), and for the broader picture of which tests to run against real dependencies, see [integration tests](/t/integration-test).
