---
title: "Geospatial Data"
summary: "Storing and querying locations: nearby search, distances, geohashes."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["geospatial data", "geospatial index", "spatial queries"]
prereqs: ["db-index", "database"]
related: ["k-d-tree", "search-engine", "db-index"]
---

**Geospatial data** is location data — points, lines, areas — and querying it efficiently means answering questions like "which drivers are within 2 km of this point?" or "which delivery zones contain this address?". The problem is that nearby points aren't necessarily adjacent in ordinary storage, so a normal index can't prune by distance.

The answer is a **spatial index** that groups by proximity:

- R-trees / GiST — tree-based indexes that bound regions and prune by overlap; used by databases and GIS systems (see [GiST](/t/specialized-indexes)).
- Geohash / geohash-prefix — encode a coordinate as a string whose shared prefix means "nearby"; then a normal index or prefix query works for proximity.
- Space-filling curves — map 2D to 1D so nearby points stay near; used to make proximity queries indexable.
- Search-engine geo support — engines offer `geo_point`/`geo_shape` fields with distance and bounding-box queries built in (see [search engine](/t/search-engine)).

```text
"find within 5km" → spatial index prunes to nearby regions, then exact distance
```

The classic mistakes:

- Comparing latitude/longitude ranges independently. A bounding box in lat/lng is a rectangle on a flat map, not on a sphere; near poles and the antimeridian it's wrong, and it can't do radius queries directly. Use a spatial index or a proper distance function.
- Ignoring the earth's curvature. Distances in degrees aren't distances in metres; longitude degrees shrink toward the poles. Compute great-circle distance, not Euclidean degrees.
- Storing location as an unindexed string. "lat,lng" in a text column can't be pruned; distance queries scan everything. Store in a geospatial type with a spatial index.
- Forgetting precision and units. Degrees vs metres and rounding choices affect both correctness and index behaviour. Be explicit.
- Assuming exact results from an approximate index. Some geohash approaches are approximate and need a final exact filter; verify the candidate set covers the query area (including edge cases).
- Ignoring write cost. Spatial indexes are heavier to maintain than scalar ones; high-write location data needs care.

**When to use it:** for proximity, radius, "nearest", route or region queries — ride-hailing, delivery, store locators, maps. Use the database's spatial type and index, or a search engine's geo support, rather than rolling coordinate comparisons by hand. It's a specialised form of the proximity idea behind a [k-d tree](/t/k-d-tree), scaled and made spherical.
