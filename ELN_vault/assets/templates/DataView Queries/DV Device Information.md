```dataviewjs

const querry=Object.entries(dv.current().file.frontmatter.device.info)
    .map((obj)=> {
        obj[0]=obj[0].replace(/[-_]/g, ' ')
        return obj
    })

dv.table(['Parameter', 'Value'], querry)
```