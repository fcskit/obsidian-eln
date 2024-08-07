```mermaid
gantt
    title       Project - Gant Chart
    %% tickInterval 3month
    dateFormat  YYYY-MM-DD
    axisFormat %Y-%m
    %% axisFormat %Y-Q%q
    
    section Work Package 1
    WP 1.1                   :         done,    wp1_1, 2021-03-01,90d
    WP 1.2                   :         active,  wp1_2, 2021-05-09, 30d
    WP 1.3                   :         wp1_3, after wp1_2, 50d
    WP 1.4                   :         wp1_4, after wp1_3, 50d

    section Work Package 2
    WP 2.1                   :         done,    wp2_1, 2021-03-01,90d
    WP 2.2                   :         active,  wp2_2, 2021-05-09, 30d
    WP 2.3                   :         wp2_3, after wp2_2, 50d
    WP 2.4                   :         wp2_4, after wp2_3, 50d
    
    section Documentation
    Interim Report                          :     doc_ir1, 2022-04-01, 15d
    Milestone 1                               :     milestone, m1, 2022-02-28  , 1d

```