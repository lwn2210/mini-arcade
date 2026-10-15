# CLASSIC ZONE — Retro Vault: Attribution & Licenses

Multi-platform emulator section. **NES** ships vendored, freely-licensed
homebrew ROMs. **PS1/PSP/PS2** ship NO games and NO BIOS — strictly
bring-your-own, loaded client-side.

| ROM file | Title | Author | License | Source |
|---|---|---|---|---|
| `nes/roms/240pee.nes` | 240p Test Suite (NES port, "240pee") | Damian Yerrick (pinobatch), port of Artemio Urbina's 240p Test Suite | **GPL-2.0** (SPDX: GPL-2.0, per GitHub repo license) | https://github.com/pinobatch/240p-test-mini — release asset `240pee.nes` (tag v0.23) |
| `nes/roms/croom.nes` | Concentration Room v0.02a | Damian Yerrick (pinobatch) | **GPL-3.0** (SPDX: GPL-3.0, per GitHub repo license; `LICENSE.txt` in repo is the full GPLv3 text) | https://github.com/pinobatch/croom-nes — release asset `croom.nes` (tag v0.02a) |
| `nes/roms/allpads.nes` | All Pads v0.09 | Damian Yerrick (pinobatch) | **Zlib** (repo `LICENSE.txt` is the standard zlib license text: "This software is provided 'as-is'... Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely") | https://github.com/pinobatch/allpads-nes — release asset `allpads.nes` (tag v0.09) |

## License evidence

Licenses were verified on 2026-10-15 via the GitHub API
(`https://api.github.com/repos/<repo>` `license.spdx_id`) and by reading each
repo's `LICENSE.txt` from `raw.githubusercontent.com`:

- `pinobatch/240p-test-mini` → SPDX `GPL-2.0`
- `pinobatch/croom-nes` → SPDX `GPL-3.0` (repo `LICENSE.txt` contains the full
  GNU GPL v3 text)
- `pinobatch/allpads-nes` → repo `LICENSE.txt` is the zlib license (not an SPDX
  field on the repo, verified by reading the file directly)

The ROMs are the prebuilt release assets published by the author on the official
project GitHub Releases pages, i.e. the author's own distributed binaries.

## Skipped / not vendored

- `allpads218.nes` (mapper 218 variant of All Pads, same Zlib license) —
  skipped because jsnes does not support mapper 218; would fail at load.
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
