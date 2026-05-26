// ════════════════════════════════════════════════
// NE Racing Elite — 3D CAR RENDERER  (A.5)
// ════════════════════════════════════════════════
// Rendert GLB-Automodelle via Three.js:
//   • Im Rennen: Offscreen-WebGL → ctx.drawImage() auf 2D-Canvas
//   • In Garage/Shop: Showcase-Render direkt in <canvas id="garageCanvas">
//
// Abhängigkeit: window.THREE + window.THREE.GLTFLoader müssen geladen sein
// (werden von loadThreeJS() im Inline-Code asynchron nachgeladen).
//
// Globales Objekt: CarRenderer3D
//   .init()                               – Offscreen-Renderer einrichten
//   .preload(car)                         – GLB laden + cachen
//   .draw(ctx2d, car, cx, cy, angle, sc)  – Auto auf 2D-Game-Canvas zeichnen
//   .isReady(carId)                       – true = Modell im Cache
//   .isLoading(carId)                     – true = Ladevorgang läuft
// ════════════════════════════════════════════════

const CarRenderer3D = (function () {
  'use strict';

  // ─── Konstanten ───────────────────────────────────────────────────────────
  const OFFSCREEN_SIZE = 256;   // WebGL Offscreen-Canvas px
  const TARGET_HEIGHT  = 2.0;   // Normierungsgröße im 3D-Raum (Meter)

  // ─── State ────────────────────────────────────────────────────────────────
  let _ready    = false;
  let _renderer = null;
  let _scene    = null;
  let _cam      = null;

  const _cache   = {};           // carId → THREE.Object3D (master, skaliert)
  const _loading = new Set();    // carIds die gerade geladen werden
  const _failed  = new Set();    // carIds deren Laden fehlgeschlagen ist (kein Retry)

  // ─── Interne Helfer ───────────────────────────────────────────────────────

  function _T() { return window.THREE; }

  function _setupLights(THREE, scene) {
    // Neutral ambient
    scene.add(new THREE.AmbientLight(0xffffff, 0.60));
    // Haupt-Licht (von oben links vorne)
    const key = new THREE.DirectionalLight(0xfff8e8, 1.50);
    key.position.set(3, 8, 5);
    scene.add(key);
    // Fill-Licht (von rechts)
    const fill = new THREE.DirectionalLight(0x8899ff, 0.45);
    fill.position.set(-5, 4, -2);
    scene.add(fill);
    // Rim-Licht hinten (Kanten-Highlight)
    const rim = new THREE.DirectionalLight(0xffd060, 0.65);
    rim.position.set(0, 3, -7);
    scene.add(rim);
  }

  // Skaliert + zentriert ein frisch geladenes Modell im 3D-Raum.
  function _normalizeModel(model, THREE, car) {
    const box  = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxD = Math.max(size.x, size.y, size.z);
    if (maxD < 0.0001) return;

    const sc = (TARGET_HEIGHT / maxD) * (car.scale || 1.0);
    model.scale.setScalar(sc);

    // Neuberechnen nach Skalierung
    const box2   = new THREE.Box3().setFromObject(model);
    const center = box2.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.z -= center.z;
    model.position.y -= box2.min.y;   // Modell auf Y=0 setzen (Boden)

    // Rotationskorrektur aus cars.js (falls Modell falsch ausgerichtet)
    model.rotation.y = car.rotationOffset || 0;
  }

  // Einmalige Szeneninitialisierung
  function _initScene() {
    if (_ready) return true;
    const THREE = _T();
    if (!THREE || !THREE.GLTFLoader) return false;

    _renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,   // erforderlich für ctx.drawImage()
    });
    _renderer.setSize(OFFSCREEN_SIZE, OFFSCREEN_SIZE);
    _renderer.setPixelRatio(1);
    _renderer.setClearColor(0x000000, 0);
    _renderer.toneMapping          = THREE.ACESFilmicToneMapping;
    _renderer.toneMappingExposure  = 1.15;

    _scene = new THREE.Scene();
    _cam   = new THREE.PerspectiveCamera(40, 1.0, 0.1, 50);
    _cam.position.set(0, 2.6, 4.2);
    _cam.lookAt(0, 0.6, 0);

    _setupLights(THREE, _scene);

    _ready = true;
    console.log('[CarRenderer3D] Initialized (offscreen ' + OFFSCREEN_SIZE + 'px)');
    return true;
  }

  // Entfernt alle Auto-Nodes aus der Szene (Lichter bleiben)
  function _clearCars() {
    if (!_scene) return;
    const toRemove = [];
    _scene.traverse(o => { if (o.userData && o.userData._isCar) toRemove.push(o); });
    toRemove.forEach(o => _scene.remove(o));
  }

  // Rendert das geladene Modell carId mit gegebener Weltausrichtung
  // in den Offscreen-Canvas und gibt ihn zurück.
  function _renderOffscreen(carId, worldAngle) {
    if (!_ready || !_cache[carId]) return null;
    const THREE = _T();

    _clearCars();
    const clone = _cache[carId].clone(true);
    clone.userData._isCar = true;

    // Weltwinkel (2D, Bogenmaß) → Y-Rotation im 3D-Raum
    // Im Spiel: angle=0 → Fahrzeug fährt nach rechts (+X).
    // In Three.js: rotation.y=0 → Model zeigt nach -Z.
    // Daher: rotation.y = -worldAngle + π/2 + (rotationOffset schon in Master)
    clone.rotation.y = -worldAngle + Math.PI * 0.5;

    _scene.add(clone);
    _renderer.render(_scene, _cam);
    return _renderer.domElement;
  }

  // ─── Öffentliche API ──────────────────────────────────────────────────────

  /** Renderer initialisieren. Wird automatisch beim ersten preload/draw gerufen. */
  function init() {
    return _initScene();
  }

  /**
   * GLB-Modell für car asynchron laden und cachen.
   * Sicher mehrfach aufrufbar (ignoriert doppelte Aufrufe).
   */
  function preload(car) {
    if (!car || !car.modelPath) return;
    if (_cache[car.id] || _loading.has(car.id) || _failed.has(car.id)) return;

    // file:// Warnung: Chrome blockiert XHR zu lokalen Dateien.
    // Lösung: Lokalen HTTP-Server starten (VS Code Live Server / python -m http.server).
    if (typeof location !== 'undefined' && location.protocol === 'file:') {
      if (!_failed.has('__file_protocol_warned__')) {
        _failed.add('__file_protocol_warned__');
        console.error(
          '[CarRenderer3D] ❌ GLB-Laden nicht möglich: Seite über file:// geöffnet.\n' +
          'Chrome blockiert lokale Dateianfragen. Lösung:\n' +
          '  → VS Code: "Live Server" Extension → "Go Live" klicken\n' +
          '  → Python: python -m http.server 8000  (dann http://localhost:8000 öffnen)\n' +
          '  → Node.js: npx serve .  (dann http://localhost:3000 öffnen)'
        );
      }
      _failed.add(car.id);
      return;
    }

    const THREE = _T();
    if (!THREE || !THREE.GLTFLoader) return;  // noch nicht bereit → still ignorieren
    if (!_ready) _initScene();

    _loading.add(car.id);
    const loader = new THREE.GLTFLoader();
    loader.load(
      car.modelPath,
      (gltf) => {
        const model = gltf.scene;
        _normalizeModel(model, THREE, car);
        model.traverse(o => { if (o.isMesh) o.castShadow = false; });
        _cache[car.id] = model;
        _loading.delete(car.id);
        console.log('[CarRenderer3D] Loaded:', car.id);
      },
      null,  // onProgress (ungenutzt)
      (err) => {
        console.warn('[CarRenderer3D] Load failed:', car.id, err && err.message || err);
        _loading.delete(car.id);
        _failed.add(car.id);   // kein endloser Retry bei echten Fehlern
      }
    );
  }

  /** true wenn Modell im Cache bereit ist */
  function isReady(carId) { return !!_cache[carId]; }

  /** true wenn Modell gerade geladen wird */
  function isLoading(carId) { return _loading.has(carId); }

  /**
   * Zeichnet das Auto in einen 2D-Canvas-Kontext.
   * cx, cy: Weltkoordinaten (wie bei drawCar)
   * worldAngle: Fahrtrichtung in Radiant
   * scale: optionaler Multiplikator (default 1.0)
   *
   * Gibt true zurück wenn 3D-Render erfolgreich war.
   * Gibt false zurück wenn Modell noch lädt → Aufrufer soll auf drawCar() zurückfallen.
   */
  function draw(ctx2d, car, cx, cy, worldAngle, scale) {
    if (!_ready && !_initScene()) return false;
    if (!_cache[car.id]) {
      preload(car);
      return false;
    }

    const offscreen = _renderOffscreen(car.id, worldAngle);
    if (!offscreen) return false;

    // Zielgröße aus 2D-Sprite-Dimensionen ableiten (car.h in Spielpixeln)
    const sc = scale || 1.0;
    const drawH = car.h * sc * 1.15;
    const drawW = drawH * 0.85;

    ctx2d.save();
    ctx2d.translate(cx, cy);
    ctx2d.drawImage(offscreen, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx2d.restore();
    return true;
  }

  /**
   * Rendert das Auto auf einen externen <canvas> (für Shop-Thumbnails, Menü-Preview).
   * destCanvas: HTMLCanvasElement — wird vollständig überschrieben.
   * angle: Blickwinkel in Radiant (optional, default 0)
   * Gibt true zurück wenn erfolgreich.
   */
  function renderToCanvas(car, destCanvas, angle) {
    if (!_ready && !_initScene()) return false;
    if (!_cache[car.id]) { preload(car); return false; }

    const offscreen = _renderOffscreen(car.id, angle || 0);
    if (!offscreen) return false;

    const ctx = destCanvas.getContext('2d');
    if (!ctx) return false;
    ctx.clearRect(0, 0, destCanvas.width, destCanvas.height);

    // Letterbox: Offscreen ist quadratisch (256×256), Ziel kann beliebig sein.
    // Auto wird zentriert eingepasst ohne Verzerrung.
    const dw = destCanvas.width, dh = destCanvas.height;
    const aspect = offscreen.width / offscreen.height; // = 1 (quadratisch)
    let drawW, drawH;
    if (dw / dh >= aspect) {
      drawH = dh;
      drawW = dh * aspect;
    } else {
      drawW = dw;
      drawH = dw / aspect;
    }
    const ox = (dw - drawW) / 2;
    const oy = (dh - drawH) / 2;
    ctx.drawImage(offscreen, ox, oy, drawW, drawH);
    return true;
  }

  return { init, preload, draw, renderToCanvas, isReady, isLoading };

})();

console.log('[NE/render] car-renderer.js loaded');
