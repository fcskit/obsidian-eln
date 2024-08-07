---
ELN version: 0.3.2
cssclasses:
  - manuscript
date created: 2023-07-26
note type: manuscript
tags:
  - "#manuscript"
title: Your Publication Title
abstract-title: ""
abstract: |
  some abstract text. Lorem markdownum natale egressus congestaque rogant. Eadem sors reddidit et *certe sol duobus*, tethys, inducitur subit: tuum qui. Lyrnesia hunc leti tuam **lacrimis dedere** serpentis vacca rectorque concurrere solum, qua illa. Miraturus a harenas mihique summa quem hanc, lacrimis est propiore fecit, causam eadem rubentem quoque! Cunctaque maestae ore: sedit adsuetudine verba inventa imagine atrae extemplo
author: First Author, Second Author, Third Author *[a]
affiliation: Institute of Applied Materials, Karlsruhe Institute of Technology, Hermann-von-Helmholz-Platz 1, D-76344 Eggenstein-Leopoldshafen
email: frieder.scheiba@kit.edu
bibliography: bibliography.bib
keywords:
  - first keyword
  - second keyword
figureTitle: Figure
tableTitle: Table
titleDelim: .
figPrefix:
  - Figure
  - Figures
tblPrefix:
  - Table
  - Tables
secPrefix:
  - Section
  - Sections
tableTemplate: "**$$tableTitle$$ $$i$$$$titleDelim$$** $$t$$"
figureTemplate: "**$$figureTitle$$ $$i$$$$titleDelim$$** $$t$$"
tableEqns: false
csl: wiley.csl
linkReferences: true
---

::: {custom-style="Address"}
[a]       {{author}}    
{{affiliation}}
E-mail: {{email}}
:::

<!-- Insert break between single and two column section in docx -->

> **Template Guide**
> Please define title, abstract, author(s), affiliation, corresponding author email address and keywords in the yaml metadata of this document.
> You can change the format of figure and table captions by changing *figureTitle*, *tableTitle*, *titleDelim* as well as the corresponding entries for *tableTemplate* and *figureTemplate*.
> 
> **Citations**
> Export your bibliographic information as a BibTex or Better BibTex file. Adjust the variable *biliography* in the metadata to match the location of your bibtex file. If you are using Zotero as your reference manager it is recommended to install the Better BibTex Plugin (Tools>Add-ons).
> To insert citations in the text use `[@citekey]` or `[@citekey1; citekey2]` for multiple citations. In Zotero the bibtex citation key can be obtained by selecting your citation and then choosing "Copy Better BibTex citation key" from the edit menu.
> To addapt the citation format to the style of the journal you want to submit your manuscript to, change the *csl*  variable in the metadata. There are predefined csl files in the bib/styles directory for common publishers like Wiley (wiley.csl), American Chemical Society (acs.csl), Royal Society of Chemistry (rcs.csl) and Elsevier (elsevier.csl). If you wish to use a different citation style download a corresponding csl file and modifiy the csl variable accordingly. 

# Introduction

Lorem markdownum natale egressus congestaque rogant. Eadem sors reddidit et *certe sol duobus*, tethys, inducitur subit: tuum qui. Lyrnesia hunc leti tuam *lacrimis dedere* serpentis vacca rectorque concurrere solum, qua illa. Miraturus a harenas mihique summa quem hanc, lacrimis est propiore fecit, causam eadem **rubentem quoque!** Cunctaque maestae inter duodena ore: sedit adsuetudine verba inventa imagine atrae extemplo.

# Figures

Figures must be specified as markdown conform embedded links (no wiki-links). The structure of an embedded image link is `![Figure caption](path/to/image.png)`. The path of the image must be given either as absolute path or relative to the markdown file. To add references to the figure in the text, you have to define an image label. The label has to be added between curly brackets directly after the image link (no white spaces). The label has to be defined in the following format `{#fig:label}`. The `#fig:` identifies the label to be a figure label. Similarly labels for tables can be defined as `{#tbl:label}`. You can add further options behind the label for instance to control the width of the figure. The optional parameter must follow the label separated only by a blank. The width of the image can be specified either in percent (%), inches (in) or centimeter (cm). The unit must directly follow the numerical value without a white space. Hence, the complete image link including label and parameter for the width should look like this: `![Figure caption](path/to/image.png){#fig:label width=8.4cm}`

An example is given right below.

![Example for including graphs or images in your publication.](image_placeholder_m.png){#fig:label width=17.4cm}

To make a reference to the image in your text use `@fig:label`. 

Hence, **@fig:label** creates a reference to the figure above.


## Group of images with fenced block

A group of images can be created using a fenced markdown block. A fenced block starts and ends with three colons `::: some content  :::`  An identifier to reference the figure is added by adding `{#fig:figureRef}` directly after the first group of colons where `figureRef` can be replaced by an arbitrary identifier name.

The markdown for two figures grouped in a subplot would therefore look like this:

```
:::{#fig:subfigure}
![subfigure caption 1](images/scatterplot.png){#fig:subfigure_1 width=45%}
![subfigure caption 2](images/scatterplot.png){#fig:subfigure_2 width=45%}

Caption for two subfigures within fenced block
:::
```


:::{#fig:subfigure}
![subfigure caption 1](image_placeholder_m.png){#fig:subfigure_1 width=45%}
![subfigure caption 2](image_placeholder_m.png){#fig:subfigure_2 width=45%}

Caption for two subfigures within fenced block.
:::


# Tables


| a   | b   | c   |
| --- | --- | --- |
| 1   | 2   | 3   |
| 4   | 5   | 6   |

: This is a table with a caption and a label. {#tbl:label}

# Citations

This is a citation for testing purposes [@abbasEnzymeInspiredFormulationElectrolyte2019]

And another one just to have some more in the biblographic listing [@albertusLongDurationElectricityStorage2020]

# Super- and subscripts

**Superscript** 
x^2^

**Subscript:**
H~2~O

# References

The list of biliographic references is normally added automatically at the end of the document.

To place the reference at a different position in your document insert
`::: {#refs}`
`:::`
where you want your reference list to appear.

::: {#refs}
:::

# List of Figures / List of Tables

A list of figures can be inserted by `\listoffigures`.
Likewise a list of tables is inserted by `\listoftables`.
