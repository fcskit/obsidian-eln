## List of Recent Meeting Notes
`$=dv.list(dv.pages('#meeting AND !"assets"').sort(f=>f.file.mtime.ts,"asc").limit(4).file.link)`

## List of Recent Daily-Notes
`$=dv.list(dv.pages('#daily-note AND !"assets"').sort(f=>f.file.mtime.ts,"desc").limit(4).file.link)`


`$=dv.list(dv.pages('#sample').where(p => p.project == 'My Project').sort(f=>f.file.mtime.ts,"desc").limit(6).file.link)`
    

`$=dv.list(dv.pages('#analysis').where(p => p.project == 'My Project').sort(f=>f.file.mtime.ts,"desc").limit(6).file.link)`
 