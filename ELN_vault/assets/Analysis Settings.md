---
instrument:
  type:
    - scanning electron microscope
    - transmission electron microscope
    - raman microscope
    - infrared spectrometer
    - x-ray diffractometer
    - x-ray photoelectron spectroscopy
    - potentiostat
    - undefined
  techniques:
    scanning electron microscope:
      - SE inlens
      - SE thorny
      - EsB
      - EDX
      - STEM
      - EBSD
    transmission electron microscope:
      - HR-TEM
      - TEM imaging
      - SAD
      - HADF imaging
    raman microscope:
      - raman spectroscopy
      - raman mapping
    fourier transform infrared spectrometer:
      - infrared transmission spectroscopy
      - ATR infrared spectroscopy
    x-ray diffraction:
      - x-ray diffraction (reflection mode)
      - x-ray diffraction (transmission mode)
    x-ray photoelectron spectroscopy:
      - xps survey spectrum
      - xps atom spectrum
    potentiostat:
      - GCPL
      - CV
      - EIS
      - iR drop
      - GITT
      - PITT
      - chronoamperometry
    undefined:
      - undefined
analysis:
  x-ray photoelectron spectroscopy:
    xps atom spectrum:
      x-ray energy:
        type: selection
        values:
          - Al Kα, hν = 1486.6 eV
          - Mg Kα, hν = 1253.6 eV
      atom:
        type: selection
        values: [C, N, O, S, Si]
      binding energy (min): ~~ eV 
      binding energy (max): ~~ eV
      integration time: ~~ s
      number of sweeps: ~~
    spx survey spectrum:
      x-ray energy:
        type: selection
        values:
          - Al Kα, hν = 1486.6 eV
          - Mg Kα, hν = 1253.6 eV
      binding energy (min): ~~ eV 
      binding energy (max): ~~ eV
      integration time: ~~ s
      number of sweeps: ~~
---

## Settings

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "instrument", header: "Instrument settings"  });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "analysis", header: "analysis settings"  });
```
