---
title: "Message"
summary: "A self-contained unit of data sent from one component to another through a broker."
levels: { backend: junior, data-engineer: junior }
aliases: ["queue message", "event message"]
prereqs: ["message-queue"]
related: ["message-queue", "message-broker", "message-headers", "message-ordering"]
---

A message is a self-contained unit of data that one component sends to another through a [message broker](/t/message-broker). It usually has a payload, the data itself, and metadata, such as an ID, a timestamp and a type.

```json
{
  "id": "5f1c9e2a",
  "type": "order.placed",
  "created_at": "2026-03-04T10:00:00Z",
  "payload": { "order_id": 1042, "total": 55.0 }
}
```

Because a message carries everything the receiver needs, the receiver doesn't have to call back to the sender. Metadata such as the type and version helps consumers decide how to handle it, and [headers](/t/message-headers) are a common place to keep it.

The classic mistake is putting only an ID in the message and making every consumer fetch the full record. That couples the consumers to the database and adds a lookup for each one. It also means the data can change between when the message was sent and when it was read. The opposite mistake, a very large payload, slows the broker and the consumers. Keep the message to what the consumer needs, and send large files by reference.
