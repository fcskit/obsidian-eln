if (input && dv) {
  let note_name = "Untitled";
  const active_note = dv.current().file;
  note_name = active_note.name;
  const header = dv.el("div", "", { cls: "note-header", attr: { id: "header-container" } });
  // const reference_element = header.parentElement.parentElement;
  dv.header(1, note_name, { container: header });
}