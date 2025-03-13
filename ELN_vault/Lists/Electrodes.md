---
ELN version: 0.5.0
cssclasses:
  - wide-page
date created: 2023-04-02
author: Frieder Scheiba
note type: electrode-list
tags:
  - list/electrodes
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

## Reference Electrodes

```dataview
TABLE WITHOUT ID
  file.link as "Ref. Electrode", 
  electrode["redox pair"] as "Redox Pair",
  electrode["standard potential"] as "Std. Potential / V"
FROM #electrode/reference 
SORT electrode["standard potential"] ASC
```

## Standard Electrodes

```dataview
TABLE WITHOUT ID
  file.link as "Electrode", 
  electrode["redox pair"] as "Redox Pair",
  electrode["standard potential"] as "Std. Potential / V"
FROM #electrode/standard 
SORT electrode["standard potential"]  ASC
```


## Electrode Samples

```dataview
TABLE WITHOUT ID
  file.link as Electrode, 
  project.name as Project,
  date-created as Date
FROM #sample
WHERE sample.type = "electrode"
SORT project.name, file.link ASC
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
