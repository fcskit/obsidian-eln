function get_eln_settings() {
  const eln_settings_file = "assets/ELN Settings.md";
  const eln_settings_tfile = app.vault.getAbstractFileByPath(eln_settings_file);
  const eln_settings = app.metadataCache.getFileCache(eln_settings_tfile).frontmatter;

  try {
    folder_projects = eln_settings.folder.projects;
    folder_samples = eln_settings.folder.samples;
    folder_anlyses = eln_settings.folder.analyses;
    folder_devices = eln_settings.folder.devices;
    folder_instruments = eln_settings.folder.instruments;
    folder_processes = eln_settings.folder.processes;
    folder_chemicals = eln_settings.folder.chemicals;
    folder_sample_types = eln_settings.folder['sample types'];

    chemical_type = eln_settings.chemical.type;
    chemical['field of use'] = eln_settings.chemical['field of use'];
  }
  catch (error) {
    console.log(`Unable to read ELN folder structure from ELN settings file.`);
    return null;
  }
  try {
    author = eln_settings.note.author;
  }
  catch (error) {
    console.log(`Unable to read author from ELN settings file.`);
  }
  return eln_settings;
}

module.exports = get_eln_settings;