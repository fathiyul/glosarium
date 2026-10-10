---
title: "Secrets in CI"
summary: "Handling credentials safely in pipelines."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["pipeline secrets", "ci credentials", "ci/cd secrets"]
prereqs: ["ci-pipeline", "secrets-management"]
related: ["least-privilege", "service-account", "iam-policy", "github-actions", "build-caching"]
---

A [CI pipeline](/t/ci-pipeline) needs credentials: a token to push the built image, a deploy key, database passwords for integration tests, an API key for a cloud account. **Secrets in CI** is about giving the pipeline what it needs without leaving those credentials where they can be stolen or leaked.

The basics:

- Store them in the CI system's secret store, not in the repository or pipeline file. The provider keeps them encrypted and injects them at run time.
- Mask them in logs. A stray `echo` or debug dump can print a token into build output that everyone with repo access can read.
- Scope them. A secret for production should not be available to a build of an untrusted pull request. Separate environments and restrict which branches or triggers can reach which secrets.
- Rotate and expire. Prefer short-lived credentials over static ones.

```text
CI secret store → injected as environment variable at run time
logs: values masked; never echo them
```

The classic mistakes:

- **Hardcoding secrets** in the pipeline YAML or code. Once committed, a secret is in history forever and must be rotated, even if you delete the file (see [secrets management](/t/secrets-management)).
- **Secrets reachable from fork PRs.** A pull request from a fork is untrusted code; if it can read your deploy credentials, an attacker can exfiltrate them. Require approval or a trusted trigger before secrets are exposed.
- Over-broad credentials. A deploy token with full account access turns one leak into a full compromise. Apply [least privilege](/t/least-privilege).
- **Long-lived static keys.** Prefer identity-based, short-lived credentials that the CI runner assumes ([service accounts](/t/service-account) and [IAM policies](/t/iam-policy)), so there's no key to leak at all.

Also watch the cache: do not store credentials in a build cache ([build caching](/t/build-caching)), since caches can be restored by later or other builds.
