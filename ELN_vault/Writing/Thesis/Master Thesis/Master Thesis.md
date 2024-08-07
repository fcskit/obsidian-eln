---
ELN version: 0.3.2
cssclasses:
  - thesis
date created: 2024-01-24
note type: report
tags:
  - "#report"
title: Enter the Title of Your Thesis here
abstract-title: Abstract
abstract: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
author: First Author
affiliation: Your Institution, Your Institute,  Address, ZIP City
date: February 2023
thesis_type: Master Thesis
faculty: Mechanical Engeneering
institute: Institute for Applied Materials - Energy Storage Systems (IAM-ESS)
institution: Karlsruhe Institute of Technology (KIT)
reviewer_1st: Prof. Dr. XYZ
reviewer_2nd: Prof. Dr. ABC
submission_date: 12.07.2024
lang: en
keywords:
  - first keyword
  - second keyword
toc: true
toc-title: Table of Contents
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
bibliography: bibliography.bib
csl: wiley.csl
linkReferences: true
---

<!-- Title page definition -->
\newpage

::: {custom-style="Title"}
{{title}}
:::

::: {custom-style="Thesis"}
{{thesis_type}}
:::
::: {custom-style="TitlepageText"}
of
:::
::: {custom-style="Author"}
{{author}}
:::

::: {custom-style="Reviewer"}
1st Reviewer:  {{reviewer_1st}}

2nd Reviewer:  {{reviewer_2nd}}
:::

::: {custom-style="Address"}
created at the Faculty of {{faculty}}

{{institute}}

{{institution}}
:::

::: {custom-style="Date"}
{{date}}
:::

\newpage
\newpage
<!-- End of title page definition -->

<!-- Declaration  -->
::: {custom-style="Heading1NoNumber"}
Declaration on the independent preparation of the work
:::

I declare truthfully that I have written this thesis independently, that I have cited all the resources used completely and accurately, that I have indicated everything that has been taken from the work of others, either unchanged or with modifications, and that I have complied with the current version of the KIT Statutes for Safeguarding Good Scientific Practice.

::: {custom-style="SignatureDate"}
Karlsruhe, {{submission_date}}
:::

::: {custom-style="Signature"}
( {{author}} )
:::

\newpage
<!-- End of declaration page  -->

<!-- Quote page  -->
\

::: {custom-style="Quote"}
We should be taught not to wait for inspiration to start a thing. Action always generates inspiration. Inspiration seldom generates action.
:::

::: {custom-style="QuoteSource"}
Frank Tibolt
:::

<!-- Other quotes
The more original a discovery, the more obvious it seems afterwards. - Arthur Koestler

Most advances in science come when a person for one reason or another is forced to change fields. - Peter Borden

”Not everything that can be counted counts, and not everything that counts can be counted.”  
- Albert Einstein

”All things are difficult before they are easy.” - Dr. Thomas Fuller

You’ve achieved success in your field when you don’t know whether what you’re doing is work or play.  
- Warren Beatty

In science one tries to tell people, in such a way as to be understood by everyone, something that no one ever knew before. But in poetry, it’s the exact opposite.  
- Paul Dirac

If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts he shall end in certainties.  
- Sir Francis Bacon

”If the facts don’t fit the theory, change the facts.” - Albert Einstein
-->

\newpage
<!-- End of quote page  -->

<!-- Abstract page  -->
::: {custom-style="Heading1NoNumber"}
Abstract
:::

{{abstract}}

\newpage
<!-- End of abstract page  -->
# Introduction

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. [@sampleauthorKey1Key2Key32003]

**Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.** [@sampleauthorKey1Key2Key32003; @samplecreatorKey1Key2Key32017] Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. [@samplecreatorKey1Key2Key32017] At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.


# State of research

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,


| Column1 | Column2 |
| ------- | ------- |
| a       | 1       |
| b       | 2       |
| c       | 3       |
: This is a table with a caption and a label. {#tbl:label}

# Experimental

## Materials Preparation

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   

![Enter your figure caption here. Place your image files in the folder images and replace "image_placeholder.png" by the name of the image. To reference your figures in the text set a figure label by replacing "figure_label" after "#fig:" with a custom label. The "width" parameter specifies the width of the image in the final document.](image_placeholder_t.png){#fig:figure_label1 width=14cm}

<!-- **Abbildung 2.1:** Darstellung dreier grundlegender graphitischer Oberflächenstrukturen, die üblicherweise zur Beschreibung der Elektrokatalyse in Vanadium-Flow-Batterien verwendet werden, und typischer Charakterisierungsinstrumente, die zu ihrer Analyse eingesetzt werden. (a) Graphen-ähnliche Elektroden, charakterisiert durch Raman-Spektroskopie und positive Halbzellen-CV. (b) Graphenoxid-ähnliche Elektroden, abgebildet durch SEM und untersucht durch XPS. (c) Reduzierte graphenoxidähnliche Elektroden, die mittels XRD, Raman-Spektroskopie und positivem Halbzellen-CV untersucht wurden. -->

## Methods

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   

At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur


# Results and Discussion

## Subchapter 1

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.  

![Enter your figure caption here. Place your image files in the folder images and replace "image_placeholder.png" by the name of the image. To reference your figures in the text set a figure label by replacing "figure_label" after "#fig:" with a custom label. The "width" parameter specifies the width of the image in the final document.](image_placeholder_t.png){#fig:figure_label2 width=14cm}

<!-- **Abbildung 3.1:** CAD-Zeichnungen der entwickelten Testzellen zur Testung von Graphitvlies-Elektroden und Bipolarplatten. (a) Aufbau zur in-situ-Messung von elektrischer Leitfähigkeit unter angelegter Kompression, (b) drei-Elektroden-Zelle zur elektrochemischen Halbzell-Charakterisierung von Vlieselektroden und Messung der Korrosionsbeständigkeit von Bipolarplatten, und (c) Nachzeichnung einer bestehenden Redox-Flow-Vollzellgeometrie mit austauschbaren Komponenten für den flow-through und flow-by Betrieb. -->

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   

## subchapter 2

At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.   

Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.   

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 


<!-- Insert list of figures -->
\newpage

\listoffigures

<!-- Insert list of tables -->
\newpage

\listoftables

<!-- Insert list of references -->
\newpage
# References

::: {#refs}
:::




