---
title: "Backward Compatibility"
summary: "New versions that still work with old clients."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["backward compatibility", "backwards compatibility", "compatible changes"]
prereqs: ["api-contract", "breaking-change"]
related: ["deprecation", "schema-and-code-deploys", "api-lifecycle"]
---

**Backward compatibility** means new versions of your API keep working for clients written against the old version. When consumers deploy on their own schedule — mobile apps users haven't updated, partner integrations, other teams — you cannot change the interface in lockstep with them. A compatible change lets old clients keep working; an incompatible one breaks them the moment it ships.

The distinction is concrete:

- Additive (usually safe): new optional fields, new endpoints, new optional request parameters. Old clients ignore what they don't know.
- Breaking (usually unsafe): removing or renaming fields, changing types or meanings, making an optional field required, changing status codes or error shapes.

```text
safe:    response gains "currency" field       (old clients ignore it)
breaking: response renames "total" → "amount"  (old clients break)
```

The classic mistakes:

- Assuming "small" changes are safe. Renaming a field or tightening validation looks minor and breaks clients. Judge by *consumer impact*, not effort.
- Changing the meaning of an existing field. Keeping the name but changing what it contains is as breaking as renaming — worse, because it's silent.
- Forgetting non-obvious consumers. Internal services, scripts, dashboards and mobile clients all count. Find them before changing (usage logs help).
- Removing without deprecation. Deletions should go through a [deprecation](/t/deprecation) window, not vanish.
- Versioning as a first resort. Standing up a whole new version for one small change fragments your API. Prefer additive change where possible; version when the change truly can't be compatible.

**How to stay compatible:** add rather than change; make new fields optional; keep old fields until you've sunset them deliberately; and use [parallel change](/t/parallel-change) for anything that must shift. Compatibility is a habit, and it's what lets you evolve an API without a trail of broken clients. See [API lifecycle](/t/api-lifecycle).
