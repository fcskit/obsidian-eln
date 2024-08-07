if (input && dv) {
  // load path module
  var path = require('path');
  // get file name of the current markdown note file
  let current_file = dv.current().file.name;
  // get folder path and file name of current file
  let current_file_name = path.basename(current_file);
  let folder_path = path.dirname(current_file);
  // join path insertign subdirector data to the path
  file_name_base = path.join(folder_path, "data", current_file_name);
  // set file name containing the experimental parameters
  let file_name = file_name_base + "_param.csv";
  // use dataview to load csv file
  let data = await dv.io.csv(file_name);
  // define parameter list to be excluded
  let exclude_param = ["vs.", "I Range", "Bandwidth", "Im", "unit Im", "dI/dt", "dunit dI/dt",
    "E range min (V)", "E range max (V)", "dER/dt (mV/h)", "dq", "unit dq",
    "tM (h:m:s)", "dtq (s)", "dQM", "unit dQM", "dxM", "delta SoC (%)", "dER (mV)"];
  // determine column names in data file
  let isstring = false;
  let columns = Object.keys(data.values[0]).map(c => {
    if (!isNaN(c)) { return c }
    else if (typeof c === 'string' & !isstring) { isstring = true; return c }
    else if (typeof c === 'string' & isstring) { isstring = false }
    else { return c }
  })
  // Dataview sorts columns alphabetically
  // Since column names of seqences are numbers, the Ns column will be the last
  // if columns contains 'Ns' move it to the beginning
  if (columns.includes('Ns')) {
    columns.unshift(columns.splice(columns.indexOf('Ns'), 1)[0])
  }

  let table_data = [...data].filter(row => !exclude_param.includes(row["Ns"])).map(row => columns.map(col => row[col]));
  dv.table(columns, table_data);
}