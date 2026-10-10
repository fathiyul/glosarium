---
title: "App Store Releases"
summary: "Why mobile releases can't be rolled back instantly."
levels: { frontend: mid-level }
aliases: ["mobile release", "app store review", "staged rollout"]
prereqs: ["deploy-vs-release", "feature-flags"]
related: ["rollback", "dark-launch", "canary-release", "pwa", "semantic-versioning"]
---

Web apps update the moment you deploy: users load the page and get the new version. Mobile apps don't work that way. A release is a **package you hand to the app store**, which reviews it and then makes it available; users install the update when they choose to, or when their device updates apps automatically. You control neither the timing nor the adoption.

That changes what "deploy" and "release" mean (see [deploy vs release](/t/deploy-vs-release)). On mobile you often can't roll a bad version back — the store doesn't serve the old package again once a new one is out. You can ship a fixed version, but every user who takes it adds delay. And plenty of users stay on older versions for weeks or months, so your backend has to support several at once.

The classic mistake is treating a mobile release like a web deploy: assume you can revert instantly, and assume everyone is on the latest build. Neither holds.

What teams do instead:

- **Feature flags.** Ship code dormant and turn features on from the server, so a bad feature can be disabled without a new release (see [feature flags](/t/feature-flags)).
- **Staged rollout.** Release to a small percentage first and expand as you watch crash and error rates.
- **A kill switch and forced-update path.** Be able to disable a bad flow, and have a minimum-supported-version gate for the rare case where old clients must stop.
- Server-driven compatibility. Version your APIs and keep older app versions working (see [semantic versioning](/t/semantic-versioning)).

A [progressive web app](/t/pwa) avoids some of this by updating like a website, at the cost of native capabilities. Where the app must be native, design releases as one-way events and put the flexibility in flags and backend versions — the same reasoning behind [dark launching](/t/dark-launch) and [canary releases](/t/canary-release).
