// ════════════════════════════════════════════════
// NE Racing Elite — TUNING DATABASE
// ════════════════════════════════════════════════
// Alle Tuning-Optionen: Reifen, Bodykit, Fahrwerk, Diff, Getriebe, Bremsen, Upgrades.
// Preise sind ~3-4x höher als die Originalwerte für echte Progression.
// ════════════════════════════════════════════════

const TYRE_COMPOUNDS={
  slick:       {asphalt:1.42,gravel:0.28,sand:0.14,mud:0.10,snow:0.09,ice:0.07,saltflat:1.38,dirt:0.22,name:'Slick',       icon:'🏎',price:35000},
  sport_soft:  {asphalt:1.22,gravel:0.52,sand:0.33,mud:0.28,snow:0.18,ice:0.13,saltflat:1.18,dirt:0.42,name:'Sport Soft',  icon:'🔴',price:14000},
  sport_medium:{asphalt:1.00,gravel:0.70,sand:0.50,mud:0.44,snow:0.34,ice:0.24,saltflat:0.96,dirt:0.60,name:'Sport Medium',icon:'🟡',price:0},
  sport_hard:  {asphalt:0.84,gravel:0.82,sand:0.66,mud:0.54,snow:0.52,ice:0.36,saltflat:0.80,dirt:0.72,name:'Sport Hard',  icon:'⚪',price:7000},
  rally:       {asphalt:0.68,gravel:1.18,sand:0.88,mud:0.76,snow:0.76,ice:0.52,saltflat:0.62,dirt:0.96,name:'Rally',       icon:'🟠',price:18000},
  gravel_rally:{asphalt:0.58,gravel:1.32,sand:1.12,mud:1.02,snow:0.58,ice:0.44,saltflat:0.52,dirt:1.18,name:'Gravel Rally',icon:'🟤',price:24000},
  snow_tyre:   {asphalt:0.54,gravel:0.74,sand:0.64,mud:0.68,snow:1.28,ice:1.14,saltflat:0.48,dirt:0.72,name:'Snow/Ice',   icon:'❄️',price:20000},
  all_season:  {asphalt:0.80,gravel:0.84,sand:0.74,mud:0.70,snow:0.84,ice:0.62,saltflat:0.76,dirt:0.80,name:'All-Season', icon:'🔵',price:11000},
};

// ════════════════════════════════════════════════
// BODYKIT & TUNING PARTS
// ════════════════════════════════════════════════
const BODYKIT_PARTS={
  frontSplitter:{name:'Frontschürze',   price:18000,effect:'Abtrieb +5%'},
  rearWingSmall:{name:'Heckspoiler',    price:26000,effect:'Abtrieb +8%, VMax −1%'},
  rearWingGT:   {name:'GT-Flügel',     price:52000,effect:'Abtrieb +15%, VMax −3%'},
  sideskirts:   {name:'Seitenschweller',price:15000,effect:'Stabilität +3%'},
  widebody:     {name:'Wide-Body-Kit', price:75000,effect:'Reifenbreite +40mm'},
  hoodScoop:    {name:'Motorhauben-Hutze',price:11000,effect:'Turbo +5%'},
};
const SUSPENSION_OPTIONS={
  street:{name:'Seriendämpfer',  price:0,     gripMult:1.00,driftMult:1.00},
  sport: {name:'Sport-Fahrwerk', price:22000, gripMult:1.08,driftMult:0.90},
  race:  {name:'Renn-Fahrwerk',  price:60000, gripMult:1.18,driftMult:0.75},
  drift: {name:'Drift-Setup',    price:34000, gripMult:0.88,driftMult:1.45},
};
const DIFF_OPTIONS={
  open:  {name:'Offenes Diff.',    price:0,     driftMult:1.22,tractMult:0.90},
  lsd:   {name:'LSD Sperrdiff.',   price:38000, driftMult:0.84,tractMult:1.16},
  locked:{name:'Sperrdiff. 100%', price:68000, driftMult:1.65,tractMult:1.04},
};
const GEARBOX_OPTIONS={
  stock:{name:'Seriengetriebe',  price:0,     accelMult:1.00,vmaxMult:1.00},
  short:{name:'Kurze Übersetzung',price:30000, accelMult:1.10,vmaxMult:0.92},
  long: {name:'Lange Übersetzung',price:30000, accelMult:0.94,vmaxMult:1.08},
};
const BRAKE_OPTIONS=[
  {name:'Serienbremsen',    price:0,     brakeK:1.00},
  {name:'Sport-Bremsanlage',price:18000, brakeK:1.15},
  {name:'Renn-Bremsen',     price:38000, brakeK:1.28},
  {name:'Carbon-Keramik',   price:95000, brakeK:1.42},
];

// Upgrade-Costs ~5x: jetzt brauchst du ca. 8-12 Rennen pro Stufe
const UPGRADE_COSTS={
  engine:[1500,3000,5500,9000,14000],
  grip:  [1000,2200,4500,7500,12000],
  nitro: [800,1800,3500,6000,9500]
};

console.log('[NE/data] tuning.js loaded: '+Object.keys(TYRE_COMPOUNDS).length+' tyres, '+BRAKE_OPTIONS.length+' brakes');
