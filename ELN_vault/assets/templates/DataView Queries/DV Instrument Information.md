```dataviewjs

const info=Object.entries(dv.current().file.frontmatter.instrument.info)
    .map((obj)=> {
        obj[0]=obj[0].replace(/[-_]/g, ' ')
        return obj
    })

dv.table(['Parameter', 'Value'], info)
```