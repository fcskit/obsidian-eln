if (input && dv) {
    obsidian = input.obsidian;
    if (input.filterKeys) {
        filterKeys = input.filterKeys;
    } else {
        filterKeys = [];
    }

    var prop = require(app.vault.adapter.basePath + '/assets/javascript/dataview/npe_renderer.js');
    let eln_view = dv.container.createDiv("eln-view-container");
    eln_view.createEl('h2', { text: 'Test Properties' });
    const activeFile = app.workspace.getActiveFile();
    // on startup the metadataCache may not be available or incomplete
    // try to reread the cache after a short delay and check if the cache has changed
    // retry 5 times or until the cache is no longer changing
    let fileCache = await app.metadataCache.getFileCache(activeFile);
    let retry = 5;
    let changed = true;
    while (retry > 0 && changed) {
        await new Promise(r => setTimeout(r, 200));
        const newCache = app.metadataCache.getFileCache(activeFile);
        changed = JSON.stringify(fileCache) !== JSON.stringify(newCache);
        fileCache = newCache;
        retry--;
    }
    // const fileCache = app.metadataCache.getFileCache(activeFile);
    prop.renderFrontMatter(obsidian, eln_view, fileCache.frontmatter, '', filterKeys);
}