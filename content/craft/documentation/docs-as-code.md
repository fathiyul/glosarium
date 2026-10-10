---
title: "Docs as Code"
summary: "Keeping docs in the repository and reviewing them like code."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["docs-as-code", "documentation in the repo"]
prereqs: ["diagrams-as-code"]
related: ["diagrams-as-code", "onboarding-docs", "runbook", "api-documentation"]
---

Docs as code is the practice of keeping documentation in the same repository as the software, in plain-text formats such as Markdown, and changing it through the same review process as code. A doc change goes through a pull request, gets reviewed, and is versioned alongside the release it describes.

```
repo/
  src/
  docs/
    getting-started.md
    architecture.md
    runbooks/restart-worker.md
```

The benefit is that documentation changes with the code. A change that alters behaviour can update the matching page in the same commit, and a reviewer sees both.

The trade-off is that documentation becomes a cost of every change, and people tend to skip it when the pull request is already large. Non-engineers, who often write the most useful docs for customers, may find a Git workflow awkward. A docs site build adds a step that can break.

The classic mistake is treating the repository as the only source of truth while nobody checks whether the docs still match reality. Build the docs in CI so broken links and stale references fail early, and review doc changes with the same care as code. For the API reference that usually lives alongside the code, see [API documentation](/t/api-documentation).
