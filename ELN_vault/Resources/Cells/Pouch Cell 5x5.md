---
ELN version: 0.4.2
cssclass: normal-page
date created: 2023-02-28
author: Frieder Scheiba
note type: electrochemical cell
tags: electrochemical-cell
cell:
  type: pouch cell
  model: 5x5
  electrode layers: 1
  dimensions:
    geometry: rectangular
    cell:
      width: 70 mm
      length: 100 mm
      thickness: 3.0 mm
    electrode:
      width: 50 mm
      length: 50 mm
      area: 25 cm²
    separator:
      width: 55 mm
      length: 55 mm
      area: 30.25 cm²
  contact:
    positive: laser-welded tab
    negative: laser-welded tab
  housing:
    manufacturer: ~~
    part number: ~~
    material:
      body: PP-Al-PET pouch bag foil
  compression:
    type: vacuum
    pressure: 1 atm
  sealing:
    type: lamination
    material: PP
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
