```dataviewjs
function format_object(obj, data, level) {
    const pad = '&nbsp;&nbsp;&nbsp;';
    
    const objkeys = Object.keys(obj);
    
    objkeys.forEach(okey => {
        if (obj[okey] instanceof Object) {
            if (obj[okey] instanceof Array) {
                data.push([pad.repeat(level) + `_**${okey}**_`, ""]);
                obj[okey].forEach(entry => {
                    if (entry instanceof Object) {
                        
                        data = format_object(entry, data, level+1)
                    }
                    else {}
                })
                console.log(JSON.stringify(obj[okey]))
            } else {
                data.push([pad.repeat(level) + `_**${okey}**_`, ""]);
                data = format_object(obj[okey], data, level+1)
            }
        } else {
            data.push(([pad.repeat(level) + `${okey}`,  obj[okey]]));
        }
    });
    return data;
}

const exclude_list = ["educts"]
const query=dv.current().file.frontmatter.process

var data = [];
var level = 0;

data = format_object(query, data, level);
    
// console.log(JSON.stringify(data))

dv.table(['Key', 'Value'], data)
```