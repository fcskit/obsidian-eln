async function new_chemical(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];

  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  let folder_chemicals = 'Resources/Chemicals';
  try {
    folder_chemicals = eln_settings.folder.chemicals;
  }
  catch (error) {
    console.log(`folder.chemicals not found in ELN settings. Using default folder "${folder_chemicals}"`);
  }
  /**********************************************************************************/
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];

  /**********************************************************************************/
  const chemical_type_list = eln_settings.chemical.type
  const chemical_type = await tp.system.suggester(chemical_type_list, chemical_type_list, false, 'Select type of chemical:')
  const tags_yaml = '\n  - " #chemical/' + chemical_type.replace(/\s/g, '_') + ' "\n';
  // make field_of_use_list is a deep copy of eln_settings.chemical['field of use']
  const field_of_use_list = JSON.parse(JSON.stringify(eln_settings.chemical['field of use']));
  const ms_settings = {
    prompt: 'Select field of use:',
    abort_string: 'Exit selection ...',
    list: field_of_use_list
  };
  const field_of_use = await tp.user.multiple_selection(tp, ms_settings)
  // format field of use as yaml list
  const field_of_use_yaml = field_of_use.map(x => '\n    - "' + x + '"').join('')

  const chemical_name = await tp.system.prompt("Enter chemical name:", "")
  const cas_number = await tp.system.prompt("Enter CAS number:", "")
  const molar_mass = await tp.system.prompt("Enter molar mass without units:", "")
  // const synonyms
  const chemical_formula = '$' + await tp.system.prompt("Enter chemical formula (use _{sub} for sub- and ^{sup} for superscript:", "") + '$'

  /**********************************************************************************/
  /*                              Batch Information                                 */
  /**********************************************************************************/
  const chemical_grade = await tp.system.prompt("Enter chemical grade:", "")
  const manufacturer = await tp.system.prompt("Enter manufacturer:", "")
  const supplier = await tp.system.prompt("Enter supplier:", manufacturer)
  const product_name = await tp.system.prompt("Enter full product name:", chemical_name)
  const delivery_date = await tp.system.prompt("Enter delivery date:", tp.date.now())
  const batch_number = await tp.system.prompt("Enter batch-number:", "")
  const batch_quantity = await tp.system.prompt("Enter batch quantity:", "")
  const url = await tp.system.prompt("Enter product url:", "https://de.vwr.com")

  var note_title = chemical_name
  if (batch_number !== '') {
    const note_title = chemical_name + " - B" + batch_number
  }
  
  const note_content = `---
ELN version: ${eln_version}
cssclass: normal-page
date created: ${date_created}
author: ${author}
note type: chemical
tags: ${tags_yaml}
# ELN information for chemical
chemical:
  type: ${chemical_type}
  field of use: ${field_of_use_yaml}
  name: ${chemical_name}
  CAS: ${cas_number}
  synonyms:
  formula: ${chemical_formula}
  properties:
    molar mass: ${molar_mass} g/mol
    density: ~~ g/cm3
    melting point: ~~ K
    boiling point: ~~ K
    solubility in water: ~~ g/l
  batch:
    grade: "${chemical_grade}"
    supplier: ${supplier}
    manufacturer: ${manufacturer}
    product name: "${product_name}"
    delivery date: ${delivery_date}
    batch number: ${batch_number}
    quantity: ${batch_quantity}
    url: "[link to store](${url})"
  safety:
    safety data sheet: "[[msds-dummy.pdf|MSDS]]"
    h-statements: 
      - Hxxx
    p-statements:
      - Pxxx
    threshold limit value: ~~
    toxicity: ~~ mg·kg−1 (LD50)
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/chemical", {obsidian: obsidian});
\`\`\`

\`\`\`dataviewjs
  await dv.view("/assets/javascript/dataview/views/chem_links", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
\`\`\`
`;

  const active_file = app.workspace.getActiveFile();
  // if return_type is not defined
  if (return_type === undefined) {
    // get content of active file
    const active_file_content = await app.vault.read(active_file);
    // check if active file is empty
    if (active_file_content === '') {
      return_type = "insert";
    }
    else {
      return_type = "create";
    }
  }

  const filename = note_title;
  // const folder = path.join(folder_chemicals, chemical_type);
  const folder = folder_chemicals + '/' + chemical_type;

  if (!app.vault.getAbstractFileByPath(folder)) {
    console.log(`${folder} does not exist.`);
    console.log(`Creating folder ...`);
    await app.vault.createFolder(folder)
  } else {
    console.log(`${folder} exists.`);
  }

  if (return_type === "insert") {
    // move and rename file
    // const new_file_path = path.join(folder, filename + ".md");
    const new_file_path = folder + '/' + filename + ".md";
    await app.vault.rename(active_file, new_file_path);
    return note_content;
  }
  else if (return_type === "create") {
    console.log(`Creating new chemical note in folder ${folder} with name ${filename}`);
    const tfolder = app.vault.getAbstractFileByPath(folder);
    await tp.file.create_new(note_content, filename, true, tfolder);
    return '';
  }
}

module.exports = new_chemical;