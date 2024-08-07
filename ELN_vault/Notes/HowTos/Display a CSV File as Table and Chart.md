## Demo Plot

The demo plot shows an example for the combination of a column (bar) and a line plot.

```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: DualAxes

#-----------------#
#- chart data    -#
#-----------------#
data: test_sin_cos.csv, test_sin_cos.csv

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: 'xvalue'
  yField: ['sin', 'cos']
  yAxis:
    title:
      text: Amplitude'
      style:
         fontSize: 16
    line:
      style:
        stroke: '#aaa'
    tickLine:
      style:
        lineWidth: 2
        stroke: '#aaa'
        length: 5
  geometryOptions:
    - geometry: 'column'
    - geometry: 'line'
      lineStyle:
        lineWidth: 2
```


## Plot Scientific Data

> [!INFO]
> The plot below shows the cell voltage vs. capacity of a standard GCPL measurement. The dataset (GCPL_test_data.csv) for this plot can be found in the "**assets/CSV**" folder.
```chartsview
#-----------------#
#- chart type    -#
#-----------------#
type: DualAxes

#-----------------#
#- chart data    -#
#-----------------#
data: GCPL_test_data.csv, GCPL_test_data.csv

#-----------------#
#- chart options -#
#-----------------#
options:
  xField: '(Q-Qo)/mA.h'
  yField: ['Ecell/V', 'Efficiency/%']
  yAxis:
    title:
      text: Amplitude'
      style:
         fontSize: 16
    line:
      style:
        stroke: '#aaa'
    tickLine:
      style:
        lineWidth: 2
        stroke: '#aaa'
        length: 5
  geometryOptions:
    - geometry: 'line'
    - geometry: 'line'
      lineStyle:
        lineWidth: 2
```


## Example of displaying a CSV file as table

```dataview
TABLE WITHOUT ID
xvalue as "x",
sin as "sin(x)",
cos as "cos(x)"
FROM csv("assets/CSV/test_sin_cos.csv")
WHERE sin > 0
LIMIT 15
```





