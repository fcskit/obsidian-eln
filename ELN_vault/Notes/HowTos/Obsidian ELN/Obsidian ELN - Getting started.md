---
ELN version: 0.5.0
cssclass: 
  - note
  - strong-accent
  - accent-heading
date-created: 2023-06-01
author: Frieder Scheiba
note type: how-to
tags:
  - " #note/how-to  "
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```
# Obisidan ELN - Getting Started Guide

> [!Example] TOC
>   - [[#Step 1 Familiarize yourself with Obsidian]]
>   - [[#Step 2 Learn the basics of Markdown formatting]]
>   - [[#Step 3 Learn how to add metadata to your notes using YAML]]
>   - [[#Step 4 Why should you use Obsidian as ELN?]]
>   - [[#Step 5 Configure Obsidian ELN]]
>   - [[#Step 6 Obsidian ELN core structure]]
>   - [[#Step 7 ELN List Views]]
>   - [[#Step 8 Change the look of Obsidian and your notes]]
>   - [[#Step 9 Working with Literature Notes]]


## Step 1: Familiarize yourself with Obsidian

Obsidian is a powerful Markdown-based note-taking application. If you're new to Obsidian, Elisabeth Buttler's [step-by-step guide](https://elizabethbutlermd.com/obsidian-notes/) is a good place to start to familiarize yourself with its core features.

## Step 2: Learn the basics of Markdown formatting

Obsidian uses Markdown to format notes. Markdown is an easy-to-read and easy-to-learn text formatting language. It only takes a few minutes to [[Markdown Formatting Guide|learn the basic formatting rules]] and start writing your own beautifully formatted notes. 

To make the transition from traditional word processors as seamless as possible, Obsidian ELN comes pre-installed with the [Make.md](https://www.make.md) plugin. This plugin has a lot of powerful features to help you organize your notes. In addition, it helps beginners to get started with Markdown formatting by providing a formatting bar that automatically appears when you select text in your note. 

## Step 3: Learn how to add metadata to your notes using YAML

Obsidian supports adding metadata to your notes using YAML Frontmatter. Adding metadata to your notes allows you to use your notes as a database that can be easily searched using the [Dataview Plugin](https://blacksmithgu.github.io/obsidian-dataview/).

The electronic laboratory notebook (ELN) uses YAML metadata to store information about your samples, analyses, etc., and has dynamically updated tables and lists based on this metadata to give you a better overview of the information stored in your ELN. 

Like Markdown, YAML was designed to be easy for people to read and write. To familiarize yourself with YALM, I recommend reading the [YAML tutorial](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started) by Erik Francis. 

## Step 4: Why should you use Obsidian as ELN?

Before discussing how to use Obsidian ELN, let us first consider the benefits of using Obsidian as an ELN compared to traditional paper notebooks, other note taking apps, digital word processors or even other ELN solutions.

Paper notebooks have served researches well over decades and are still extensively used today. But maybe you are already collecting your lab notes in a digital format. So why should you make the switch?

#### Benefits compared to paper notebooks


#### Benefits compared to digital note taking or word processing apps


#### Benefits compared to other ELN solutions

## Step 5: Configure Obsidian ELN

Obsidian ELN uses a YAML note file to store some basic settings of the ELN. These settings will be used by the template files and can be customized to your needs. The settings file can be found in the assets folder and is called [[ELN Settings]].

It is recommended that you edit the YAML *note* and *operators* section as well as *local* and *remote data folder*. The note author defined in the ELN Settings file will be automatically added to all your notes that you create with the predefined templates. It is assumed that there is typically only one main author who creates notes in your Obsidian vault. However, you may share notes with other users for devices, instruments or other and the author field helps you to identify who created the note in first place.

The operators section lets you define one or more operators and its initials. The operator field will be used when you create a new sample or analysis note to record who created the sample or performed the analysis. The first operator will in most cases be identical with the note author but you may define additional operators if you collaborate with colleagues to exchange samples or perform analyses.

Obsidian ELN lets you link your analysis directly to your experimental data folder and or data file. Obsidian assumes that your experimental data is located in your local data folder according to the following path scheme:

***local_data_folder/sample_name/analysis_method***

and your remote data:

***remote_data_folder/year/analysis_method/operator***


![[ELN Settings YAML.png|500]] 
***Figure:** YAML section of the ELN Settings file to configure default note author, operators and data folders.*

## Step 6: Obsidian ELN core structure

Obsidian ELN provides a set of smart templates to make the collection of meta data to document your research as seamless as possible.

Currently there are templates for resources, processes, projects, samples and analyses. 

![[Obsidian ELN - Struktur.png]]

#### Resources

Resources are materials or devices that you use in your lab to create a sample or to perform an analysis of a sample.

##### Chemicals

New Chemicals can be added from the [[Chemicals]] note in the `List` folder, which provides an overview about all chemicals you have added to your Obsidian ELN vault. To add a new chemical just push the **Add Chemical** button at the top of the note.

Chemicals can be categorized by a *type* and *field of use* attribute.  To assure that these categories are used consistently you will be asked to select a type and field of use from a drop down menu when ever you add a new chemical. If you want to customize the predefined types and fields of use to better reflect your type of research you can edit the chemical type and chemical field of use YAML section of the [[ELN Settings]] file.

##### Electrodes



##### Cells


##### Devices

Devices are used for synthesis or sample preparation. A device note provides information about the device such as device type, manufacturer and more as well as a set of parameters used to operate the device. Devices can be added to a process and their parameters will be automatically copied into the meta data section of the process.

New devices can be added from the [[Devices]] note in the  `List` folder, which provides an overview about all devices you have added to your Obsidian ELN vault. To add a new device just push the **Add Device** button at the top of the note.

##### Instruments

Devices are used for sample analysis. A device note provides information about the instrument such as instrument type, manufacturer, available analytical methods and more. For each method a set of parameters can be specified. When creating a new analysis note for a sample the instrument and analysis method can be selected and the parameters of the analysis method will be automatically copied into the meta data section of the analysis.

New instruments can be added from the [[Instruments]] note in the  `List` folder, which provides an overview about all instruments you have added to your Obsidian ELN vault. To add a new instrument just push the **Add Instrument** button at the top of the note.

#### Processes

Processes are used to describe the parameters and steps necessary to synthesize, prepare or modify a sample.

Before creating a new process make sure that you have created a [[#Devices|device note]] for each of the devices you are using for your process. To add a new process go to the [[Processes]] note in the  `List` folder, which provides an overview about all processes you have added to your Obsidian ELN vault. To add a new process just push the **Add Process** button at the top of the note.

#### Projects

Before adding sample to your ELN you should create a project the sample belong to. To add a new project go to the [[Projects]] note in the  `List` folder, which provides an overview about all projects you have added to your Obsidian ELN vault. To add a new project just push the **Add Project** button at the top of the note.

This will create a new folder for each project in the `Project` folder which contains a note with the project name and a sample list note. The note with the project name provides a dashboard view for your project and allows you to quickly navigate to the sample list of your project, open the recently added samples or analysis notes.

> ***Note**:* You can use the project folder to add further notes and subfolders to store relevant information about your project.

#### Samples

To add a new sample to a project go to the sample list note in the project folder and push the **Add Sample** button at the top of the note.

#### Analyses

Analysis can be added from the respective sample note. Open the sample note you want to add an analysis for and push the **Add Analysis** button at the top of the note.

## Step 7: ELN List Views

In the section above you already got to know the list view pages for 
- [[Chemicals]]
- [[Electrodes]]
- [[Devices]]
- [[Instruments]]
- [[Processes]]
- [[Projects]]
- [[Samples]]
- [[Analyses]]

Additional list views are available for
- [[Contacts]]
- [[Daily Notes]]
- [[Labs]]
- [[Meetings]]
- [[Notes]]
- [[Publications]]

## Step 8: Change the look of Obsidian and your notes

#### Obsidian themes

#### Icon Folder Plugin 

#### Style Settings Plugin and ***cssclass*** options.

#### Note styles:
- dashboard
- research-note

#### Formatting styles:
- colored headings
- colored tables
- colored bold and italic text
- colored buttons

#### Page formatting:
- wide-view
- multi-column


## Step 9: Working with Literature Notes

Obsidian offers a plugin ([Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration)) that links to your Zotero literature database and lets you import metadata and annotations into your Obsidian vault.

Before we start using the plugin, we should configure Zotero to use a WebDAV server to sync your literature notes and pdfs between devices, because Zotero only offers 50 MB of web space for free to store your library. This might be to low for most practical uses. You can sign up for a subscription plan to increase your quota, but if you have access to an online file server that supports WebDAV like nextcloud (e.g. bwSync&Share) you can increase your storage space for free.

### Configure Zotero to use a WebDAV server

The following description assumes that you are using a nextcloud based server. If you are using a different server the steps to obtain the WebDAV URL of you server and your user name and password to access the service may differ.

If you are using a nextcloud based service, go to the web interface of your server and log into your account. Navigate to the gear icon in the lower left corner and click it. A menu like similar to the picture below should appear. Copy the link shown in the field below WebDAV into your clipboard.

![[Pasted image 20230630131010.png|300]]

Go to your Zotero app and open the settings pane. Navigate to the sync tab and choose WebDAV from the drop-down menu shown under the file-sync section. Next copy your WebDAV link in the URL field as shown below.

![[Pasted image 20230630135306.png]]
*Note:* If necessary remove the https:// at the beginning of the URL.

Return to the web interface of your nextcloud server and create an app-password for Zotero. To do so click on your profile icon in the upper right corner and select *Settings*. Next choose *Security* on the left navigation tab. Search for the *Create new App-Password* field as shown below and enter a name for your new app-password (i.e. *zotero*) and create a new app password.
Copy the displayed user name and app password in the respective fields of your Zotero sync settings as shown above.
If you plan to multiple devices that sync to your WebDAV account you have to create an app password for each of the devices. Be aware that nextcloud displays the app password only once when you create it. If you plan to reuse the password later be sure to store the password at a save place.

![[Pasted image 20230630132519.png]]


When finished press the "check server" button on the Zotero sync settings tab to verify your WebDAV connection. If the server test is successful you are ready to use your WebDAV server for file syncing between devices. 

### Install *Better BibTex* plugin for Zotero

Before you can use the Zotero integration in Obsidian you also have to install the *Better BibTex* plugin. The download link and installation instructions for Better BibTex can be found [here](https://retorque.re/zotero-better-bibtex/installation/).

### How to use Zotero Integration in Obsidian

Import literature notes from Zotero:
1. Launch the Zotero application if its not already running
2. Back in Obsidian either click on the *Import Publication* icon in the top right corner of a note *(see image below)* or press `<Ctrl> + P` (`<Cmd> + P` on mac) to display Obsidian's command palette. Type "zotero" in the search field and select *Zotero Integration: Import Publication*
   ![[Pasted image 20230719112129.png|200]]
3. It may take a few seconds before you are redirected to the Zotero literature picker shown below
4. Type the author name or keywords of the publication you want to import and select it for the search results. Import the selected publication by pressing the enter key. 
   [![A screenshot of the Zotero search bar](https://raw.githubusercontent.com/mgmeyers/obsidian-zotero-integration/main/screenshots/03.png)](https://raw.githubusercontent.com/mgmeyers/obsidian-zotero-integration/main/screenshots/03.png)
5. After having a successfully imported the publication you can find the corresponding literature note in the folder `Literature/Publications`
 
A more detailed tutorial for using Zotero Integration will be added later. For the time being please refer to the [official plugin documentation](https://github.com/mgmeyers/obsidian-zotero-integration).

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
