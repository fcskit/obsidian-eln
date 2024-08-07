```dataviewjs
const process=dv.current().file.frontmatter.process
const keys = Object.keys(process);
keys.forEach(key => {
    var data = [];
    console.log(key)
    dv.header(3, key);
    data.push(
         ["**General porcess info**", ""], 
         ["Name", process[key].name], 
         ["Type", process[key].type], 
         ["Description", process[key].description],
         ["Devices", process[key].devices],
    );
    data.push(["**Process parameters**", ""]);
    const parameters = process[key].parameters;
    const paramkeys = Object.keys(parameters);
    paramkeys.forEach(paramkey => {
        if (parameters[paramkey] instanceof Object) {
            const obj = parameters[paramkey];
            const objkeys = Object.keys(obj);
            data.push([`&nbsp;&nbsp;&nbsp;_**Parameters for ${paramkey}**_`, ""]);
            objkeys.forEach(okey => {
                data.push(([`&nbsp;&nbsp;&nbsp;${okey}`,  obj[okey]]));
            });
        }
        else {
            data.push([`&nbsp;&nbsp;&nbsp;${paramkey}`,  parameters[paramkey]])
        }
    });
    dv.table(['Key', 'Value'], data)
    // console.log(JSON.stringify(data))
});
```