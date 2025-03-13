if (input && dv) {
  const active_note = app.workspace.getActiveFile();
  const file_cache = app.metadataCache.getFileCache(active_note);
  const mtime = active_note.stat.mtime
  const author = file_cache.frontmatter.author

  const container = dv.container;
  const footer = container.createDiv({ cls: "note-footer", attr: { id: "footer-container" } });
  // format mtime to HH:MM - MM DD, YYYY
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date_time = new Date(mtime).toLocaleDateString('en-US', options);;
  const modified_p = footer.createEl("p");
  modified_p.innerHTML = `<strong>last modified:</strong> ${date_time}`;
  const author_p = footer.createEl("p");
  author_p.innerHTML = `<strong>author:</strong> ${author}`;
}