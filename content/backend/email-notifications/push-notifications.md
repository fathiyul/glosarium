---
title: "Push Notifications"
summary: "Sending alerts to phones and browsers through APNs, FCM or Web Push."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["push notifications", "push notification", "mobile push"]
prereqs: ["notification-preferences", "sending-email"]
related: ["notification-preferences", "sending-email"]
---

**Push notifications** deliver a short message to a user's device or browser through a platform service (APNs for Apple, FCM for Android/web and similar). Your backend sends the message to the push service; the service delivers it to the device via a **device token**. Unlike email, push is instant and tied to an installed app or subscribed browser.

```text
backend → push service (APNs/FCM) → device token → user's device
```

How it works in practice: the client registers, receives a device token, and sends it to your backend; your backend stores tokens per user and sends notifications by posting to the push service with the token and payload.

The classic mistakes:

- Assuming delivery is guaranteed. Push is best-effort: devices can be offline, notifications can be throttled or dropped by the OS, and the user can have notifications disabled. Never make push the only path for critical information.
- Treating push like email. Payloads are size-limited, delivery isn't guaranteed, and the OS may batch or suppress. Design small payloads and a pull-to-refresh for details.
- Ignoring token lifecycle. Tokens change (reinstalls, app updates) and expire. Stale tokens cause failed sends; process the push service's feedback and remove invalid tokens.
- Sending to expired/uninstalled apps. Repeated failures for dead tokens waste effort and can affect your sending reputation with the push service. Prune them.
- No permission handling. Users must grant notification permission; if they decline, push can't be used. Track the permission state (see [notification preferences](/t/notification-preferences)).
- Over-sending. Frequent, low-value pushes get the app muted or uninstalled. Respect preferences and batch/quiet-hours (see [notification preferences](/t/notification-preferences)).
- Security of payloads. Push payloads go through a third party (and can be seen by the OS); don't put sensitive data directly in the payload — send a signal and fetch details securely.

**When to use it:** for timely, user-facing alerts where the app/browser is the channel — messages, reminders, breaking events, order status. Combine with email for anything that must be reliably received, and honour preferences and permissions. It's the fastest channel and the easiest to abuse; used well it's high-value, overused it drives users away. See [SMS delivery](/t/sms-delivery) for another channel.
