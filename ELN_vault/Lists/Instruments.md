---
ELN version: 0.3.2
cssclass: wide-page
date created: 2023-03-07
author: Frieder Scheiba
note type: instrument-list
tag: list/instruments
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

```button
name Add Instrument
type command
action Templater: Insert assets/templates/New Instrument.md
class accent-button
```

```dataview
TABLE WITHOUT ID
  file.link as Instrument, 
  instrument.manufacturer as Manufacturer,
  instrument.model as Model,
  instrument.methods as "Methods",
  instrument.contact as "Contact", 
  instrument.location.building as Building, 
  instrument.location.room as Room
FROM #instrument
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
