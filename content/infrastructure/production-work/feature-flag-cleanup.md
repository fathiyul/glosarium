---
title: "Feature Flag Cleanup"
summary: "Removing flags once rollout is done so they don't pile up as debt."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
also: [ci-cd]
aliases: ["flag cleanup", "feature flag debt", "stale flags"]
prereqs: ["feature-flags", "technical-debt"]
related: ["deploy-vs-release", "continuous-delivery", "dark-launch", "trunk-based-development", "canary-release"]
---

A [feature flag](/t/feature-flags) is meant to be **temporary**. You add it to ship code dark, roll out gradually, or kill a feature in a hurry. Once the rollout is complete and the feature is fully on, the flag has done its job — and if you leave it in the code, it quietly becomes [technical debt](/t/technical-debt).

Stale flags cost more than they look:

- Dead branches. The code still contains the "off" path, which may never run and is never tested, yet must be maintained.
- Confusion. New engineers can't tell which flags are load-bearing configuration and which are dead.
- Risk. A stray flag set wrong in production changes behavior in ways nobody remembers.
- Test matrix growth. Every flag can multiply the combinations worth testing.

```text
flag enabled for 100% and stable for a release →
  remove the flag, keep the "on" code, delete the "off" branch, delete the flag definition
```

The classic mistakes:

- **Never removing them.** "Temporary" flags from two years ago still gate production behavior. Treat every flag as having an expiry.
- **Using flags as configuration.** If a setting is meant to stay forever and vary by customer, that's configuration, not a rollout flag — model it as such.
- **No owner or ticket.** A flag with nobody responsible for removing it is a flag that will live forever. Add the cleanup to the same work that introduced it.
- Cleaning up without care. Removing the "off" path while it's still reachable can break someone. Verify which side is live first.

The habit that works is small: when a flag is created, note what "done" looks like; when rollout finishes, delete it in a follow-up change, usually via the same [continuous delivery](/t/continuous-delivery) flow that shipped it. This keeps the [deploy-versus-release](/t/deploy-vs-release) freedom that flags give you without letting them accumulate. Frontend and data pipelines have their own toggles and rollout switches, and they rot the same way.
