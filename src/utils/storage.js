// ════════════════════════════════════════════════
// NE Racing Elite — STORAGE & SAVE DATA
// ════════════════════════════════════════════════
// localStorage-Persistenz, Save-Validierung, Settings.
// Wird via <script src="src/utils/storage.js"></script> NACH den Daten-Modulen
// geladen (braucht CARS aus cars.js fuer Shop-Init-Validierung).
//
// Globale Konstanten/Variablen:
//   MAX_UPG     (const)  - Max Upgrade-Level pro Kategorie
//   saveData    (let)    - Spielstand (mutable, wird ueberall modifiziert)
//   settings    (let)    - Audio/Steering/Sprache Settings
//   STAR_PRIZE  (const)  - €-Praemien pro Stern-Aufstieg
//   save()      (fn)     - Persistiert saveData → localStorage
//   getStars()  (fn)     - Gibt Sterne fuer (worldId, levelIdx)
//   setStars()  (fn)     - Setzt Sterne (max alt/neu) + persistiert
// ════════════════════════════════════════════════

// ════════════════════════════════════════════════
// SAVE DATA — Validierte Persistenz
// ════════════════════════════════════════════════
// Korrupte oder inkompatible Saves aus alten Versionen können Physics-Explosionen
// verursachen: NaN/Infinity-Stats → p.speed=NaN → alles bricht. Daher strenge Validierung.
const MAX_UPG=5;
let saveData;
try{
  const raw=JSON.parse(localStorage.getItem('ne_save')||'null');
  saveData=(raw&&typeof raw==='object')?raw:{};
}catch(e){
  console.warn('[NE] Korrupte Save-Daten erkannt, werden zurückgesetzt. Fehler:',e.message);
  saveData={};
}
// Fehlende Felder auffüllen
if(!saveData.stars||typeof saveData.stars!=='object')saveData.stars={};
if(!saveData.unlocked||typeof saveData.unlocked!=='object')saveData.unlocked={city:true};
else if(!saveData.unlocked.city)saveData.unlocked.city=true;
if(!isFinite(saveData.money)||saveData.money<0)saveData.money=0;
saveData.money=Math.floor(saveData.money);
if(!saveData.upgrades||typeof saveData.upgrades!=='object')saveData.upgrades={};
// New fields: owned/visible cars in shop, selected car, tuning
if(!saveData.ownedCars||!Array.isArray(saveData.ownedCars))saveData.ownedCars=['bmw2002t'];
if(!saveData.shopCars||!Array.isArray(saveData.shopCars))saveData.shopCars=CARS.filter(c=>!c.unlockBiome).map(c=>c.id);
// Ensure bmw2002t always in shop + owned
if(!saveData.shopCars.includes('bmw2002t'))saveData.shopCars.unshift('bmw2002t');
if(!saveData.ownedCars.includes('bmw2002t'))saveData.ownedCars.unshift('bmw2002t');
if(!saveData.selCar||!CARS.find(c=>c.id===saveData.selCar))saveData.selCar='bmw2002t';
if(!saveData.tuning||typeof saveData.tuning!=='object')saveData.tuning={};
if(!saveData.achievements||!Array.isArray(saveData.achievements))saveData.achievements=[];

// Upgrade-Level validieren: Jeder Wert muss 0–5 integer sein.
// Werte außerhalb dieses Bereichs (NaN, Infinity, zu groß, negativ)
// führen zu Math.pow()-Explosionen in getCarStats → Physics-Crash.
for(const carId of Object.keys(saveData.upgrades)){
  const u=saveData.upgrades[carId];
  if(!u||typeof u!=='object'){saveData.upgrades[carId]={engine:0,grip:0,nitro:0};continue;}
  for(const k of['engine','grip','nitro']){
    const v=Number(u[k]);
    if(!isFinite(v)||v<0||v>MAX_UPG||v!==Math.floor(v)){
      const clamped=isFinite(v)?Math.max(0,Math.min(Math.floor(v),MAX_UPG)):0;
      console.warn(`[NE] Ungültiger Upgrade-Wert ${carId}.${k}=${u[k]} → korrigiert zu ${clamped}`);
      u[k]=clamped;
    }
  }
}

// Persistiert saveData (kein-op im Admin-Modus, weil der Spielstand
// dann temporaer auf "alles freigeschaltet" steht).
// HINWEIS: adminMode wird im inline-Code definiert, ist zum Zeitpunkt
// des ersten save()-Aufrufs verfuegbar.
function save(){
  if(typeof adminMode!=='undefined'&&adminMode)return;
  localStorage.setItem('ne_save',JSON.stringify(saveData));
}

function getStars(wid,lvl){return (saveData.stars[wid+'_'+lvl])||0;}
function setStars(wid,lvl,s){saveData.stars[wid+'_'+lvl]=Math.max(getStars(wid,lvl),s);save();}

// Stern-Bonus-Praemien
const STAR_PRIZE=[0,200,400,700];

// ════════════════════════════════════════════════
// GAME SETTINGS
// ════════════════════════════════════════════════
let settings={steerSens:3,vol:70,ctrl:'wheel'};

console.log('[NE/utils] storage.js loaded: saveData with '+(saveData.ownedCars?.length||0)+' owned cars, '+saveData.money+' EUR');
