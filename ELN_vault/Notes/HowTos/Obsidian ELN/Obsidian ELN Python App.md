---
ELN version: 0.3.2
cssclass: normal-page
date created: 2024-02-21
author: Name Surname
note type: how-to
tag:
  - " #note "
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

## Create a Python environment for *Obsidian Import*

1. Open the Anaconda **Powershell Prompt** that has been added to your start menu during installation. Do not use the standard windows PowerShell or cmd.exe programs!
       ![[Pasted image 20240220152013.png|500]]
2. At the command prompt type `conda create -n obsidian-import python numpy pandas matplotlib pyqt pyyaml conda-forge::ruamel.yaml tqdm` and press `<enter>` to execute.
3. When asked to confirm press "y" to continue.
4. You have created now a new environment named *obsidian-import* and installed the packages: 
	- *python*
	- *numpy*
	- *pandas*
	- *matplotlib*
	- *pyqt*
	- *pyyaml*
	- *ruamel.yaml*
	- *tqdm*
5. To install further packages into an environment activate the conda environment:
   `conda activate obsidian-import`
6. Now your PowerShell prompt should have changed accordingly
       ![[Pasted image 20240220154037.png|400]]
7. You can now add packages to your environment using 
      `conda install <package>` 
      where `<package>` is the name of the package you want to install. 
      Alternatively you can execute
      `conda install -n <env-name> <package>`
      The latter allows you to install packages to an environment without activating it.

## Executing *Obsidian Import*

1. Open the Anaconda PowerShell and activate the *obsidian-import* environment.
2. Change the active directory to the *Obsidian import* folder that contains the python files.
3. Execute `python .\obsidian-import-gui.py`


```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
