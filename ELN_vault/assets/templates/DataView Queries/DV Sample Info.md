```dataviewjs
function format_object(obj, data, level) {
    const pad = '&nbsp;&nbsp;&nbsp;';
    
    const objkeys = Object.keys(obj);
    
    objkeys.forEach(okey => {
        if (obj[okey] instanceof Object) {
            data.push([pad.repeat(level) + `_**${okey}**_`, ""]);
            data = format_object(obj[okey], data, level+1)
        } else {
            data.push(([pad.repeat(level) + `${okey}`,  obj[okey]]));
        }
    });
    return data;
}

const exclude_list = ["educts"]
const query=dv.current().file.frontmatter.sample

var data = [];
var level = 1;
const keys = Object.keys(query);
keys.forEach(key => {
    if (exclude_list.includes(key)) {
        // do nothing
    } else if (query[key] instanceof Object){
        data.push([`_**${key}**_`, ""]);
        data = format_object(query[key], data, level);
    }
    else {
        data.push(([key,  query[key]]));
    }
    
    // console.log(JSON.stringify(data))
});
dv.table(['Key', 'Value'], data)
```