---
title: "Reproducing Production Issues Locally"
summary: "Recreating a production bug with realistic, anonymized data."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["reproducing bugs", "repro case", "local reproduction"]
prereqs: ["debugging"]
related: ["adhoc-production-queries", "production-data-fix", "gdpr", "test-database", "seed-data"]
---

**Reproducing a production issue** means recreating the bug in an environment where you can inspect and fix it — usually locally or in a test environment. It's the difference between guessing at a cause and *knowing* one. If you can trigger the failure on demand, you can find the cause and prove the fix.

The tricky part is the data. A bug often depends on a specific shape of data: a null where you expected a value, a very large row, a Unicode name, a timezone. An empty local database hides exactly those cases.

A workable approach:

1. **Capture the inputs.** The request, the payload, the user's state, the parameters. Logs and traces are where this starts (see [debugging](/t/debugging)).
2. Get realistic data. Restore a recent backup or export the relevant rows — into a [test database](/t/test-database), not production.
3. Anonymize it. Never pull real personal data onto a laptop. Strip or fake names, emails, tokens before you load it. This is a legal matter, not just etiquette (see [GDPR](/t/gdpr) and personal data).
4. Seed and replay. Load the data, replay the request or job, and watch it fail the same way.

```text
reported bug → capture request + data shape → anonymized copy → reproduce → fix → add a test
```

The classic mistakes:

- Testing with empty or toy data. The bug vanishes because the conditions that trigger it aren't present. Use realistic sizes and edge values.
- Copying production data wholesale. It works, but it leaks personal data into an unsafe place. Anonymize.
- Fixing without reproducing. A change you can't verify against the bug is a guess that may not fix it, or may break something else.
- Not adding a regression test. Once you can reproduce it, freeze the case as a test (seed data via a [dataset](/t/dataset)), so the fix stays fixed.

Frontend issues reproduce in a browser with the same state and slow network; backend and data issues need the data shape and volume. Once you have the repro, a [production data fix](/t/production-data-fix) or a code fix is straightforward — and you can do the risky read-only digging with [ad-hoc queries](/t/adhoc-production-queries) first.
