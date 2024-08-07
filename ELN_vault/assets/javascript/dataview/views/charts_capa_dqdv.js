if (input && dv) {

  var charts = require(app.vault.adapter.basePath + "/assets/javascript/dataview/dv_charts.js");
  let file_name = dv.current().file.frontmatter.analysis.name + "_reduced_data.csv"
  charts.plot_cycles(dv, file_name)

}