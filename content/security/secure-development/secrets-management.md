---
title: "Secrets Management"
summary: "Keeping API keys and passwords in a vault, not in code."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["secret management", "vault", "secrets manager", "storing secrets", "HashiCorp Vault", "AWS Secrets Manager"]
prereqs: ["environment-variable", "secrets-in-git"]
related: ["secret-rotation", "secrets-in-git", "ci-secrets", "secrets-operators", "least-privilege", "no-sensitive-data-in-logs"]
core: [backend]
also: [ci-cd, cloud]
---

**Secrets management** is how you **store, distribute, use and rotate** sensitive values (API keys, database passwords, tokens, certificates, encryption keys) so they aren't exposed in code, logs or places everyone can read. The basic rule from [secrets in Git](/t/secrets-in-git) is "never commit them". Secrets management is the full system that makes that practical.

## The levels, from worst to best

| Approach | Verdict |
|---|---|
| Hard-coded in source | Never |
| In a config file committed to Git | Never |
| In a `.env` file on a laptop (gitignored) | OK for local development only |
| In **environment variables** set by the platform | Common and acceptable, but visible to anyone with access to the process or host, and tedious to rotate |
| In a **secrets manager** (AWS Secrets Manager, Google Secret Manager, Azure Key Vault, HashiCorp Vault) fetched at runtime | Best practice for production |

## What a secrets manager gives you

- **Central, encrypted storage** with access control (who or what can read which secret) and **audit logs** of access.
- **Rotation**: change a secret regularly or after a leak, ideally automatically ([secret rotation](/t/secret-rotation)).
- **Versioning** and rollback.
- **Short-lived or dynamic credentials** (some systems issue a database password valid for an hour, per application).
- **Integration** with your platform: containers, Kubernetes, CI/CD ([Kubernetes secrets and operators](/t/secrets-operators), [CI secrets](/t/ci-secrets)).

```python
# Fetch at startup from a secrets manager, using the workload's own identity (no secret needed to get the secret)
secret = secrets_client.get_secret_value(SecretId="prod/payments/db-password")
```

The "who authenticates to the vault?" problem is solved by **workload identity**: the cloud platform proves which service is asking, so no bootstrap password is stored ([service accounts](/t/service-account), [IAM](/t/iam)).

## Practices

- **Least privilege**: each service reads only its own secrets ([least privilege](/t/least-privilege)).
- **Separate secrets per environment**, and never reuse a production secret elsewhere.
- **Rotate** on a schedule, when people leave, and after any suspected exposure. Design so rotation doesn't cause downtime (support two valid values during the switch).
- **Don't log, print or expose secrets** in errors, crash reports or CI output ([sensitive data in logs](/t/no-sensitive-data-in-logs)).
- **Don't bake secrets into images or artifacts.** Inject them at run time.
- **Scan for leaks** in repositories and CI.
- **Know where each secret is used**, so rotation is possible when you need it.
- **Prefer not having a secret at all**: identity-based access (roles) instead of keys where it's available.
