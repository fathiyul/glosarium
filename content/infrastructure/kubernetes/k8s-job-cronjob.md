---
title: "Job and CronJob"
summary: "Running one-off and scheduled tasks in Kubernetes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["kubernetes job", "cronjob", "batch job"]
prereqs: ["pod", "kubernetes"]
related: ["scheduled-jobs", "cron", "batch-processing", "kubectl", "k8s-deployment"]
---

Kubernetes runs long-lived services with [Deployments](/t/k8s-deployment), but some work should run once and stop: a migration, a backfill, a report. A **Job** runs pods until they complete successfully, retrying failed ones up to a limit.

```yaml
apiVersion: batch/v1
kind: Job
metadata: { name: migrate }
spec:
  backoffLimit: 4
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: migrate
          image: registry.example.com/app:1.4.2
          command: ["./manage.py", "migrate"]
```

A **CronJob** creates Jobs on a schedule, using the familiar [cron](/t/cron) field (minute, hour, day, month, weekday):

```yaml
apiVersion: batch/v1
kind: CronJob
metadata: { name: nightly-report }
spec:
  schedule: "0 2 * * *"       # 02:00 every day
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: Never
          containers:
            - name: report
              image: registry.example.com/report:1.4.2
```

The classic mistake is reaching for a Deployment to run a finite task. A Deployment treats the process as a service: when it exits, the pod is restarted, forever. If the container is meant to finish, use a Job.

For CronJobs, watch a few traps. Overlapping runs: if one execution is still going when the next is due, the default policy allows a new Job to start; set concurrency so a slow run doesn't pile up. Missed runs: a paused or busy cluster can skip a schedule. Time zones: schedules are in UTC unless you set a time zone. And scheduled jobs should be idempotent where possible, because a retry can run the work twice (see [scheduled jobs](/t/scheduled-jobs)).

Check status with [kubectl](/t/kubectl): `kubectl get jobs`, and `kubectl logs job/<name>` when one fails. For heavy recurring pipelines, this fits alongside [batch processing](/t/batch-processing) systems.
