function get_obsidian_uri(note_path_rel) {
  const note_tfile = app.vault.getAbstractFileByPath(note_path_rel);
  if (note_tfile) {
    return app.vault.getResourcePath(note_tfile);
  }
  else {
    return '';
  }
}

if (input && dv) {
  const header = dv.el("div", "", { cls: "eln-navbar", attr: { id: "navbar-container" } });
  // const reference_element = header.parentElement.parentElement;
  
  // const active_note = app.workspace.getActiveFile();
  // const note_name = active_note.basename;
  const navbar = document.createElement("div");
  navbar.classList.add("navbar");
  // const navbar_link = document.createElement("a");
  // navbar_link.setAttribute("data-href", "Contacts");
  // navbar_link.href = "Contacts";
  // navbar_link.classList.add("internal-link");
  // navbar_link.setAttribute("target", "_blank");
  // navbar_link.setAttribute("rel", "noopener");
  // navbar_link.innerText = 'Contacts';
  // navbar.appendChild(navbar_link);

  // get list of projects
  const projects = dv.pages('#project AND !"assets"')
    .sort(p => p.file.name, 'asc')
    .map(p => String([p.file.name]))
    .values;
  const project_links = projects.map(
    project => {
      return `<a href="${project}" class="internal-link" rel="noopener">${project}</a>`
    }
  ).join('\n');

  const sample_list_links = projects.map(
    project => {
      return `<a href="Samples - ${project}" class="internal-link" rel="noopener">${project}</a>`
    }
  ).join('\n');

  var html = `<a href="Home" class="internal-link">
    <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 20 20" xmlns:v="https://vecta.io/nano"><path d="M12.368 2.382l1.377 1.459c.129.145 1.713 1.764 1.732 2.015.033.426.047 2.475.424 3.273.363.769 2.279 2.985 2.172 3.331-.167.538-1.69 2.381-1.69 2.381-.293-.496-1.853-2.276-2.422-2.595-.957-.537-1.916-.816-2.806-.862-.094.02-.821-2.054-.842-2.829-.031-1.148.131-2.282.563-3.098l1.152-2.06c.263-.559.376-1.01.34-1.015z" fill="#888"/><path d="M11.478 1.381c-.137-.143-.408-.354-.931-.367-.157-.004-.916.272-1.192.508L6.411 3.978c-.259.223-1.001.623-1.164.913-.263.466-.41 2.037-.677 3.31.967.234 2.821 2.283 3.076 3.455 0 0 1.202-.261 2.542-.311 0 0-.45-1.201-.645-2.426-.137-.857-.012-2.153.257-3.067.354-1.205 1.557-2.738 1.645-3.183.183-.937.035-1.288.035-1.288z" fill="#aeaeae"/><path d="M5.9 17.576c.671-1.03 1.528-3.192 1.227-4.847-.245-1.346-1.179-2.883-2.83-3.801-.16.4-1.637 3.109-2.035 3.92-.139.283-.425.689-.352.944.155.545 3.851 3.77 3.991 3.784z" fill="#525252"/><path d="M16.011 15.793s-1.404-2.67-3.417-3.301-4.705-.074-4.705-.074.235 1.446-.107 2.694c-.285 1.038-.786 2.306-1.159 2.796l3.555.359c1.108.162 2.551.565 2.972.692 0 0 .696.205 1.318-.133.602-.327.744-.895.78-1.136.017-.115.125-.668.299-1.123.19-.499.464-.774.464-.774z" fill="#6a6a6a"/></svg>
  </a>
  <div class="navbar-dropdown">
    <button class="dropbtn">Projects</button>
    <div class="dropdown-content">
      <div class="navmenu-column">
        <a href="Projects" class="internal-link" rel="noopener">Project List</a>
      </div>
      <div class="navmenu-column">
        ${project_links}
      </div>
    </div>
  </div>
  <div class="navbar-dropdown">
    <button class="dropbtn">Samples</button>
    <div class="dropdown-content">
      <div class="navmenu-column">
        <h3>Sample Lists</h3>
        ${sample_list_links}
      </div>
    </div>
  </div>
  <div class="navbar-dropdown">
    <button class="dropbtn">Resources</button>
    <div class="dropdown-content">
      <a href="Instruments" class="internal-link">Instruments</a>
      <a href="Devices" class="internal-link">Devices</a>
      <a href="Chemicals" class="internal-link">Chemicals</a>
      <a href="Electrodes" class="internal-link">Electrodes</a>
      <a href="Cells" class="internal-link">Cells</a>
    </div>
  </div>
  <div class="navbar-dropdown">
    <button class="dropbtn">Meetings</button>
    <div class="dropdown-content">
      <a href="Samples" class="internal-link">Sample List</a>
      <a href="Samples - Demo Project" class="internal-link">Demo Project</a>
      <a href="Samples - My Project" class="internal-link">My Project</a>
    </div>
  </div>
  <div class="navbar-dropdown">
    <button class="dropbtn">Help</button>
    <div class="dropdown-content">
      <a href="Obsidian ELN - Getting started" class="internal-link">Obsidian ELN - Getting started  Guide</a>
      <a href="Markdown Formatting Guide" class="internal-link">Markdown Formatting Guide</a>
      <a href="Obsidian Tutorial for Academic Writing" class="internal-link">Obsidian Tutorial for Academic Writing</a>
      <a href="File Export" class="internal-link">File Export</a>
    </div>
  </div>`
  
  navbar.insertAdjacentHTML('beforeend', html);
  // reference_element.parentElement.insertBefore(navbar, reference_element);
  header.appendChild(navbar);

  // dv.header(1, `${note_name}`, { container: header });
}