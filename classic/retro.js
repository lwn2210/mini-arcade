/* Retro Vault — shared EmulatorJS player bootstrap (PS1/PSP pages).
 * BYO-ROM/BYO-BIOS: files are read locally with FileReader and handed to
 * EmulatorJS as blob: URLs. Nothing is uploaded anywhere.
 * CDN note: the EmulatorJS loader + cores are fetched from
 * https://cdn.emulatorjs.org — these pages need internet on first load.
 */
(function () {
  'use strict';
  var CFG = window.RETRO_CONFIG || {}; // { core, exts, needsBios, platform }
  var core = CFG.core, needsBios = !!CFG.needsBios, platform = CFG.platform || 'EMU';

  var statusEl = document.getElementById('status');
  var romInput = document.getElementById('romInput');
  var biosInput = document.getElementById('biosInput');
  var romNameEl = document.getElementById('romName');
  var biosNameEl = document.getElementById('biosName');
  var btnFull = document.getElementById('btnFull');
  var btnStart = document.getElementById('btnStart');
  var stage = document.getElementById('stage');
  var booted = false, romBlobUrl = null, biosBlobUrl = null;

  function setStatus(msg, err) {
    statusEl.textContent = msg;
    statusEl.className = err ? 'status err' : 'status';
  }

  function pick(file, accept, cb) {
    if (!file) return;
    var ok = accept.some(function (ext) {
      return file.name.toLowerCase().endsWith(ext);
    });
    if (!ok) {
      setStatus('UNSUPPORTED FILE TYPE: ' + file.name + ' (expected ' + accept.join(', ') + ')', true);
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      cb(URL.createObjectURL(new Blob([reader.result], { type: 'application/octet-stream' })), file.name);
    };
    reader.onerror = function () { setStatus('COULD NOT READ FILE: ' + file.name, true); };
    reader.readAsArrayBuffer(file);
  }

  romInput.addEventListener('change', function () {
    var f = romInput.files && romInput.files[0];
    pick(f, CFG.exts, function (url, name) {
      if (romBlobUrl) URL.revokeObjectURL(romBlobUrl);
      romBlobUrl = url;
      romNameEl.textContent = '✔ ' + name;
      setStatus('ROM READY: ' + name + (needsBios ? (biosBlobUrl ? ' · BIOS READY' : ' · NOW PICK BIOS') : ' · PRESS START'));
    });
    romInput.value = '';
  });
  if (biosInput) biosInput.addEventListener('change', function () {
    var f = biosInput.files && biosInput.files[0];
    pick(f, ['.bin', '.rom'], function (url, name) {
      if (biosBlobUrl) URL.revokeObjectURL(biosBlobUrl);
      biosBlobUrl = url;
      biosNameEl.textContent = '✔ ' + name;
      setStatus('BIOS READY: ' + name + ' · NOW LOAD YOUR GAME');
    });
    biosInput.value = '';
  });

  function loadEmulatorJS() {
    if (window.EJS_emulator) return Promise.resolve();
    if (window.EJS_loaderPromise) return window.EJS_loaderPromise;
    window.EJS_loaderPromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
      s.onload = resolve;
      s.onerror = function () { reject(new Error('EmulatorJS loader CDN did not load')); };
      document.head.appendChild(s);
    });
    return window.EJS_loaderPromise;
  }

  function boot() {
    if (booted) return;
    if (!romBlobUrl) { setStatus('LOAD A GAME FILE FIRST', true); return; }
    if (needsBios && !biosBlobUrl) { setStatus('THIS PLATFORM NEEDS A BIOS FILE — LOAD IT FIRST (USER-PROVIDED, NEVER BUNDLED)', true); return; }
    setStatus('BOOTING ' + platform + ' CORE FROM CDN… (first boot downloads core files)');
    window.EJS_player = '#game';
    window.EJS_core = core;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    window.EJS_gameUrl = romBlobUrl;
    if (biosBlobUrl) window.EJS_biosUrl = biosBlobUrl;
    window.EJS_startOnLoaded = true;
    window.EJS_gameName = (romNameEl.textContent || 'game').replace(/^✔\s*/, '');
    window.EJS_Buttons = {
      playPause: null, restart: null, mute: null,
      settingsMenu: null, fullscreen: null, saveState: null, loadState: null,
      screenRecord: null, gamepad: null, cheat: null, volume: null,
      saveSavFiles: null, loadSavFiles: null, quickSave: null, quickLoad: null,
      screenshot: null, cacheManager: null, exitEmulation: null
    };
    booted = true;
    loadEmulatorJS().catch(function (e) {
      booted = false;
      setStatus('EMULATOR FAILED TO START: ' + e.message, true);
    });
  }
  btnStart.addEventListener('click', boot);

  // ---- data-driven catalog (manifest JSON) for pages with vendored games ----
  var catalogEl = document.getElementById('catalog');
  var emptyEl = document.getElementById('emptyCatalog');
  function bootUrl(url, name, biosUrl) {
    if (booted) { setStatus('A GAME IS ALREADY RUNNING — RELOAD THE PAGE TO SWITCH CARTS', true); return; }
    setStatus('DOWNLOADING ' + name + '…');
    fetch(new URL(url, window.location.href).href).then(function (r) {
      if (!r.ok) throw new Error('GAME HTTP ' + r.status);
      return r.blob();
    }).then(function (blob) {
      if (romBlobUrl) URL.revokeObjectURL(romBlobUrl);
      romBlobUrl = URL.createObjectURL(blob);
      romNameEl.textContent = '✔ ' + name;
      if (!biosUrl) { setStatus('ROM READY: ' + name + ' · BOOTING…'); boot(); return; }
      setStatus('LOADING ' + name + ' · PREPARING BIOS…');
      return fetch(new URL(biosUrl, window.location.href)).then(function (r) {
        if (!r.ok) throw new Error('BIOS HTTP ' + r.status);
        return r.blob();
      }).then(function (biosBlob) {
        if (biosBlobUrl) URL.revokeObjectURL(biosBlobUrl);
        biosBlobUrl = URL.createObjectURL(biosBlob);
        biosNameEl.textContent = '✔ bundled OpenBIOS';
        setStatus('ROM + BIOS READY · BOOTING ' + name + '…');
        boot();
      });
    }).catch(function (e) {
      setStatus('COULD NOT PREPARE GAME: ' + (e && e.message ? e.message : e), true);
    });
  }
  if (catalogEl && CFG.manifest) {
    fetch(CFG.manifest)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (mf) {
        var games = mf.games || [];
        if (!games.length) return; // keep empty-state visible
        if (emptyEl) emptyEl.style.display = 'none';
        games.forEach(function (g) {
          var a = document.createElement('a');
          a.className = 'card ' + (g.color || 'cyan');
          var icon = document.createElement('span');
          icon.className = 'icon';
          icon.textContent = g.icon || '🎮';
          var h2 = document.createElement('h2');
          h2.textContent = g.title;
          var p = document.createElement('p');
          p.textContent = g.desc || '';
          var hs = document.createElement('div');
          hs.className = 'hs';
          hs.textContent = g.meta || ('▶ PLAY · ' + (g.license || ''));
          a.appendChild(icon); a.appendChild(h2); a.appendChild(p); a.appendChild(hs);
          a.addEventListener('click', function (ev) {
            ev.preventDefault();
            if (g.title === 'Wipefaux') {
              document.getElementById('officialPlayer').scrollIntoView({ behavior: 'smooth', block: 'start' });
              return;
            }
            bootUrl(g.romUrl, g.fileName || g.title, g.biosUrl);
          });
          catalogEl.appendChild(a);
        });
      })
      .catch(function (e) {
        setStatus('COULD NOT LOAD CATALOG: ' + (e && e.message ? e.message : e), true);
      });
  }

  // Fullscreen API on our stage (canvas + EmulatorJS UI live inside #game)
  function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement) || stage.classList.contains('fs-fallback');
  }
  function updateFsBtn() {
    btnFull.textContent = isFullscreen() ? '✕ EXIT FULLSCREEN' : '⛶ FULLSCREEN';
  }
  function enterFullscreen() {
    var fn = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (fn) {
      var p = fn.call(stage);
      if (p && p.catch) p.catch(function () { stage.classList.add('fs-fallback'); updateFsBtn(); });
    } else {
      stage.classList.add('fs-fallback'); // iOS iPhone fallback: fill viewport
    }
    updateFsBtn();
  }
  function exitFullscreen() {
    stage.classList.remove('fs-fallback');
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
    else if (document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen();
    updateFsBtn();
  }
  btnFull.addEventListener('click', function () {
    if (isFullscreen()) exitFullscreen(); else enterFullscreen();
  });
  document.addEventListener('fullscreenchange', updateFsBtn);
  document.addEventListener('webkitfullscreenchange', updateFsBtn);
  document.addEventListener('touchmove', function (e) {
    if (isFullscreen() && e.target.closest && e.target.closest('#stage')) e.preventDefault();
  }, { passive: false });
})();
