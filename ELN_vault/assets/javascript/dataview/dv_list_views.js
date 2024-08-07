function format_yaml_object_as_table(obj, data, level) {
    const pad = '&nbsp;&nbsp;&nbsp;';

    const objkeys = Object.keys(obj);

    objkeys.forEach(okey => {
        if (obj[okey] instanceof Object) {
            if (obj[okey] instanceof Array) {
                data.push([pad.repeat(level) + `_**${okey}**_`, ""]);
                obj[okey].forEach(entry => {
                    if (entry instanceof Object) {

                        data = format_yaml_object_as_table(entry, data, level + 1)
                    }
                    else { }
                })
                console.log(JSON.stringify(obj[okey]))
            } else {
                data.push([pad.repeat(level) + `_**${okey}**_`, ""]);
                data = format_yaml_object_as_table(obj[okey], data, level + 1)
            }
        } else {
            data.push(([pad.repeat(level) + `${okey}`, obj[okey]]));
        }
    });
    return data;
}

exports.format_yaml_object_as_table = format_yaml_object_as_table;

function dv_frontmatter_table(dv, yaml_key) {

    const query = dv.current().file.frontmatter[yaml_key]

    var data = [];
    var level = 0;

    data = format_yaml_object_as_table(query, data, level);
    // console.log(JSON.stringify(data))
    dv.table(['Key', 'Value'], data)
}

exports.dv_frontmatter_table = dv_frontmatter_table;

function dv_frontmatter_meeting_topic(dv, topic_index) {
    var topics = dv.current().file.frontmatter.meeting.topics
    if (topics.length > topic_index) {
        var out = '';
        var time = dv.current().file.frontmatter.meeting.topics[topic_index].time;
        if (time !== null && time !== undefined) {
            out += '> ' + time + '\n';
        }
        out += '> **' + dv.current().file.frontmatter.meeting.topics[topic_index].title + '**';
        var contributor = dv.current().file.frontmatter.meeting.topics[topic_index].contributor;
        if ( contributor !== null && contributor !== undefined) {
            out += '\n> *' + contributor + '*'
        }
        dv.paragraph(out)
    }
}

exports.dv_frontmatter_meeting_topic = dv_frontmatter_meeting_topic;