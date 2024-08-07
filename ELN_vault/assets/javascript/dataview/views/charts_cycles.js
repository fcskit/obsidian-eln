if (input && dv) {

  var charts = require(app.vault.adapter.basePath + "/assets/javascript/dataview/dv_charts.js");
  let file_name = dv.current().file.frontmatter.analysis.name + "_cycles.csv"
  let exclude_cycles = [];
  // check if dv.current().file.frontmatter["data preview"] has a key 
  // called "exclude cycles"
  if (dv.current().file.frontmatter["data preview"] && dv.current().file.frontmatter["data preview"]["exclude cycles"]) {
    exclude_cycles = dv.current().file.frontmatter["data preview"]["exclude cycles"];
  }
  charts.plot_cycle_data(dv, file_name, exclude_cycles);

}