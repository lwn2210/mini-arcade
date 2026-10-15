# CLASSIC ZONE — Retro Vault: Attribution & Licenses

Multi-platform emulator section. **NES** ships vendored, freely-licensed
homebrew ROMs. **PS1/PSP/PS2** ship NO games and NO BIOS — strictly
bring-your-own, loaded client-side.

| ROM file | Title | Author | License | Source |
|---|---|---|---|---|
| `nes/roms/240pee.nes` | 240p Test Suite (NES port, "240pee") | Damian Yerrick (pinobatch), port of Artemio Urbina's 240p Test Suite | **GPL-2.0** (SPDX: GPL-2.0, per GitHub repo license) | https://github.com/pinobatch/240p-test-mini — release asset `240pee.nes` (tag v0.23) |
| `nes/roms/croom.nes` | Concentration Room v0.02a | Damian Yerrick (pinobatch) | **GPL-3.0** (SPDX: GPL-3.0, per GitHub repo license; `LICENSE.txt` in repo is the full GPLv3 text) | https://github.com/pinobatch/croom-nes — release asset `croom.nes` (tag v0.02a) |
| `nes/roms/allpads.nes` | All Pads v0.09 | Damian Yerrick (pinobatch) | **Zlib** (repo `LICENSE.txt` is the standard zlib license text: "This software is provided 'as-is'... Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely") | https://github.com/pinobatch/allpads-nes — release asset `allpads.nes` (tag v0.09) |
| `nes/roms/thwaite.nes` | Thwaite v0.04 | Damian Yerrick (pinobatch) | **GPL-3.0** (SPDX: GPL-3.0, per GitHub repo license) | https://github.com/pinobatch/thwaite-nes — release asset `thwaite.nes` (tag v0.04) |
| `nes/roms/robotfindskitten.nes` | Robot Finds Kitten v0.10 | Damian Yerrick (pinobatch), port of robotfindskitten (Leonard Richardson) | **Zlib** (SPDX: Zlib, per GitHub repo license) | https://github.com/pinobatch/rfk-nes — release asset `robotfindskitten.nes` (tag v0.10) |
| `nes/roms/rhde.nes` | RHDE: Furniture Fight v0.07 | Damian Yerrick (pinobatch) | **Permissive notice-style license** (repo `LICENSE.txt` (verified 2026-10-15): "Copying and distribution of this file, with or without modification, are permitted in any medium without royalty provided the copyright notice and this notice are preserved in all source code copies. This file is offered as-is, without any warranty."; GitHub reports SPDX NOASSERTION but the text is a free-redistribution grant by the author) | https://github.com/pinobatch/rhde-nes — release asset `rhde.nes` (tag v0.07) |
| `nes/roms/ruder.nes` | Zap Ruder v0.03a | Damian Yerrick (pinobatch) | **Permissive notice-style license** (repo `LICENSE.txt` (verified 2026-10-15): "Copyright 2011 Damian Yerrick. Copying and distribution of this file, with or without modification, are permitted in any medium without royalty provided the copyright notice and this notice are preserved. This file is offered as-is, without any warranty.") | https://github.com/pinobatch/zap-ruder — release asset `ruder.nes` (tag v0.03a) |
| `nes/roms/stallar.nes` | Stallar 0.1.0 | Wendel Scardua | **MIT** (SPDX: MIT, per GitHub repo license) | https://github.com/wendelscardua/stallar — release asset `stallar.nes` (tag 0.1.0) |
| `nes/roms/file-fixers.nes` | File Fixers 0.1.0 | Wendel Scardua | **MIT** (SPDX: MIT, per GitHub repo license) | https://github.com/wendelscardua/file-fixers — release asset `file-fixers.nes` (tag 0.1.0) |
| `nes/roms/signos.nes` | Signos v0.1.1 | Wendel Scardua | **Unlicense** (SPDX: Unlicense, per GitHub repo license — public-domain dedication) | https://github.com/wendelscardua/signos — release asset `signos.nes` (tag v0.1.1) |
| `nes/roms/table_tennis.nes` | 8-bit Table Tennis v1.0 | Michael Billington | **MIT** (SPDX: MIT, per GitHub repo license; `LICENSE` file: "MIT License — Copyright (c) 2020 Michael Billington") | https://github.com/mike42/8bit-table-tennis — release asset `table_tennis_v1.0.nes` (tag v1.0) |
| `nes/roms/jeznes.nes` | JezNES v0.4.0-alpha | boingoing | **MIT** (SPDX: MIT, per GitHub repo license) | https://github.com/boingoing/jeznes — release asset `jeznes.nes` (tag v0.4.0-alpha) |

## License evidence

Licenses were verified on 2026-10-15 via the GitHub API
(`https://api.github.com/repos/<repo>` `license.spdx_id`) and by reading each
repo's `LICENSE.txt` from `raw.githubusercontent.com`:

- `pinobatch/240p-test-mini` → SPDX `GPL-2.0`
- `pinobatch/croom-nes` → SPDX `GPL-3.0` (repo `LICENSE.txt` contains the full
  GNU GPL v3 text)
- `pinobatch/allpads-nes` → repo `LICENSE.txt` is the zlib license (not an SPDX
  field on the repo, verified by reading the file directly)
- `pinobatch/thwaite-nes` → SPDX `GPL-3.0`
- `pinobatch/rfk-nes` → SPDX `Zlib`
- `pinobatch/rhde-nes` → SPDX `NOASSERTION`; repo `LICENSE.txt` read directly
  and confirmed a permissive royalty-free redistribution grant by the author
- `pinobatch/zap-ruder` → SPDX `NOASSERTION`; repo `LICENSE.txt` read directly
  and confirmed a permissive royalty-free redistribution grant by the author
- `wendelscardua/stallar` → SPDX `MIT`
- `wendelscardua/file-fixers` → SPDX `MIT`
- `wendelscardua/signos` → SPDX `Unlicense`
- `mike42/8bit-table-tennis` → SPDX `MIT`
- `boingoing/jeznes` → SPDX `MIT`

The ROMs are the prebuilt release assets published by the author on the official
project GitHub Releases pages, i.e. the author's own distributed binaries.

## Skipped / not vendored

- `allpads218.nes` (mapper 218 variant of All Pads, same Zlib license) —
  skipped because jsnes does not support mapper 218; would fail at load.
- `flappy_paratroopa.nes` (Flappy Paratroopa, MIT, captain-http/
  flappy-paratroopa-nes) — skipped: although the code is MIT-licensed, the game
  stars a Nintendo character (Paratroopa) and uses Nintendo trade dress; the
  MIT grant does not cover the character/art, so it is not verifiably
  redistributable.
- `pinobatch/miroh` (Ludum Dare NES game) — skipped: license NOASSERTION,
  no readable LICENSE file at the default branch tip, license unclear.
- `pinobatch/MegaMountainNES`, `pinobatch/fizzbuzz-nes`, and other repos
  without published prebuilt `.nes` release assets — skipped: no author-built
  binary available to vendor.
- `pinobatch/nes-homebrew-db` entries for games whose repos could not be
  license-verified — excluded by policy.
- Any commercial NES ROM — never to be included here.
- ROMs whose license could not be verified — excluded by policy.

## Emulators

- **jsnes** v1.2.1 (`classic/nes/vendor/jsnes.min.js`) — MIT License.
  Source: https://github.com/bfirsh/jsnes / https://www.npmjs.com/package/jsnes
  Copyright (c) Ben Firshel and contributors. MIT license text:
  https://github.com/bfirsh/jsnes/blob/master/LICENSE
- **EmulatorJS** (PS1/PSP pages) — NOT vendored; loaded at runtime from
  https://cdn.emulatorjs.org (stable channel). Frontend license: GPL-3.0
  (frontend only, not a derivative of this site's code). Cores used:
  pcsx_rearmed (PS1) and ppsspp (PSP). Online-only for those pages.
- **PS2**: no emulator, core, ROM, or BIOS is bundled or linked — the PS2
  page is documentation-only until a practical in-browser PS2 core exists.

GPL note: the GPL'd ROM binaries are distributed unmodified alongside this
site; the site's own code is not derived from them, and source code for the
GPL'd ROMs is available at the GitHub URLs above.
