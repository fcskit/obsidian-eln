```dataview
TABLE WITHOUT ID
  file.link as Analysis, 
  sample["working electrode"].name as "WE Electrode",
  sample.electrolyte.name as Electrolyte, 
  sample.cell as Method, 
  analysis.parameters["cycles"] as Cycles, 
  analysis.parameters["Ewe min"] as Ewe_min,  
  analysis.parameters["Ewe max"] as Ewe_max,
  analysis.date as Date, 
  analysis.status as Status
FROM #analysis
WHERE sample.name=this.sample.name AND analysis.method = "GCPL"
```


```dataview
TABLE WITHOUT ID
  file.link as Analysis, 
  sample["working electrode"].name as "WE Electrode",
  sample.electrolyte.name as Electrolyte, 
  analysis.method as Method, 
  analysis.parameters["cycles"] as Cycles, 
  analysis.parameters["Ewe min"] as Ewe_min,  
  analysis.parameters["Ewe max"] as Ewe_max,
  analysis.date as Date, 
  analysis.status as Status
FROM #analysis
WHERE sample.name=this.sample.name AND (analysis.method = "GCPL" OR analysis.method = "CV" OR analysis.method = "PITT" OR analysis.method = "EIS")
```