async function new_instrument(tp, return_type, out_folder) {
  const path = require('path');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];
  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  let folder_instruments = 'Resources/Instruments';
  try {
    folder_instruments = eln_settings.folder.instruments
  }
  catch (error) {
    console.log(`folder.instruments not found in ELN settings. Using default folder "${folder_instruments}"`);
  }
  /**********************************************************************************/
  var author = '';
  try {
    author = eln_settings.note.author;
  }
  catch (error) {
    console.log(`note.author not found in ELN settings.`);
  }
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];

  /**********************************************************************************/
  const manufacturer = await tp.system.prompt("Enter manufacturer:", "")
  const model = await tp.system.prompt("Enter model:", "")
  const instrument_name = await tp.system.prompt("Enter instrument name:", manufacturer + " - " + model)
  const instrument_type_list = eln_settings.instrument.type
  const instrument_type = await tp.system.suggester(instrument_type_list, instrument_type_list, false, "Choose instrument type:", "")
  const building = await tp.system.prompt("Enter building:", "")
  const room = await tp.system.prompt("Enter room:", "")

  /**********************************************************************************/
  /*                             Choose METHOD(S)                                  */
  /**********************************************************************************/
  const method_list = eln_settings.instrument.techniques[instrument_type]
  // initialize variables for selection dialog
  var prompt = 'Choose analytical methods available for the instrument:'
  var option_string = ''
  var abort_string = 'Exit selection'
  var list = method_list

  var selected_items = []
  if ((Array.isArray(list) && list.length)) {
    if (!option_string.trim() === '') {
      list.push(option_string)
    }
    list.push(abort_string)
    while (true) {
      var selection = await tp.system.suggester(list, list, false, prompt)
      if (selection === abort_string) {
        break
      } else {
        // add selected item to list of selected items
        selected_items.push(selection)
        // get index of selected item
        const index = list.indexOf(selection);
        if (index > -1) { // only remove item when item is found
          list.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
  } else if (list.length == 0) {
    console.log('Variable "list" passed to function tp_multiple_selection is empty.')
  } else {
    console.log(`Varibale "list" passed to function tp_multiple_selection is no Array but of type: ${typeof list}`)
    console.log(`... and contains: ${JSON.stringify(list)}`)
  }

  const methods = selected_items

  // const method_str = await tp.system.prompt("Enter analytical method(s) separated by colon (,):", "")

  // parse method_str
  //const methods = method_str.split(',').map(string => string.trim())

  // create METHOD and TAG string for YAML frontmatter
  var methods_yaml = ''
  var tags_yaml = '\n'
  const yaml_parameter_set = [
    'parameter_1: ~~ unit\n',
    'parameter_2: ~~ unit\n',
    'parameter_3: ~~ unit\n'
  ]
  var instrument_parameters_yaml = '\n'
  if (methods.length > 0) {
    methods_yaml += '\n'
    for (var index in methods) {
      methods_yaml += ' '.repeat(5) + `- ${methods[index]}\n`
      instrument_parameters_yaml += ' '.repeat(2 * 2) +
        methods[index] + ':\n' +
        yaml_parameter_set.map(s => ' '.repeat(3 * 2) + s).join('')
      tags_yaml += '  - " #instrument/' +
        methods[index].replace(/[\s]/g, '_') + '/' +
        manufacturer.replace(/[\s]/g, '_') + '_' +
        model.replace(/[\s]/g, '_') + '"\n'
    }
  } else {
    methods_yaml += 'no method defined'
    instrument_parameters_yaml += ' '.repeat(2 * 2) + 'no method:\n' +
      yaml_parameter_set.map(s => ' '.repeat(3 * 2) + s).join('')
    tags_yaml += '  - " #instrument/' +
      'none' + '/' +
      manufacturer.replace(/[\s]/g, '_') + '_' +
      model.replace(/[\s]/g, '_') + '"\n'
  }
  // trim last line break from methods_yaml, instrument_parameters_yaml and tags_yaml
  methods_yaml = methods_yaml.slice(0, -1)
  instrument_parameters_yaml = instrument_parameters_yaml.slice(0, -1)
  tags_yaml = tags_yaml.slice(0, -1)

  /**********************************************************************************/
  /*                           SELECT CONTACT PERSON(S)                             */
  /**********************************************************************************/
  prompt = 'Select contact person(s):'
  option_string = 'New Contact ...'
  const option_promt = 'Enter contact name:'
  const option_template = 'Contact - Template'
  const option_output_folder = eln_settings['folder contacts']
  abort_string = 'Exit selection'
  const page_selection = '#contact AND !"assets"'

  var list = app.plugins.plugins.dataview.api
    .pages(page_selection)
    .sort(p => p.file.name, 'asc')
    .map(p => String([p.file.name]))
    .values;

  if (!(option_string.trim() === '')) {
    list.push(option_string)
  }

  var selected_items = []
  var optional_items = []
  if ((Array.isArray(list) && list.length)) {
    list.push(abort_string)
    while (true) {
      var selection = await tp.system.suggester(list, list, false, prompt)
      if (selection === abort_string) {
        break
      } else if (selection === option_string) {
        const new_item = await tp.system.prompt(option_promt, '')
        optional_items.push(new_item)
        selected_items.push(new_item)
      } else {
        // add selected item to list of selected items
        selected_items.push(selection)
        // get index of selected item
        const index = list.indexOf(selection);
        if (index > -1) { // only remove item when item is found
          list.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
  } else if (list.length == 0) {
    console.log('Varibale "list" passed to function tp_multiple_selection is empty.')
  } else {
    console.log(`Varibale "list" passed to function tp_multiple_selection is no Array but of type: ${typeof list}`)
    console.log(`... and contains: ${JSON.stringify(list)}`)
  }

  /* Create new note from template if optional item has been selected */
  if (optional_items.length) {
    for (var index in optional_items) {
      var new_note_template_str = ''
      const new_note_filename = optional_items[index]
      const new_note_template_name = option_template
      const new_note_template = tp.file.find_tfile(new_note_template_name)
      const output_folder_path = option_output_folder
      const output_folder = app.vault.getAbstractFileByPath(output_folder_path)
      await tp.file.create_new(new_note_template, new_note_filename, false, output_folder)
    }
  }

  var yaml_list = '\n'
  if (selected_items.length > 0) {
    for (var index in selected_items) {
      yaml_list += ' '.repeat(2*2) + `- "[[${selected_items[index]}]]"\n`
    }
  } else {
    yaml_list = ' '.repeat(2*2) + '- no contact' + '\n'
  }

  // trim last line break from contact_persons_yaml
  const contact_persons_yaml = yaml_list.slice(0, -1)
  
  const note_content = `---
ELN version: ${eln_version}
cssclass: normal-page
date created: ${date_created}
author: ${author}
note type: instrument
tag: ${tags_yaml}
instrument:
  name: ${instrument_name}
  type: ${instrument_type}
  manufacturer: ${manufacturer}
  model: ${model}
  location:
    building: ${building}
    room: ${room}
  contact: ${contact_persons_yaml}
  documentation: 
    - "[[${instrument_name} (Manual).pdf|Manual]]"
  url: "[link to manufacturer]()"
  methods:  ${methods_yaml}
  info:
    info_1: ~~
    info_2: ~~
  parameters: ${instrument_parameters_yaml}
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

![[dummy-image-instrument.png]]

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/instrument", {});
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

  const filename = instrument_name;
  // const folder = path.join(folder_instruments, instrument_name);
  const folder = folder_instruments + '/' + instrument_name;

  if (!app.vault.getAbstractFileByPath(folder)) {
    console.log(`${folder} does not exist.`);
    console.log(`Creating folder ...`);
    await app.vault.createFolder(folder)
    await app.vault.createFolder(folder + "/Documents")
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
    console.log(`Creating new sample note in folder ${folder} with name ${filename}`);
    const tfolder = app.vault.getAbstractFileByPath(folder);
    await tp.file.create_new(note_content, filename, true, tfolder);
    return '';
  }
}

module.exports = new_instrument;