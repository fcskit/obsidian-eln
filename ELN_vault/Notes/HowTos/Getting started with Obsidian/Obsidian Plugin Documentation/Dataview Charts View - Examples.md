# Dataview Plugin Integration

## Folder Count [](https://github.com/caronchen/obsidian-chartsview-plugin/wiki/Chart-examples#folder-count)

```
#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
           .groupBy(p => p.file.folder)
		   .map(p => ({folder: p.key || "ROOT", count: p.rows.length}))
		   .array();
```

```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: Column

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
           .groupBy(p => p.file.folder)
           .map(p => ({folder: p.key || "ROOT", count: p.rows.length}))
           .array();

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: "folder"
  yField: "count"
  padding: auto
  label:
    position: "middle"
    style:
      opacity: 0.6
      fontSize: 12
  columnStyle:
    fillOpacity: 0.5
    lineWidth: 1
    strokeOpacity: 0.7
    shadowColor: "grey"
    shadowBlur: 10
    shadowOffsetX: 5
    shadowOffsetY: 5
  xAxis:
    label:
      autoHide: false
      autoRotate: true
  meta:
    count:
      alias: "Count"
```

## Year Count [](https://github.com/caronchen/obsidian-chartsview-plugin/wiki/Chart-examples#year-count)

```
#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
          length}))
           .array();
```

![image](https://user-images.githubusercontent.com/150803/165743596-95f5c93c-1bc4-47ec-872d-adc5041b7fff.png)

## Day and Night Count [](https://github.com/caronchen/obsidian-chartsview-plugin/wiki/Chart-examples#day-and-night-count)

```
#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
           .groupBy(p => p.file.ctime.hour >= 8 && p.file.ctime.hour <= 18 ? 'Day' : 'Night')
		   .map(p => ({cdate: p.key, count: p.rows.length}))
		   .array();
```

![image](https://user-images.githubusercontent.com/150803/140925371-7d645640-db9b-4e43-8828-24b084f298db.png)

#### [](https://github.com/caronchen/obsidian-chartsview-plugin/wiki/Chart-examples#hour-count)Hour Count

```
#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
           .groupBy(p => p.file.ctime.toFormat("HH"))
		   .map(p => ({cdate: p.key, count: p.rows.length}))
		   .array();
```

![image](https://user-images.githubusercontent.com/150803/140925719-a7a1e1c9-c682-4e9b-a491-e103537052de.png)

#### [](https://github.com/caronchen/obsidian-chartsview-plugin/wiki/Chart-examples#date-count)Date Count

```
#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
           .groupBy(p => p.file.cday.toFormat("yyyy/MM"))
		   .map(p => ({cdate: p.key, count: p.rows.length}))
		   .array();
```

![image](https://user-images.githubusercontent.com/150803/140925781-6d601a13-db73-454b-96af-d3def8cc00e1.png)

#### [](https://github.com/caronchen/obsidian-chartsview-plugin/wiki/Chart-examples#task-count)Task Count

```
#-----------------#
#- chart type    -#
#-----------------#
type: Column

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
           .flatMap(page => page.file.tasks)
           .groupBy(task => ({completion: task.completion?? task.created.toFormat("yyyy/MM/dd"), status: task.completed ? 'Done' : 'Undone'}))
           .map(group => ({cdate: group.key.completion, status: group.key.status, count: group.rows.length}))
           .array();

#-----------------#
#- chart options -#
#-----------------#
options:
  isStack: true
  xField: "cdate"
  yField: "count"
  seriesField: 'status'
  label:
    position: "middle"
  xAxis:
    label:
      autoHide: false
      autoRotate: true
```

![image](https://user-images.githubusercontent.com/150803/165742240-6199a44d-e067-4ea5-9dfa-5e7097904951.png)

#### [](https://github.com/caronchen/obsidian-chartsview-plugin/wiki/Chart-examples#tag-cloud)Tag Cloud

```
#-----------------#
#- chart type    -#
#-----------------#
type: WordCloud

#-----------------#
#- chart data    -#
#-----------------#
data: |
  dataviewjs:
  return dv.pages()
           .flatMap(p => p.file.etags)
           .groupBy(p => p)
           .map(p => ({tag: p.key, count: p.rows.length}))
           .array();

#-----------------#
#- chart options -#
#-----------------#
options:
  wordField: "tag"
  weightField: "count"
  colorField: "count"
  wordStyle:
    rotation: 30
  enableSearchInteraction:
    operator: tag
```