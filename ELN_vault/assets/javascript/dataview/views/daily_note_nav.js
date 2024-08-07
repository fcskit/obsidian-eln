if (input && dv) {
  let daily_notes = dv.pages('#daily-note').sort(p => p.file.ctime, 'asc')
    .map(p => p.file.name);
  let index = daily_notes.findIndex(name => name === dv.current().file.name);
  let first_note_index = 0;
  let last_note_index = daily_notes.length - 1;
  let previous_note_index = index - 1;
  let next_note_index = index + 1;

  let first = '';
  let previous = '';
  let next = '';
  let last = '';

  if (first_note_index !== index) {
    first = `
    <div class="daily-note-nav-button">
      <a href="${daily_notes[first_note_index]}" class="internal-link" rel ="noopener">&lt;&lt;</a>
    </div>`;
  } else {
    first = `
    <div class="daily-note-nav-button">
      <span>&lt;&lt;</span>
    </div>`;
  }
  if (previous_note_index !== index && previous_note_index >= 0) {
    previous = `
    <div class="daily-note-nav-button">
      <a href="${daily_notes[previous_note_index]}" class="internal-link" rel ="noopener">&lt;</a>
    </div>`;
  } else {
    previous = `
    <div class="daily-note-nav-button">
      <span>&lt;</span>
    </div>`;
  }
  if (next_note_index !== index && next_note_index <= last_note_index) {
    next = `
    <div class="daily-note-nav-button">
      <a href="${daily_notes[next_note_index]}" class="internal-link" rel ="noopener">&gt;</a>
    </div>`;
  } else {
    next = `
    <div class="daily-note-nav-button">
      <span>&gt;</span>
    </div>`;
  }
  if (last_note_index !== index) {
    last = `
    <div class="daily-note-nav-button">
      <a href="${daily_notes[last_note_index]}" class="internal-link" rel ="noopener">&gt;&gt;</a>
    </div>`;
  } else {
    last = `
    <div class="daily-note-nav-button">
      <span>&gt;&gt;</span>
    </div>`;
  }

  // let query = dv.pages('#daily-note').sort(p => p.file.ctime, 'asc');
  // let index_pn = query.map(
  //   p => p.file.name).findIndex(name => name === dv.current().file.name);
  // let previous_note = query.map(
  //   p => p.file.name)[index_pn > 0 ? index_pn - 1 : 0];

  // query = dv.pages('#daily-note').sort(p => p.file.ctime, 'asc');
  // let index = query.map(
  //   p => p.file.name).findIndex(name => name === dv.current().file.name);
  // let next_note = query.map(
  //   p => p.file.name)[query.length > index ? index + 1 : index]

  // console.log(previous_note, next_note);
  // if (previous_note === undefined) {
  //   previous_note = dv.current().file.name;
  // }
  // if (next_note === undefined) {
  //   next_note = dv.current().file.name;
  // }

  // const previous = `
  //   <div class="daily-note-nav-previous">
  //     <a href="${previous_note}" class="internal-link" rel ="noopener"><</a>
  //   </div>`;
  // const next = `
  // <div class="daily-note-nav-next">
  //   <a href="${next_note}" class="internal-link" rel ="noopener">></a>
  // </div>`;

  const nav = dv.el("div", "", { cls: "daily-note-nav-container" });
  nav.innerHTML = first + previous + next + last;
  // const nav_previous = dv.el("div", previous_note, { cls: "daily-note-nav-previous", attr: { id: "nav-previous" } });
  // const nav_next = dv.el("div", next_note, { cls: "daily-note-nav-next", attr: { id: "nav-next" } });

  // nav.appendChild(nav_previous);
  // nav.appendChild(nav_next);
}