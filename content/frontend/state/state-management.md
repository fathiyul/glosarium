---
title: "State Management"
summary: "Deciding where data lives in an app and how it changes."
levels: { frontend: junior }
prereqs: ["component-state"]
related: ["local-vs-global-state", "server-state-vs-client-state", "global-store", "single-source-of-truth", "url-as-state"]
---

State is any data that can change while the app is running: whether a menu is open, what the user typed, the list of products they fetched. State management is the set of decisions about where each piece of that data lives and how it gets updated.

You don't need a library for most of it. Start by sorting your data into rough kinds:

- **UI state** that only one component cares about, such as whether a dropdown is open. Keep it [local](/t/local-vs-global-state) to that component.
- **Shared state** that several distant components need, such as the logged-in user. Move it up to a common parent, or into a [global store](/t/global-store) if that gets awkward.
- **Server data**, such as products loaded from an API. This is a copy of data that really lives on the server. See [server state vs client state](/t/server-state-vs-client-state).
- **URL state**, such as the current search term or page number, which is best kept in the address so links can be shared. See [URL as state](/t/url-as-state).

The classic mistake is putting everything in one global store from the start. Then every small change goes through shared code, and it's hard to tell which component owns which value. Keep each value in one place, as described in [single source of truth](/t/single-source-of-truth), and add shared machinery only when a real problem appears.
