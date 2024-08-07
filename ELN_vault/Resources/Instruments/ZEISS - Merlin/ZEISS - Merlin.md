---
ELN version: 0.4.2
cssclass: normal-page
date created: 2023-05-05
author: Name Surname
note type: instrument
tag: 
  - " #instrument/SE_inlens"
  - " #instrument/SE_ET"
  - " #instrument/EsB"
  - " #instrument/BSE"
  - " #instrument/EDX"
instrument:
  name: ZEISS - Merlin
  type: SEM Microscope
  manufacturer: ZEISS
  model: Merlin
  location:
    building: XXX
    room: 1xx
  contact: 
    - "[[Joe Public]]"
  documentation: 
    - "[[Zeiss-SmartSEM-software-manual.pdf|SmartSEM Software Manual]]"
    - "[[Zeiss-MERLIN_Brochure.pdf|Zeiss Merlin Brochure]]"
  url: "[link to manufacturer](http://www.zeiss.com)"
  methods:  
     - SE inlens
     - SE ET
     - EsB
     - BSE
     - EDX
  # Add instrument specific information here
  # Replace info_1, info_2 ... and/or add own key value pairs
  info:
      Resolution (optimal WD):
        - 0.8 nm @ 15 kV
        - 1.4 nm @ 1 kV
        - 3.0 nm @ 20 kV at 10 nA, WD = 8,5 mm
        - 0.6 nm @ 30 kV (STEM mode)
      Acceleration Voltage: 0.02 – 30 kV
      Probe Current: 10 pA up to 300 nA (depending on system configuration)
      Magnification: 12 – 2,000,000 x in SE mode 100 – 2,000,000 x with EsB ® detector
      Electron Emitter: Thermal field emission type, stability > 0,2 % / h
      Detectors: 
        - High efficiency in-lens SE detector 
        - Everhart Thornley Secondary Electron detector
        - EsB® detector with filtering grid, filtering voltage 0 – 1500 V 
        - Integrated AsB® detector
      Specimen Stage: 
        - 5-Axes Motorised Eucentric Specimen Stage
        - X = 130 mm
        - Y = 130 mm
        - Z = 50 mm
        - T = - 3º to 70º
        - R = 360º (continous)
        - Further additional optional stage systems available
      Chamber:
        - 330 mm (Ø) x 270 mm (h)
        - 15 accessory ports for various options including STEM, 4QBSD, EBSD, EDS, WDS 
        - CCD-Camera with IR-illumination
        - Charge compensation with in-situ cleaning
      Image Processing:
        - Resolution up to 6144 x 4608 pixel (32 k x 32 k pixel optional available) 
        - A large number of integration and averaging modes available
      Image Display:
        - Single 19inch TFT monitor with SEM image displayed at 1024 x 768 pixel
      System Control:
        - SmartSEM ® with Windows® XP
        - operated by mouse, keyboard, joystick, control panel
  # Operation parameters for instrument
  # Replace parameter_1, parameter_2 ... and/or add own key value pairs
  parameters: 
      SE inlens:
         beam energy: ~~ keV
         probe current: ~~ nA
         magnification: ~~
         working distance: ~~ mm
         scan rate: ~~
         noise reduction mode: ~~
         file extension: jpg
      SE ET:
         beam energy: ~~ keV
         probe current: ~~ nA
         magnification: ~~
         working distance: ~~ mm
         scan rate: ~~
         noise reduction mode: ~~
         file extension: jpg
      EsB:
         beam energy: ~~ keV
         grid voltage: ~~ V
         probe current: ~~ nA
         magnification: ~~
         working distance: ~~ mm
         scan rate: ~~
         noise reduction mode: ~~
         file extension: jpg
      BSE:
         beam energy: ~~ keV
         probe current: ~~ nA
         magnification: ~~
         working distance: ~~ mm
         scan rate: ~~
         noise reduction mode: ~~
         file extension: jpg
      EDX:
         beam energy: ~~ keV
         probe current: ~~ nA
         magnification: ~~
         working distance: ~~ mm
         scan rate: ~~
         noise reduction mode: ~~
         file extension: jpg
---

```dataviewjs
await dv.view("/assets/javascript/dataview/views/navbar", {});
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_header", {});
```

![[ZEISS_MERLIN_FE-SEM.jpg]]

```dataviewjs
await dv.view("/assets/javascript/dataview/views/instrument", {});
```


```dataviewjs
await dv.view("/assets/javascript/dataview/views/note_footer", {});
```
