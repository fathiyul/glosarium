---
title: "Feature Flags"
summary: "Turning features on and off without deploying."
levels: { backend: mid-level, frontend: mid-level , data-analyst: senior , tech-entrepreneur: pmf }
aliases: ["feature toggles", "feature switches", "flags", "LaunchDarkly", "Unleash", "kill switch"]
prereqs: ["environments", "deployment"]
related: ["feature-flag-cleanup", "deploy-vs-release", "canary-release", "ab-testing", "dark-launch", "progressive-delivery"]
core: [backend, frontend]
also: [ci-cd]
---

A **feature flag** (or toggle) is a condition in your code that turns a feature on or off **without deploying**. You can ship code that's switched off, enable it for some users, and turn it off instantly if it misbehaves.

```python
if flags.is_enabled("new-checkout", user=user):
    return new_checkout(cart)
return old_checkout(cart)
```

The flag's value comes from configuration or a flag service (LaunchDarkly and Unleash are examples, or you can build a simple one with a database table or config file), and can depend on the user, a percentage, the environment or a date.

## What they enable

- **Separating deployment from release.** Deploy often and safely, and "release" by flipping the flag ([deploy vs release](/t/deploy-vs-release)). Unfinished work can merge to the main branch while still hidden.
- **Gradual rollout**: 1% of users, then 10%, then everyone ([canary release](/t/canary-release), [progressive delivery](/t/progressive-delivery)).
- **Instant rollback**: turn the flag off, no redeploy needed.
- **Targeting**: internal staff first, a beta group, a specific customer, a region.
- **Experiments**: show variant A or B and compare ([A/B testing](/t/ab-testing)).
- **Kill switches** for risky or expensive parts (disable a heavy feature under load).

## Kinds of flags (with different lifetimes)

| Kind | Purpose | Lifetime |
|---|---|---|
| **Release flag** | Hide an unfinished or risky feature during rollout | Short: remove after the launch |
| **Experiment flag** | A/B test | Short: until the experiment ends |
| **Ops flag / kill switch** | Disable a feature in trouble | Long-lived |
| **Permission flag** | Features per plan or customer | Long-lived (may be better modeled as entitlements) |

## Making them work well

- **Default to the safe state** if the flag service can't be reached.
- **Test both paths.** The "off" path must keep working, and so must "on".
- **Keep flag checks few and shallow.** Branching all over the code creates a combinatorial mess. Put the decision at one place.
- **Name them clearly** and give each an **owner and an expiry**.
- **Remove them when done.** Old flags are [technical debt](/t/technical-debt) and a source of bugs. See [feature flag cleanup](/t/feature-flag-cleanup).
- **Audit changes**: who flipped what, and when, since a flag change is a production change.
- **Be careful with consistency**: a user shouldn't flip between variants on every request, and back-end and front-end checks should agree.
- **Don't use flags to hide security**: client-side flags are visible and changeable ([never trust the client](/t/never-trust-the-client)).
