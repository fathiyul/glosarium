---
title: "Database Connection and Connection String"
summary: "How an app connects to a database: host, port, credentials and options."
levels: { backend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["connection string", "DSN", "database URL", "DATABASE_URL", "connection URI"]
prereqs: ["database", "port"]
related: ["connection-pooling", "environment-variable", "app-configuration", "database-client", "relational-database"]
core: [backend]
---

To use a database, your app opens a **connection** to the database server, over the network (or a local socket). The
**connection string** says where it is and how to log in.

```
postgresql://app_user:s3cret@db.example.com:5432/shop?sslmode=require
└───┬────┘   └──┬───┘ └──┬───┘ └──────┬──────┘ └┬─┘ └─┬┘ └────┬─────┘
 database    user  password          host     port  db     options
 type
```

| Part | Meaning |
|---|---|
| Scheme | Which database/driver (`postgresql`, `mysql`, `sqlite`...) |
| User and password | Credentials |
| Host and port | The server's address (default ports: Postgres 5432, MySQL 3306) |
| Database name | Which database on that server |
| Options | Settings such as TLS (`sslmode=require`), timeouts, pool size |

Formats differ between languages and drivers, but they carry the same pieces.

```python
import os, psycopg                 # one common Postgres driver
conn = psycopg.connect(os.environ["DATABASE_URL"])
with conn.cursor() as cur:
    cur.execute("SELECT 1")
```

## Good practice

- **Don't hard-code it, and don't commit it.** It contains the password. Read it from an
  [environment variable](/t/environment-variable) (the name `DATABASE_URL` is a common convention), as part of your
  [configuration](/t/app-configuration).
- **Different credentials per environment**, with least privilege: the app user doesn't need to be a superuser.
- **Use TLS** when connecting over a network.
- **Special characters in the password** (`@`, `/`, `:`, `#`) must be URL-encoded in a URL-style string, or the
  parsing breaks.
- **Connections are expensive and limited.** Opening one per request is slow, and databases cap how many they accept.
  Applications use a [connection pool](/t/connection-pooling) and always release connections (use `with` blocks or
  try/finally).
- **Set timeouts** for connecting and querying ([timeouts](/t/timeouts)).

## When it fails

| Error | Usually means |
|---|---|
| Connection refused | Nothing listening at that host and port, or a firewall |
| Timeout | Network or firewall problem, wrong host |
| Authentication failed | Wrong user or password, or the user lacks access to that database |
| Database does not exist | Wrong name |
| Too many connections | Pool misconfigured, or connections are leaking |

A database client such as `psql` is handy for testing the same string outside your app ([database client](/t/database-client)).
