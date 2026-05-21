# NE Racing Elite — Source-Module

Während Phase A des Refactors angelegt. Module werden Stück für Stück befüllt.

## Modul-Struktur (geplant)

```
src/
├── main.js              Entry-Point (ES module)
├── data/
│   ├── cars.js          CARS-Array, CAR_DRIVETRAIN, CAR_SHAPES
│   ├── worlds.js        WORLDS, TRACK_PARAMS, BIOME_SURFACE
│   ├── tuning.js        TYRE_COMPOUNDS, BRAKE_OPTIONS, SUSPENSION/DIFF/GEARBOX_OPTIONS, BODYKIT_PARTS, UPGRADE_COSTS
│   └── achievements.js  ACHIEVEMENTS-Array, RACE_MODE_DEF
├── utils/
│   ├── helpers.js       showToast, hapTap/Success/Error, flashMoney, uiClick, normHex, fmtTime
│   └── storage.js       saveData, settings, load/save
├── game/
│   ├── state.js         G (game state), running, lastTS
│   ├── physics.js       update(), Slip-Angle, Drivetrain
│   ├── input.js         keyboard/mouse/touch
│   ├── audio.js         Engine, Tyre, Beeps
│   ├── track-gen.js     generateTrack, smoothTightCorners, catmullRomTrack
│   └── race-modes.js    getRaceTarget, calcStarsFromTarget, getLevelMode
├── render/
│   ├── car-2d.js        drawCar (Top-Down)
│   ├── car-3d.js        updateGarageCar, buildProceduralCarMesh, GLB loader
│   ├── sprite-cache.js  GLB → 2D Sprite (für car-2d.js)
│   ├── track-draw.js    drawTrack, drawWorldBoundary
│   ├── hud.js           HUD updates
│   ├── minimap.js       drawMinimap
│   └── gauges.js        drawGauge
└── ui/
    ├── menu.js          Hauptmenü
    ├── garage.js        Garage-Screen
    ├── shop.js          Shop-Screen
    ├── mp.js            Multiplayer
    ├── settings.js      Settings + Admin
    └── flow.js          Race intro, countdown, finish-screen
```

## Lokales Testen

ES Modules brauchen HTTP-Server (CORS verbietet file://):

```bash
# Python (vorinstalliert auf Win/Mac/Linux)
python -m http.server 8000
# → http://localhost:8000

# Node.js
npx serve

# VS Code Live Server Extension
```

ODER einfach via Vercel-URL testen: nach jedem `git push` ist 30s später live auf https://ne-racing-elite.vercel.app

## Asset-Konventionen

GLB-Modelle in `/assets/cars/<car-id>/<car-id>.glb`

Sub-Mesh-Namen für volle Pipeline-Unterstützung:
- `body` — Karosserie (für Lackfarbe-Tuning)
- `wheel_fl`, `wheel_fr`, `wheel_rl`, `wheel_rr` — Räder (für Lenkung + Rotation)
- `brakelight_l`, `brakelight_r` — Bremslichter (optional, für Emissive-Toggle)

Polycount-Empfehlung: 10k–50k Tris pro Auto.
