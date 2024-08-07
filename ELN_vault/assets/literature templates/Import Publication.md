---
cssclass: research-note
type: "{{itemType}}"
{% for type, creators in creators | groupby("creatorType") -%}
   {{type | replace("interviewee", "author") | replace("director", "author") | replace("presenter", "author") | replace("podcaster", "author") | replace("programmer", "author") | replace("cartographer", "author") | replace("inventor", "author") | replace("sponsor", "author")  | replace("performer", "author") | replace("artist", "author")}}:
   {%- for creator in creators -%}
      {% if creator.name %}
         - {{creator.name}}
      {% else %}
         - {{creator.lastName}}, {{creator.firstName}}
      {%- endif -%}
      {% if not loop.last -%}{% endif %}
   {%- endfor %}
{%- endfor %}
{% if title -%}
   title: "{{title}}"
{% endif %}
{%- if publicationTitle -%}
   publication: "{{publicationTitle}}"
{% endif %}
{%- if date -%}
   date: {{date | format("YYYY-MM-DD")}}
{% endif %}
{%- if archive -%}
   archive: "{{archive}}"
{% endif %}
{%- if archiveLocation -%}
   archive-location: "{{archiveLocation}}"
{% endif %}
{%- if volume -%}
   volume: {{volume}}
{% endif %}
{%- if pages -%}
   pages: {{pages}}
{% endif %}
citekey: {{citekey}}
---

{% if title -%}
# {{title}}
{%- endif %}

*{% for type, creators in creators | groupby("creatorType") -%}
   {%- for creator in creators -%}
      {% if creator.name -%}
          {{creator.name}}
      {%- else -%}
         {{creator.firstName}} {{creator.lastName}}
      {%- endif -%}
      {% if not loop.last -%}, {% endif %}
   {%- endfor %}
{%- endfor %}*

> [!abstract] Abstract
{% if abstractNote -%}
> {{abstractNote}}
{%- endif %}

> [!multi-column]
>> [!links] Links
>> - [View in Zotero]({{desktopURI}}) 
{% for attachment in attachments | filterby("path", "endswith", ".pdf") -%} 
    >> - [Open PDF externally](file://{{attachment.path | replace(" ", "%20")}}) 
{%- endfor %}
>> - [View in Zotero online library]({{uri}})
>
>> [!tags] Tags
{% if tags.length > 0 -%}
   {% for t in tags -%}
      >> #
       {%- if t.tag == "secondary" -%}
             source/secondary{{'\n'}}
        {%- elif t.tag == "primary" -%}
             source/primary{{'\n'}}
        {%- elif "-project" in t.tag -%}
              project/{{t.tag | lower | replace(" ", "-") | replace("-project", "")}}{{'\n'}}
        {%- else -%}
              subject/{{t.tag | lower | replace(" ", "-")}}{{'\n'}}
        {%- endif %}
    {%- endfor %}
{%- endif %}

## Annotations
{% persist "annotations" %}
{% set annots = annotations | filterby("date", "dateafter", lastImportDate) -%}
{% if annots.length > 0 %}
{% for annot in annots -%}

{#-**Annotations that start with #, to be turned into markdown style section headers**-#}
{% if annot.annotatedText and "#" in annot.annotatedText %}
{{annot.annotatedText|nl2br|lower|title}} 

{#-**Regular text annotations w/ page number and page link**-#}
{%- elif annot.annotatedText %} 
{% if annot.colorCategory === "Yellow" %}
- [2] {{annot.annotatedText | nl2br}} [(pg. {{annot.page}})](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) {#**page link**#} 
{%- elif annot.colorCategory === "Red" %}
- [0] {{annot.annotatedText | nl2br}} [(pg. {{annot.page}})](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) {#**page link**#} 
{%- elif annot.colorCategory === "Green" %}
- [3] {{annot.annotatedText | nl2br}} [(pg. {{annot.page}})](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) {#**page link**#} 
{%- elif annot.colorCategory === "Blue" %}
- [5] {{annot.annotatedText | nl2br}} [(pg. {{annot.page}})](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) {#**page link**#} 
{%- elif annot.colorCategory === "Magenta" %}
- [7] {{annot.annotatedText | nl2br}} [(pg. {{annot.page}})](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) {#**page link**#} 
{%- elif annot.colorCategory === "Orange" %}
- [8] {{annot.annotatedText | nl2br}} [(pg. {{annot.page}})](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) {#**page link**#} 
{%- elif annot.colorCategory === "Gray" %}
- [9] {{annot.annotatedText | nl2br}} [(pg. {{annot.page}})](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) {#**page link**#} 
{%- endif -%}
{%- endif -%}

{#-**Image annotations**-#}
{% if annot.imageRelativePath -%}
 ![[{{annot.imageRelativePath}}]]
{%- endif %}

{#-**comment annotations**-#}
{% if annot.comment -%}
>[!annot] Comment
>{{annot.comment | nl2br}}

 {% endif %}

{%- endfor %}
{%- endif %}
{% endpersist %}

> [!quote] Bibliography Preview
> {{bibliography | replace('(1)\n\n', '1) ')}}
