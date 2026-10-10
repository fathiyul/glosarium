---
title: "Video Streaming (HLS)"
summary: "Serving video as adaptive chunks."
levels: { backend: senior, frontend: senior }
aliases: ["video streaming", "HLS", "adaptive bitrate streaming"]
prereqs: ["cdn", "object-storage"]
related: ["cdn", "object-storage", "compression", "streaming-large-files"]
---

**Video streaming** is serving video so it plays smoothly rather than as a single big download. The standard approach is **adaptive bitrate** streaming — **HLS** (and DASH) — where the video is split into short segments, encoded at several quality levels (bitrates), and the player switches levels based on the viewer's bandwidth, downloading only what's needed next.

```text
source video → transcode into segments at 240p/480p/720p/1080p → playlist (.m3u8)
player → picks a level → fetches segment 1, 2, 3 ... → adapts as network changes
```

The pieces: **transcoding** (converting the source into multiple bitrates and formats — a heavy batch job), segmentation (cutting it into short chunks with a manifest/playlist), storage of the segments, and a [CDN](/t/cdn) to deliver segments from the edge. The player handles adaptation and seeking.

The classic mistakes:

- Serving one high-bitrate file to everyone. A single 1080p file buffers on slow connections and wastes bandwidth on fast ones. Adaptive streaming adjusts per viewer.
- Transcoding synchronously in a request. Transcoding is CPU/GPU-heavy and slow; it must be a background batch process, often with dedicated workers or a managed service (see [job-queue](/t/job-queue)). Doing it inline is impossible at realistic sizes.
- Not using a CDN. Video is huge; serving segments from origin wastes bandwidth and hurts playback. A CDN caches segments near viewers.
- Forgetting that video is big. Storage and egress for video dominate cost; retention and lifecycle management matter (see [egress costs](/t/egress-costs) and [storage lifecycle](/t/storage-lifecycle)).
- Ignoring the manifest and player. HLS/DASH need a manifest and a compatible player; a plain `<video>` with an MP4 URL won't do adaptive streaming.
- Fragmented packaging. Encoding into many incompatible formats instead of a small set of standard codecs/containers; deliver formats the target players support.
- Poor source handling. Garbage-in: if the uploaded source is low quality, transcoding won't fix it; validate and accept suitable source formats.
- Forgetting access control. Private video needs signed URLs or tokens (see [presigned URL](/t/presigned-url)); public segment URLs leak content.

When to use it: for any real video delivery — user uploads, courses, streaming platforms. A short clip might be fine as a static file, but anything with varied connections and length benefits from HLS/DASH with transcode + CDN. It's the biggest-scale instance of [streaming large files](/t/streaming-large-files), and it turns a heavy transfer problem into a smooth, adaptive experience. See [compression](/t/compression).
