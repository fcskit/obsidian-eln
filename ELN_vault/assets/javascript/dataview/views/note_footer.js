if (input && dv) {
  const mtime = dv.current().file.mtime
  const author = dv.current().file.frontmatter.author

  const footer = dv.el("div", "", { cls: "note-footer", attr: { id: "footer-container" } });
  // format mtime to HH:MM - MM DD, YYYY
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date_time = new Date(mtime).toLocaleDateString('en-US', options);;
  dv.paragraph(`**last modified:** ${date_time}`, { container: footer });
  dv.paragraph(`**author:** ${author}`, { container: footer });
}