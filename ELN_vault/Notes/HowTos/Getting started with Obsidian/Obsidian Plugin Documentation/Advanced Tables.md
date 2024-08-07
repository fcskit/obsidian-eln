---
author: Tony Grosinger
source: https://github.com/tgrosinger/advanced-tables-obsidian
note type: plugin documentation
---

Add improved navigation, formatting, and manipulation to markdown tables in Obsidian:

-   Auto formatting
-   Excel-like table navigation (tab/enter between cells and rows)
-   [Spreadsheet formulas!](https://github.com/tgrosinger/advanced-tables-obsidian/blob/main/docs/help.md#using-formulas-in-markdown-tables)
-   Add, remove, and move columns and rows
-   Set column alignment (left, center, right)
-   Sort rows by a specified column
-   Export to CSV
-   Works on Obsidian Mobile (See notes below)

## Demo

![basic functionality](https://raw.githubusercontent.com/tgrosinger/advanced-tables-obsidian/main/resources/screenshots/basic-functionality.gif)

## How to use

To create a table, create a single `|` character, then type the table's first  
heading and press Tab. Continue entering headings and pressing  
Tab until all the headings are created. Press Enter to  
go to the first row. Continue filling cells as before, and press  
Enter again for each new row.

When a cursor is in a markdown table...

Hotkey

Action

Tab

Next Cell

Shift + Tab

Previous Cell

Enter

Next Row

Ctrl + Shift + D

Open table controls sidebar

Or use the command palette and search "Advanced Tables". There are many  
commands available, don't forget to scroll!

## Formulas and Spreadsheets in Markdown!

![formulas demo](https://raw.githubusercontent.com/tgrosinger/advanced-tables-obsidian/main/resources/screenshots/formulas-demo.gif)

For more information on using formulas, visit the  
[Help Docs](https://github.com/tgrosinger/advanced-tables-obsidian/blob/main/docs/help.md).

## How to Install

### From within Obsidian

From Obsidian v0.9.8+, you can activate this plugin within Obsidian by doing the following:

-   Open Settings > Third-party plugin
-   Make sure Safe mode is **off**
-   Click Browse community plugins
-   Search for "Advanced Tables"
-   Click Install
-   Once installed, close the community plugins window and activate the newly installed plugin

## Obsidian Mobile

When using Obsidian on a mobile device, the Advanced Tables plugin can be used.  
Using Enter and Tab to navigate the table will not work,  
however you can add the "Next Cell" and "Next Row" commands to the mobile  
toolbar and use them to navigate, or use the buttons from the sidebar.