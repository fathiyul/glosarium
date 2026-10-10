---
title: "WebRTC"
summary: "Peer-to-peer audio, video and data in the browser."
levels: { backend: senior, frontend: senior }
aliases: ["webrtc", "web real-time communication", "peer connection"]
prereqs: ["udp", "websocket"]
related: ["udp", "realtime-pub-sub", "websocket"]
---

**WebRTC** establishes direct peer-to-peer connections for audio, video and arbitrary data channels — with NAT traversal (ICE with STUN for discovery, TURN for relay fallback), encrypted by default (DTLS-SRTP), and adaptive codecs. A lightweight **signaling** channel (usually WebSocket) exchanges offers/answers and candidates; media then flows peer-to-peer.

```text
signaling (WS): offer/answer + ICE candidates exchanged
media: peer ⇄ peer (STUN hole-punch; TURN relay if needed)
```

The architecture splits accordingly: signaling and session management are your servers; media is (usually) not — until scale demands SFUs/MCUs for large calls, recording, or PSTN bridges. NAT traversal success rates, TURN bandwidth costs and device/codec variance are the operational reality.

The classic mistakes:

- No TURN fallback. STUN hole-punching fails on restrictive NATs; without TURN relay those users simply can't connect. Budget TURN bandwidth — it's your largest WebRTC cost.
- Signaling as an afterthought. Authentication, room authorisation, reconnection and dirige (who's allowed) all live in signaling. An open signaling endpoint is an open conference line.
- Assuming P2P scales to groups. Mesh calls collapse past a handful of participants (everyone encodes for everyone). Groups need an SFU; plan the topology by size.
- Ignoring device variance. Codecs, echo cancellation, camera behaviours and mobile CPU differ wildly. Test the device matrix, adapt quality, and degrade audio-first (audio matters more than video).
- Unencrypted or identity-free signaling. Offers carry enough to hijack sessions; authenticate and authorise every signaling message.
- Forgetting data channels. WebRTC's data channel is a low-latency peer transport for game state, file transfer and collaboration — often better than WebSocket for peer-shaped traffic.
- No observability. Call quality (jitter, loss, RTT via `getStats`) is the product metric. Instrument it or quality complaints are undebuggable.

**When to use it:** calls, live media, and peer data where direct paths cut latency and server bandwidth. Pair with solid signaling, TURN fallback, SFU topology for groups, and stats-driven quality work.
