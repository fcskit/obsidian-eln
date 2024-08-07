---
source: https://betterhumans.pub/how-to-boost-your-productivity-for-scientific-research-using-obsidian-fe85c98c63c8
type: article
tags: tutorial
---

## Tools and workflows for managing your zettelkasten, projects, reading lists, notes, and inspiration during your PhD.

![](https://miro.medium.com/max/1400/1*TNyi5IcGNhJxT4SsNxr2TA.png)

Knowledge is the most powerful tool you have as a researcher. Knowledge, however, is worthless if it cannot be accessed quickly and effectively. The key is in a consistent and easy-to-use method of archiving information so that taking notes becomes an effortless and pleasing experience.

Here, I show how I use [**Obsidian**](https://obsidian.md/) ([https://obsidian.md)](https://obsidian.md/) as a **PhD** student in **Artificial Intelligence** and the workflows I’ve found to manage my knowledge.

![](https://miro.medium.com/max/1400/1*XZIF8TYTKmQgc3T4u3JM7g.png)

My interface in Obsidian. Theme is customized from [https://github.com/colineckert/obsidian-things](https://github.com/colineckert/obsidian-things). Icons from [https://github.com/FlorianWoelki/obsidian-icon-folder](https://github.com/FlorianWoelki/obsidian-icon-folder)

The article is divided into three parts:

1.  **Philosophy**:   
    The basics of a Knowledge management system such as what is a note, how to organize notes, tags, folders, and links.   
    This section is meant to be **tool-agnostic**, meaning that you should be able to implement most of these tips with any note-taking app.
2.  **Tools**:  
    How to set up and use **Obsidian**, how to manage notes, reading lists, and useful plugins.   
    This section shows how to use Obsidian, my tool of choice, to manage scientific knowledge effectively.
3.  **Workflows**:  
    How to link Zotero and take notes from papers, maintain notes of multiple projects, set up SQL-like queries to generate Maps of Content (MOCs) automatically with Dataview, encrypt your valut, and more.   
    This section focuses on giving a detailed description of how to use Obsidian to **solve common problems in the scientific world** and manage/maintain your knowledge effectively.

This collection of tips is my current solution to problems I’ve encountered throughout my PhD and is by no means perfect/complete. If you have any additional tips or feedback, feel free to comment or contact me. I’ll try to keep this article up-to-date.

Throughout the article I will use the word **_library_** to mean your entire digital knowledge (library), which is used interchangeably with “Obsidian Vault” or “Zettelkasten”.

At the end of the article, you will find other useful resources which you may be interested in using.

# 1. Philosophy: _How to take and organize notes effectively_

> “If you wish to make an apple pie from scratch, you must first invent the universe”
> 
> — Carl Sagan

Before we dive into Obsidian, it’d be good to first lay out the foundations of a Personal Knowledge Management System and Zettelkasten. If you are already familiar with these terms you can skip to Section 2.

The inspiration for this section and a lot of the work on Zettelkasten is from **Niklas Luhmann**, an outstandingly productive sociologist who wrote **400 papers and 70 books**. Zettelkasten means (literally) “slip box” (or library in this article). In his case, his Zettlekasten had around 90000 physical notes, which have been digitized and can be found [here](https://niklas-luhmann-archiv.de/bestand/zettelkasten/zettel/ZK_1_NB_1_1_V).

Nowadays, there are loads of tools available to make this process easier and more intuitive. Obsidian, specifically has a good introduction section on their website: [https://publish.obsidian.md/hub/](https://publish.obsidian.md/hub/)

## Notes

We will start by considering “**What is a note?**”. Although it seems like a trivial question, the answer to this may vary depending on the topic or your style of notes. The idea, however, is that a note is as “atomic” (ie. self-contained) as possible. You should be reading the note and understand the idea immediately.

The resolution of your notes depends on how much detail you have for that note. For example, a note about “**Deep Learning”** could be just a general description of what Neural Networks are, and maybe a few notes on the different types of architectures (eg. Recurrent Neural Networks, Convolutional Neural Networks etc..).

A good rule of thumb to have is to limit length and detail. If you require more detail, in a specific section of this note, it would make sense to break it up into several smaller notes. So, from our original note “Deep Learning” we now have three notes:

-   Deep Learning
-   Recurrent Neural Networks
-   Convolutional Neural Networks

You can repeat this step however many times is necessary until you have the granularity you require. You might be tempted to place these notes into a folder called “Neural Networks”, as all the notes are about similar topics. However, there’s a slightly better strategy:

## Tags and Links over /Folders/

The main problem with using folders is that they are not versatile and they assume that all the notes contained in the folder belong _uniquely_ to a specific category. This makes it harder for you to form connections between different topics.

For example, Deep Learning has been used for Protein Structure prediction (AlphaFold) and image classification (ImageNet). Now, if you had a folder structure like this:

- /Proteins/  
   - Protein Folding  
- /Deep Learning/  
   - Convolutional Neural Networks

Your notes about Protein Folding and Convolutional Neural Networks will be independent and when you are in the “**Protein**” folder, you won’t be able to find notes about Neural Networks.

There are several ways to solve this problem. The most common one is to **use tags rather than folders**. This way, one note can be grouped with more than just one topic. Tags can also be nested (ie. have subtags) in Obsidian.

Also, you can link two notes together with links. Obsidian and some other note-taking apps let you connect one note to another, so that you can then jump to that note and build your “**Knowledge Graph**” as shown below:

![](https://miro.medium.com/max/712/1*TYHjGvhf66gW9_k1WLtZYw.png)

My Knowledge Graph. Green: Biology, Red: Machine Learning, Yellow: Autoencoders, Blue: Graphs, Brown: Tags.

![](https://miro.medium.com/max/798/1*ksVNDtkS26cWnABsROersg.png)

My Knowledge Graph and the note “Backrpropagation” and its links.

![](https://miro.medium.com/max/1092/1*h0QeyZnKJnJFi4JuFL-osg.png)

Backpropagation note and all its links

## When to use Folders

Folders are however useful to organize your vault, especially as it grows. The main advice here is to have very few folders, as they should "weakly" collect groups of notes or better collect different types or sources of notes.

For example, these are the folders I use in my Zettelkasten:

![](https://miro.medium.com/max/554/1*FHYBLMqfOM_ADiaegERCBQ.png)

The 5 folders in my Zettelkasten

They generally collect different sources of information:

**MOC**: Contains all the Maps of Contents to navigate the Zettelkasten.  
**Projects**: Contains one note for each side-project of my PhD where I log my progress and ideas. These are also linked to notes.  
**Bio and ML**: These two are essentially the main content of my Zettelkasten and they could in theory be fused into one folder.   
**Papers**: Here I place all the notes I take from scientific papers. The notes are synced using a bibliography .bib file from Zotero.  
**Books**: I write a note for each book I read and generally split them into multiple notes after I go through them.

Having a separate folder for images can also be a good idea, to avoid cluttering your main folders with image files.

I will discuss these more in detail in the **Workflow Section.**

My general suggestion for folders is to minimize them as much as possible and to use tags and links instead.

## Maps of Content (MOC)

As you start growing your Zettelkasten, you might find it hard to find notes, especially when taking notes of different topics. A good solution to this is to create notes called Maps of Contents (MOCs).

These are notes that "signposts" your Zettelkasten library, directing you to the right type of notes. Inside of it you can link to other notes based on tags of a common topic. Usually this is done with a title, followed by your notes that relate to that title. This is an example:

![](https://miro.medium.com/max/1400/1*P2TqAbPPcZCemPx1n_WN_g.png)

An example of a Machine Learning MOC generated with Dataview.

As shown above, my Machine Learning MOC starts with the **basics**, all in one section. It then moves to Variational Auto-Encoders and Transformers. This allows you to group and quickly find all notes related to a tag without having to scroll through the tag search section.

This is why I keep MOCs at the top of my library, as I can quickly find the information I need and get a quick look at my library. These MOCs are automatically generated using an Obsidian Plugin called Dataview ([https://github.com/blacksmithgu/obsidian-dataview](https://github.com/blacksmithgu/obsidian-dataview)) which works much like SQL queries.

Ideally, MOCs can be expanded and should have a bit more explanations about the notes, their status, and what you still need to do. In the absence of this, Dataview does a fantastic job at creating a good structure for your notes.

EDIT: This is the template I use for the screenshot above:

Dataview query for MOC (code)

Alternatively, this is what a book tracker looks like:

![](https://miro.medium.com/max/1400/1*KukreSSbo7dn6Xh4zRcqPw.png)

Dataview query for books in folder “4. Books”

Dataview query for books in folder “4. Books” (code)

Where each book note looks like this:

![](https://miro.medium.com/max/1400/1*StgGgLsqm8HKy9Y56ERVzw.png)

Book note with fields.

Book note with fields (code).

# 2. Tools: Getting to know Obsidian

Obsidian is my tool of choice as it is free, all the notes are stored in Markdown format, it can be customized/themed, and each panel can be moved around in drag and drop fashion. You can download it here: [https://obsidian.md/](https://obsidian.md/)

## Interface

As I mentioned, Obsidian is very customizable, so I found this to be my optimal interface:

![](https://miro.medium.com/max/1400/1*XZIF8TYTKmQgc3T4u3JM7g.png)

My interface in Obsidian. The theme is customized from [https://github.com/colineckert/obsidian-things](https://github.com/colineckert/obsidian-things)

If you want something simpler, each panel can be collapsed, moved, or removed in whatever way you wish. If you need to find a panel later on, you can click on the vertical "…" (bottom left of the note panel), and open the relevant panel.

Generally my interface is organized as such:

![](https://miro.medium.com/max/1400/1*Q9yaqnJJP5j4HLI4t9iGxw.png)

How my Obsidian Interface is organized.

**Folders / Search**: Here I have all the relevant folders. I usually use the MOC note to get to wherever I want, otherwise, I use the search button to look for a note.  
**Tags**: I use nested tags and usually look into each of them if I am looking for specific notes to link.   
**cMenu**: Nice plugin to place useful functionality in a handy menu ([https://github.com/chetachiezikeuzor/cMenu-Plugin](https://github.com/chetachiezikeuzor/cMenu-Plugin))  
**Global Graph:** The graph shows all your notes (linked and unlinked). Linked notes will appear closer together. You can zoom in to read the title of each note. This can be a bit overwhelming at first, however, as your library grows, you get used to the positions and start thinking of possible connections between notes that you may not have thought about.  
**Local Graph:** This will show your current note, in relation to other linked notes in your library. It is useful to quickly jump to another link when you need to, and go back to the current note.   
**Links**: Finally, here I keep all the linked mentions of the notes, as well as an outline panel and the plugin Power Search ([https://github.com/aviral-batra/obsidian-power-search](https://github.com/aviral-batra/obsidian-power-search)), which allows me to search my vault by highlighting some text.

I suggest you start using the tool and then worry about positioning panels later. What works for some may not work for you so I encourage you to find the best use-case for your library.

## Plugins

Another major advantage of using Obsidian is the vast choice of plugins. I use many but here are a few of the ones I use the most (**Calendar, Citations, Dataview, Templater, Admonition**):

**Calendar**: [https://github.com/liamcain/obsidian-calendar-plugin](https://github.com/liamcain/obsidian-calendar-plugin)  
Gives you a calendar to organize your notes. This is optimal for taking notes from meetings or keeping a journal.

![](https://miro.medium.com/max/1400/1*RF0G6muHH3qlH_nowiw6gA.png)

Calendar plugin. Image from [https://github.com/hans/obsidian-citation-plugin](https://github.com/hans/obsidian-citation-plugin)

**Citations**: [https://github.com/hans/obsidian-citation-plugin](https://github.com/hans/obsidian-citation-plugin)  
Allows you to cite papers from a .bib file to include in your notes. You can also customize how your notes will be produced (eg. Title, Authors, Abstract etc..)

![](https://miro.medium.com/max/1400/1*DuU5baVBm_8vtSmTZJ2cXA.png)

Citation plugin. Image from [https://github.com/hans/obsidian-citation-plugin](https://github.com/hans/obsidian-citation-plugin)

**Dataview**: [https://github.com/blacksmithgu/obsidian-dataview](https://github.com/blacksmithgu/obsidian-dataview)  
Probably among the most powerful plugins as it allows you to query your library as a database and automatically generate content. You can see an example in the MOC section.

**Templater**: [https://github.com/SilentVoid13/Templater](https://github.com/SilentVoid13/Templater)  
Allows you to create notes with specific templates like dates, tags, and headings.

![](https://miro.medium.com/max/1400/1*a35aO8CkIMRr4qiX5J7MhA.gif)

Templater Plugin. Image from [https://github.com/SilentVoid13/Templater](https://github.com/SilentVoid13/Templater)

**Admonition**: [https://github.com/valentine195/obsidian-admonition](https://github.com/valentine195/obsidian-admonition)  
Allows you to structure your notes with blocks.

![](https://miro.medium.com/max/1400/1*_XJHXtL8kazFZhtzyER8fQ.gif)

Admonition plugin. Image from [https://github.com/valentine195/obsidian-admonition](https://github.com/valentine195/obsidian-admonition)

There are loads more plugins, but hopefully, this list will get you started on some interesting ones.

## Theme (new addition)

Many have asked about my theme settings and CSS.

My CSS:  
- Adds white background to all the images (which allows me to add transparent images and see them properly in dark mode)  
- Leave a 40px of space between the title bar and the content  
- Increase the font for LaTeX formulae

My settings for the Things theme add additional colors to the headings:

To import my theme settings you will need the plugin Style Settings: [https://github.com/mgmeyers/obsidian-style-settings](https://github.com/mgmeyers/obsidian-style-settings?source=responses-----4340444ed2a5---------------------respond_sidebar-----------)

# 3. Workflows: Doing cool things

Here I outline a few of my workflows on how I use obsidian to take notes for scientific research. Several of these are very specific to my use-cases but I believe they could be useful. I will first outline and describe each of them briefly to allow you to skim through them quickly.

-   **3.1 Structuring Notes Effectively with Templates**
-   **3.2 Syncing Your Notes for Free (Laptop, Phone, Tablet)**
-   **3.3 Zotero/Mendeley/JabRef -> Obsidian —** Taking Notes and Managing Reading Lists of Scientific Papers
-   **3.4 Managing Projects and Lab Books**
-   **3.5 Encrypted and Private Diary**

## 3.1 Structuring Notes Effectively with Templates

Plugins Used: Templater (**optional**) and Dataview (**optional**).

To take notes effectively, you must first make the process of adding new notes as simple as possible. Templates can save you a significant amount of time while also giving you a consistent structure to your notes. Below is an example:

![](https://miro.medium.com/max/1400/1*W09pBO6P0ZcVTkKqzkH0lg.png)

An example of a note made with a consistent template.

### [[YOUR MOC]]  
# The Title of Your Note  
**Tags**::   
**Links**::

The topmost line is a link to your Map of Content (MOC), your signpost to explore your knowledge base (see previous sections). After the title, I add **tags**, that relate the note to topics (and also add a link between the note and the tag) and **links** to other related notes.

Occasionally, a note might still require work to do, so I add a tag “#todo”, to quickly identify all the notes that need to be expanded. In the “TODO:” section I add the work I need to do within the note.

The rest is followed by notes on the actual topic.

Templater can help you build these templates more easily. For example, I have the following template for new books:

### [[Books MOC]]  
# Title  
**Author**::   
**Date**::   
**Tags**::   
**Links**

![](https://miro.medium.com/max/1400/1*PAUigBgQTa0mtnudyBEnwg.png)

An example of template used for books.

Which I can then hook with Dataview with a simple query like such:

```dataview  
table author as Author, date as "Date Finished", tags as "Tags", grade as "Grade"  
from "4. Books"  
SORT grade DESCENDING  
```

![](https://miro.medium.com/max/1400/1*iu9TOtqXOtmo4vvOxFPezA.png)

Using Dataview to query notes with specific templates.

## 3.2 Syncing Your Notes for Free (Laptop, Phone, Tablet)

Plugins used: None.

One of the things I love the most about Obsidian is that the format of the library is self-contained and portable. Everything (including plugins) is contained in your folder.

![](https://miro.medium.com/max/1400/1*vg179iolUPVBRgXBJxNHPQ.png)

Example of my library in iCloud.

Your folders and notes are available as ordinary folders and documents. You will also notice a hidden folder called “.obsidian”. This contains all your plugins and settings, so as long as you have this, you will be able to carry your settings to other devices.

You can therefore use any cloud platform you like, like Google Drive, iCloud, or DropBox for free as long as you sync your folder (note: your folder should be in your Cloud Folder).

As I mainly work on iOS and macOS, I prefer to use iCloud. You can also use Obsidian Sync, although this is a paid service.

## 3.3 Zotero/Mendeley/JabRef -> Obsidian — Taking Notes and Managing Reading Lists of Scientific Papers

Plugins used: Citations (required).

Zotero is my reference manager of choice although this workflow should work for any reference manager that produces a .bib (bibliography) file. I export this file and keep it in my cloud folder so that I can access it from Obsidian on any platform.

I organize my Zotero library with the following tags:

![](https://miro.medium.com/max/944/1*oNTKWu0YZCybnog3x3ccEw.png)

Tags used in my reference manager.

When I need to do readings, I will usually filter for the tags “!!!” and “To-Read” and choose a paper. I will then annotate the paper (either on PDF using GoodNotes or on physical paper).

Then, I create a page for the paper using a template that you can manage in the Citations plugin settings:

![](https://miro.medium.com/max/1400/1*0vPtAI-oibSNU-PF4C99WA.png)

Example of my literature note template on Citations.

Create a new note and then use CMD / CTRL + P to open up the commands list and find the Citations “Insert literature note content in the current pane” and you will be greeted by this beautiful view.

![](https://miro.medium.com/max/1400/1*kTt8GKqsgcJIC3i2Uwx2jQ.png)

An example of an automatic citation from the article [https://doi.org/10.1101/2022.01.24.22269144](https://doi.org/10.1101/2022.01.24.22269144)

You can then transcribe your notes into digital format. I found that the process of transcribing helped me retain information better, so I would recommend it.

## 3.4 Managing Projects and Lab Books

Plugins used: Templater (required).

PhD students at the thesis writing stage are usually full of advice (read as regret). I made it a habit of asking them things they would have done earlier or differently. One of the responses stuck with me:

> “Deep stuff Leo. So my big problem is **basic organisation**, **losing track of the tasks** I’ve got to do and the **reasons that motivate those tasks** in the first place.  
> […]  
> sometimes I’d just forget about the experiments that motivated a particular experiment so I’d end up going other experiments that didn’t make complete sense, and having to **reverse engineer my logic for thesis writing**”  
> - A wise PhD student, now Postdoc

Organization is key to avoid wasting time. Especially during a PhD, organizing several projects and keeping a lab book for each of them is hard. The way I deal with it is:

-   One folder for all my projects
-   One file for each project

I then create the header of each project with a template.

### [[Projects MOC]]  
# How to Boost Your Productivity for Scientific Research Using Obsidian  
**Tags**::  
**Links**::  
**URL**::  
**Project Description**::## Notes:  
### Dienstag 13. Dezember 2022  
#### Done:  
#### TODO:  
#### Notes

You can insert a template into a new note with CMD + P and looking for the Templater option.

I then keep adding new days with another template:

### Dienstag 13. Dezember 2022  
#### Done:  
#### TODO:  
#### Notes:

This way you can keep adding days to your project and update with reasonings and things you still have to do and have done. An example below:

![](https://miro.medium.com/max/1400/1*6HtM2yDjZJyoo2zb2LOwmg.png)

Example of project note with timestamped notes.

## 3.5 Encrypted and Private Diary

Perhaps this is one of my favorite applications of Obsidian.

I have been frustrated with Mini Diary and its interface for a while. After the project got archived by the author I decided to find an alternative. I had two requirements:

1.  It had to be private, and I wanted absolutely nobody to be able to read the content of the entries.
2.  It had to sync with the cloud so I could edit it in different devices.

I then found out about encrypting the Obsidian folder on disk. You can then decrypt the folder and open it with Obsidian. The folder can be synced as per usual.

To do this I use CryptoMator ([https://cryptomator.org/](https://cryptomator.org/)). You can add a your Obsidian vault as a folder to encrypt on Cryptomator, set up a password and it will take care of the rest.

You can watch this video if you would like a step-by-step video guide:

## Conclusion

Well, hopefully, this was a useful guide!

In the first section **Philosophy** of the article we delved into notes and techniques for note-taking. We explored why **tags** and **links** should be used over folders and when it is appropriate to split into multiple smaller notes.

Then, we learned about **Obsidian**, its interface, and a few useful plugins you can use to speed up your workflows, like **Citations** for citing papers or **Templater** to create template for notes.

In the final section, we talked about workflows and how to integrate tools like **Zotero** to take notes from scientific papers, as well as few other workflows for managing **Lab Books** and **Private Encrypted Diaries**.

If you have any advice, tips or suggestions feel free to comment :) If you want to support me please **follow me** or **read other articles I authored**.