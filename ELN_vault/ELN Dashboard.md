---
ELN version: 0.5.0
cssclasses:
  - wide-page
  - dashboard
banner: "![[obsidian-eln-banner.png]]"
banner_y: 0.336
date created: 2023-03-25
author: Frieder Scheiba
note type: dashboard
tags:
  - dashboard
---

<div class="title" style="color:#edf">ELN Dashboard</div>

# Project Management

- ### [[Projects]]
  ```dataview
  LIST
  FROM #project
  WHERE project.status = "active"
  ```


- ### [[Lists]]
	- [[Processes]]
	- [[Samples]]
	- [[Analyses]]
	- [[Chemicals]]
	- [[Devices]]
	- [[Instruments]]

- ### [[Lists]] (continued)
	- [[Electrodes]]
	- [[Samples]]
	- [[Analyses]]
	- [[Chemicals]]
	- [[Devices]]
	- [[Instruments]]

# Experiments (recently edited)

- ### [[Processes]]
  ```dataview
  LIST
  FROM #process
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Samples]]
  ```dataview
  LIST
  FROM #sample
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Analyses]]
  ```dataview
  LIST
  FROM #analysis 
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

# Resources (recently edited)

- ### [[Chemicals]]
  ```dataview
  LIST
  FROM #chemical
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Devices]]
  ```dataview
  LIST
  FROM #device 
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Instruments]]
  ```dataview
  LIST
  FROM #analysis 
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Electrodes]]
  ```dataview
  LIST
  FROM #electrode 
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Cells]]
  ```dataview
  LIST
  FROM #electrochemical-cell
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Labs]]
  ```dataview
  LIST
  FROM #lab 
  SORT file.mtime.ts ASC
  LIMIT 6
  ```



```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
