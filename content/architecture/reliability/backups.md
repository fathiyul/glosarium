---
title: "Backups"
summary: "Copies of data for restoring, and why untested backups don't count."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["database backup", "data backup"]
prereqs: ["database"]
related: ["disaster-recovery", "database", "schema"]
also: [database-operations]
---

A backup is a copy of your data that you can restore if the original is lost, corrupted or damaged by a mistake. Hardware fails, a bad script deletes rows, and a ransomware attack can encrypt a disk. A backup gives you a way back.

For a database, a logical backup is a dump of the data and schema that you can restore into a new database. PostgreSQL's `pg_dump` is one example:

```sh
pg_dump -Fc mydb > mydb.dump          # write a compressed backup
createdb mydb_restored                # pg_restore needs an existing database
pg_restore -d mydb_restored mydb.dump  # restore the backup into it
```

Keep copies in more than one place, and not only on the machine they protect. A common guideline is three copies, on two kinds of storage, with one offsite. Make sure backups are automated, encrypted, and cover everything you'd need to rebuild.

The classic mistake is never testing a restore. A backup that fails to restore, or that restores without the data you assumed was included, is not a backup. Restore into a scratch environment on a regular schedule and time it. The time it takes is your real recovery time, which matters for [disaster recovery](/t/disaster-recovery) planning.
