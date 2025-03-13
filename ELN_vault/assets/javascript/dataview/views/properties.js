if (input && dv) {
    obsidian = input.obsidian;
    if (input.filterKeys) {
        filterKeys = input.filterKeys;
    } else {
        filterKeys = [];
    }
    if (input.key) {
        key = input.key;
    }
    else {
        key = '';
    }

    var prop = require(app.vault.adapter.basePath + '/assets/javascript/dataview/npe_renderer.js');
    let view = dv.container;
    const currentFile = dv.current().file;
    const fileCache = app.metadataCache.getFileCache(currentFile);
    prop.renderFrontMatter(obsidian, view, fileCache.frontmatter, key, filterKeys);
}