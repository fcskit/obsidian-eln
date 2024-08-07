---
ELN version: 0.4.2
cssclass: normal-page
date created: 2023-02-28
author: Frieder Scheiba
note type: electrochemical cell
tags: electrochemical-cell
cell:
  type: coin cell
  model: CR2032
  dimensions:
    geometry: round
    cell:
      diameter: 20 mm
      height: 3.2 mm
    electrode:
      diameter: 12 mm
      area: 1.131 cm²
    separator:
      diameter: 16 mm
      area: 2.011 cm²
  contact:
    positive: Al-coated stainless steel
    negative: stainless steel
    spacer: stainless steel
  housing:
    manufacturer: Hohsen Corp.
    part number: ~~
    material:
      negative: stainless steel
      positive: Al-coated stainless steel
  compression:
    type: spring washer
    material: stainless steel
    diameter: ~~ mm
    height: ~~ mm
    strength: ~~ N/mm
    compression: ~~ mm
    pressure: ~~ bar
  sealing: 
    type: O-ring
    material: 
    diameter: ~~ mm
    cord thickness: ~~ mm
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
