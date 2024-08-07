---
ELN version: 0.4.2
note:
  author: Name Surname
  initials: NN
operators:
  Max Mustermann: 
    initials: MM
  Vera Musterfrau:
    initials: VM
folder:
  local data: /path/to_your/local_data/folder
  remote data: /path/to_your/remote_data/folder
  contacts: Contacts
  daily notes: Daily Notes
  projects: Projects
  samples: Experiments/Samples
  analyses: Experiments/Analyses
  processes: Experiments/Processes
  chemicals: Resources/Chemicals
  devices: Resources/Devices
  instruments: Resources/Instruments
  meetings: Meetings
  tasks: Tasks
  templates: assets/templates
  analysis methods: assets/templates/Analysis Methods
  custom templates: assets/templates/Custom Templates
  dataview queries: assets/templates/DataView Queries
  mermaid charts: assets/templates/Mermaid Charts
  sample types: assets/templates/Sample Types
chemical:
  type:
    - active material
    - binder
    - conductive additive
    - current collector
    - electrolyte
    - inorganic compound
    - metal
    - organic compound
    - polymer
    - semiconductor
    - separator
    - solvent
  field of use:
    - electrode
    - electrochemical cell
    - synthesis
    - undefined
device:
  type:
    - broad ion beam cutter
    - balance
    - ball mill
    - coater
    - coin cell crimp
    - electrode cutter
    - furnace
    - glovebox
    - ion polishing device
    - mixer
    - oven
    - undefined
  method:
    - drying
    - calcination
    - coating
    - cutting
    - inert sample handling
    - milling
    - mixing
    - polishing
    - sealing
    - weighing
    - undefined
process:
  type:
    - synthesis
    - calcination
    - pyrolysis
    - mixing
    - electrode coating
    - cell assembly
    - undefined
instrument:
  type:
    - infrared spectrometer
    - potentiostat
    - raman microscope
    - scanning electron microscope
    - transmission electron microscope
    - x-ray diffractometer
    - x-ray photoelectron spectrometer
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
    infrared spectrometer:
      - transmission spectroscopy
      - ATR spectroscopy
    x-ray diffractometer:
      - diffraction (reflection mode)
      - diffraction (transmission mode)
    x-ray photoelectron spectroscopy:
      - survey spectrum
      - atom spectrum
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
sample:
  type:
    - compound
    - electrode
    - electrochemical cell
analysis:
  status:
    - planned
    - running
    - completed
    - failed
---

## Settings

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "note", header: "Note settings"  });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "operators", header: "Operator settings"  });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "folder", header: "Folder settings"  });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "chemical", header: "Chemical settings"  });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "device", header: "Device settings" });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "instrument", header: "Instrument settings"  });
```
