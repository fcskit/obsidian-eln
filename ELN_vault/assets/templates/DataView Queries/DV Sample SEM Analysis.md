```dataview
TABLE WITHOUT ID
  file.link as Analysis, 
  analysis.method as Method, 
  analysis.parameters["beam energy"] as "Beam energy", 
  analysis.parameters["probe current"] as "Probe current",  
  analysis.parameters["working distance"] as WD,
  analysis["date"] as Date, 
  analysis["status"] as Status
FROM #analysis
WHERE sample.name=this.sample.name AND (analysis.method = "SE inlens" OR analysis.method = "SE thorny" OR analysis.method = "EsB" OR analysis.method = "EDX" OR analysis.method = "STEM" OR analysis.method = "EBSD")
```
