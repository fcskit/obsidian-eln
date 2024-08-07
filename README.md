# Obsidian ELN

Welcome to Obsidian ELN, an electronic lab notebook that sits right inside the [Obsidian](https://obsidian.md) note-taking app. It is designed to help researchers document and organize their research data.

Obsidian ELN provides a framework of smart templates that help you collect information about your experiments and organize them in an efficient way that is easy and fun to work with. It is build in a modular way to reduce the effort of entering meta data such as experimental parameters to a minimum.

Thanks to the Dataview plugin several note types provide dynamically updating lists and tables, to access and visualize your ELN notes. Sample notes for instance feature dataview table views that display certain metadata parameters for all analyses added for the respective sample.

However, Obsidian ELN goes far beyond a simple ELN. Thanks to the power of obsidians rich base of community plugins it features the import of literature notes using [Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration) and thanks to the [Enhancing Export](https://github.com/mokeyish/obsidian-enhancing-export) plugin and [Pandoc](https://pandoc.org) you can draft manuscripts or reports directly in Obsidian and export them as nicely formatted Word files or convert them to LaTeX and many other file formates. 

Additional templates support you to collect meeting notes, create daily notes, todo-lists and more. 


![obsidian-eln-home-img](images/obsidian-eln-home-img.png)

## Getting started

1. Download Obsidian from [obsidian.md](https://obsidian.md) and install it on your computer.
2. Get a copy of this vault by clicking on the latest release on the right side of this Github page. On the release page download the Source.zip file and unzip it on your computer.
3. Move and rename the vault folder to your preferences.
4. Open Obsidian. On the manage vaults dialog choose `Open folder as Vault`. Navigate to the folder that you have unpacked or moved the Obsidian ELN vault to and select its root folder and open it in Obsidian.
5. Since Obsidian ELN uses a couple of community plugins to realize its functionality, you will be prompted with a warning by Obsidian and you will be asked weather you trust the author and want to enable the plugins. Please confirm to enable the plugins. If you decline to enable the plugins, the ELN will not work properly. While you can also download and install the plugins manually, this is not recommended, since the plugins contained in the vault are preconfigured to provide a seamless experience. Manual installation of plugins would install them with their default settings, and may not work as expected.
6. Read the `Obsidian ELN - Getting started` file to learn more on how to use the ELN.


## Structure of the ELN

The image below shows the structure of the ELN.

![Obsidian ELN - Structure](images/Obsidian%20ELN%20-%20Structure.png)

There are four major categories of note templates:
- Resources
- Processes
- Samples
- Analyses

The Resource category covers note templates for chemicals, electrodes and cells and are used to create notes for consumables used to prepare new samples. Notes of this type can be selected when creating a new Sample note and the Sample note will be automatically linked to the resource notes to track the use of consumables. There are further note templates for devices and instruments. The difference between a device and instrument is that a device can be used within a process to prepare a new sample, while instruments can offer different analysis techniques and these techniques can be selected when creating an analysis note. Both device and instrument notes allow you to define process or analysis parameters which will be automatically added to your process / sample note or analysis notes, respectively.

## Features

### Templates

Obsidian ELN currently contains smart templates for the following types of notes:
- Project
- Process
- Sample
- Analysis
- Instrument
- Device
- Chemical
- Daily note
- Meeting
- Contact
- Sample List
- Task List

### Python based Obsidian ELN Application

Obsidian ELN offers a Python-based companion application that allows you to process and import selected research data files. The application reads meta data and data from the research data files and creates an analysis note in your Obsidian ELN vault with meta data information form the data file. For some file types a processing of the data and generation of default plots is supported. These plots will be added to your analysis note.

The picture below shows a screen shot from the application to import research data
![obsELN-python](images/obsELN-python-img.png)
Since this project is in an early stage only a few file types are currently supported. But more file types will be added in the future.

Supported file types:
- BioLogic MPT files (includes processing and automatic report generation)
- ZEISS SmartSEM TiFF files
- Horiba Labspec 6 TXT files

### Home Dashboard

Obsidian ELN features a dashboard like HOME note that let's you easily navigate your vault. Some of the tiles update their content automatically using the dataview plugin, showing for instance your latest daily-notes or active projects.

A similar dashboard is also created as an entry page for each new project, which lets you quickly access samples, analyses, processes and more.

### Navigation bar

Obsidian ELN adds a navigation bar to your notes to quickly navigate through your vault.

![navbar-img](images/navbar-img.png)

### Daily-Note Template

![daily-note-img](images/daily-note-img.png)
### Meeting Note Template

A meeting notes template helps you capture relevant meeting information such as attendees, date and topics as metadata, making your notes easily searchable. 

The list of topics in the metadata area is automatically converted into an agenda to which you can add your notes.

![meeting-note-img](images/meeting-note-img.png)

### Literature Notes

Obsidian ELN uses the Zotero Integration plugin to import literature notes form your Zotero database. The literature note template will import title, author list, abstract, keywords and all your annotations and comments. In addition it will add links to open the record in Zotero or view the PDF of the publication.

The picture below shows an example of an imported literature note.

![literature-note-img](images/literature-note-img.png)

### Drafting of manuscripts and reports

Draft your reports and manuscripts right within obsidian and export them as beautifully formatted MS Word files to share with your colleagues, submit them to the journal or funding agency.

Below is an example of the manuscript template exported as a word file using a template for journals published by Wiley/VCH.

![manuscript-export-img](images/manuscript-export-img.png)
