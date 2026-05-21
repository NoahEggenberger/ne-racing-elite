// ════════════════════════════════════════════════
// NE Racing Elite — UI HELPERS
// ════════════════════════════════════════════════
// Toast-Notifications, Vibration-Feedback, Money-Flash, Click-Sound,
// Hex-Farben-Normalisierung, Zeit-Formatter.
// Wird via <script src="src/utils/helpers.js"></script> NACH storage.js geladen
// (flashMoney braucht saveData).
//
// Globale Funktionen:
//   showToast(msg, kind)  - Animations-Toast oben am Bildschirm
//   hapTap/Success/Error  - navigator.vibrate Patterns (Mobile)
//   flashMoney()          - Pulse-Animation auf Geld-Anzeige (Garage/Shop)
//   uiClick()             - Kurzer UI-Beep via AudioContext
//   normHex(c)            - Short-Hex (#fff) → Long-Hex (#ffffff)
//   fmtTime(s)            - 95.5s → "1:35.50"
//   fmtTimeShort(s)       - 95.5s → "1:35"
// ════════════════════════════════════════════════

// ── Hex-Normalisierung: Short-Hex (#fff) → Long-Hex (#ffffff) ──
// Sonst crasht addColorStop bei `bodyCol+'cc'` weil #fff+cc=#fffcc (5 Zeichen, ungültig).
// 4-Zeichen-Hex (#fff8) wird zu #ffffff88 (mit Alpha).
function normHex(c){
  if(typeof c!=='string'||c[0]!=='#')return c||'#888';
  const h=c.slice(1);
  if(h.length===3) return '#'+h[0]+h[0]+h[1]+h[1]+h[2]+h[2];                       // #fff → #ffffff
  if(h.length===4) return '#'+h[0]+h[0]+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];             // #fff8 → #ffffff88
  return c; // 6 oder 8 chars: bereits gültig
}

// ── Zeit-Formatter ──
// 95.5s → "1:35.50" (mit Hundertsteln)
function fmtTime(sec){
  if(!isFinite(sec)||sec<0)return '–';
  const m=Math.floor(sec/60), s=Math.floor(sec%60), ms=Math.floor((sec%1)*100);
  return `${m}:${s.toString().padStart(2,'0')}.${ms.toString().padStart(2,'0')}`;
}
// 95.5s → "1:35" (ohne Hundertstel)
function fmtTimeShort(sec){
  if(!isFinite(sec)||sec<0)return '–';
  const m=Math.floor(sec/60), s=Math.floor(sec%60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

// ── Toast Notification ──
// kind: 'success' | 'error' | '#hexcolor' (legacy) | undefined → default
// Auto-Dismiss nach 2.6s mit Fade-out-Animation.
function showToast(msg,kind){
  const wrap=document.getElementById('toastWrap');if(!wrap)return;
  const el=document.createElement('div');
  let cls='toast';
  if(kind==='success'||kind==='#2ecc71'||kind==='#27ae60')cls+=' success';
  else if(kind==='error'||kind==='#e74c3c'||kind==='#c0392b')cls+=' error';
  el.className=cls;
  el.textContent=msg;
  wrap.appendChild(el);
  setTimeout(()=>{
    el.style.transition='opacity .35s,transform .35s';
    el.style.opacity='0';el.style.transform='translateY(-10px)';
    setTimeout(()=>el.remove(),400);
  },2600);
}

// ── Haptik (Mobile Vibration) ──
// Silent fail wenn nicht unterstuetzt (Desktop, iOS Safari)
function hapTap(){    try{if(navigator.vibrate)navigator.vibrate(8);}catch(e){} }
function hapSuccess(){try{if(navigator.vibrate)navigator.vibrate([15,30,15]);}catch(e){} }
function hapError(){  try{if(navigator.vibrate)navigator.vibrate([40,20,40]);}catch(e){} }

// ── Geld-Anzeige flash-animieren ──
// Visuelles Feedback bei jedem Kauf/Verkauf. Aktualisiert alle 4
// existenten Geld-Anzeigen (inline + floating, in Garage + Shop).
function flashMoney(){
  const fmt=saveData.money.toLocaleString('de');
  // Alte Inline-Anzeigen (im Sidebar/Header)
  ['garageBalance','shopBalance'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    el.classList.remove('money-flash');void el.offsetWidth;
    el.classList.add('money-flash');
    el.textContent='💰 '+fmt+' €';
  });
  // Neue Floating-Anzeigen (immer sichtbar oben rechts)
  ['garageBalanceFloat','shopBalanceFloat'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    el.textContent=fmt+' €';
    const parent=el.parentElement;
    if(parent){parent.classList.remove('money-flash');void parent.offsetWidth;parent.classList.add('money-flash');}
  });
}

// ── Click-Sound (kurzer UI-Beep) ──
// Wird bei Buttons gerufen. Verwendet AudioContext (Web Audio API).
// Eigener Context, separat vom Engine-Sound damit kein Konflikt.
function uiClick(){
  try{
    const ctx=(window._uiAudio||(window._uiAudio=new (window.AudioContext||window.webkitAudioContext)()));
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.type='sine';o.frequency.value=820;
    g.gain.setValueAtTime(0.06,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.08);
    o.connect(g);g.connect(ctx.destination);
    o.start();o.stop(ctx.currentTime+0.08);
  }catch(e){}
}

console.log('[NE/utils] helpers.js loaded (Toast, Haptik, flashMoney, uiClick, normHex, fmtTime)');
