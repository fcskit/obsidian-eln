if (input && dv) {
  obsidian = input.obsidian;
  if (input.filterKeys) {
      filterKeys = input.filterKeys;
  } else {
      filterKeys = [];
  }

  const default_filterKeys = ['ELN version', 'cssclass', 'date created', 'author', 'note type', 'tag'];
  filterKeys = filterKeys.concat(default_filterKeys);

  var prop = require(app.vault.adapter.basePath + '/assets/javascript/dataview/npe_renderer.js');
  let view = dv.container;
  const currentFile = dv.current().file;
  const fileCache = app.metadataCache.getFileCache(currentFile);
  let frontmatter = fileCache.frontmatter;

  // const title = (frontmatter.name.title) ? frontmatter.name.title : "";
  // let header = `${title} ${frontmatter.name['given name']} ${frontmatter.name['family name']}`;
  // dv.header(2, header, { container: view });
  var contact_photo = `${frontmatter.name['given name']}-${frontmatter.name['family name']}.jpg`;
  if (!app.vault.getAbstractFileByPath(`assets/images/People/${contact_photo}`)) {
    contact_photo = "Dummy-Contact-Icon.png";
  }
  const contact_photo_tfile = app.vault.getAbstractFileByPath(`assets/images/People/${contact_photo}`);
  const contact_photo_uri = app.vault.getResourcePath(contact_photo_tfile);
  dv.el("img", "", { container: view, attr: { width: 200, src: contact_photo_uri, alt: "Contact Photo" } });

  prop.renderFrontMatter(obsidian, view, fileCache.frontmatter, '', filterKeys);
}
