// ════════════════════════════════════════════════
// NE Racing Elite — RACE MODES + ACHIEVEMENTS
// ════════════════════════════════════════════════
// Rennmodi-Definitionen, Biom-Pattern (Modus pro Level deterministisch),
// und alle 18 Achievements (Erfolge).
// ACHIEVEMENTS-Check-Funktionen referenzieren WORLDS und saveData lazy —
// muss daher NACH cars.js, worlds.js geladen werden.
// ════════════════════════════════════════════════

const RACE_MODE_DEF={
  classic_race:  {icon:'🏁',name:'KLASSISCHES RENNEN',  desc:'3 Runden gegen KI-Gegner',     color:'#d4a017',laps:3},
  time_trial:    {icon:'⏱', name:'ZEITFAHREN',           desc:'Solo – beste Rundenzeit zählt', color:'#3498db',laps:3},
  drift_challenge:{icon:'💨',name:'DRIFT CHALLENGE',      desc:'Sammle in 2 Min. Driftpunkte',  color:'#e74c3c',laps:1},
  elimination:   {icon:'💀', name:'ELIMINATION',          desc:'Letzter fliegt alle 40 Sek.',   color:'#9b59b6',laps:3},
  sprint:        {icon:'⚡', name:'SPRINT',               desc:'1 Runde – voller Angriff',      color:'#2ecc71',laps:1},
};

// Biome-specific mode probability arrays (indices cycled)
const BIOME_MODE_PATTERN={
  city:    ['classic_race','classic_race','time_trial','classic_race','sprint','classic_race','classic_race','elimination'],
  alpine:  ['time_trial','classic_race','time_trial','sprint','classic_race','classic_race','drift_challenge','time_trial'],
  forest:  ['classic_race','classic_race','sprint','classic_race','drift_challenge','classic_race','time_trial','classic_race'],
  rally:   ['drift_challenge','classic_race','drift_challenge','sprint','classic_race','drift_challenge','elimination','classic_race'],
  desert:  ['classic_race','sprint','elimination','classic_race','drift_challenge','sprint','classic_race','elimination'],
};

// ════════════════════════════════════════════════
// ACHIEVEMENTS — 18 Ziele, persistent in saveData
// ════════════════════════════════════════════════
const ACHIEVEMENTS=[
  {id:'first_win',    icon:'🏆',name:'Erster Sieg',       desc:'Gewinne dein erstes Rennen.',            check:g=>g.pos===1},
  {id:'hat_trick',    icon:'🎩',name:'Hat-Trick',          desc:'3 Rennen hintereinander gewonnen.',       check:g=>g.winStreak>=3},
  {id:'drift_100',    icon:'🌀',name:'Drift Einsteiger',   desc:'50 m am Stück gedriftet.',               check:g=>g.maxDriftDist>=50},
  {id:'drift_king',   icon:'👑',name:'Drift King',         desc:'500 m am Stück gedriftet.',              check:g=>g.maxDriftDist>=500},
  {id:'nitro_rush',   icon:'⚡',name:'Nitro Rush',         desc:'Nitro 8× in einem Rennen gezündet.',    check:g=>g.nitroUses>=8},
  {id:'speedster',    icon:'🚀',name:'Speedster',          desc:'300 km/h Top-Speed erreicht.',            check:g=>g.topKmh>=300},
  {id:'hyperspeed',   icon:'🛸',name:'Hyperspeed',         desc:'380 km/h Top-Speed erreicht.',            check:g=>g.topKmh>=380},
  {id:'clean_lap',    icon:'✨',name:'Saubere Runde',      desc:'Rennen ohne Wand-Kontakt & ohne Drift.', check:g=>g.cleanLap},
  {id:'all_stars3',   icon:'⭐',name:'Perfektes Rennen',   desc:'3 Sterne in einem Level geholt.',        check:g=>g.stars===3},
  {id:'collector',    icon:'🔑',name:'Weltenbummler',      desc:'Alle 5 Biome freigeschaltet.',           check:()=>WORLDS.every(w=>saveData.unlocked[w.id])},
  {id:'millionaire',  icon:'💰',name:'Millionär',          desc:'1.000.000 € Gesamtverdienst.',           check:()=>(saveData.totalEarned||0)>=1e6},
  {id:'max_engine',   icon:'🔧',name:'Volltuning',         desc:'Motor auf Level 5 ausgebaut.',           check:()=>Object.values(saveData.upgrades||{}).some(u=>(u.engine||0)>=5)},
  {id:'night_rain',   icon:'🌧',name:'Regenmeister',       desc:'Rennen im Regen gewonnen.',               check:g=>g.weather==='rain'&&g.pos===1},
  {id:'underdog',     icon:'🐶',name:'Underdog',           desc:'Mit dem langsamsten Auto (BMW 2002) gewonnen.',check:g=>g.carId==='bmw2002t'&&g.pos===1},
  {id:'comeback',     icon:'🔄',name:'Comeback',           desc:'Von Platz 4 auf Platz 1 gewonnen.',      check:g=>g.worstPos>=4&&g.pos===1},
  {id:'century',      icon:'💯',name:'Century',            desc:'100 Rennen gespielt.',                   check:()=>(saveData.totalRaces||0)>=100},
  {id:'level_20',     icon:'🎯',name:'Elite',              desc:'Level 20 eines Bioms abgeschlossen.',    check:g=>g.levelIdx===19},
  {id:'all_biomes_win',icon:'🌍',name:'Weltmeister',       desc:'In allen 5 Biomen mindestens 1× gewonnen.',check:()=>(saveData.wonInWorld||[]).length>=5},
];

console.log('[NE/data] race-modes.js loaded: '+Object.keys(RACE_MODE_DEF).length+' modes, '+ACHIEVEMENTS.length+' achievements');
