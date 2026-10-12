---
title: "Push vs Pull Ingestion"
summary: "The source sending data to you vs you fetching it."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["push ingestion", "pull ingestion", "push vs pull", "webhook vs polling ingestion"]
prereqs: ["data-ingestion", "source-systems"]
related: ["api-ingestion", "file-ingestion", "webhooks", "webhooks-vs-polling", "messages-vs-streams", "batch-vs-streaming-ingestion"]
core: [data-engineer]
---

Who starts the data transfer: **you fetch it (pull)**, or **the source sends it (push)**?

| | **Pull** | **Push** |
|---|---|---|
| How | Your job queries a database, calls an API or reads a file on a schedule | The source calls your endpoint, publishes to a stream, or drops files for you |
| Who controls timing | **You** | **The source** |
| Freshness | At best your polling interval | Near real time |
| Load on the source | You create it (polling cost), but you control it | The source decides what to send |
| Failure handling | Easy: you just retry the pull | The sender must retry, so you need to be reachable and idempotent |
| Examples | Nightly database extract, REST API polling, SFTP fetch | Webhooks, event streams, a partner dropping files into your bucket |

```
Pull:  [ your job ] ──"anything new since 10:00?"──► [ source ] ──► data
Push:  [ source ] ──"order 917 was paid!"──► [ your endpoint / queue ]
```

## Pull: strengths and costs

- **Control**: you choose when, how much and how fast, and can throttle to protect the source.
- **Simple recovery**: if you missed something, pull it again (with a [high-water mark](/t/high-water-mark) or a date range).
- **Wasteful** for rarely changing data (many polls return nothing), and **limited freshness**.
- Rate limits and API quotas apply ([API ingestion](/t/api-ingestion)).

## Push: strengths and costs

- **Low latency** and no wasted polling.
- **Needs an always-available receiver.** If you're down, the sender may drop events, retry for a limited time, or queue them. Put a durable buffer (queue or stream) at the front.
- **Receivers must be idempotent**: retries cause duplicates ([idempotent consumers](/t/idempotent-consumer)).
- **Security**: authenticate the sender (signatures on webhooks, mutual TLS, tokens) and validate payloads.
- **Ordering and loss** aren't guaranteed. Provide a way to **reconcile** (periodic pulls to fill gaps).
- **Spikes**: a burst of pushes can overwhelm you. A queue absorbs it ([message queues](/t/message-queue)).

```python
@app.post("/webhooks/payments")
def receive(request):
    verify_signature(request)                 # authenticate the sender
    queue.send(request.body)                  # buffer durably, return quickly
    return "", 202                            # acknowledge fast; process asynchronously
```

## Choosing

- **You need freshness, and the source supports it**: push (webhooks, streams, change data capture).
- **The source only offers an API or database, or you want control**: pull.
- **Many real pipelines combine them**: push for speed, plus a periodic pull to reconcile ([webhooks vs polling](/t/webhooks-vs-polling)).

See also [batch vs streaming ingestion](/t/batch-vs-streaming-ingestion).
