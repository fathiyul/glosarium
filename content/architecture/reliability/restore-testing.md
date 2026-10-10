---
title: "Restore Testing"
summary: "Actually restoring backups regularly to prove they work."
levels: { backend: mid-level, data-engineer: mid-level }
also: [database-operations]
aliases: ["restore testing", "backup restore test", "recovery testing"]
prereqs: ["backups", "disaster-recovery"]
related: ["point-in-time-recovery", "disaster-recovery", "rpo-rto"]
---
**Restore testing** proves backups actually restore — regularly, automatically, end-to-end. Untested backups fail with depressing reliability (corrupt media, missing keys, incompatible versions, procedures nobody remembers), and the failure surfaces at the worst possible moment: during the disaster the backup existed for.

```text
backup → scheduled restore to sandbox → verify (checksums, boot, queries)
→ report (success + duration) → alert on failure
```

Testing validates the whole chain, not just the files: media integrity, encryption keys available, compatible software versions, documented procedures that work, and recovery *time* against RTO. A restore test that doesn't time itself verifies existence, not recoverability.

The classic mistakes:

- Never testing. The industry-default failure: years of "successful" backup jobs, zero verified restores, total loss at need. Test restores or admit you have no backups.
- Testing files, not recovery. Checksums pass while the database won't boot on current versions. Restore into running systems and query them.
- Untimed tests. Recovery taking 3× the RTO fails the objective it exists for. Time every test; track against RTO.
- Testing only full restores. Granular recovery (one table, one mailbox, one file) is the common need; untested partial paths fail differently. Test both scopes.
- Keys unmanaged. Encrypted backups with keys in the same burning building (or departed employees' heads) are unrecoverable. Keys escrowed, tested, rotated.
- Procedures in heads. The one engineer who knows the restore is on holiday during the outage. Documented, rehearsed runbooks — tested by someone else periodically.
- Production-adjacent restores. Testing restores against live systems risks overwriting them. Isolated sandboxes, always.

**The rule:** untested backups are hopes, not backups. Automate restores, verify by booting and querying, time against RTO, and alert on failure. Recovery proven regularly is recovery available actually.
