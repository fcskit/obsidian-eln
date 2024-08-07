## Educts

```dataviewjs
const educts=dv.current().file.frontmatter.sample.educts
const keys = Object.keys(educts);
var data = [];
keys.forEach(key => data.push([educts[key].name, educts[key].mass, educts[key].volume]));

// console.log(JSON.stringify(data))
dv.table(['Educt', 'Mass', 'Volume'], data)
```