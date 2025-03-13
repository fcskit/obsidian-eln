---
ELN version: 0.5.0
cssclasses:
  - normal-page
date created: 2024-02-21
author: Name Surname
note type: how-to
tags:
  - "#note"
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

> [!INFO]
> Obsidian ELN has a python based companion app, that let's you import and process your analysis data including its metadata directly into your ELN vault.
> 
> Currently the following analysis file formats are supported:
> - MPT (BioLogic)
> - TiFF (SmartSEM, Zeiss)
> - TXT (LabSpec6, Horiba)




 ![[Pasted image 20240722152156.png]]
## Download and install a python distribution

If you haven't already done so, download and install a python distribution. The following steps assume you have the [Anaconda](https://www.anaconda.com/docs/getting-started/anaconda/install) or [Miniconda](https://www.anaconda.com/docs/getting-started/miniconda/install) Python distribution installed on you PC. However, other python distributions should work as well. 
## Create a Python environment for the *Obsidian ELN app*

1. Open the Anaconda **Powershell Prompt** that has been added to your start menu during installation. Do not use the standard windows PowerShell or cmd.exe programs!
       ![[Pasted image 20240220152013.png|500]]
2. At the command prompt type `conda create -n obseln python` and press `<enter>` to execute. This will create an environment called *obseln* and will install python.
3. Enter "y" when asked to confirm installation of the python packages and press `<enter>` to continue.
4. Now we need to activate the conda environment:
   `conda activate obseln`
5. Ne we can install the obsidian python app by executing
   `pip install obseln`

## Executing *Obsidian Import*

1. Open the Anaconda PowerShell and activate the *obseln* environment.
2. Execute `python -m obsELN`


```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
