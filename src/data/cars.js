// ════════════════════════════════════════════════
// NE Racing Elite — CARS DATABASE
// ════════════════════════════════════════════════
// Diese Datei definiert alle 52 Autos im Spiel als globale Konstanten.
// Wird via <script src="src/data/cars.js"></script> VOR dem inline-game-code
// in index.html geladen. Phase E/F: Umwandlung in echtes ES Module.
//
// Schema pro Auto:
//   id          eindeutige String-ID (für saveData, GLB-Lookup, etc.)
//   brand       Markenname (z.B. "BMW", "Porsche")
//   name        Modellbezeichnung
//   year        Baujahr als String
//   cat         Kategorie (für Shop-Filter, CAR_SHAPES-Lookup)
//   flag        Emoji-Flagge des Herkunftslands
//   price       Kaufpreis €
//   unlockBiome Welt-ID die freigeschaltet sein muss (null = sofort verfügbar)
//   body/roof/trim/acc  Lackfarben (Hex)
//   stripes     Array für Racing-Streifen oder null
//   raceNum     optionale Startnummer
//   w / h       2D-Sprite-Größe in px (für drawCar)
//   speed       Beschleunigung Index
//   accel100    0-100 km/h Sekunden
//   grip        Lateral-Grip-Koeffizient
//   drift       Drift-Charakter
//   maxKmh      Topspeed
//   logo        Logo-Key
//   desc        Beschreibungstext
//   modelPath   optional: Pfad zu GLB-Datei (in Phase G aktiviert)
// ════════════════════════════════════════════════

const CARS = [
  // ── GERMAN PERFORMANCE ───────────────────────────────────────────────────────
  {id:'bmw2002t',   brand:'BMW',    name:'2002 Turbo',         year:'1973',cat:'German Performance',flag:'🇩🇪',price:22000, unlockBiome:null,
   body:'#f0ede8',roof:'#d8d5cc',trim:'#1a4fa0',acc:'#c0392b',stripes:['#1a4fa0','#c0392b'],
   w:15,h:26,speed:5.7,accel100:6.9,grip:.155,drift:.18,maxKmh:211,logo:'bmw',
   desc:'Turbopionier – der erste Turbo-BMW. Starterauto.'},
  {id:'bmw3csl',    brand:'BMW',    name:'3.0 CSL Race',       year:'1973',cat:'German Performance',flag:'🇩🇪',price:35000, unlockBiome:null,
   body:'#f0ede8',roof:'#ccc',trim:'#1a4fa0',acc:'#c0392b',stripes:['#1a4fa0','#c0392b','#fff'],raceNum:'12',
   w:17,h:28,speed:5.9,accel100:6.7,grip:.20,drift:.22,maxKmh:220,logo:'bmw',
   desc:'Batmobile – ETCC-Legende'},
  {id:'bmwm3e30',   brand:'BMW',    name:'M3 E30',             year:'1987',cat:'German Performance',flag:'🇩🇪',price:28000, unlockBiome:'city',
   body:'#c8e8d0',roof:'#a8c8b0',trim:'#fff',acc:'#2ecc71',stripes:['#fff','#2ecc71'],
   w:16,h:27,speed:6.4,accel100:6.7,grip:.22,drift:.20,maxKmh:235,logo:'bmw',
   desc:'DTM & Rallye-König'},
  {id:'bmw_m1',     brand:'BMW',    name:'M1 Procar',          year:'1979',cat:'German Performance',flag:'🇩🇪',price:120000,unlockBiome:'highland',
   body:'#1a1a2e',roof:'#111',trim:'#d4a017',acc:'#d4a017',stripes:['#d4a017','#2255aa','#c0392b'],raceNum:'76',
   w:18,h:28,speed:8.2,accel100:5.6,grip:.21,drift:.23,maxKmh:260,logo:'bmw',
   desc:'Supercarserie – Born-Procar-Champion'},
  {id:'bmw_635csi', brand:'BMW',    name:'635 CSi',            year:'1984',cat:'German Performance',flag:'🇩🇪',price:18000, unlockBiome:'city',
   body:'#1a1a1a',roof:'#111',trim:'#888',acc:'#888',stripes:null,
   w:17,h:28,speed:5.5,accel100:8.2,grip:.16,drift:.15,maxKmh:220,logo:'bmw',
   desc:'Elegant und schnell – der große Bayer'},
  {id:'vw_golf_gti',brand:'VW',     name:'Golf GTI Mk1',       year:'1976',cat:'German Performance',flag:'🇩🇪',price:12000, unlockBiome:'city',
   body:'#e8e0d0',roof:'#c8c0b0',trim:'#c0392b',acc:'#c0392b',stripes:null,
   w:14,h:24,speed:4.8,accel100:9.0,grip:.14,drift:.12,maxKmh:181,logo:'vw',
   desc:'Mutter aller Hot Hatches'},
  {id:'p911_rs',    brand:'Porsche',name:'911 Carrera RS 2.7', year:'1972',cat:'German Performance',flag:'🇩🇪',price:85000, unlockBiome:'alpine',
   body:'#f5f0e8',roof:'#e8e0d0',trim:'#1a4fa0',acc:'#1a4fa0',stripes:['#1a4fa0'],
   w:17,h:26,speed:7.5,accel100:5.8,grip:.195,drift:.25,maxKmh:245,logo:'porsche',
   desc:'Der Ducktail – leichtestes Serienauto seiner Zeit'},
  {id:'p930',       brand:'Porsche',name:'930 Turbo',           year:'1978',cat:'German Performance',flag:'🇩🇪',price:55000, unlockBiome:null,
   body:'#c0392b',roof:'#960000',trim:'#111',acc:'#222',stripes:null,
   w:17,h:26,speed:7.0,accel100:5.4,grip:.155,drift:.24,maxKmh:260,logo:'porsche',
   desc:'Der Widowmaker'},
  {id:'p935',       brand:'Porsche',name:'935 Jäger',           year:'1979',cat:'German Performance',flag:'🇩🇪',price:380000,unlockBiome:null,
   body:'#e8720c',roof:'#b85a08',trim:'#1a1a1a',acc:'#f39c12',stripes:null,raceNum:'2',
   w:19,h:30,speed:9.9,accel100:3.4,grip:.19,drift:.26,maxKmh:366,logo:'porsche',
   desc:'Le-Mans-Monster – 845 PS'},
  {id:'p959',       brand:'Porsche',name:'959',                 year:'1986',cat:'German Performance',flag:'🇩🇪',price:280000,unlockBiome:'pikes',
   body:'#f5f0e8',roof:'#e8e0d0',trim:'#111',acc:'#111',stripes:null,
   w:17,h:28,speed:9.0,accel100:3.7,grip:.24,drift:.16,maxKmh:317,logo:'porsche',
   desc:'Supertechnologie 1986 – AWD Turbo-Pionier'},
  {id:'audi_s1',    brand:'Audi',   name:'Sport Quattro S1',   year:'1985',cat:'German Performance',flag:'🇩🇪',price:180000,unlockBiome:null,
   body:'#f5f0e8',roof:'#dddad0',trim:'#c0392b',acc:'#f5e642',stripes:['#c0392b','#f5e642'],raceNum:'2',
   w:17,h:27,speed:6.7,accel100:3.1,grip:.24,drift:.15,maxKmh:248,logo:'audi',
   desc:'Gruppe-B – 476 PS Allradmonster'},
  {id:'mercedes_sl',brand:'Mercedes-Benz',name:'300 SL Gullwing',year:'1954',cat:'German Performance',flag:'🇩🇪',price:220000,unlockBiome:'targa',
   body:'#c8d8c0',roof:'#a8b8a0',trim:'#888',acc:'#888',stripes:null,
   w:17,h:28,speed:7.2,accel100:6.4,grip:.16,drift:.20,maxKmh:250,logo:'mercedes',
   desc:'Traumauto der 50er – Flügeltüren-Ikone'},

  // ── RALLY LEGENDS ────────────────────────────────────────────────────────────
  {id:'lancia_stratos',brand:'Lancia',name:'Stratos HF',    year:'1974',cat:'Rally Legends',flag:'🇮🇹',price:120000,unlockBiome:'forest',
   body:'#e74c3c',roof:'#c0392b',trim:'#fff',acc:'#f5e642',stripes:null,raceNum:'1',
   w:17,h:25,speed:7.8,accel100:4.8,grip:.23,drift:.28,maxKmh:232,logo:'lancia',
   desc:'Das reinste Rallyeauto aller Zeiten'},
  {id:'lancia_037',  brand:'Lancia',name:'Rally 037',       year:'1982',cat:'Rally Legends',flag:'🇮🇹',price:150000,unlockBiome:'rally',
   body:'#fff',roof:'#e8e0d0',trim:'#c0392b',acc:'#c0392b',stripes:['#c0392b'],raceNum:'5',
   w:17,h:27,speed:7.2,accel100:5.0,grip:.22,drift:.26,maxKmh:220,logo:'lancia',
   desc:'Letzter Hecktriebler-WRC-Champion'},
  {id:'lancia_delta',brand:'Lancia',name:'Delta HF Integrale',year:'1992',cat:'Rally Legends',flag:'🇮🇹',price:65000, unlockBiome:'forest',
   body:'#c0392b',roof:'#960000',trim:'#fff',acc:'#f5e642',stripes:null,
   w:16,h:26,speed:6.8,accel100:5.2,grip:.24,drift:.18,maxKmh:220,logo:'lancia',
   desc:'6 WRC-Titel in Folge – Legende'},
  {id:'peugeot_205t16',brand:'Peugeot',name:'205 Turbo 16',year:'1984',cat:'Rally Legends',flag:'🇫🇷',price:120000,unlockBiome:'rally',
   body:'#fff',roof:'#e0e0e0',trim:'#1a4fa0',acc:'#c0392b',stripes:['#1a4fa0','#c0392b'],raceNum:'4',
   w:17,h:26,speed:7.5,accel100:4.2,grip:.24,drift:.20,maxKmh:230,logo:'peugeot',
   desc:'Gruppe B – Mittelmotorwunder'},
  {id:'ford_rs200',  brand:'Ford',  name:'RS200',            year:'1986',cat:'Rally Legends',flag:'🇬🇧',price:180000,unlockBiome:'rally',
   body:'#fff',roof:'#e0e0e0',trim:'#1a4fa0',acc:'#c0392b',stripes:['#c0392b','#1a4fa0'],raceNum:'7',
   w:17,h:27,speed:8.0,accel100:3.8,grip:.23,drift:.22,maxKmh:235,logo:'ford',
   desc:'Gruppe B – Fords Wunderwaffe'},
  {id:'mg_metro_6r4',brand:'MG',   name:'Metro 6R4',         year:'1985',cat:'Rally Legends',flag:'🇬🇧',price:75000, unlockBiome:'rally',
   body:'#c0392b',roof:'#960000',trim:'#fff',acc:'#f5e642',stripes:null,raceNum:'11',
   w:16,h:25,speed:7.4,accel100:4.5,grip:.23,drift:.21,maxKmh:225,logo:'mg',
   desc:'Britisches Gruppe-B-Monster'},
  {id:'subaru_impreza',brand:'Subaru',name:'Impreza WRX STI',year:'1993',cat:'Rally Legends',flag:'🇯🇵',price:38000,unlockBiome:'rally',
   body:'#1a4fa0',roof:'#1040a0',trim:'#f5e642',acc:'#f5e642',stripes:['#f5e642'],
   w:16,h:26,speed:6.9,accel100:5.4,grip:.24,drift:.17,maxKmh:225,logo:'subaru',
   desc:'Der Blaue Blitz – WRC-Ikone der 90er'},

  // ── EUROPEAN GT & SPORTS ──────────────────────────────────────────────────────
  {id:'ferrari_308', brand:'Ferrari',name:'308 GTB',          year:'1975',cat:'European GT',flag:'🇮🇹',price:45000, unlockBiome:'desert',
   body:'#c0392b',roof:'#900',trim:'#1a1a1a',acc:'#f5c518',stripes:null,
   w:16,h:27,speed:6.8,accel100:6.2,grip:.185,drift:.21,maxKmh:250,logo:'ferrari',
   desc:'Magnum P.I.s Traum – klassischer Prancing Horse'},
  {id:'ferrari_288gto',brand:'Ferrari',name:'288 GTO',        year:'1984',cat:'European GT',flag:'🇮🇹',price:180000,unlockBiome:'monaco',
   body:'#c0392b',roof:'#900',trim:'#111',acc:'#f5c518',stripes:null,
   w:17,h:28,speed:8.8,accel100:4.9,grip:.21,drift:.24,maxKmh:305,logo:'ferrari',
   desc:'Gruppe-B-Straßenversion – 400 PS Homologation'},
  {id:'ferrari_f40', brand:'Ferrari',name:'F40',               year:'1987',cat:'European GT',flag:'🇮🇹',price:320000,unlockBiome:'pikes',
   body:'#c0392b',roof:'#900',trim:'#111',acc:'#f5c518',stripes:null,
   w:18,h:30,speed:9.2,accel100:4.1,grip:.22,drift:.25,maxKmh:324,logo:'ferrari',
   desc:'Enzos letztes Auto – 478 PS, kein Schnickschnack'},
  {id:'lambo_countach',brand:'Lamborghini',name:'Countach LP400',year:'1974',cat:'European GT',flag:'🇮🇹',price:120000,unlockBiome:'highland',
   body:'#f5c518',roof:'#d4a017',trim:'#111',acc:'#111',stripes:null,
   w:19,h:29,speed:8.5,accel100:5.2,grip:.19,drift:.26,maxKmh:295,logo:'lamborghini',
   desc:'Das Poster-Auto – Keilform-Legende'},
  {id:'lambo_diablo', brand:'Lamborghini',name:'Diablo',        year:'1990',cat:'European GT',flag:'🇮🇹',price:160000,unlockBiome:'bonneville',
   body:'#f39c12',roof:'#e67e22',trim:'#111',acc:'#111',stripes:null,
   w:19,h:31,speed:9.5,accel100:4.0,grip:.20,drift:.27,maxKmh:325,logo:'lamborghini',
   desc:'Teufel auf Rädern – Anfang der 90er'},
  {id:'alpine_a110', brand:'Alpine', name:'A110 1600S',         year:'1971',cat:'European GT',flag:'🇫🇷',price:55000, unlockBiome:'alpine',
   body:'#1a4fa0',roof:'#1040a0',trim:'#f5f0e8',acc:'#f5f0e8',stripes:null,
   w:15,h:25,speed:6.5,accel100:6.8,grip:.20,drift:.25,maxKmh:215,logo:'alpine',
   desc:'Leichtbau-Meister aus Dieppe'},
  {id:'r5_turbo',    brand:'Renault',name:'5 Turbo 2',          year:'1982',cat:'European GT',flag:'🇫🇷',price:45000, unlockBiome:'alpine',
   body:'#f5e642',roof:'#d4c420',trim:'#1a1a1a',acc:'#c0392b',stripes:null,raceNum:'5',
   w:16,h:25,speed:6.9,accel100:5.5,grip:.22,drift:.26,maxKmh:220,logo:'renault',
   desc:'Mittelmotormonster im Kleinwagenkleid'},
  {id:'de_tomaso',   brand:'De Tomaso',name:'Pantera GTS',      year:'1973',cat:'European GT',flag:'🇮🇹',price:55000, unlockBiome:'monaco',
   body:'#1a1a2e',roof:'#111',trim:'#f5e642',acc:'#f5e642',stripes:null,
   w:18,h:28,speed:7.8,accel100:5.5,grip:.17,drift:.27,maxKmh:260,logo:'de_tomaso',
   desc:'Ital. Design, US-V8 – das Beste zweier Welten'},
  {id:'alfa_155',    brand:'Alfa Romeo',name:'155 V6 Ti DTM',   year:'1993',cat:'European GT',flag:'🇮🇹',price:70000, unlockBiome:'highland',
   body:'#c0392b',roof:'#960000',trim:'#fff',acc:'#f5e642',stripes:['#f5e642'],raceNum:'8',
   w:16,h:27,speed:7.0,accel100:5.4,grip:.23,drift:.18,maxKmh:260,logo:'alfa',
   desc:'DTM-Dominator 1993 – unschlagbar'},

  // ── BRITISH ICONS ────────────────────────────────────────────────────────────
  {id:'jaguar_etype',brand:'Jaguar',name:'E-Type Serie 1',    year:'1961',cat:'British Icons',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',price:75000, unlockBiome:'monaco',
   body:'#c8d8c0',roof:'#a8b8a0',trim:'#888',acc:'#888',stripes:null,
   w:17,h:30,speed:7.0,accel100:6.8,grip:.16,drift:.20,maxKmh:240,logo:'jaguar',
   desc:'Das schönste Auto der Welt – Enzo Ferrari'},
  {id:'aston_db5',  brand:'Aston Martin',name:'DB5',           year:'1963',cat:'British Icons',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',price:90000, unlockBiome:'monaco',
   body:'#8aa8c8',roof:'#6888a8',trim:'#888',acc:'#888',stripes:null,
   w:17,h:29,speed:6.8,accel100:7.1,grip:.16,drift:.18,maxKmh:230,logo:'aston',
   desc:'James Bonds Auto – ewige Ikone'},
  {id:'lotus_esprit',brand:'Lotus',name:'Esprit Turbo',        year:'1980',cat:'British Icons',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',price:32000, unlockBiome:'alpine',
   body:'#f5f0e8',roof:'#e8e0d0',trim:'#c0392b',acc:'#c0392b',stripes:['#c0392b','#1a4fa0'],
   w:16,h:28,speed:7.0,accel100:5.8,grip:.21,drift:.22,maxKmh:244,logo:'lotus',
   desc:'Der Unterwasser-U-Boot – James Bond'},
  {id:'escort_rs1800',brand:'Ford',name:'Escort RS1800',       year:'1975',cat:'British Icons',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',price:45000, unlockBiome:'forest',
   body:'#f5f0e8',roof:'#e0d8c8',trim:'#c0392b',acc:'#c0392b',stripes:['#c0392b'],raceNum:'3',
   w:15,h:25,speed:6.0,accel100:7.0,grip:.21,drift:.24,maxKmh:195,logo:'ford',
   desc:'Britischer Rallye-Klassiker der 70er'},
  {id:'sierra_cosw', brand:'Ford',name:'Sierra RS Cosworth',   year:'1986',cat:'British Icons',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',price:38000, unlockBiome:'rally',
   body:'#f5f0e8',roof:'#e0d8c8',trim:'#1a4fa0',acc:'#c0392b',stripes:['#1a4fa0','#c0392b'],raceNum:'5',
   w:16,h:27,speed:6.6,accel100:6.0,grip:.21,drift:.22,maxKmh:243,logo:'ford',
   desc:'Whale-Tail – Touring-Car-Ikone'},
  {id:'mini_cooper', brand:'Mini',  name:'Cooper S',            year:'1965',cat:'British Icons',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',price:18000, unlockBiome:'city',
   body:'#f5f0e8',roof:'#1a1a1a',trim:'#f5c518',acc:'#f5c518',stripes:null,
   w:13,h:22,speed:4.2,accel100:10.5,grip:.17,drift:.18,maxKmh:160,logo:'mini',
   desc:'Der Underdog – Monte-Carlo-Sieger'},

  // ── AMERICAN MUSCLE ──────────────────────────────────────────────────────────
  {id:'mustang_gt350',brand:'Shelby',name:'Mustang GT350',     year:'1965',cat:'American Muscle',flag:'🇺🇸',price:75000, unlockBiome:'highland',
   body:'#f5f0e8',roof:'#e8e0d0',trim:'#1a4fa0',acc:'#1a4fa0',stripes:['#1a4fa0'],
   w:17,h:27,speed:7.5,accel100:5.5,grip:.18,drift:.30,maxKmh:235,logo:'shelby',
   desc:'Shelby-Legende – Road & Track 1965'},
  {id:'ford_gt40',  brand:'Ford',  name:'GT40 Mk.I',           year:'1966',cat:'American Muscle',flag:'🇺🇸',price:250000,unlockBiome:'targa',
   body:'#003087',roof:'#002060',trim:'#f5c518',acc:'#f5c518',stripes:['#f5c518'],raceNum:'1',
   w:20,h:27,speed:9.8,accel100:4.4,grip:.21,drift:.20,maxKmh:335,logo:'ford',
   desc:'Le-Mans-Sieger 1966–69 – Fords Rache'},
  {id:'charger_rt', brand:'Dodge',name:'Charger R/T 440',     year:'1969',cat:'American Muscle',flag:'🇺🇸',price:45000, unlockBiome:'desert',
   body:'#1a1a2e',roof:'#111',trim:'#e74c3c',acc:'#e74c3c',stripes:['#e74c3c'],
   w:18,h:29,speed:7.2,accel100:5.8,grip:.14,drift:.32,maxKmh:225,logo:'dodge',
   desc:'Muscle-Car-König – 375 PS V8'},
  {id:'challenger', brand:'Dodge',name:'Challenger Hemi',     year:'1970',cat:'American Muscle',flag:'🇺🇸',price:55000, unlockBiome:'desert',
   body:'#e67e22',roof:'#d35400',trim:'#111',acc:'#111',stripes:null,
   w:18,h:29,speed:7.5,accel100:5.6,grip:.14,drift:.33,maxKmh:230,logo:'dodge',
   desc:'Vanishing Point – 426 Hemi'},
  {id:'corvette_c2',brand:'Chevrolet',name:'Corvette C2 Stingray',year:'1963',cat:'American Muscle',flag:'🇺🇸',price:55000,unlockBiome:'monaco',
   body:'#1a4fa0',roof:'#1040a0',trim:'#f5f0e8',acc:'#f5f0e8',stripes:null,
   w:18,h:29,speed:7.0,accel100:6.0,grip:.17,drift:.28,maxKmh:245,logo:'chevrolet',
   desc:'Split-Window – schönste Corvette'},
  {id:'camaro_z28', brand:'Chevrolet',name:'Camaro Z/28',      year:'1969',cat:'American Muscle',flag:'🇺🇸',price:38000, unlockBiome:'desert',
   body:'#c0392b',roof:'#900',trim:'#f5f0e8',acc:'#f5e642',stripes:['#f5f0e8','#f5e642'],
   w:17,h:27,speed:7.0,accel100:6.2,grip:.16,drift:.30,maxKmh:220,logo:'chevrolet',
   desc:'Trans-Am-Sieger – der klassische Muscle'},
  {id:'shelby_cobra',brand:'Shelby',name:'Cobra 427 SC',       year:'1966',cat:'American Muscle',flag:'🇺🇸',price:180000,unlockBiome:'bonneville',
   body:'#1a4fa0',roof:'#1040a0',trim:'#f5c518',acc:'#f5c518',stripes:['#f5c518'],
   w:18,h:26,speed:9.5,accel100:4.2,grip:.18,drift:.35,maxKmh:265,logo:'shelby',
   desc:'Roadster-Monster – kein Dach, kein Gnade'},

  // ── JDM CLASSICS ─────────────────────────────────────────────────────────────
  {id:'toyota_2000gt',brand:'Toyota',name:'2000GT',            year:'1967',cat:'JDM Classics',flag:'🇯🇵',price:130000,unlockBiome:'targa',
   body:'#f5f0e8',roof:'#e0d8c8',trim:'#888',acc:'#888',stripes:null,
   w:16,h:27,speed:6.8,accel100:7.0,grip:.19,drift:.19,maxKmh:220,logo:'toyota',
   desc:'Japans erstes Supercar – Bond-Auto'},
  {id:'supra_a70',   brand:'Toyota',name:'Supra MA70',          year:'1986',cat:'JDM Classics',flag:'🇯🇵',price:22000, unlockBiome:'forest',
   body:'#c0392b',roof:'#960000',trim:'#111',acc:'#111',stripes:null,
   w:17,h:27,speed:6.5,accel100:6.8,grip:.19,drift:.22,maxKmh:230,logo:'toyota',
   desc:'Pop-up-Scheinwerfer – Klassiker der 80er'},
  {id:'skyline_r32', brand:'Nissan',name:'Skyline GT-R R32',   year:'1989',cat:'JDM Classics',flag:'🇯🇵',price:55000, unlockBiome:'outback',
   body:'#808090',roof:'#606070',trim:'#e74c3c',acc:'#e74c3c',stripes:null,
   w:16,h:27,speed:7.8,accel100:5.4,grip:.24,drift:.19,maxKmh:265,logo:'nissan',
   desc:'Godzilla – der unschlagbare GT-R'},
  {id:'nissan_240z', brand:'Nissan',name:'240Z Fairlady',       year:'1969',cat:'JDM Classics',flag:'🇯🇵',price:35000, unlockBiome:'desert',
   body:'#f5c518',roof:'#d4a017',trim:'#111',acc:'#111',stripes:null,
   w:16,h:27,speed:6.5,accel100:7.2,grip:.18,drift:.24,maxKmh:210,logo:'nissan',
   desc:'Japans Antwort auf den E-Type'},
  {id:'honda_nsx',   brand:'Honda', name:'NSX Type R',          year:'1990',cat:'JDM Classics',flag:'🇯🇵',price:75000, unlockBiome:'safari',
   body:'#c0392b',roof:'#960000',trim:'#fff',acc:'#fff',stripes:null,
   w:17,h:28,speed:7.5,accel100:5.8,grip:.23,drift:.18,maxKmh:270,logo:'honda',
   desc:'Ayrton Sennas Entwicklungsarbeit'},
  {id:'rx7_fc',      brand:'Mazda', name:'RX-7 FC3S',           year:'1986',cat:'JDM Classics',flag:'🇯🇵',price:18000, unlockBiome:'forest',
   body:'#c8e8d0',roof:'#a8c8b0',trim:'#2ecc71',acc:'#2ecc71',stripes:null,
   w:16,h:27,speed:6.6,accel100:6.8,grip:.20,drift:.25,maxKmh:225,logo:'mazda',
   desc:'Wankelmotor – leicht und drehfreudig'},
  {id:'mazda_787b',  brand:'Mazda', name:'787B Le Mans',        year:'1991',cat:'JDM Classics',flag:'🇯🇵',price:280000,unlockBiome:'bonneville',
   body:'#e8720c',roof:'#b85a08',trim:'#1a1a1a',acc:'#f39c12',stripes:['#2ecc71'],raceNum:'55',
   w:19,h:30,speed:9.9,accel100:3.8,grip:.22,drift:.22,maxKmh:360,logo:'mazda',
   desc:'Einziger japan. Le-Mans-Sieger – Kreiskolbenmotor'},
  {id:'celica_st185',brand:'Toyota',name:'Celica GT-Four ST185',year:'1992',cat:'JDM Classics',flag:'🇯🇵',price:32000, unlockBiome:'rally',
   body:'#f5f0e8',roof:'#e0d8c8',trim:'#c0392b',acc:'#c0392b',stripes:['#c0392b'],
   w:16,h:26,speed:6.5,accel100:6.0,grip:.23,drift:.19,maxKmh:220,logo:'toyota',
   desc:'Carlos Sainz – WRC-Champion 1992'},

  // ── SWEDISH CLASSICS ─────────────────────────────────────────────────────────
  {id:'saab_96',     brand:'Saab',  name:'96 Monte Carlo',      year:'1966',cat:'Swedish Classics',flag:'🇸🇪',price:18000, unlockBiome:'city',
   body:'#c0392b',roof:'#960000',trim:'#fff',acc:'#fff',stripes:null,
   w:14,h:24,speed:4.5,accel100:11.0,grip:.15,drift:.20,maxKmh:165,logo:'saab',
   desc:'Erik Carlssons Sieger – Monte Carlo 1962 & 1963'},
  {id:'volvo_240t',  brand:'Volvo', name:'240 Turbo',           year:'1984',cat:'Swedish Classics',flag:'🇸🇪',price:15000, unlockBiome:'city',
   body:'#c8d8e0',roof:'#a8b8c0',trim:'#888',acc:'#888',stripes:null,
   w:16,h:27,speed:5.2,accel100:8.5,grip:.16,drift:.16,maxKmh:195,logo:'volvo',
   desc:'Volvo-Touring-Car – der Backstein rast'},
  {id:'saab_99t',    brand:'Saab',  name:'99 Turbo',            year:'1978',cat:'Swedish Classics',flag:'🇸🇪',price:18000, unlockBiome:'forest',
   body:'#1a1a1a',roof:'#111',trim:'#d4a017',acc:'#d4a017',stripes:null,
   w:15,h:25,speed:5.5,accel100:8.8,grip:.16,drift:.18,maxKmh:195,logo:'saab',
   desc:'Saabs Turbo-Pionier – gegen den Strom'},
];

// ════════════════════════════════════════════════
// DRIVETRAIN — lookup: car.id → 'rwd'|'fwd'|'awd'
// Alle nicht gelisteten Autos = Standard RWD
// ════════════════════════════════════════════════
const CAR_DRIVETRAIN={
  // FWD
  vw_golf_gti:'fwd', mini_cooper:'fwd', saab_96:'fwd', saab_99t:'fwd',
  // AWD
  p959:'awd', audi_s1:'awd',
  lancia_delta:'awd', peugeot_205t16:'awd', ford_rs200:'awd', mg_metro_6r4:'awd',
  subaru_impreza:'awd', celica_st185:'awd', skyline_r32:'awd',
};
// Inject drv into car objects at startup (once, non-destructive)
CARS.forEach(c=>{ if(!c.drv) c.drv=CAR_DRIVETRAIN[c.id]||'rwd'; });

// ════════════════════════════════════════════════
// CAR-SHAPE LOOKUP — per Kategorie unterschiedliche Karosserie-Proportionen
// Damit Muscle-Cars wuchtig wirken, Sportler tief, Klassiker rundlich, etc.
// Wird von buildProceduralCarMesh (3D Garage) verwendet.
// ════════════════════════════════════════════════
const CAR_SHAPES={
  '70s Muscle':       {L:1.18,W:1.10,roof:0.94,ride:0.02,hood:1.25,trunk:0.85,wheelR:1.05,wing:false,fender:1.04},
  'Classic Sports':   {L:1.00,W:0.96,roof:0.85,ride:-0.04,hood:1.05,trunk:0.95,wheelR:0.95,wing:false,fender:1.00},
  'Supercars':        {L:1.08,W:1.10,roof:0.78,ride:-0.06,hood:0.95,trunk:0.85,wheelR:1.08,wing:true, fender:1.06},
  'Group B':          {L:0.92,W:1.12,roof:0.96,ride:0.03,hood:0.90,trunk:0.95,wheelR:1.02,wing:true, fender:1.08},
  'JDM Classics':     {L:1.00,W:1.02,roof:0.90,ride:-0.02,hood:1.00,trunk:1.00,wheelR:1.00,wing:false,fender:1.02},
  'F1 Heritage':      {L:1.14,W:1.18,roof:0.55,ride:-0.10,hood:1.10,trunk:1.05,wheelR:1.12,wing:true, fender:1.10},
  'Le Mans Legends':  {L:1.22,W:1.16,roof:0.70,ride:-0.07,hood:1.05,trunk:1.08,wheelR:1.08,wing:true, fender:1.08},
  'British Icons':    {L:1.00,W:0.96,roof:0.92,ride:-0.01,hood:1.05,trunk:0.98,wheelR:0.96,fender:1.00},
  'Swedish Classics': {L:1.05,W:1.00,roof:1.08,ride:0.02,hood:0.95,trunk:1.05,wheelR:0.98,fender:1.00},
  '60s Legends':      {L:1.05,W:1.02,roof:0.92,ride:0.01,hood:1.10,trunk:1.00,wheelR:0.96,fender:1.02},
  'GT Classics':      {L:1.10,W:1.04,roof:0.82,ride:-0.03,hood:1.10,trunk:0.92,wheelR:1.02,fender:1.04},
  'Rally Heroes':     {L:0.94,W:1.05,roof:1.05,ride:0.05,hood:0.95,trunk:0.95,wheelR:1.05,fender:1.06},
  'Touring Cars':     {L:1.02,W:1.04,roof:1.00,ride:-0.01,hood:1.00,trunk:1.00,wheelR:1.00,fender:1.04},
  'Hot Hatches':      {L:0.88,W:0.96,roof:1.04,ride:0.01,hood:0.85,trunk:0.80,wheelR:0.94,fender:0.98},
};
function getCarShape(car){
  const def={L:1.0,W:1.0,roof:1.0,ride:0,hood:1.0,trunk:1.0,wheelR:1.0,wing:false,fender:1.0};
  return Object.assign({},def,CAR_SHAPES[car.cat]||{});
}

console.log('[NE/data] cars.js loaded: '+CARS.length+' cars, '+Object.keys(CAR_DRIVETRAIN).length+' drivetrain overrides');
