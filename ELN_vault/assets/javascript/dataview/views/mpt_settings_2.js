if (input && dv) {
  // load path module
  var path = require('path');
  // get active file
  const activeFile = app.workspace.getActiveFile();
  const fileBasename = activeFile.basename;
  // console.log(fileBasename);
  const relativeFilePath = activeFile.path;
  // console.log(relativeFilePath);
  // strip fileBasename and extension from relativeFilePath
  const relativeFilePathNoExt = relativeFilePath.replace(fileBasename + ".md", "");
  // console.log(relativeFilePathNoExt);
  const vaultPath = app.vault.adapter.getBasePath();
  const absoluteFilePath = path.join(vaultPath, relativeFilePath);
  // console.log(absoluteFilePath)
 
  const absoluteFolderPath = path.dirname(absoluteFilePath);
  // join path insertign subdirector data to the path
  let file_name_base = path.join(absoluteFolderPath, "data", fileBasename);
  // set file name containing the experimental parameters
  let file_name = file_name_base + "_param.csv";

  const table = await processLineByLine(file_name);
  dv.table(table.columns, table.rows);
  /*
  // use dataview to load csv file
  let data = await dv.io.csv(file_name);
  // define parameter list to be excluded
  // let exclude_param = ["vs.", "I Range", "Bandwidth", "Im", "unit Im", "dI/dt", "dunit dI/dt",
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
  */
}

async function processLineByLine(file_name) {
  // read file line by line using readline module
  const events = require('events');
  const fs = require('fs');
  const readline = require('readline');
  var lineCounter = 0;
  var entries;
  var rows = [];
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(file_name),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      lineCounter += 1;
      // split line
      entries = line.split(",");
      if (lineCounter == 1) {
        columns = entries;
      }
      else {
        rows.push(entries)
      }
      // dv.paragraph(line);
    });

    await events.once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
  return {rows: rows, columns: columns}
}