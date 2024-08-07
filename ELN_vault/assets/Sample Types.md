---
compound:
   chemical formula: ~~ 
   molar mass: ~~ g/mol
   density: ~~ g/cm3
   educts:
      - name: raw material 1
        mass:  ~~
        volume: ~~
electrode:
   active material:
      name: ~~
      mass: ~~
      loading: ~~ mg/cm2
   binder: 
      name: ~~
      mass: ~~
   conductive additive:
      name: ~~
      mass: ~~
   solvent: 
      name: ~~
      volume: ~~
   current collector:
      name: ~~
   dry thickness: ~~ µm
   porosity: ~~ %
electrochemical cell:
   cell:
      name: ~~
      type: coin cell, 3-electrode, pouch-bag
   working electrode:
      name: ~~
      active material mass: ~~ mg
      total mass: ~~ mg
      area: ~~ cm2
   counter electrode:
      name: ~~
      active material mass: ~~ mg
      total mass: ~~ mg
      area: ~~ cm2
   reference electrode:
      name: ~~
      potential: ~~
   electrolyte:
      name: ~~
      composition: ~~
      volume: ~~ µl
   separator:
      name: ~~
      layers: ~~
      thickness: ~~
---

## Settings

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "compound", header: "Compound settings"  });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "electrode", header: "Electrode settings"  });
```

```dataviewjs
await dv.view("/assets/javascript/dataview/views/properties", { key: "electrochemical cell", header: "Electrochemical cell settings"  });
```