---
title: "Unsupervised Learning"
summary: "Finding structure in unlabeled data."
core: [data-scientist]
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: junior }
aliases: ["unsupervised learning", "unsupervised", "pattern discovery"]
prereqs: ["machine-learning", "supervised-learning"]
related: ["supervised-learning", "clustering-zorder", "recommendation-system"]
---
**Unsupervised learning** finds structure in data that has no labels. The algorithm is not told the right answer; it looks for groupings, low-dimensional representations, or unusual points on its own. Common goals are segmenting customers, reducing dimensions for visualisation, and flagging outliers.

```text
unlabelled inputs → find structure (clusters, components, anomalies) → interpret
```

The difficulty is that "structure" is defined by the method, not by the world. Two clustering algorithms can return different groupings of the same data, and both may look reasonable. Results need interpretation against the domain before anyone acts on them.

The classic mistakes:

- Treating clusters as truth. A cluster is a useful grouping under a chosen method and distance; it is not a discovered category of people or objects.
- Choosing the number of groups by hope. Many methods need it as input, and the answer changes the story. Check stability across settings.
- Ignoring scaling and distance. Clustering depends entirely on how features are measured against each other; unscaled features quietly dominate.
- Skipping the evaluation question. Without an external check (does a segment behave differently on a real outcome?), the output is a picture, not evidence.
- Using it when labels exist. If labelled outcomes are available, a supervised model usually answers the question more directly.

**Where it earns its place:** exploration, anomaly detection on mostly-normal data, and preparing features or representations for later supervised work.

Validate clusters with a concrete action in mind. If a segment would lead to a different campaign, product decision or support process, you have a useful grouping; if it changes nothing, the structure may be real but not worth the complexity.
