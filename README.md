# NE Racing Elite

Single-file HTML5 Canvas-2D Rennspiel — vanilla JavaScript, kein Framework.

## Live-Demo

https://noaheggenberger.ch

## Features

- 19 Welten (Nordschleife, Alpenpass, Schwarzwald, Erzberg, Dakar, Monaco, Pikes Peak, Targa Florio, Bonneville, etc.)
- 20 Levels pro Welt = 380 Strecken
- 80+ klassische Autos (BMW 2002 turbo, Porsche 911, Audi Quattro, Lancia Delta, etc.)
- Race Modes pro Level deterministisch: Klassisches Rennen, Zeitfahren, Drift Challenge, Sprint, Elimination
- Slip-Angle Drift-Physik mit antriebsabhängigem Verhalten (RWD / FWD / AWD)
- 4 Archetype-Streckenlayouts pro Biom
- Multiplayer via PeerJS (WebRTC P2P)
- Admin-Modus mit Passwort

## Projektstruktur

Aktuell: Single-File (`index.html`, ~290 KB).
Geplant: Aufteilung in Module (`src/cars.js`, `src/physics.js`, `src/render.js`, etc.).

## Deploy

Automatisches Deploy via Cloudflare Pages bei jedem Push zum `master`-Branch.

## Lokale Entwicklung

Doppelklick auf `index.html` öffnet das Spiel im Standardbrowser.

## Lizenz

Privat / All Rights Reserved.
