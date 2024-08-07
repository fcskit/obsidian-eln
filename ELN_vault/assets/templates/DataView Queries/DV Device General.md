```dataviewjs
// exclude keys from table by adding them to 'exclude_list'
var exclude_list=['info', 'parameters']

const querry=Object.entries(dv.current().file.frontmatter.device)
    .filter(obj => !exclude_list.includes(obj[0]))
    .map((obj)=> {
        obj[0]=obj[0].replace(/[-_]/g, ' ')
        return obj
    })

dv.table(['Parameter', 'Value'], querry)
```