if (input && dv) {
    obsidian = input.obsidian;
    if (input.filterKeys) {
        filterKeys = input.filterKeys;
    } else {
        filterKeys = [];
    }

    var prop = require(app.vault.adapter.basePath + '/assets/javascript/dataview/npe_renderer.js');
    let view = dv.container;
    const currentFile = dv.current().file;
    const fileCache = app.metadataCache.getFileCache(currentFile);
    view.createEl('h2', { text: 'Instrument Properties' });
    prop.renderFrontMatter(obsidian, view, fileCache.frontmatter, 'instrument', filterKeys);
}