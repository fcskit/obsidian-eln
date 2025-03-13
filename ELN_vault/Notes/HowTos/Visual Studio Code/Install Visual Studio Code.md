---
ELN version: 0.5.0
cssclasses:
  - normal-page
date created: 2024-02-21
author: Frieder Scheiba
note type: how-to
tags:
  - "#note/how-to"
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```


## Download and install Visual Studio Code

1. Download VSCode from https://code.visualstudio.com/Download
2. Start the installer
3. Accept the license agreement
4. ![[Pasted image 20240220150932.png]]
5. Choose the installaiton directory
6. Choose options for installation
7. Install the program


## Setup Windows PowerShell for VS Code

VS Code on windows uses the default Windows PowerShell as terminal (not the Anaconda PowerShell). This may cause problems since the default PowerShell cannot display the active python environment. To setup up the VS Code PowerShell for *Anaconda* or *miniconda* open the standard Windows PowerShell and execute:
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

Followed by:
`conda init powershell`

If you get an error that the PowerShell cannot locate *conda* you will have to add the installation path of your conda installation to your user PATH variable. Afterwards execute the `conda init powershell` command again.

#### Adding the conda path to your User PATH variable
1. Type `variable` in the search field of your Windows task bar.
2. Choose `Edit environment variables for this account`
   ![[Pasted image 20240221111640.png]]
3. Select `Path` and press `Edit`
   ![[Pasted image 20240221111843.png|500]]
4. Press `New` to add a new path.
      ![[Pasted image 20240221112049.png|500]]
5. Type in the root directory to your anaconda or miniconda installation. Assume you installed miniconda3 into your local user folder under AppData\\Local\\miniconda3 you need to add `C:\Users\<username>\AppData\Local\miniconda3`
6. Do the same for the subdirectories
   `C:\Users\<username>\AppData\Local\miniconda3\Skripts`  and
   `C:\Users\<username>\AppData\Local\miniconda3\Library\bin`
7. Log off or restart your computer.

## Setup VS Code for Python

1. Start VS Code and select the Extensions Tab from the left toolbar ![[Pasted image 20240220151408.png]]
2. Install the python extension (this will automatically install the Pylance extension)
   ![[Pasted image 20240220151501.png|400]]
3. If you want to execute python code interactively also install the Jupyter Extension to obtain support for Jupyter notebooks.

![[Pasted image 20240220162302.png]]



```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
