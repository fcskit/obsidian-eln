const { type } = require('os');

function get_property() {
  if (arguments.length >= 2) {
    var obj = arguments[0];
    const keys = Array.from(arguments).slice(1);
    for (var i in keys) {
      if (obj.hasOwnProperty(keys[i])) {
        obj = obj[keys[i]];
      } else {
        console.log(`Property "${keys[i]}" not found in object.`);
        return null;
      }
    }
    return obj;
  }
  else {
    console.log('Function get_property requires at least two arguments.');
    return null;
  }
}

async function new_analysis(tp, return_type, out_folder) {
  const path = require('path');
  const fs = require('fs');

  /**********************************************************************************/
  // get META DATA of ELN SETTINGS
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  const eln_version = eln_settings["ELN version"];

  /**********************************************************************************/
  // initialize OUTPUT FOLDER(S)
  const folder_analysis = get_property(eln_settings, 'folder', 'analyses');
  const folder_local_data = get_property(eln_settings, 'folder', 'local data');
  const folder_remote_data = get_property(eln_settings, 'folder', 'remote data');
  /**********************************************************************************/
  const author = await tp.user.get_author(tp);
  // get current date and format it to ISO 8601
  const date = new Date();
  const date_created = date.toISOString().split('T')[0];

  /**********************************************************************************/
  /*                       Determine Sample Name for Analysis                       */
  /**********************************************************************************/
  var sample_name;
  // try to determine active obsidian note
  const active_note = app.workspace.getActiveFile();
  if (active_note === null) {
    console.log('No active note found.');
  }
  else {
    // read file cache
    const file_cache = app.metadataCache.getFileCache(active_note);
    const file_frontmatter = get_property(file_cache, 'frontmatter');
    if (file_frontmatter !== null) {
      sample_name = get_property(file_frontmatter, 'sample', 'name');
    }
    else {
      console.log('No frontmatter found in active note.');
    }
  }
  // if no sample name is found, let user select sample
  if (sample_name === null) {
    // get list of projects
    const project_list = app.plugins.plugins.dataview.api
      .pages('#project AND !"assets"')
      .sort(p => p.file.name, 'asc')
      .map(p => String([p.file.name]))
      .values;
    // let user select project
    const project_name = await tp.system.suggester(
      project_list, project_list, false, 'Select project:');
    // get list of samples for selected project
    const sample_list = app.plugins.plugins.dataview.api
      .pages('#sample AND !"assets"')
      .where(p => p.project.name === project_name)
      .sort(p => p.sample.name, 'desc')
      .map(p => [p.file.name])
      .values;
    // let user select sample
    sample_name = await tp.system.suggester(
      sample_list, sample_list, false, 'Select sample:');
    if (sample_name === null) {
      console.log('No sample selected.');
      return '';
    }
  }

  let sample_meta = DataviewAPI.page(tp.file.find_tfile(sample_name).path);

  /**********************************************************************************/
  /*                           LET USER SELECT OPERATOR                             */
  /**********************************************************************************/
  const operator = await tp.user.get_operator(tp);
  const operator_name = operator.name;
  /**********************************************************************************/
  /*                          LET USER SELECT INSTRUMENT                            */
  /**********************************************************************************/

  const instrument_list = app.plugins.plugins.dataview.api
    .pages('#instrument AND !"assets"')
    .sort(p => p.file.name, 'asc')
    .map(p => String([p.file.name]))
    .values;

  const instrument = await tp.system.suggester(
    instrument_list, instrument_list, false, 'Select intrument for analysis:');

  /**********************************************************************************/
  /*                      GET METHODS DEFINED FOR INSTRUMENT                        */
  /**********************************************************************************/
  const instrument_tfile = tp.file.find_tfile(instrument)
  const instrument_meta = DataviewAPI.page(instrument_tfile.path)

  const analysis_method_list = instrument_meta.file.frontmatter.instrument.methods

  /**********************************************************************************/
  /*                            LET USER SELECT METHOD                              */
  /**********************************************************************************/
  var analysis_method = '';
  if (analysis_method_list.length == 1) {
    analysis_method = analysis_method_list[0];
  } else {
    analysis_method = await tp.system.suggester(analysis_method_list, analysis_method_list);
  }

  /**********************************************************************************/
  /*                  PREPARE YAML PARAMETER SECTION FOR METHOD                     */
  /**********************************************************************************/
  var analysis_parameter_yaml = '\n' + tp.user.object_to_yaml(
    instrument_meta.file.frontmatter
      .instrument.parameters[analysis_method], level = 2);

  /**********************************************************************************/
  /*                            CHOOSE ANALYSIS STATUS                              */
  /**********************************************************************************/
  const status_list = get_property(eln_settings, 'analysis', 'status');

  const status = await tp.system.suggester(status_list, status_list, false, 'Choose analysis status:')
  
  const tags_yaml = '\n  - " #analysis/' +
    sample_name.replace(/[\s]/g, '_') + '/' + analysis_method.replace(/[\s]/g, '_') + '"\n';
  const note_content = `---
ELN version: ${eln_version}
cssclass: normal-page
date created: ${date_created}
author: ${author}
note type: analysis
tags: ${tags_yaml}
project:
  name: ${sample_meta.project.name}
  link: "[[${sample_meta.project.name}]]"
sample:
  name: ${sample_name}
  type: ${sample_meta.sample.type}
  description: ${sample_meta.sample.description}
  link: "[[${sample_name}]]"
instrument:
  name: ${instrument}
  link: "[[${instrument}]]"
  type: ${instrument_meta.file.frontmatter.instrument.type}
session:
  part of session: false
  name: none
  number of analyses: 0
analysis:
  method: ${analysis_method}
  date: ${date_created}
  operator: ${operator_name}
  status: ${status}
  data:
    local:
      file: my_sample.xyz
      folder: ${folder_local_data}/${sample_name}/${analysis_method}
      link: "[local data file](file://${(folder_local_data + "/" + sample_name + "/" + analysis_method).replace(/[\s]/g, '%20')})"
      folder_link: "[local data folder](file://${(folder_local_data + "/" + sample_name + "/" + analysis_method).replace(/[\s]/g, '%20')})"
    remote:
      file: my_sample.xyz
      folder: ${folder_remote_data}/${tp.date.now('YYYY')}/${analysis_method}/${operator_name}
      link: "[remote data file](file://${(folder_remote_data + "/" + tp.date.now('YYYY') + "/" + analysis_method + "/" + operator_name).replace(/[\s]/g, '%20')})"
      folder_link: "[remote data folder](file://${(folder_remote_data + "/" + tp.date.now('YYYY') + "/" + analysis_method + "/" + operator_name).replace(/[\s]/g, '%20')})"
  parameters: ${analysis_parameter_yaml}
---

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/analysis", {obsidian: obsidian});
\`\`\`

\`\`\`dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
\`\`\`
`;

  /**********************************************************************************/
  /*                       MOVE AND RENAME TEMPLATE FILE                            */
  /**********************************************************************************/
  var analysis_name = sample_name + " - " + analysis_method.replace(/[\s]/g, '_');
  // const analysis_project_folder = path.join(folder_analysis, sample_meta.project.name);
  const analysis_project_folder = folder_analysis + '/' + sample_meta.project.name;
  if (!app.vault.getAbstractFileByPath(analysis_project_folder)) {
    console.log(`${analysis_project_folder} does not exist.`);
    console.log(`Creating folder ...`);
    await app.vault.createFolder(analysis_project_folder)
  }
  const analysis_sample_folder = analysis_project_folder + '/' + sample_name;

  if (app.vault.getAbstractFileByPath(analysis_sample_folder)) {
    const vault_folder = app.vault.adapter.basePath;

    // determine index for new analysis
    var index;
    // get list of folders in analysis folder
    // const analysis_folder_list = fs.readdirSync(path.join(vault_folder, analysis_project_folder));
    const analysis_folder_list = fs.readdirSync(vault_folder + '/' + analysis_sample_folder);
    // filter list for folders that start with analysis_name
    if (analysis_folder_list.length == 0) {
      index = 1;
    } else {
      const analysis_folder_list_filtered = analysis_folder_list
        .filter(folder => folder.startsWith(analysis_method.replace(/[\s]/g, '_')))
        .sort();
      if (analysis_folder_list_filtered.length == 0) {
        index = 1;
      }
      else {
        // get last folder in list
        const last_folder = analysis_folder_list_filtered[analysis_folder_list_filtered.length - 1]
        // get index from last folder
        index = parseInt(last_folder.split('_').pop()) + 1;
      }
    }
  } else {
    console.log(`${analysis_sample_folder} does not exist.`);
    console.log(`Creating folder ...`);
    await app.vault.createFolder(analysis_sample_folder)
    index = 1;
  }
  // append index to analysis_name with leading zeros
  analysis_name = analysis_name + "_" + index.toString().padStart(2, '0')

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

  const filename = analysis_name;
  // const folder = path.join(analysis_project_folder, analysis_name);
  const folder = analysis_sample_folder + '/' +
    analysis_method.replace(/[\s]/g, '_') + '_' + index.toString().padStart(2, '0');

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
    console.log(`Creating new analysis note in folder ${folder} with name ${filename}`);
    const tfolder = app.vault.getAbstractFileByPath(folder);
    await tp.file.create_new(note_content, filename, true, tfolder);
    return '';
  }
}

module.exports = new_analysis;