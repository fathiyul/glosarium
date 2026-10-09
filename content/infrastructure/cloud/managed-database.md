---
title: "Managed Database"
summary: "A database the cloud provider runs for you."
levels: { backend: junior, data-engineer: junior }
aliases: ["DBaaS", "RDS", "Cloud SQL", "database as a service"]
prereqs: ["database"]
related: ["managed-vs-self-hosted", "database-high-availability", "database-replication", "database-upgrades", "cloud-computing", "vendor-lock-in"]
---

A managed database is a database that a cloud provider installs, runs and maintains for you. You create it with a few clicks or one command and get a connection string. Examples: Amazon RDS, Google Cloud SQL, Azure Database for PostgreSQL. Running your own database on a plain [VM](/t/compute-instance) is the alternative.

What the provider usually handles:

- Installing the database and applying minor updates and security patches
- Automated backups and point-in-time restore
- Replication and automatic failover to a standby (often an option you enable)
- Monitoring, disk growth and basic tuning knobs

```python
# From your app it looks like any other database
import psycopg2
conn = psycopg2.connect("postgresql://app:***@mydb.abc123.region.rds.example.com:5432/app")
```

## Why teams choose it

Running a database well is a specialist job, and mistakes (no tested backups, a missed patch, a full disk) lose data. For most teams, paying for someone else to do the routine parts is a good trade. See [managed vs self-hosted](/t/managed-vs-self-hosted).

## What you still own

- **Schema, queries and indexes.** A slow query is slow on managed hardware too.
- **Connections and credentials.** Don't expose the database to the public internet; allow only your app's network. See [security groups](/t/security-group).
- **Checking that backups restore.** The provider takes them; proving they work is on you.
- **Cost. Size, storage, replicas and data transfer all bill.
- Limits.** You usually can't install arbitrary extensions or change low-level settings; each provider supports its own list.

Major upgrades and failover events can still cause a short outage, so read the provider's behaviour before relying on it. See [database high availability](/t/database-high-availability).
