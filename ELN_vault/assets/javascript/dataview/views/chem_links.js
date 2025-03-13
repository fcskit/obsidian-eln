if (input && dv) {
  const container = dv.container;
  const chem_link_container = container.createDiv({ cls: 'chem-link-container' });
  // compose html for chem links
  const currentFile = dv.current().file;
  const fileCache = app.metadataCache.getFileCache(currentFile);
  const frontmatter = fileCache.frontmatter;
  let cas_number = (frontmatter.chemical.CAS) ? frontmatter.chemical.CAS : '';
  if (typeof cas_number !== 'string') {
    // convert cas_number to string
    cas_number = cas_number.toString();
  }
  const cas_is_valid = cas_number.match(/^\d{2,7}-\d{2}-\d$/);
  if (cas_is_valid) {
    const chem_links_html = `<h4>Chem Links</h4>
    <ul>
      <li><a href="https://www.sigmaaldrich.com/DE/de/search/${cas_number}?focus=products&page=1&perpage=30&sort=relevance&term=${cas_number}&type=product">Sigma-Aldrich</a></li>
      <li><a href="https://de.vwr.com/store/product?casNum=${cas_number}">VWR (Germany)</a></li>
      <li><a href="https://www.thermofisher.com/search/cas/${cas_number}">ThermoFisher Scientific</a></li>
      <li><a href="https://www.chemicalbook.com/Search_EN.aspx?keyword=${cas_number}">ChemicalBook</a></li>
      <li><a href="https://www.chemspider.com/Search.aspx?q=${cas_number}">ChemSpider</a></li>
      <li><a href="https://pubchem.ncbi.nlm.nih.gov/#query=${cas_number}">PubChem</a></li>
      <li><a href="https://abcr.com/de_de/catalogsearch/advanced/result/?cas=${cas_number}">abcr</a></li>
      <li><a href="https://www.google.com/search?rls=en&q=cas+${cas_number}">Google</a></li>
      <li><a href="https://en.wikipedia.org/w/index.php?search=cas+${cas_number}">Wikipedia</a></li>
    </ul>`;
    chem_link_container.insertAdjacentHTML("beforeend", chem_links_html);
  } else {
    const chem_links_html = `<h4>Chem Links</h4>
    <p>Chem Links provide a convenient way to search chemical databases from Sigma-Aldrich, VWR,
    ThermoFisher Scientific, ChemicalBook, ChemSpider, PubChem, abcr, Google, and Wikipedia based on the CAS number of the substance.</p>
    <p>This information is displayed, because either the CAS number is not available or the CAS number is not in the correct format.</p>
    <p>To view the Chem-Links enter a valid CAS number in the metadata section with following format: 12345-67-8</p>`;
    chem_link_container.insertAdjacentHTML("beforeend", chem_links_html);
  }
}

