# 🕹️ MINI ARCADE — Neon Collection

> **Collection of free, lightweight, zero-dependency HTML5 arcade web games.**  
> Play directly in your browser on desktop, tablet, or mobile phone.

### 🌐 Play Live Now
👉 **[https://lwn2210.github.io/mini-arcade/](https://lwn2210.github.io/mini-arcade/)**

---

## 🎮 Game Catalog

### 🇮🇩 Nusantara Arcade Expansion

| Game | Direct Link | Description | Tech |
|---|---|---|---|
| 🥋 **Silat Duel 3D** | [Play](https://lwn2210.github.io/mini-arcade/silat-duel/) | 2.5D fighting duel between 3 silat warriors (Jaka, Sari & Gatot). Combos, air juggles, parry (*tepis*), Batik Megamendung motif, and synthetic gamelan audio. | Three.js + TypeScript |
| 🥢 **Abang Gorengan** | [Play](https://lwn2210.github.io/mini-arcade/abang-gorengan/) | Time-management street food cart with real 2D sprites: dip, fry, drain, and wrap authentic Indonesian snacks (bakwan, mendoan, tahu isi, cireng, combro). | Canvas 2D + Web Audio |
| 🐱 **Kucing Pasar** | [Play](https://lwn2210.github.io/mini-arcade/kucing-pasar/) | Stealth 2D platformer with cartoon cat & vendor sprites: 7 full levels escaping wet markets through the gutters! | Canvas 2D + Web Audio |
| 🛵 **Ojol Rush** | [Play](https://lwn2210.github.io/mini-arcade/ojol-rush/) | Open-world motorcycle courier simulation with top-down rider & Metromini sprites, interactive traffic honking, police raids, and dynamic headlights. | Canvas 2D + Touch Joystick |
| 🪁 **Layangan Duel 3D** | [Play](https://lwn2210.github.io/mini-arcade/layangan-duel/) | 3D kite fighting game over Jakarta rooftops: pull vs release techniques with realistic glass-string friction physics. | Three.js + Solo AI |
| 📦 **Mudik Stack 3D** | [Play](https://lwn2210.github.io/mini-arcade/mudik-stack/) | Stack Indonesian homecoming luggage on a moving Toyota Avanza roof along Pantura highway with suspension physics. | Three.js + Rapier 3D WASM |
| ⚡ **Ojek Rush** | [Play](https://lwn2210.github.io/mini-arcade/ojek-rush/) | 4-lane traffic runner: weave through Jakarta traffic, dodge MetroMini buses, and grab speed boosts to deliver packages. | Canvas 2D + Web Audio |

---

### ⚡ Neon & Retro Collection

| Game | Direct Link | Description |
|---|---|---|
| 🐍 **Neon Snake** | [Play](https://lwn2210.github.io/mini-arcade/snake/index.html) | Cyberpunk grid snake with speed ramp-up and glowing neon trails. |
| 🧱 **Neon Breakout** | [Play](https://lwn2210.github.io/mini-arcade/breakout/index.html) | Classic brick breaker with continuous combo multipliers and particle effects. |
| 🚀 **Flappy Cyber** | [Play](https://lwn2210.github.io/mini-arcade/flappy/index.html) | One-tap precision thruster flight through hazardous glowing data pylons. |
| 🟩 **Neon Tetris** | [Play](https://lwn2210.github.io/mini-arcade/tetris/index.html) | Mobile-first block stacker with big touch controls, swipe gestures, and wall kicks. |
| 🧲 **Polarity** | [Play](https://lwn2210.github.io/mini-arcade/polarity/index.html) | Magnetic momentum slingshot: flip charges to attract, repel, and accelerate. |
| 🕹️ **Classic Zone** | [Play](https://lwn2210.github.io/mini-arcade/classic/index.html) | Multi-platform retro emulator vault (NES, PS1, PSP) running in-browser. |
| 💀 **Neon Survivors** | [Play](https://lwn2210.github.io/mini-arcade/survivors/index.html) | Arena roguelite: auto-attack swarms of enemies, collect XP gems, and build builds. |
| 🎸 **Neon Hero** | [Play](https://lwn2210.github.io/mini-arcade/hero/index.html) | Rhythm game with synthesized tracks and tight timing windows. |
| 🏰 **Cyber Citadel** | [Play](https://lwn2210.github.io/mini-arcade/citadel/index.html) | Cyberpunk tower defense: 4 turret types, upgrades, 20 waves of mecha & titan bosses. |
| 🛸 **Cyber-Raid 2088** | [Play](https://lwn2210.github.io/cyber-raid-2088/) | Full arcade space shooter: 360° flight, boss phases, and procedural DSP audio. |

---

## 🛠️ Features

- **No Install & No Plugins:** 100% standard web technologies (HTML5, Canvas 2D, WebGL/Three.js, Web Audio API).
- **📲 PWA & Offline Play:** Installable directly to phone homescreen via Service Worker (`sw.js`) and Web Manifest (`manifest.webmanifest`).
- **📤 Virality & Social Share:** 1-tap "Pamer Rekor" to WhatsApp, Instagram Stories, or clipboard with custom emoji stats.
- **🏪 Metagame & Upgrade Shops:** Equipment shop in *Abang Gorengan*, 3-Stage Padepokan Tournament Ladder in *Silat Duel*, and Motorcycle Selector in *Ojol Rush*.
- **🏆 Arcade Hall of Fame:** Aggregated high score records and achievements saved in browser storage.
- **Responsive:** Optimized for both mobile touchscreen gestures and desktop keyboard controls.
- **Zero Asset Loading Lag:** Lightweight builds designed for instantaneous start-up.
- **100% Tested:** 198/198 unit tests passing across all game simulation physics and rule engines.

---

## 📱 Android App Packaging (APK)

You can package Mini Arcade into a standalone Android `.apk` ready for sideloading or Google Play:

### Option 1: Google Bubblewrap (TWA - Recommended)
```bash
# Generate and build Android APK in 1 command
npx @bubblewrap/cli build
```

### Option 2: Capacitor
```bash
# Add Android platform and build
npx @capacitor/cli add android
npx @capacitor/cli build android
```

---

## 💻 Local Development

Run any static HTTP server in the repository root:

```bash
# Python
python3 -m http.server 8080

# Or Node.js
npx serve .
```

Open `http://localhost:8080` in your browser.

---

## 📜 License

Created as part of the **lwn2210 arcade universe**. Open for gameplay and exploration.
