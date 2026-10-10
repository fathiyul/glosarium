---
title: "Plugin Architecture"
summary: "A core extended by independently developed plugins."
levels: { backend: senior, frontend: senior }
aliases: ["plugin architecture", "plug-in architecture", "extensible architecture"]
prereqs: ["modular-monolith", "software-architecture"]
related: ["modular-monolith", "seam", "design-system"]
---
**Plugin architecture** keeps a small stable core with behaviour added through plugins: editors, browsers, IDEs, build tools and platforms all extend via well-defined extension points — hooks, APIs, sandboxes — letting ecosystems grow capabilities the core team never imagined (or wanted to maintain).

```text
core (stable, minimal) ← extension API → plugins (isolated, versioned, optional)
```

The design centres on the extension contract (stable APIs, capability scoping, versioning) and isolation (crashes, performance and security bounded per plugin). Ecosystems live or die by these: great extension APIs attract builders; breaking ones repel them.

The classic mistakes:

- Unstable extension APIs. Breaking plugins every release kills ecosystems faster than missing features. Version extension APIs conservatively; deprecate with long windows.
- No isolation. A crashing/leaking/malicious plugin taking down the host (or everyone's data) poisons trust permanently. Sandbox, permission-scope, and resource-limit plugins.
- Core bloat via plugins-in-disguise. First-party features shipped as privileged plugins with private APIs fragment the architecture into tiers. Eat your own public API.
- Permission maximalism. Plugins granted everything by default become supply-chain nightmares. Least privilege per plugin, declared and reviewable.
- Discovery and trust gaps. Users installing malicious or abandoned plugins need vetting (reviews, signing, provenance) and update hygiene. Marketplaces need governance.
- Version matrix hell. Core × plugin × dependency version combinations exploding untested. Constrain supported matrices; test the popular intersections.
- Extension points too narrow. APIs exposing too little force hacks (monkey-patching, private API abuse) that break every release. Design extension points from real plugin needs.

**How to build it:** minimal core, stable versioned extension APIs, sandboxed least-privilege plugins, governed marketplace. Platforms win through ecosystems — ecosystems need contracts worth building on.
