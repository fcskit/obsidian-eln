---
ELN version: 0.5.0
cssclasses:
  - wide-page
date created: 2024-07-17
author: Frieder Scheiba
note type: device-list
tags:
  - list/devices
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name Add Device
type command
action Templater: Insert assets/templates/New Device.md
class accent-button
```


```dataview
TABLE WITHOUT ID
  file.link as Device, 
  device.manufacturer as Manufacturer,
  device.model as Model,
  device.type as "Type",
  device.contact as "Contact", 
  device.location.building as Building, 
  device.location.room as Room
FROM #device
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
