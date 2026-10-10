---
title: "IoT and Sensor Data"
summary: "High-frequency readings from devices, with gaps, clock drift and duplicates."
levels: { data-engineer: senior }
aliases: ["sensor data", "IoT data", "device telemetry"]
prereqs: ["data-ingestion", "event-streaming"]
related: ["time-series-database", "telemetry-pipeline", "late-arriving-data", "deduplication", "data-quality", "event-time-vs-processing-time"]
---

IoT and sensor data is the stream of readings that connected devices emit — temperature, pressure, GPS position, vibration — usually at a fixed interval or on change. Each reading typically carries a device id, a value and a timestamp.

Sensor data is not business data. Devices go offline, so readings arrive with **gaps**; unreliable device clocks cause **clock drift** that shifts timestamps by minutes or hours; and retries on an at-least-once link produce **duplicates**. A pipeline that assumes one clean row per device per interval will quietly produce wrong averages and counts.

A concrete failure: you average temperature per hour from raw rows, but a device that reconnected resends yesterday's buffer, and another device's clock is two hours fast. The hourly chart spikes and the daily mean is wrong. Deduplicate on `(device_id, timestamp)` and decide whose clock to trust before aggregating.

## Handling the mess

- Deduplicate by device id and reading time, or keep the latest by ingest time. See [deduplication](/t/deduplication).
- Keep event time and processing time apart: the reading time is when the device recorded it, the ingest time is when your system saw it. Late readings are normal; see [late-arriving data](/t/late-arriving-data).
- Do not assume evenly spaced points. Resampling to a fixed grid (say, one row per minute) makes analysis predictable and exposes the gaps.
- Validate ranges. A temperature of 900 °C or a GPS jump across an ocean is usually a sensor fault, not a real reading.

Storage choices differ by scale. A [time-series database](/t/time-series-database) fits high write rates of timestamped measurements; object storage plus [columnar files](/t/columnar-storage) suits cheap long-term history. Both usually need a retention policy.

## When not to over-engineer

With a handful of devices and low frequency, a normal relational table works. A time-series or streaming stack earns its complexity at high write volume, many devices, or when you need live alerts. For the end-to-end path, see the [telemetry pipeline](/t/telemetry-pipeline).
