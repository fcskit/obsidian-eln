if (input && dv) {
  const header = dv.el("div", "", { cls: "note-header", attr: { id: "header-container" } });
  // const reference_element = header.parentElement.parentElement;
  
  const note_name = dv.current().file.name
  dv.header(1, note_name, { container: header });

  // dv.header(1, `${note_name}`, { container: header });
}