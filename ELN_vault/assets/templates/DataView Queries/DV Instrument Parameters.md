```dataviewjs

const parameters=Object.entries(dv.current().file.frontmatter.instrument.parameters)
    .map((obj)=> {
        obj[0]=obj[0].replace(/[-_]/g, ' ')
        return obj
    })

dv.table(['Parameter', 'Value'], parameters)
```