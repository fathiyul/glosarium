---
title: "GitHub Actions"
summary: "GitHub's built-in CI/CD."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["GitHub workflows", "Actions", "gh actions"]
prereqs: ["ci-pipeline", "yaml"]
related: ["ci-pipeline", "ci-secrets", "continuous-integration", "build-caching", "deployment", "yaml"]
---

GitHub Actions is the CI/CD system built into GitHub. You describe automation in YAML files under `.github/workflows/`, and GitHub runs them on its servers (or your own) in response to events such as a push or a pull request.

```yaml
# .github/workflows/test.yml
name: test
on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: pytest
```

## The vocabulary

- **Workflow**: one YAML file.
- **Event** (`on:`): what triggers it: a push, a pull request, a schedule, a manual button.
- **Job**: a set of steps that run on one machine (`runs-on`). Jobs run in parallel unless one `needs:` another.
- **Step**: a shell command (`run:`) or a reusable action (`uses:`).

Results show up on the pull request as checks, and you can require them to pass before merging.

## Habits and pitfalls

- Never hardcode secrets. Store them in the repository's secret settings and read them as `${{ secrets.NAME }}`. See [CI secrets](/t/ci-secrets).
- Pin third-party actions to a specific version (or a commit hash for sensitive pipelines), since an action runs code with access to your workflow. Using a moving version means the code you run can change under you.
- Be careful with workflows triggered by forks and with untrusted pull request input; secrets are restricted for forks for good reason.
- Cache dependencies to keep runs fast. See [build caching](/t/build-caching).
- Usage is metered; check your plan's limits for private repositories.

Other CI tools (GitLab CI, CircleCI, Jenkins) work on the same ideas. See [CI pipeline](/t/ci-pipeline).
