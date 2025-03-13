---
ELN version: 0.5.0
cssclasses:
  - wide-page
  - dashboard
banner: "![[obsidian-eln-banner.png]]"
banner_y: 0.336
date created: 2023-03-25
author: Frieder Scheiba
note type: list
tags:
  - list/lists
---

<div class="title" style="color:#edf">Lists</div>


# Work
- ### [[Projects]]
  ```dataview
  LIST
  FROM #project
  WHERE project.status = "active"
  ```

- ### [[Samples]]
  ```dataview
  LIST
  FROM #sample AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Analyses]]
  ```dataview
  LIST
  FROM #analysis AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Chemicals]]
  ```dataview
  LIST
  FROM #chemical AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Instruments]]
  ```dataview
  LIST
  FROM #instrument  AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Devices]]
  ```dataview
  LIST
  FROM #device AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Processes]]
  ```dataview
  LIST
  FROM #process AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Labs]]
  ```dataview
  LIST
  FROM #lab AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Meetings]]
  ```dataview
  LIST
  FROM #meeting AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

- ### [[Daily Notes]]
  ```dataview
  LIST
  FROM #daily-note  AND !"assets"
  SORT file.mtime.ts ASC
  LIMIT 6
  ``` 

- ### Literature
	 - [[Books]]
	 - [[Publications]]

- ### [[Notes]]
  ```dataview
  LIST
  FROM "Notes" AND !"assets"
  WHERE note-type != "tutorial"
  SORT file.mtime.ts ASC
  LIMIT 6
  ```

# Recently Edited
- 
  ```dataviewjs
    dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").slice(0, 5).file.link)
   ```
- 
  ```dataviewjs
    dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").slice(5, 10).file.link)
   ```
- 
  ```dataviewjs
    dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").slice(10, 15).file.link)
   ```



```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
