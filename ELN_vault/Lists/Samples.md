---
ELN version: 0.5.0
cssclasses:
  - wide-page
date created: 2023-03-11
author: Frieder Scheiba
note type: project-list
tags:
  - list/projects
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```
```button
name New Sample
type command
action Templater: Insert assets/templates/New Sample.md
class accent-button
```

> [!Example] TOC
> [[#Samples]]
>   - [[#Compounds]]
>   - [[#Electrodes]]
>   - [[#Electrochemical Cells / Batteries]]

## Sample Lists

```dataview
TABLE WITHOUT ID
  file.link as "Sample List", 
  author as Author, 
  project.name as Project, 
  date-created as Date
FROM #list/samples  
```

## Samples

### Compounds

```dataview
TABLE WITHOUT ID
  file.link as Sample, 
  project.name as Project,
  sample.type as "Sample Type", 
  sample["chemical formular"] as "Chem. formular",
  sample.educts.name as "Educts",
  sample.educts.mass as "Mass",
  date-created as Date
FROM #sample
WHERE sample["type"] = "compound"
SORT project.name, file.link ASC
```

### Electrodes

```dataview
TABLE WITHOUT ID
  file.link as Sample, 
  project.name as Project,
  sample.type as "Sample Type", 
  date-created as Date
FROM #sample
WHERE sample.type = "electrode"
SORT project.name, file.link ASC
```

### Electrochemical Cells / Batteries

```dataview
TABLE WITHOUT ID
  file.link as Sample, 
  project.name as Project,
  sample.type as "Sample Type", 
  date-created as Date
FROM #sample
WHERE sample.type = "electrochemical cell"
SORT project.name, file.link ASC
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
