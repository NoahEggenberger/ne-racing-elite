// ════════════════════════════════════════════════
// NE Racing Elite — ES Module Entry Point
// ════════════════════════════════════════════════
// Diese Datei wird via <script type="module" src="src/main.js"></script>
// in index.html geladen, ZUSÄTZLICH zum bisherigen inline-Code.
//
// Während des Refactors:
// - Bestehender Code in index.html bleibt funktional
// - Module werden Stück für Stück hier eingehängt
// - Nach jeder Phase ist das Spiel weiterhin spielbar
//
// Geplante Modul-Struktur:
//   src/data/    — CARS, WORLDS, TUNING, ACHIEVEMENTS
//   src/utils/   — helpers, storage, format
//   src/game/    — physics, input, audio, track-gen
//   src/render/  — car-2d, car-3d, hud, minimap, sprite-cache
//   src/ui/      — menu, garage, shop, mp, settings
//   src/main.js  — Entry + Boot-Wiring
//
// ════════════════════════════════════════════════

console.log('[NE] ES Module system loaded — refactor in progress.');

// Phase A: Module-System läuft, aber alle Funktionen noch in index.html.
// Phase B: data/ wird befüllt, dann hier importiert und global verfügbar gemacht.

// Beispiel-Boot-Hook: hier später Init-Code für extrahierte Module.
window.addEventListener('DOMContentLoaded',()=>{
  console.log('[NE] DOM ready. Module-system standby.');
});
