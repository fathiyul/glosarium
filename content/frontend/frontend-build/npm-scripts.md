---
title: "npm Scripts"
summary: "Project commands defined in package.json."
levels: { backend: junior, frontend: junior }
aliases: ["package.json scripts", "npm run", "npm run scripts", "scripts section"]
prereqs: ["package-json"]
related: ["package-json", "npm-pnpm-yarn", "bundler", "dev-server", "task-runner", "makefile"]
core: [frontend]
---

The `"scripts"` section of [`package.json`](/t/package-json) names the commands for working on a project. Instead of
remembering long invocations, everyone runs the same short ones.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest run",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

```sh
npm run dev
npm run build
npm test            # `test`, `start` and a few others can skip "run"
```

(`pnpm run dev` and `yarn dev` work the same way.)

## Why it's useful

- **One way to run things.** A new teammate learns the project by reading the `scripts` section, and CI calls the same
  commands.
- **Local tools just work.** npm adds `node_modules/.bin` to the `PATH` while running a script, so `vite` or `eslint` is
  found without installing it globally, and the version matches the project.
- **Composable**: `"check": "npm run lint && npm test"`. `&&` stops at the first failure.

## Tips

- Use conventional names: `dev`, `build`, `test`, `lint`. Anyone can then guess them.
- Pass extra arguments after `--`: `npm test -- --watch`.
- `pre` and `post` prefixes (`prebuild`, `postbuild`) run automatically around a script, though many teams now prefer
  explicit commands. Check what your version of npm does.
- **Keep scripts short.** If one gets long or needs logic, move it into a file (`node scripts/seed.js`) or a
  [task runner](/t/task-runner).
- Shell syntax in scripts can differ between operating systems (Windows vs Linux/macOS), so avoid shell-specific
  features if your team uses both.
- **Be careful with install scripts** in dependencies. They run code on your machine.

`npm run` with no name lists the scripts that are available.
