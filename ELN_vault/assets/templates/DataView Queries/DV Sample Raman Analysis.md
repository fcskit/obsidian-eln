```dataview
TABLE WITHOUT ID
  file.link as Analysis, 
  analysis.method as Method, 
  analysis.parameters.laser as "Laser", 
  analysis.parameters["wavenumber-min"] + " - " + analysis.parameters["wavenumber-max"] as "Spec. range",  
  analysis.parameters.intensity as Intensity,
  analysis.parameters.grating as Grating,
  analysis["date"] as Date, 
  analysis["status"] as Status
FROM #analysis
WHERE sample.name=this.sample.name AND (analysis.method = "Raman Spectroscopy" OR analysis.method = "Raman Mapping")
```
