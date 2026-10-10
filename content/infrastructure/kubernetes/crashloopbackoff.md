---
title: "CrashLoopBackOff"
summary: "A pod that keeps crashing and restarting."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["pod crash loop", "restart loop", "CrashLoopBackOff pod"]
prereqs: ["pod", "kubernetes"]
related: ["k8s-probes", "container-logs", "configmap-secret", "requests-limits", "k8s-deployment"]
---

**CrashLoopBackOff** is the status of a [pod](/t/pod) whose container keeps starting, exiting, and being restarted. The kubelet restarts it with exponential backoff — short delays at first, then longer ones — to avoid hammering a broken process. `kubectl get pods` shows the name with `CrashLoopBackOff` and a rising `RESTARTS` count.

It is a **symptom, not a cause**. The first job is to find out *why* the process exits.

```sh
kubectl logs <pod> --previous     # output from the last, crashed attempt
kubectl describe pod <pod>        # events, exit code, last state
kubectl get events --sort-by=.lastTimestamp
```

Common causes:

- the container's command finishes immediately, or is wrong for the image;
- a required [ConfigMap or Secret](/t/configmap-secret) is missing, so the app can't start;
- the app can't reach a dependency it needs at boot;
- a [liveness probe](/t/k8s-probes) fails and Kubernetes keeps killing a process that was actually fine;
- it runs out of memory (the pod shows `OOMKilled` as the reason).

The classic mistake is debugging the *current* container. If the app already restarted, its interesting output is gone — read the previous attempt with `--previous`, or the crash reason in `describe`.

A second mistake is treating a crash loop by raising limits or disabling probes without understanding it. That hides the bug and turns a fast failure into a slow one. Fix the underlying cause, then confirm the pod stays `Running` and `READY`.

Some restarts are expected: a [Job](/t/k8s-job-cronjob) that fails and retries, or a container doing a one-off task. Distinguish a genuine crash loop from a workload that is *supposed* to exit. Always check [container logs](/t/container-logs) first, and set realistic [resource requests](/t/requests-limits) alongside.
