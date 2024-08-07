---
ELN version: 0.4.2
cssclass: normal-page
date created: 2023-02-28
author: Frieder Scheiba
note type: electrochemical cell
tags: electrochemical-cell
cell:
  type: 3-electrode
  model: PFA-xx-xx
  dimensions:
     geometry: round
     cell:
       diameter: 25 mm
       height: 90 mm
     electrode:
       diameter: 12 mm
       area: 1.131 cm²
     separator:
       diameter: 12 mm
       area: 1.131 cm²
  contact:
    negative: stainless steel
    positive: stainless steel
    spacer: nickel
  housing:
    manufacturer: Swagelok
    part number: PFA-xx-xx
    material: 
      body: PFA
      negative: stainless steel
      positive: stainless steel
  compression:
    type: spring
    material: stainless steel
    diameter: 10 mm
    height: 14 mm
    strength: ~~ N/mm
    compression: 4 mm
    pressure: ~~ bar
  sealing:
    type: clamp ring
    material: PFA
    torque: ~~ Nm
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
