---
ELN version: 0.4.2
cssclass: normal-page
date created: 2024-07-26
author: Name Surname
note type: lab
tag: 
  - " #lab/Builing_XXX"
lab:
   name: Some Lab
   type: physical laboratory
   building: XXX
   room: 1xx
   contact: 
      - "[[Joe Public]]"
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```
```dataviewjs
await dv.view("/assets/javascript/dataview/views/lab", {});
```

## Devices

```dataview
TABLE WITHOUT ID
   file.link as Device,
   device.type as Type,
   device.manufacturer as Manufacturer
FROM #device
WHERE device.location.building=this.lab.building AND device.location.room=this.lab.room
```

## Instruments

```dataview
TABLE WITHOUT ID
   file.link as Instrument,
   instrument.type as Type,
   instrument.manufacturer as Manufacturer
FROM #instrument
WHERE instrument.location.building=this.lab.building AND instrument.location.room=this.lab.room
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
