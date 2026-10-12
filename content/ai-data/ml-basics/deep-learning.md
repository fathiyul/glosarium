---
title: "Deep Learning"
summary: "Neural networks with many layers."
core: [data-scientist]
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["deep learning", "deep neural networks", "DL"]
prereqs: ["neural-network", "machine-learning"]
related: ["neural-network", "machine-learning", "embeddings"]
---
**Deep learning** is machine learning with neural networks that have many stacked layers, each learning a progressively more abstract representation of its input. Early layers might pick up edges in an image or character patterns in text; later layers combine them into concepts. The "deep" refers to depth of the network, not to any depth of understanding.

```text
raw input → layer 1 (simple features) → layer 2 (combinations) → … → output
```

What makes it work at scale is that the layers are trained end to end: the whole stack is adjusted together to reduce error on labelled examples. That removes much of the hand-crafted feature engineering older methods needed, at the cost of needing large amounts of data and compute.

The classic mistakes:

- Treating depth as automatically better. More layers add capacity and training difficulty; a smaller model on the right data often beats a larger one on the wrong data.
- Expecting it to work on small datasets. Deep models overfit readily when examples are scarce. Check whether a simpler model is competitive first.
- Ignoring the training/inference split. A model that trains for days can serve predictions in milliseconds. Plan the cost of each side separately (see [training vs inference](/t/training-vs-inference)).
- Trusting benchmark numbers without a baseline. A reported gain means little without a strong, well-tuned simple model as the comparison.
- Assuming interpretability. The learned representations are hard to inspect, so debugging relies on evaluation slices and error analysis rather than reading weights.

**When to reach for it:** perception-style problems (images, audio, language) and large-scale pattern recognition where feature engineering is the bottleneck. For tabular data with modest size, gradient-boosted trees and linear models are often the better first choice.
