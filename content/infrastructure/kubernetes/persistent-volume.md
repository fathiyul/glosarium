---
title: "Persistent Volume"
summary: "Storage that survives pod restarts."
levels: { backend: senior, data-engineer: senior }
aliases: ["persistent volume", "PV PVC", "storageclass"]
prereqs: ["pod", "docker-volume"]
related: ["statefulset", "ephemeral-filesystem", "backups", "storage-lifecycle", "kubernetes"]
---

Pods are disposable: their containers and writable layer vanish when they're replaced (see [ephemeral filesystem](/t/ephemeral-filesystem)). A **PersistentVolume** is storage that outlives a pod, so a database, an upload directory or a log archive survives restarts and rescheduling.

Three objects work together:

- PersistentVolume (PV) — a piece of storage, provisioned from a cloud disk, network storage, or a host path.
- PersistentVolumeClaim (PVC) — a request from a pod for a certain size and access mode. The pod mounts the claim; Kubernetes binds it to a volume.
- StorageClass — defines *how* to provision, so a claim can create storage on demand instead of an admin pre-making volumes.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata: { name: data }
spec:
  accessModes: [ReadWriteOnce]
  resources:
    requests: { storage: 20Gi }
```

A [StatefulSet](/t/statefulset) uses a claim *template* to give each replica its own volume, so pod `db-0` always gets its own disk.

The classic mistakes:

- Using hostPath for real data. It ties the volume to one node's disk and isn't portable; rescheduled pods may not find it. Use a provisioned volume from a StorageClass instead.
- Deleting the claim by accident. Whether deleting a PVC deletes the underlying disk depends on the storage class's reclaim policy. With the wrong policy, an accidental delete wipes data — check it, and gate deletions.
- Expecting access modes to mean more than they do. `ReadWriteOnce` is typically single-node, `ReadWriteMany` needs storage that supports it. Not every backend offers `ReadWriteMany`, and assuming it can leave claims stuck `Pending`.
- Thinking a PV is a backup. It's live storage, not a copy. Keep [backups](/t/backups) and consider [storage lifecycle](/t/storage-lifecycle) for object storage.

**When you need it:** any workload with state — databases, queues, file storage. Stateless services should avoid it entirely. Match the volume's performance and durability to the data, and treat the reclaim policy as a decision, not a default.
