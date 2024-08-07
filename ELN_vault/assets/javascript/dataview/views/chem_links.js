if (input && dv) {
  const chem_link_container = dv.el("div", "", { cls: "chem-link-container" });
  // compose html for chem links
  const frontmatter = dv.current().file.frontmatter;
  const cas_number = (frontmatter.chemical.CAS) ? frontmatter.chemical.CAS : '';
  const cas_is_valid = cas_number.match(/^\d{2,7}-\d{2}-\d$/);
  if (cas_is_valid) {
    const chem_links_html = `<h4>Web Links</h4>
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
  }

  // const inst_responsibility = dv.pages('#instrument').where(p => p.instrument.contact.toString().includes(dv.current().file.name)).file.link;
  // const further_info_html = `<h4>Further Information</h4>
  // <p><strong>Position</strong> ${frontmatter['job position']}</p>
  // <p>Device responsibility</p>
  // <p>Instrument responsibility</p>
  // ${inst_responsibility}
  // <p>Lab responsibility</p>`;
  // properties.insertAdjacentHTML("beforeend", further_info_html);
}

