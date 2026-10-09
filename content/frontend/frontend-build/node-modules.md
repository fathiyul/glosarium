---
title: "node_modules"
summary: "Where installed packages live, and why it gets so big."
levels: { backend: junior, frontend: junior }
prereqs: ["semantic-versioning"]
related: ["dev-server", "static-assets", "semantic-versioning"]
---

`node_modules` is the folder where your package manager installs the libraries your project depends on. Running `npm install` reads `package.json` and the lock file, then fills the folder with those packages.

```sh
npm install   # creates or updates node_modules to match the lock file
```

It gets large because packages depend on other packages, and each of those brings its own. A small project can end up with thousands of files in here. You almost never need to edit this folder, so treat it as a generated output.

Three habits keep it manageable:

- **Don't commit `node_modules` to git.** Add it to `.gitignore`.
- **Do commit the lock file** (such as `package-lock.json`), so everyone and your deployment install the same versions.
- **When it's broken, delete it and reinstall.** That's usually faster than hunting for the cause.

The classic mistake is copying `node_modules` between machines. Some packages contain compiled code for one operating system or one Node version, so a copy from elsewhere can fail in confusing ways. Install on each machine instead. Python projects have a similar role for virtual environments, often stored in a `.venv` folder.
