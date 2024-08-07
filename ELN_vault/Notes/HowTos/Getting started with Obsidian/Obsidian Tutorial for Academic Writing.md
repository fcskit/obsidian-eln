---
source: https://betterhumans.pub/obsidian-tutorial-for-academic-writing-87b038060522
author: Leonardo Castorina
note type: tutorial
tags: tutorial, obsidian, academic_writing
---

## Practical writing Tips for Manuscript Writing, Posters, and exporting citations to Word, PDF, and Latex.

![](https://miro.medium.com/max/1400/1*Yp-KP9n3kw4lZ_OsmWYEEA.png)

Obsidian is a powerful note-taking app that I use on a daily basis. In a previous article, I wrote about how to set up Obsidian for Productivity, specifically for scientific research:


# Table of Contents

In this article, I will show you how to use Obsidian for Academic Writing. We will cover the following topics:

1.  **Writing Notes from Papers**  
    - Connecting Zotero to Obsidian  
    - Literature Notes Templates  
    - Importing Highlights from Zotero
2.  **Writing a Manuscript  
    - Copy MLA citations to text  
    - Insert a citation in markdown
3.  **Exporting your Text (with live citations)**
4.  Creating Academic Documents (**NEW: Added 02/Dec/2022**)

# Quick Links

These are some quick links and shortcuts in case you need fast access

-   [**Zotero**](https://www.zotero.org/)
-   **Zotero Plugins:**  
    – [Zotfile](http://zotfile.com/)  
    – [BetterBibtex](https://retorque.re/zotero-better-bibtex/)  
    – [Mdnotes](https://github.com/argenos/zotero-mdnotes/releases/tag/0.2.3)
-   **Obsidian Plugins:**  
    – [Citations](https://github.com/hans/obsidian-citation-plugin)  
    – [Pandoc Reference List](https://github.com/mgmeyers/obsidian-pandoc-reference-list)  
    – [Obsidian Enhancing Export](https://github.com/mokeyish/obsidian-enhancing-export)  
    – [Obsidian Link Converter](https://github.com/ozntel/obsidian-link-converter)
-   [**Pandoc**](https://pandoc.org/installing.html)
-   **Obsidian Shortcuts**:  
    – Preferences: CMD + ,  
    – Command Palette: CMD + P

# **1. Writing Notes from Papers**

Zotero is a great open-source reference manager commonly used in academia. Only a few people know that it can be used for highlighting papers and annotating ideas on the PDF document itself. With some tweaks, we can get Zotero to sync this information with Obsidian, so as to have a more convenient space to take notes.

## **Connecting Zotero to Obsidian**

To connect Zotero to Obsidian we need to export a .bib file which includes all the information about your papers. It’s essentially a JSON-looking file that looks like this:

```json
@article{castorina2021,  
  title = {{{PDBench}}: {{Evaluating Computational Methods}} for {{Protein Sequence Design}}  
  shorttitle = {{{PDBench}}},  
  author = {Castorina, Leonardo V. and Petrenas, Rokas and Subr, Kartic and Wood, Christophe  
  year = {2021},  
  month = sep,  
  journal = {arXiv:2109.07925 [cs, q-bio]},  
  eprint = {2109.07925},  
  eprinttype = {arxiv},  
  primaryclass = {cs, q-bio},  
  abstract = {Proteins perform critical processes [...]},  
  archiveprefix = {arXiv},  
  keywords = {Computer Science - Machine Learning,Quantitative Biology - Biomolecules},

```

To do this, install the plugins:

• **Zotfile**: [http://zotfile.com/](http://zotfile.com/)  
• **BetterBibtex**: [https://retorque.re/zotero-better-bibtex/](https://retorque.re/zotero-better-bibtex/)  
• **Mdnotes**: [https://github.com/argenos/zotero-mdnotes/releases/tag/0.2.3](https://github.com/argenos/zotero-mdnotes/releases/tag/0.2.3)

**Zotero > Tools > Add-ons > Gear Icon > "Install Add-on from file"** then Select the .xpi files and they will be installed. Then:

**Zotero > Preferences (shortcut: CMD + ,) > Better BibTex > Automatic Export**

![](https://miro.medium.com/max/1400/1*brvJtby2ch-x1u4VZdA3XQ.png)

I would recommend you select your Zotero library to export and set it to automatically export “**On Change**”. This way your library is always updated as soon as new papers are added to your library. I suggest you export it to a folder you sync with a cloud service. In this case, I am using iCloud, but you could use any other cloud service.

Another option I would recommend is “**Export Notes**”. Essentially all your highlights and additional notes on papers will be converted to a field in the bibliography file which we can then access from Obsidian.

## **Literature Notes Templates**

Now onto Obsidian, we will need the [Citations Plugin](https://github.com/hans/obsidian-%20citation-plugin). To install simply go to:

**Obsidian > Preferences > Community Plugins > Browse**  
Then type “Citations” in the search bar and click on “Enable”:

![](https://miro.medium.com/max/1400/1*kzi38iZAJRmgLvYYH2lljw.png)

Once enabled, close the tab and go to the plugin page:

![](https://miro.medium.com/max/1400/1*PD2_3hu5496eyMiE2rPQMg.png)

Set “**Citation Database**” format to “**BibLaTeX**” and for the “**Citation database path**” the path to your .bib file.

You can then scroll down to the template settings and customise how your literature notes will be created:

![](https://miro.medium.com/max/1400/1*dBZz-39h7f94vicclROGew.png)

I use the following template:

```
# {{title}}  
#### ({{year}}) - {{authorString}}  
- **Link**:: {{URL}}  
- **DOI**:: {{DOI}}  
- **Links**::   
- **Tags**:: #paper  
- **Cite Key**:: [@{{citekey}}]  
### Abstract  
\```  
{{abstract}}  
\```  
### Notes  
{{note}}
```

An example of a note generated with this template is shown below:

![](https://miro.medium.com/max/1400/1*EKqR8Ld2eQI3l3J_qCo6iA.png)

**Importing Highlights from Zotero**

What you’ve seen so far is great, however, if you do most of your highlighting on Zotero PDF files, we can also export them as part of the notes section in the template.

This is especially useful if you highlight on Zotero using a tablet and use their sync utility to sync with your laptop. To do this we use the [Mdnotes plugin](https://github.com/argenos/zotero-%20mdnotes/releases/latest).

Start by opening a PDF file of a paper in Zotero, and highlight and annotate your document :

![](https://miro.medium.com/max/1400/1*FbgYZjdWx2acwQoitSjOgw.png)

In Zotero then find the paper you have highlighted, right-click, and then select “**Add Note from Annotations**”:

![](https://miro.medium.com/max/1400/1*7_vQnokXgHfJJJJMC_I2Dg.png)

You will now see the annotations appearing as a note under the citation:

![](https://miro.medium.com/max/1400/1*MWjxtK1kMt_1tzwCFDOjBg.png)

In Obsidian, open the command palette with:

**CMD + P > “Citations: Refresh Citation Database”**

![](https://miro.medium.com/max/1400/1*FZVj5gKpMM8QMOtYMNTLMw.png)

This allows your new papers and annotations to be re-loaded in Obsidian from the bibliography file.

![](https://miro.medium.com/max/1400/1*6rfRj6pDUfftdmjNvaEvRQ.png)

If you’re having trouble with the annotations appearing empty, I would suggest exporting the bibliography file again from the preferences menu in Zotero and clicking “**Export Now**”:

![](https://miro.medium.com/max/1400/1*brvJtby2ch-x1u4VZdA3XQ.png)

# **2. Writing a Manuscript**

Overleaf and Latex are pretty well-established tools for writing papers. Here, I want to make the case for Obsidian for writing papers. For instance, you can convert your documents from **markdown** (Obsidian document format) to **Word, LaTeX,** or **PDF**, with live citations.

I find this especially useful at the early stages of writing when all my literature notes and ideas are in Obsidian, and the shape of the manuscript will change a lot. This is also great if you are making a poster in Inkscape, Sketch, or PowerPoint, as you can export your poster content to a Word document (including the citations).

If you want to proceed you’ll need to install [**Pandoc**](https://pandoc.org/installing.html). In my experience, installing Pandoc with [Brew](https://brew.sh/) is much easier if you are on macOS.

## Insert a citation in Markdown

If you have installed the **Citations** plugin in Obsidian, inserting a citation is as simple as:

**CMD + P > Citations: Insert Markdown Citations**

You’ll see a menu like the one below:

![](https://miro.medium.com/max/1400/1*wO_A5mGXfgkViqBznOsPpA.png)

In this menu you can search through your bibliography file. You can then add citations to a document. You can customise the way they look from the Citations plugin preferences.

## Copy MLA citations to text

If you create a literature note with the Citations plugin or you include a markdown citation in a document, you can use the [Pandoc Reference List](https://github.com/mgmeyers/obsidian-pandoc-reference-list) plugin to display active citations for the document:

![](https://miro.medium.com/max/1400/1*jjmc4ziEnrzpLqu9IPBe-g.png)

This can then easily be copied (with formatting) into Word:

![](https://miro.medium.com/max/1400/1*u7T0XorEFuWh_2NJUjE06g.png)

![](https://miro.medium.com/max/1400/1*gTGKPXFsCci7YnGPkrZPBg.png)

Your in-text citations will also be rendered when you hover on them:

![](https://miro.medium.com/max/1400/1*_FTHHqszVjux_ZpsiHvKMw.png)

You can install the plugin from Obsidian preference pane as explained earlier. I set up the plugin as such:

![](https://miro.medium.com/max/1400/1*aSQ96mC3yEmmIFnumjwp_g.png)

Make sure the path to the Bibliography file and pandoc are correct. If you are unsure about the pandoc path, open the terminal and type :

which pandoc

![](https://miro.medium.com/max/1400/1*9iYAR6zUOz7-Kam7FrNNkg.png)

You could copy the path from this terminal command.

# **3. Exporting Your Text**

Exporting your notes will require:

-   [Pandoc](https://pandoc.org/installing.html) (mentioned in **Section 2**)
-   [Obsidian Link Converter](https://github.com/ozntel/obsidian-%20link-converter)
-   [Obsidian Enhancing Export](https://github.com/mokeyish/obsidian-%20enhancing-export)

As mentioned in the previous section, you can install the Obsidian Plugins from the community plugins under the preference panel.

## **Converting Links (Obsidian to Markdown notation)**

First, we will use the Obsidian Link Converter to convert all links to markdown. This is necessary due to compatibility issues with Pandoc. To do this:

**CMD + P > click the option to convert links in your vault to markdown.**

![](https://miro.medium.com/max/1400/1*8ozfLMeKF8BUcb-vHzgQZg.png)

This essentially convert images from this format:

![Screenshot 2022-07-04 at 13.05.14.png]

to this:

![Screenshot 2022-07-04 at 13.05.14.png](../Images/Screenshot%202022-07-04%20at%2013.05.14.p

## **Exporting to PDF, Word, LaTeX**

The Enhancing Export plugin is very customisable and allows you to set different settings for each support file extension. These are the settings I use for Word, PDF, and Latex.

![](https://miro.medium.com/max/1400/1*6JhB4Didbi8__ZyPV4q9pg.png)

Make sure you add the following **Extra Arguments**:

-   **resource-path** which is where you keep the images or bibliography file used in your document. Personally, I keep all my Obsidian images in a folder called “Images,” which makes it easier. **Example**:

--resource-path ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/knowledgebase/Images/

This leads the resource path to be in the Images folder inside Obsidian (in iCloud)

-   **bibliography** which is where you specify your bibliography file if you want your citations to be rendered. **Example:**

--bibliography="export-data.bib"

-   **pdf-engine** is the path to pdflatex. To find it, simply type "**which pdflatex**" in your terminal. **Example**:

--pdf-engine=/Library/TeX/texbin/pdflatex

-   **citeproc** tells pandoc to render the citations. We just add it as a flag like this:

--citeproc

Examples of the full Extra Arguments configs (for PDF, Word and LaTeX):

--resource-path ~/Library/Mobile\ Documents/com~apple~CloudDocs/ --resource-path ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/knowledgebase/Images/ --citeproc --csl ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/knowledgebase/.obsidian/snippets/elementa.csl --bibliography="export-data.bib" --pdf-engine=/Library/TeX/texbin/pdflatex

Once you are done, you will see that the document will contain all your images and citations. If you exported to latex, all the citations will be rendered from your .bib file.

# 4. Creating Academic Documents [NEW]

While section 3 showed you how you can produce a document, here we will look into styling these into professionally-looking academic documents. There are two ways to do this:

## Custom Style CSS (easy)

![](https://miro.medium.com/max/1338/1*NDEQ8M8V1HoJfmcQFf57-A.png)

Sample exported document using the CSS style: [https://github.com/NicklasVraa/Obsidian-academic-export](https://github.com/NicklasVraa/Obsidian-academic-export)

This involves adding a custom .css file to Obsidian. Simply go to this website:

[https://raw.githubusercontent.com/NicklasVraa/Obsidian-academic-export/main/academic-pdf-export.css](https://raw.githubusercontent.com/NicklasVraa/Obsidian-academic-export/main/academic-pdf-export.css)

And save the file.

Now go to **Obsidian > Preferences ? Appearance > CSS Snippets**

Click on the Folder icon and drag your [academic-pdf-export.css](https://raw.githubusercontent.com/NicklasVraa/Obsidian-academic-export/main/academic-pdf-export.css) file to it. Your preferences should now look like this:

![](https://miro.medium.com/max/1400/1*i0XAY8TKevMlst3J1h24Aw.png)

Custom CSS file in Obsidian

Now, open a note and use the command pallette (CMD/CTRL + P) to select "Export to PDF". Your output should now be nicely formatted.

## Custom Pandoc Template (medium)

The one main drawback of the CSS is that the citations of the document are not rendered. Additionally you may want something more professional, with a Table of Content and Citations for example like these:

![](https://miro.medium.com/max/1400/1*pFx4grit-e0GW5PXo_F7zw.png)

An example of a more sophisticated academic document using pandoc template [https://gist.github.com/universvm/5eaa79f8c65a42c5914b449fc4a53069](https://gist.github.com/universvm/5eaa79f8c65a42c5914b449fc4a53069)

![](https://miro.medium.com/max/1400/1*b3TJ4anKjyokTPCjOvp5Iw.png)

Another example of a a thesis-like academic document using pandoc template [https://gist.github.com/universvm/5eaa79f8c65a42c5914b449fc4a53069](https://gist.github.com/universvm/5eaa79f8c65a42c5914b449fc4a53069)

If you followed the guide above and have Pandoc setup this is also relatively simple. We essentially just need to add the custom template to Pandoc.

First download the file pandoc template file from here: [https://gist.github.com/universvm/5eaa79f8c65a42c5914b449fc4a53069](https://gist.github.com/universvm/5eaa79f8c65a42c5914b449fc4a53069)

Then, open a terminal and type:

![](https://miro.medium.com/max/1400/1*BW4Fm-kC2rtRLnfU18RVJA.png)

You will find your **user data directory** path. Open that path, and if it does not exist create a folder called "pandoc" in there.

Now, create another folder called "templates" and place the **eisvogel.tex** file in there. Your folder should look like this:

![](https://miro.medium.com/max/1400/1*qm4sDQRpZ075Obl11EsaqQ.png)

Back to Obsidian, go to Preferences > Export Settings and under Choose Setting create a new one called "Academic PDF":

![](https://miro.medium.com/max/1400/1*bu7UtSG9W8GeudCGXnuiBQ.png)

In the extra arguments we want to select the template like this:

--resource-path ~/Library/Mobile\ Documents/com~apple~CloudDocs/ --resource-path ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/knowledgebase/Images/ --citeproc --bibliography="export-data.bib" --pdf-engine=/Library/TeX/texbin/pdflatex --template eisvogel.tex -M reference-section-title=References

Now, open a note, open the command palette and click on **Obsidian Enhancing Export: Export To….** select **Academic PDF** and click on **Export.**

![](https://miro.medium.com/max/1092/1*vlaHWdGZ0_ugPFMvPKyGEA.png)

To produce the document in the screenshot I added the following before my note (YAML):

---  
title: "Thesis Title"  
subtitle: "Another Subtitle"  
titlepage: True  
toc: true  
toc-own-page: True  
author: [Example Author]  
date: "2022-02-12"  
keywords: [Markdown, Example]  
titlepage-text-color: "000000"  
titlepage-rule-color: "FFFFFF"  
titlepage-rule-height: 0  
toc-title: Table of Contents  
caption-justification: justified  
titlepage-logo: /Users/your_name/Documents/logo.pdf  
abstract: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu accumsan nisl. Phasellus suscipit varius arcu nec congue. Ut non pharetra dui. Phasellus gravida lectus eget maximus tincidunt. Nam ut ex vel enim elementum malesuada. Proin sit amet iaculis velit, non feugiat nulla. In facilisis tempor posuere. Nunc id dui eget lacus accumsan finibus. Ut id ex condimentum, egestas leo quis, tincidunt neque. Proin tincidunt, odio a sagittis rutrum, erat mi volutpat lorem, non iaculis odio sem in dui.  
acknowledgements: Donec nec sapien porttitor, pharetra odio ac, suscipit nulla. Nulla mattis purus a facilisis vestibulum. Curabitur orci lorem, convallis ut odio quis, bibendum malesuada ligula. Pellentesque ultrices velit et hendrerit vulputate. Duis lobortis quis dui et condimentum. Aenean elementum id ex sit amet placerat. Vivamus a rhoncus dui, id volutpat nibh. Ut suscipit et augue eget imperdiet. Phasellus mattis vitae lectus nec pulvinar. Nulla pulvinar risus finibus tortor aliquam lacinia. Curabitur sagittis id turpis non varius.  
text1: Doctor of Philosophy  
text2: School of Informatics  
text3: University of Edinburgh  
text4: 2022  
---

There are a lot more configs you can use. The full list is available here: [https://github.com/Wandmalfarbe/pandoc-latex-template](https://github.com/Wandmalfarbe/pandoc-latex-template)

The version you installed is a slightly modified version of the above to allow for an Abstract, Acknowledgement and general styling.

# **Conclusion**

In this article, I showed my entire workflow for writing academically using Obsidian while syncing everything with iCloud.

The workflow is meant to help you deal with installing and setting up plugins and is the result of hours of work and research through forum posts.

First, we saw how to connect Zotero, a popular reference manager, to Obsidian and sync literature notes and highlights into notes files.

Then, I explained how I use markdown citations to help me build a draft for a manuscript. The citations can then be rendered using pandoc and exported to text, which is helpful if you’re creating a poster with InkScape or PowerPoint.

Finally, we set up the Obsidian Enhancing Export plugin with Pandoc to generate Latex, Word, and PDF documents to then import to Overleaf or send to other authors as a draft.

Cherry on top is a short tutorial on how to create academically-looking (and visually pleasing) documents with CSS and pandoc templates.

I hope you enjoyed the article and if you are having any problems feel free to comment! I do not accept donations, so please donate to your local charity 😀 If you found the article useful, please **follow me** and **share the article with others!**