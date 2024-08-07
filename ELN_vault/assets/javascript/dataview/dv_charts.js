async function plot_cycle_data(dv, file_name, exclude_cycles = []) {
    let data = await dv.io.csv(file_name);
                
    dv.el("div", "", { cls: "chart-container", attr: { id: "cont-cycle-data" } });

    let line_capacity_charge = get_line_object(
        data, "cycle number", "capacity (charge)", exclude_cycles);
    let line_capacity_discharge = get_line_object(
        data, "cycle number", "capacity (discharge)", exclude_cycles);
    let line_efficiency_coulomb = get_line_object(
        data, "cycle number", "coulomb efficiency", exclude_cycles);
    let line_efficiency_energy = get_line_object(
        data, "cycle number", "energy efficiency", exclude_cycles);
    let line_voltage_drop_charge = get_line_object(
        data, "cycle number", "WE voltage drop (charge)", exclude_cycles);
    let line_voltage_drop_discharge = get_line_object(
        data, "cycle number", "WE voltage drop (discharge)", exclude_cycles);
    let line_voltage_rise_charge = get_line_object(
        data, "cycle number", "WE voltage rise (charge)", exclude_cycles);
    let line_voltage_rise_discharge = get_line_object(
        data, "cycle number", "WE voltage rise (discharge)", exclude_cycles);

    let chart_capacity = configure_chart(
        line_capacity_charge,
        line_capacity_discharge,
        {
            x_axis_label: "cycle number",
            y_axis_labels: "capacity / mA.h",
            data_label: ["capacity (charge)", "capacity (discharge)"],
            marker_style: ["circle", "rectRot"],
            marker_size: 3,
        }
    );

    let chart_efficiency = configure_chart(
        line_efficiency_coulomb,
        line_efficiency_energy,
        {
            x_axis_label: "cycle number",
            y_axis_labels: ["coulomb efficiency / %", "energy efficiency / %"],
            data_label: ["coulomb efficiency", "energy efficiency"],
            marker_style: ["circle", "rectRot"],
            marker_size: 3,
            dual_axis: true,
        }
    );

    let chart_voltage_drop = configure_chart(
        line_voltage_drop_charge,
        line_voltage_drop_discharge,
        {
            x_axis_label: "cycle number",
            y_axis_labels: ["WE voltage drop (charge) / mV", "WE voltage drop (discharge) / mV"],
            data_label: ["Ewe drop (charge)", "Ewe drop (discharge)"],
            marker_style: ["circle", "rectRot"],
            marker_size: 3,
            dual_axis: true,
        }
    );

    let chart_voltage_rise = configure_chart(
        line_voltage_rise_charge,
        line_voltage_rise_discharge,
        {
            x_axis_label: "cycle number",
            y_axis_labels: ["WE voltage rise (charge) / mV", "WE voltage rise (discharge) / mV"],
            data_label: ["Ewe rise (charge)", "Ewe rise (discharge)"],
            marker_style: ["circle", "rectRot"],
            marker_size: 3,
            dual_axis: true,
        }
    );

    let cont_cycles = document.getElementById("cont-cycle-data");
    cont_cycles.innerHTML = "<div class='custom-chart' id='chart-capacity'></div>" +
        "<div class='custom-chart' id='chart-efficiency'></div>" +
        "<div class='custom-chart' id='chart-voltage-drop'></div>" +
        "<div class='custom-chart' id='chart-voltage-rise'></div>";

    let div_chart_capacity = document.getElementById("chart-capacity");
    window.renderChart(chart_capacity, div_chart_capacity);

    let div_chart_efficiency = document.getElementById("chart-efficiency");
    window.renderChart(chart_efficiency, div_chart_efficiency);

    let div_chart_voltage_drop = document.getElementById("chart-voltage-drop");
    window.renderChart(chart_voltage_drop, div_chart_voltage_drop);

    let div_chart_voltage_rise = document.getElementById("chart-voltage-rise");
    window.renderChart(chart_voltage_rise, div_chart_voltage_rise);
}

async function plot_cycles(dv, file_name) {
    let data = await dv.io.csv(file_name);

    dv.el("div", "", { cls: "chart-container", attr: { id: "cont-cycles" } });

    let lines_capacity_charge = get_line_objects_per_cycle(
        data = data,
        x_column = "Capacity/mA.h",
        y_column = "Ewe/V",
        filter = "state == charge");
    
    let lines_capacity_discharge = get_line_objects_per_cycle(
        data = data,
        x_column = "Capacity/mA.h",
        y_column = "Ewe/V",
        filter = "state == discharge");
    
    let lines_dq_dv_charge = get_line_objects_per_cycle(
        data = data,
        x_column = "Ewe/V",
        y_column = "dQ/dV",
        filter = "state == charge");
    
    let lines_dq_dv_discharge = get_line_objects_per_cycle(
        data = data,
        x_column = "Ewe/V",
        y_column = "dQ/dV",
        filter = "state == discharge");
    
    let chart_ewe_capacity = configure_chart(
        lines_capacity_charge,
        lines_capacity_discharge,
        {
            x_axis_label: "capacity / mA.h",
            y_axis_labels: "WE voltage / V",
            data_label: ["capacity (charge)", "capacity (discharge)"],
            marker_style: false,
            marker_size: 0,
        }
    );

    let chart_dq_dv = configure_chart(
        lines_dq_dv_charge,
        lines_dq_dv_discharge,
        {
            x_axis_label: "WE voltage / V",
            y_axis_labels: "dQ/dV",
            data_label: ["dQ/dV (charge)", "dQ/dV (discharge)"],
            marker_style: false,
            marker_size: 0,}
    );

    let cont_cycles = document.getElementById("cont-cycles");
    cont_cycles.innerHTML = "<div class='custom-chart' id='chart-ewe-capacity'></div>" +
        "<div class='custom-chart' id='chart-dq-dv'></div>";

    let div_chart_capacity = document.getElementById("chart-ewe-capacity");
    window.renderChart(chart_ewe_capacity, div_chart_capacity);

    let div_chart_dq_dv = document.getElementById("chart-dq-dv");
    window.renderChart(chart_dq_dv, div_chart_dq_dv);
}

function get_line_objects_per_cycle(data, x_column, y_column, filter) {
    let data_filtered = [];
    let line_objects = [];
    let filter_column, filter_value = filter.split("==");
    filter_column = filter_value[0].trim();
    filter_value = filter_value[1].trim();

    let data_trimmed = data["cycle number"].values.map((cycle, i) => {
        return {
            filter: data[filter_column].values[i],
            cycle: cycle,
            x: data[x_column].values[i],
            y: data[y_column].values[i]
        };
    });

    data_filtered = data_trimmed
        .filter(data => data.filter == filter_value)
        .map(data => {
            return { cycle: data.cycle, values: { x: data.x, y: data.y } }
        });
        

    // get unique cycles
    let cycles = [...new Set(data_filtered.map(x => x.cycle))];
    // let cycles = [1, 2, 3]
    let n_cycles = cycles.length
    for (let i = 0; i < n_cycles; i++) {
        line_objects[i] = data_filtered.filter(data => data.cycle == cycles[i])
                                       .map(data => data.values)
    }
    // console.log(JSON.stringify(line_objects));
    return line_objects;
}

function get_line_object(data, x_column, y_column, exclude_cycles = []) {
    // let x_data = data[x_column].values;
    // let y_data = data[y_column].values;
    // let cycle_number = data["cycle number"].values;
    // let line_object = x_data.map((x, i) => { return { x: x, y: y_data[i] } });
    let line_object = [...data].filter(row => !exclude_cycles.includes(row["cycle number"]))
                               .map(row => { return { x: row[x_column], y: row[y_column] } });
    return line_object;
}

function configure_dataset(
    line_objects, y_axis_id, data_label = null,
    line_colors = "255, 99, 132", marker_style = false,
    marker_size = 3) {

    let datasets = [];
    let n_lines = 0;
    let alpha_max = 1.0;
    let alpha_min = 0.2;
    let max_line_width = 3;
    let min_line_width = 1.0;

    // console.log("configure_dataset has been called with marker_size = " +
    //    marker_size + " and marker_style = " + marker_style + " and data_label = " + data_label);
    // test if line_objects is an array of arrays
    if (Array.isArray(line_objects)) {
        if (Array.isArray(line_objects[0])) {
            multi_line = true;
            n_lines = line_objects.length;
            // console.log("line_objects contains " + n_lines + " lines");
        } else {
            n_lines = 1;
            line_objects = [line_objects];
            if (!Array.isArray(data_label)) {
                data_labels = [data_label];
            }
            if (!Array.isArray(line_colors)) {
                line_colors = [line_colors];
            }
            if (!Array.isArray(marker_style)) {
                marker_styles = [marker_style];
            }
            if (!Array.isArray(marker_size)) {
                marker_sizes = [marker_size];
            }
        }
        if (Array.isArray(data_label)) {
            if (data_label.length >= n_lines) {
                data_labels = data_label.slice(0, n_lines);
            } else {
                data_labels = data_label.concat(
                    Array(n_lines - data_label.length).fill("no legend"));
            }
        } else {
            if (n_lines > 1) {
                data_labels = [data_label].concat(
                    Array(n_lines - 1).fill("no legend"));
            } else {
                data_labels = [data_label];
            }
        }
        if (Array.isArray(line_colors)) {
            if (line_colors.length >= n_lines) {
                line_colors = line_colors.slice(0, n_lines);
            } else {
                let n_line_colors = line_colors.length;
                let c_reapeat = Math.floor((n_lines - n_line_colors) / n_line_colors);
                // reapeat line_colors 'reapeat' times
                line_colors = line_colors.concat(
                    Array(c_reapeat).fill(line_colors).flat());
                // add the remaining line_colors
                line_colors = line_colors.concat(
                    line_colors.slice(0, n_lines - line_colors.length));
            }
        } else {
            line_colors = Array(n_lines).fill(line_colors);
        }
        if (Array.isArray(marker_style)) {
            let n_marker_styles = marker_style.length;
            if (n_marker_styles >= n_lines) {
                marker_styles = marker_style.slice(0, n_lines);
            } else {
                let ms_reapeat = Math.floor((n_lines - n_marker_styles) / n_marker_styles);
                // reapeat marker_style 'reapeat' times
                marker_styles = marker_style.concat(
                    Array(ms_reapeat).fill(marker_style).flat());
                // add the remaining marker_styles
                marker_styles = marker_styles.concat(
                    marker_style.slice(0, n_lines - marker_styles.length));
            }
        } else {
            marker_styles = Array(n_lines).fill(marker_style);
        }
        if (Array.isArray(marker_size)) {
            if (marker_size.length >= n_lines) {
                marker_sizes = marker_size.slice(0, n_lines);
            } else {
                let n_marker_sizes = marker_size.length;
                let mr_reapeat = Math.floor((n_lines - n_marker_sizes) / n_marker_sizes);
                // reapeat marker_size 'mr_reapeat' times
                marker_sizes = marker_size.concat(
                    Array(mr_reapeat).fill(marker_size).flat());
                // add the remaining marker_sizes
                marker_sizes = marker_sizes.concat(
                    marker_size.slice(0, n_lines - marker_sizes.length));
            }
        } else {
            marker_sizes = Array(n_lines).fill(marker_size);
        }
    } else {
        throw "line_objects must be an array or an array of arrays";
    }

    let line_width = 1;
    for (let i = 0; i < n_lines; i++) {
        let alpha = alpha_max - i * (alpha_max - alpha_min) / n_lines;
        if (marker_styles[i] !== false) {
            line_width = 1;
        } else {
            line_width = max_line_width - i * (max_line_width - min_line_width) / n_lines; 
        }
        datasets.push({
            yAxisID: y_axis_id,
            label: data_labels[i],
            data: line_objects[i],
            backgroundColor: [`rgba(${line_colors[i]}, 0.4)`],
            borderColor: [`rgba(${line_colors[i]}, ${alpha})`],
            borderWidth: line_width,
            showLine: true,
            tension: 0.1,
            pointRadius: marker_sizes[i],
            pointStyle: marker_styles[i],
        });
    }
    return datasets;
}

function configure_chart(
    line_object_1st, line_object_2nd = null, params = {}) {

    let datasets = [];
    let scales = {};
    let marker_styles = [];
    let marker_sizes = [];
    let data_labels = [];
    let y1_axis_label = null;
    let y2_axis_label = null;
    let n_line_objects = 1;
    let y_axis_id = 'y1';

    if (line_object_2nd !== null) {
        n_line_objects = 2;
    }

    let style = getComputedStyle(document.body);
    let text_color = style.getPropertyValue('--text-normal');
    let color_default_rgb = text_color.slice(4, -1);

    let color_pink_rgb = style.getPropertyValue('--color-pink-rgb');
    let color_red_rgb = style.getPropertyValue('--color-red-rgb');
    let color_peach_rgb = style.getPropertyValue('--color-orange-rgb');
    let color_yellow_rgb = style.getPropertyValue('--color-yellow-rgb');
    let color_green_rgb = style.getPropertyValue('--color-green-rgb');
    let color_sky_rgb = style.getPropertyValue('--color-cyan-rgb');
    let color_blue_rgb = style.getPropertyValue('--color-blue-rbg');
    let color_lavender_rgb = style.getPropertyValue('--color-purple-rgb');

    let color_rosewater_rgb = '228, 122, 112';
    let color_flamingo_rgb = '186, 82, 117';
    let color_mauve_rgb = '102, 64, 165';
    let color_maroon_rgb = '23, 146, 153';
    let color_teal_rgb = '15, 123, 123';
    let color_sapphire_rgb = '11, 122, 153';

    if (window.matchMedia) {
        // Check if the dark-mode Media-Query matches
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Dark
            color_rosewater_rgb = '228, 122, 112';
            color_flamingo_rgb = '186, 82, 117';
            color_mauve_rgb = '102, 64, 165';
            color_maroon_rgb = '23, 146, 153';
            color_teal_rgb = '15, 123, 123';
            color_sapphire_rgb = '11, 122, 153';
        } else {
            // Light
            color_rosewater_rgb = '228, 122, 112';
            color_flamingo_rgb = '186, 82, 117';
            color_mauve_rgb = '102, 64, 165';
            color_maroon_rgb = '23, 146, 153';
            color_teal_rgb = '15, 123, 123';
            color_sapphire_rgb = '11, 122, 153';
        }
    } else {
        // Default (when Media-Queries are not supported)
        color_rosewater_rgb = '228, 122, 112';
        color_flamingo_rgb = '186, 82, 117';
        color_mauve_rgb = '102, 64, 165';
        color_maroon_rgb = '23, 146, 153';
        color_teal_rgb = '15, 123, 123';
        color_sapphire_rgb = '11, 122, 153';
    }

    let default_colors = [color_pink_rgb, color_sapphire_rgb, color_sky_rgb, color_lavender_rgb,
        color_blue_rgb, color_green_rgb, color_yellow_rgb, color_peach_rgb, color_red_rgb,
        color_maroon_rgb, color_mauve_rgb, color_flamingo_rgb, color_rosewater_rgb];
    
    // console.log("color lavender = " + color_lavender_rgb + " and has type " + typeof(color_lavender_rgb));

    // set optional parameters
    if (params.hasOwnProperty("x_axis_label")) {
        x_axis_label = params.x_axis_label;
    } else {
        x_axis_label = null;
    }
    if (params.hasOwnProperty("y_axis_labels")) {
        y_axis_labels = params.y_axis_labels;
    } else {
        y_axis_labels = null;
    }
    if (params.hasOwnProperty("data_label")) {
        data_label = params.data_label;
    } else {
        data_label = null;
    }
    if (params.hasOwnProperty("line_colors")) {
        line_colors = params.line_colors;
    } else {
        if (n_line_objects == 1) {
            line_colors = default_colors[0];
        } else {
            line_colors = default_colors.slice(0, n_line_objects);
        }
    }
    if (params.hasOwnProperty("marker_style")) {
        marker_style = params.marker_style;
    } else {
        marker_style = false;
    }
    if (params.hasOwnProperty("marker_size")) {
        marker_size = params.marker_size;
    } else {
        marker_size = 4;
    }
    if (params.hasOwnProperty("dual_axis")) {
        dual_axis = params.dual_axis;
    } else {
        dual_axis = false;
    }

    if (!Array.isArray(data_labels)) {
        if (n_line_objects == 1) {
            data_labels = [data_label];
        } else {
            data_labels = Array(n_line_objects).map((x, i) => data_label + " " + (i + 1));
        }
    } else {
        let n_data_labels = data_label.length;
        if (n_data_labels != n_line_objects) {
            throw "number of data_labels must match the number of line_objects";
        } else {
            data_labels = data_label;
        }
    }
    if (!Array.isArray(line_colors)) {
        line_colors = Array(n_line_objects).fill(line_colors);
    } else {
        let n_line_colors = line_colors.length;
        if (n_line_colors != n_line_objects) {
            throw "number of line_colors must match the number of line_objects";
        } else {
            line_colors = line_colors;       
        }
    }
    if (!Array.isArray(marker_style)) {
        marker_styles = Array(n_line_objects).fill(marker_style);
    } else {
        let n_marker_styles = marker_style.length;
        if (n_marker_styles != n_line_objects) {
            throw "number of marker_styles must match the number of line_objects";
        } else {
            marker_styles = marker_style;
        }
    }
    if (!Array.isArray(marker_size)) {
        marker_sizes = Array(n_line_objects).fill(marker_size);
    } else {
        let n_marker_sizes = marker_size.length;
        if (n_marker_sizes != n_line_objects) {
            throw "number of marker_sizes must match the number of line_objects";
        } else {
            marker_sizes = marker_size;
        }
    }

    // console.log("configure_chart will configure datasets with:");
    // console.log("   data_labels = " + data_labels);
    // console.log("   marker_styles = " + marker_styles);
    // console.log("   marker_sizes = " + marker_sizes);

    if (Array.isArray(line_object_1st)) {
        datasets = configure_dataset(
            line_object_1st,
            y_axis_id,
            data_labels[0],
            line_colors[0],
            marker_styles[0], 
            marker_sizes[0],
        );
    } else {
        throw "line_object_1st must be an array or an array of arrays";
    }
    
    if (Array.isArray(line_object_2nd)) {
        if (dual_axis) {
            y_axis_id = 'y2';
        } else {
            y_axis_id = 'y1';
        }
        datasets = datasets.concat(
            configure_dataset(
                line_object_2nd,
                y_axis_id,
                data_labels[1],
                line_colors[1],
                marker_styles[1],
                marker_sizes[1],
            )
        );
    } else {
        throw "line_object_2nd must be an array or an array of arrays";
    }
    
    if (Array.isArray(y_axis_labels)) {
        if (y_axis_labels.length > 1) {
            y1_axis_label = y_axis_labels[0];
            y2_axis_label = y_axis_labels[1];
        } else {
            y1_axis_label = y_axis_labels[0];
        }
    } else {
        y1_axis_label = y_axis_labels;
    }

    let axis_color_x = text_color;
    let axis_color_y1 = text_color;
    let axis_color_y2 = text_color;
    let grid_color_x = [`rgba(${color_default_rgb}, 0.3)`];
    let grid_color_y1 = [`rgba(${color_default_rgb}, 0.3)`];
    let grid_color_y2 = [`rgba(${color_default_rgb}, 0.3)`];
    if (dual_axis) {
        axis_color_y1 = [`rgba(${line_colors[0]}, 1.0)`];
        axis_color_y2 = [`rgba(${line_colors[1]}, 1.0)`];
        grid_color_y1 = [`rgba(${line_colors[0]}, 0.3)`];
        grid_color_y2 = [`rgba(${line_colors[1]}, 0.3)`];
    }

    scales = {
        x: {
            title: {
                display: true,
                text: x_axis_label,
                font: {
                    weight: 'bold'
                },
                color: axis_color_x,
            },
            ticks: {
                color: axis_color_x,
            },
            grid: {
                display: true,
                color: grid_color_x,
            },
            // beginAtZero: true,
        },
        y1: {
            title: {
                display: true,
                text: y1_axis_label,
                font: {
                    weight: 'bold',
                },
                color: axis_color_y1,
            },
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                // beginAtZero: true,
                color: axis_color_y1,
            },
            grid: {
                display: true,
                color: grid_color_y1,
            },
        },
    }
    if (dual_axis) {
        scales['y2'] = {
            title: {
                display: true,
                text: y2_axis_label,
                font: {
                    weight: 'bold',
                },
                color: axis_color_y2,
            },
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
                // beginAtZero: true,
                color: axis_color_y2,
            },
            grid: {
                display: true,
                color: grid_color_y2,
            },
        }
    }

    const scatter_chart = {
        type: 'scatter',
        width: '50%',
        data: {
            datasets: datasets
        },
        options: {
            aspectRatio: 1.3,
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            stacked: false,
            scales: scales,
            plugins: {
                legend: {
                    labels: {
                        filter: (legendItem, chartData) => (legendItem.text !== 'no legend'),
                        color: text_color,
                    },
                },
                // zoom: {
                //     pan: {
                //         // pan options and/or events
                //         enabled: true,
                //     },
                //     limits: {
                //         // axis limits
                //     },
                //     zoom: {
                //         // zoom options and/or events
                //         drag: {
                //             enabled: true,
                //             borderColor: 'rgba(225,225,225,0.3)',
                //             borderWidth: 5,
                //             backgroundColor: 'rgb(225,225,225)',
                //         },
                //         mode: 'xy',
                //     }
                // }
            }
        }
    }
    return scatter_chart;
}

exports.plot_cycle_data = plot_cycle_data;
exports.plot_cycles = plot_cycles;
exports.configure_chart = configure_chart;
exports.configure_dataset = configure_dataset;
