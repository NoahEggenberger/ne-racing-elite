// ════════════════════════════════════════════════
// NE Racing Elite — WORLDS, SURFACES, BIOME_SURFACE
// ════════════════════════════════════════════════
// 20 Welten + 8 Untergrundtypen + Biom→Untergrund-Mapping.
// Wird via <script src="src/data/worlds.js"></script> nach tracks.js geladen.
// _bt(biomeId) → Array von 20 Track-Namen aus BIOME_TRACKS + TRACK_DATA
// ════════════════════════════════════════════════

function _bt(bid){
  return (BIOME_TRACKS[bid]||[]).map(id=>(TRACK_DATA[id]||{}).name||id);
}

const WORLDS=[
  // 1 — CITY (von Anfang an freigeschaltet)
  {id:'city',name:'Nordschleife',icon:'🏙️',surface:'asphalt',
   sky:['#6a9fd8','#a5c2dc'],ground:'#555555',road:'#2a2a2a',edge:'#888888',
   line:'rgba(255,255,255,.85)',curb1:'#d83a2b',curb2:'#f5f5f5',
   part:'#5599ff',acc:'rgba(40,80,200,.05)',
   circuit:`<path d="M8,16 C8,8 16,6 24,6 C32,6 38,10 40,16 C42,22 38,26 32,27 C28,28 22,27 18,26 C14,25 10,22 8,19 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
   tracks:_bt('city'),unlocked:true},

  // 2 — COUNTRYSIDE
  {id:'countryside',name:'Erzberg',icon:'🌾',surface:'gravel',
   sky:['#7ac8f0','#b8e0f8'],ground:'#5a8a3a',road:'#3a3020',edge:'#7a6a40',
   line:'rgba(255,240,180,.75)',curb1:'#4a8820',curb2:'#f0f0e0',
   part:'#88cc44',acc:'rgba(80,140,20,.06)',
   circuit:`<path d="M6,20 C6,10 14,6 24,6 C34,6 42,10 42,20 C42,30 34,32 24,30 C14,28 6,28 6,20" fill="none" stroke="currentColor" stroke-width="2"/>`,
   tracks:_bt('countryside'),unlocked:false},

  // 3 — FOREST
  {id:'forest',name:'Schwarzwald',icon:'🌲',surface:'asphalt',
   sky:['#6aaa6a','#a0c8a0'],ground:'#2d4a2d',road:'#333333',edge:'#4a6a4a',
   line:'rgba(220,255,220,.75)',curb1:'#22a548',curb2:'#e8ffe8',
   part:'#55ff88',acc:'rgba(40,180,70,.07)',
   circuit:`<path d="M4,28 C6,18 14,14 24,14 C34,14 42,10 44,4 M4,4 C6,14 14,18 24,18 C34,18 42,22 44,28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
   tracks:_bt('forest'),unlocked:false},

  // 4 — COASTAL
  {id:'coastal',name:'Targa Florio',icon:'🌊',surface:'asphalt',
   sky:['#4db8ff','#90d4ff'],ground:'#f0e090',road:'#3a3a3a',edge:'#708090',
   line:'rgba(255,255,255,.85)',curb1:'#1a6db5',curb2:'#f5f5f5',
   part:'#44aaff',acc:'rgba(20,80,200,.07)',
   circuit:`<path d="M6,16 C6,6 14,4 24,4 C34,4 42,8 42,16 C42,24 34,28 24,28 C14,28 6,24 6,20 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
   tracks:_bt('coastal'),unlocked:false},

  // 5 — INDUSTRIAL
  {id:'industrial',name:'Ruhrgebiet',icon:'🏭',surface:'asphalt',
   sky:['#1a1a2e','#2a2a42'],ground:'#333333',road:'#404040',edge:'#555555',
   line:'rgba(255,165,0,.75)',curb1:'#ff6600',curb2:'#ffcc00',
   part:'#ffaa33',acc:'rgba(200,100,0,.07)',
   circuit:`<path d="M6,8 L42,8 L42,24 L28,24 L28,32 L20,32 L20,24 L6,24 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
   tracks:_bt('industrial'),unlocked:false},

  // 6 — MOUNTAIN
  {id:'mountain',name:'Alpenpass',icon:'⛰️',surface:'gravel',
   sky:['#7a9abf','#b0c8e0'],ground:'#6a6a5a',road:'#4a4a4a',edge:'#707060',
   line:'rgba(255,255,200,.75)',curb1:'#cc8800',curb2:'#f5f5f5',
   part:'#ccaa44',acc:'rgba(120,100,20,.07)',
   circuit:`<path d="M24,6 C32,8 40,14 40,22 C40,28 34,30 26,29 C18,28 8,24 8,18 C8,10 16,4 24,6" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('mountain'),unlocked:false},

  // 7 — SNOW
  {id:'snow',name:'Swedish Rally',icon:'❄️',surface:'snow',
   sky:['#c0d8f0','#e8f4ff'],ground:'#e8f0f8',road:'#d0e0f0',edge:'#a0b8d0',
   line:'rgba(0,60,150,.5)',curb1:'#0044aa',curb2:'#ffffff',
   part:'rgba(220,240,255,.7)',acc:'rgba(180,200,240,.05)',
   circuit:`<ellipse cx="24" cy="16" rx="16" ry="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4,2"/>`,
   tracks:_bt('snow'),unlocked:false},

  // 8 — HARBOR
  {id:'harbor',name:'Isle of Man TT',icon:'⚓',surface:'asphalt',
   sky:['#4080b0','#6aa0c8'],ground:'#404048',road:'#2a2a30',edge:'#4a5060',
   line:'rgba(255,165,0,.75)',curb1:'#ff8800',curb2:'#ffffff',
   part:'#aaaacc',acc:'rgba(40,60,120,.07)',
   circuit:`<path d="M8,8 C16,4 30,6 38,12 C44,18 40,26 32,28 C24,30 12,28 8,22 C4,16 4,10 8,8" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('harbor'),unlocked:false},

  // 9 — DESERT
  {id:'desert',name:'Dakar',icon:'🏜️',surface:'sand',
   sky:['#f0a830','#f8d080'],ground:'#d4a86a',road:'#c8a060',edge:'#a08040',
   line:'rgba(255,248,200,.65)',curb1:'#c8880c',curb2:'#f5f0d0',
   part:'#ffbb55',acc:'rgba(255,175,50,.07)',
   circuit:`<path d="M4,16 C4,5 12,2 24,2 C36,2 44,5 44,16 C44,27 36,30 24,30 C12,30 4,27 4,16" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('desert'),unlocked:false},

  // 10 — SAVANNA
  {id:'savanna',name:'Kenya Safari',icon:'🦁',surface:'dirt',
   sky:['#e8b840','#f8d880'],ground:'#c8a060',road:'#a08040',edge:'#886030',
   line:'rgba(255,240,160,.65)',curb1:'#d4a017',curb2:'#f0d080',
   part:'#cc9933',acc:'rgba(160,120,20,.07)',
   circuit:`<path d="M8,8 C16,4 30,6 38,12 C44,18 40,26 32,28 C24,30 12,28 8,22 C4,16 4,10 8,8" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('savanna'),unlocked:false},

  // 11 — ARCTIC
  {id:'arctic',name:'Arctic Circle',icon:'🧊',surface:'ice',
   sky:['#1a3a6a','#3060a0'],ground:'#c8d8e8',road:'#a0c0e0',edge:'#80a8c8',
   line:'rgba(255,255,255,.6)',curb1:'#0044aa',curb2:'#aaccff',
   part:'rgba(180,220,255,.6)',acc:'rgba(100,160,220,.06)',
   circuit:`<path d="M6,16 C6,8 12,4 22,5 C30,6 42,10 42,20 C42,28 34,30 24,28 C14,26 6,24 6,16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
   tracks:_bt('arctic'),unlocked:false},

  // 12 — RACETRACK
  {id:'racetrack',name:'Nordschleife GP',icon:'🏁',surface:'asphalt',
   sky:['#5090d0','#80b8f0'],ground:'#3a6a3a',road:'#111111',edge:'#333333',
   line:'rgba(255,255,255,.9)',curb1:'#cc0000',curb2:'#ffffff',
   part:'#5599bb',acc:'rgba(30,60,80,.07)',
   circuit:`<path d="M6,20 C6,12 12,6 22,6 L28,7 C36,8 42,12 42,18 C42,24 36,28 28,27 L22,26 C14,29 6,26 6,20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
   tracks:_bt('racetrack'),unlocked:false},

  // 13 — CANYON
  {id:'canyon',name:'Pikes Peak',icon:'🪨',surface:'asphalt',
   sky:['#e87830','#f0a870'],ground:'#c06030',road:'#8a5030',edge:'#a06040',
   line:'rgba(255,220,180,.7)',curb1:'#c0392b',curb2:'#f5f0e0',
   part:'#cc8844',acc:'rgba(180,100,30,.07)',
   circuit:`<path d="M8,22 C8,12 16,6 24,6 C32,6 40,12 40,20 C40,28 32,32 24,30 C16,28 8,30 8,22" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('canyon'),unlocked:false},

  // 14 — NIGHT CITY
  {id:'night_city',name:'Monaco GP',icon:'🌃',surface:'asphalt',
   sky:['#05050f','#0a0a1a'],ground:'#222222',road:'#1a1a1a',edge:'#2a2a3a',
   line:'rgba(0,200,255,.7)',curb1:'#ff00aa',curb2:'#00ffff',
   part:'#44aaff',acc:'rgba(0,100,200,.08)',
   circuit:`<path d="M8,16 C8,8 16,6 24,6 C32,6 38,10 40,16 C42,22 38,26 32,27 C28,28 22,27 18,26 C14,25 10,22 8,19 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
   tracks:_bt('night_city'),unlocked:false},

  // 15 — RAINFOREST
  {id:'rainforest',name:'Panaméricaine',icon:'🌴',surface:'mud',
   sky:['#2a6a2a','#4a8a4a'],ground:'#1a3a1a',road:'#3a2a1a',edge:'#4a3a2a',
   line:'rgba(180,255,180,.6)',curb1:'#22aa22',curb2:'#ccffcc',
   part:'rgba(80,180,80,.7)',acc:'rgba(30,120,30,.08)',
   circuit:`<path d="M6,20 C6,10 14,5 22,6 C30,7 40,12 40,20 C40,28 32,30 22,28 C12,26 6,28 6,20" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('rainforest'),unlocked:false},

  // 16 — RUINS
  {id:'ruins',name:'Targa Antica',icon:'🏛️',surface:'gravel',
   sky:['#8a7060','#b0a090'],ground:'#9a8070',road:'#706050',edge:'#888070',
   line:'rgba(255,230,180,.65)',curb1:'#8a6040',curb2:'#f0e8d8',
   part:'#ccaa88',acc:'rgba(140,100,50,.07)',
   circuit:`<path d="M6,20 C6,12 14,5 24,6 C34,7 42,12 42,20 C42,28 34,30 24,28 C14,26 6,26 6,20" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('ruins'),unlocked:false},

  // 17 — SALT FLATS
  {id:'salt_flats',name:'Bonneville',icon:'🧂',surface:'saltflat',
   sky:['#e0f0ff','#f8fbff'],ground:'#f8f8f8',road:'#f0f0f0',edge:'#d0d0d0',
   line:'rgba(0,0,0,.4)',curb1:'#333333',curb2:'#ffffff',
   part:'rgba(230,240,250,.6)',acc:'rgba(200,210,220,.04)',
   circuit:`<ellipse cx="24" cy="16" rx="18" ry="10" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('salt_flats'),unlocked:false},

  // 18 — WETLANDS
  {id:'wetlands',name:'Everglades',icon:'🐊',surface:'mud',
   sky:['#6a8a6a','#90a880'],ground:'#3a5a3a',road:'#4a5a3a',edge:'#5a6a4a',
   line:'rgba(200,230,180,.6)',curb1:'#4a8820',curb2:'#cceeaa',
   part:'rgba(100,160,80,.65)',acc:'rgba(60,100,40,.07)',
   circuit:`<path d="M6,16 C8,6 18,4 26,8 C34,12 42,18 40,24 C38,30 28,32 18,28 C8,24 4,24 6,16" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('wetlands'),unlocked:false},

  // 19 — UNDERGROUND
  {id:'underground',name:'Tunnel Run',icon:'🚇',surface:'asphalt',
   sky:['#000000','#050510'],ground:'#0a0a0a',road:'#1a1a1a',edge:'#222222',
   line:'rgba(255,200,0,.8)',curb1:'#ffaa00',curb2:'#ff4400',
   part:'#ff8800',acc:'rgba(200,100,0,.08)',
   circuit:`<path d="M44,16 C44,8 36,6 24,6 C12,6 4,8 4,16 C4,24 12,26 24,26 C36,26 44,24 44,16" fill="none" stroke="currentColor" stroke-width="2"/>`,
   tracks:_bt('underground'),unlocked:false},

  // 20 — VOLCANO
  {id:'volcano',name:'Tenerife',icon:'🌋',surface:'dirt',
   sky:['#2a1a0a','#4a2a10'],ground:'#3a2a1a',road:'#1a1a1a',edge:'#3a1a00',
   line:'rgba(255,100,0,.7)',curb1:'#ff4400',curb2:'#ff8800',
   part:'#ff6600',acc:'rgba(200,60,0,.09)',
   circuit:`<path d="M24,4 C32,8 40,16 38,24 C36,30 28,32 24,32 C20,32 12,30 10,24 C8,16 16,8 24,4" fill="none" stroke="currentColor" stroke-width="2.5"/>`,
   tracks:_bt('volcano'),unlocked:false},
];

// ════════════════════════════════════════════════
// SURFACE PHYSICS
// ════════════════════════════════════════════════
const SURFACES={
  asphalt: {gripK:1.00,driftK:0.80,driftThresh:0.18,partCol:'rgba(30,30,30,.55)',name:'Asphalt'},
  gravel:  {gripK:0.62,driftK:1.45,driftThresh:0.11,partCol:'rgba(140,110,70,.65)',name:'Schotter'},
  sand:    {gripK:0.48,driftK:1.65,driftThresh:0.09,partCol:'rgba(200,165,80,.60)',name:'Sand'},
  mud:     {gripK:0.38,driftK:1.75,driftThresh:0.08,partCol:'rgba(90,55,20,.70)',name:'Matsch'},
  snow:    {gripK:0.52,driftK:1.55,driftThresh:0.10,partCol:'rgba(220,240,255,.55)',name:'Schnee'},
  ice:     {gripK:0.22,driftK:2.10,driftThresh:0.06,partCol:'rgba(180,220,240,.45)',name:'Eis'},
  saltflat:{gripK:0.92,driftK:0.72,driftThresh:0.22,partCol:'rgba(240,240,220,.40)',name:'Salz'},
  dirt:    {gripK:0.58,driftK:1.35,driftThresh:0.12,partCol:'rgba(160,120,60,.60)',name:'Piste'},
};

// Biome-ID → Surface-Typ Mapping
const BIOME_SURFACE={
  arctic:     'ice',
  canyon:     'asphalt',
  city:       'asphalt',
  coastal:    'asphalt',
  countryside:'gravel',
  desert:     'sand',
  forest:     'asphalt',
  harbor:     'asphalt',
  industrial: 'asphalt',
  mountain:   'gravel',
  night_city: 'asphalt',
  racetrack:  'asphalt',
  rainforest: 'mud',
  ruins:      'gravel',
  salt_flats: 'saltflat',
  savanna:    'dirt',
  snow:       'snow',
  underground:'asphalt',
  volcano:    'dirt',
  wetlands:   'mud',
};

console.log('[NE/data] worlds.js loaded: '+WORLDS.length+' worlds, '+Object.keys(SURFACES).length+' surfaces');
