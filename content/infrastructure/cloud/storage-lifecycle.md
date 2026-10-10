---
title: "Storage Lifecycle Policies"
summary: "Automatically moving or deleting old objects."
levels: { backend: senior, data-engineer: senior }
aliases: ["lifecycle policy", "storage lifecycle", "object expiry"]
prereqs: ["object-storage", "finops"]
related: ["egress-costs", "backups", "s3", "finops", "data-residency"]
---

**Lifecycle policies** are rules on [object storage](/t/object-storage) that move or delete objects automatically as they age. Instead of paying top-tier prices for data nobody reads, you define transitions and expirations: move logs to a cheaper tier after 30 days, archive them after a year, delete them after seven. The storage service applies the rules for you, continuously.

A typical rule set:

- Transition — move objects to a cheaper, slower **tier** as they age (frequently-accessed → infrequent → archive).
- Expiration — delete objects after a set age.
- Version handling — keep only the last few versions, or expire old versions after a while.
- Incomplete uploads — delete abandoned multipart uploads that never completed.

```json
{
  "Rules": [{
    "Status": "Enabled",
    "Filter": { "Prefix": "logs/" },
    "Transitions": [{ "Days": 30, "StorageClass": "STANDARD_IA" }],
    "Expiration": { "Days": 365 }
  }]
}
```

(The exact field names are provider-specific — AWS S3, Google Cloud Storage and Azure Blob each have their own shape — but the concepts are the same.)

The classic mistakes:

- Never expiring anything. Objects accumulate forever and the bill grows quietly. A lifecycle rule is the cheapest cost control you can add (see [cloud cost management](/t/finops)).
- Deleting too aggressively. A rule that expires data you still need, or that a **retention** requirement says you must keep, is data loss. Understand legal and compliance holds before you set expiry.
- Ignoring archive retrieval cost and delay. Cold tiers are cheap to store but expensive and slow to read. If something is archived and suddenly needed, restoring it may cost and take hours. Don't archive data you might need immediately.
- Wrong scope. A rule applies to a prefix or tag. Pointed at the wrong prefix, it can transition or delete more than intended. Scope rules narrowly and test.
- Confusing lifecycle with backup. Expiring old versions is not the same as having a [backup](/t/backups); a lifecycle rule on your only copy can delete your only copy.

**When to use it:** almost always, for any bucket holding logs, exports, media or backups that age. Pair it with versioning and [data residency](/t/data-residency) awareness, and review it when access patterns change — the tier that was right last year may not be now.
