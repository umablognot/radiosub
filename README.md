# 📻 RADIOSUB-1

**Real-time radio subtitle & translator — 100% free, no backend, runs entirely in your browser.**

Point your phone microphone at any radio, scanner, or WebSDR speaker — get live subtitles with automatic language detection and translation. Supports voice transcription in 15+ languages and Morse code (CW) decoding.

🔗 **[Live Demo](https://altunsumerve.github.io/radiosub)**

> **UI design**: Retro CRT terminal / phosphor green aesthetic

---

## How to Use

**The simplest setup:**
1. Tune your radio or WebSDR to a station
2. Open RadioSub on your **phone** (or any device with a mic)
3. Hold the phone near the speaker — click **START RX**
4. Live subtitles appear in real-time

That's it. No installs, no accounts, no backend.

---

## Features

| | Feature | Detail |
|-|---------|--------|
| ⬡ | **Auto Mode** | Cycles through 7 languages (EN→RU→DE→IT→FR→ES→TR) in 5-second windows to identify the spoken language within 35 seconds |
| 🎙️ | **Voice Mode** | Manual language selection + Web Speech API (Chrome/Edge built-in, 15+ languages) |
| ·-· | **Morse Mode** | FFT-based CW decoder — auto-calibrates to operator speed, outputs Latin characters |
| 🌐 | **Translation** | MyMemory API (primary) + Lingva fallback — free, no API key needed |
| 🔍 | **Language Detection** | Google Translate unofficial endpoint — fast, reliable, no key required |
| 📱 | **Mobile First** | Works great on Android Chrome with microphone — point at any speaker |
| ⚡ | **No Backend** | Pure HTML / CSS / JS — deploys to GitHub Pages for free |

---

## How Auto Mode Works

```
START RX
  │
  ├─ 0–5s    tries [EN] speech recognition
  ├─ 5–10s   tries [RU] speech recognition
  ├─ 10–15s  tries [DE] speech recognition
  ├─ 15–20s  tries [IT] speech recognition   ← Italian detected here
  ├─ 20–25s  tries [FR] speech recognition
  ├─ 25–30s  tries [ES] speech recognition
  └─ 30–35s  tries [TR] speech recognition

At any point: transcript → Google Translate detect API
  ├─ Language confirmed? → "LANGUAGE DETECTED: ITALIAN (92%)"
  │   → Restart Speech API in Italian → translate continuously
  └─ 30s without detection → "LANGUAGE NOT DETECTED — TRY AGAIN"
```

---

## Modes

### ⬡ Auto Mode
- Best for: unknown radio stations, WebSDR
- Cycles through 7 languages in 5-second windows (35 seconds total)
- Auto-detects the spoken language → translates to your selected target language once confirmed

### 🎙️ Voice Mode
- Best for: when you already know the source language
- Select the source language manually → immediate transcription + translation

### ·-· Morse Mode
- Best for: CW (Continuous Wave) amateur radio signals
- Decodes dots and dashes into Latin alphabet characters
- No translation — shows raw decoded text
- Auto-calibrates to operator speed (5–50+ WPM)

---

## Quick Start

### WebSDR (from your phone)
1. Open [websdr.org](http://websdr.org) on your **PC** and tune to a station
2. Open RadioSub on your **phone**
3. Select target language → click **START RX** → hold phone near PC speaker
4. Subtitles appear in real-time

### Your Own Radio / Scanner
1. Tune the radio to the target frequency
2. Open RadioSub on your phone — click **START RX**
3. Hold phone near the radio speaker
4. Use **AUTO** mode to detect the language, or **VOICE** if you already know it

### Morse Code (CW)
1. Select **MORSE** mode
2. Tune to a CW signal (on WebSDR or your own receiver)
3. Click **START RX** — hold phone near speaker
4. Decoder auto-calibrates — decoded characters appear one by one

### Better Audio Quality
For cleaner input without background noise, connect via cable:
- 3.5mm audio cable from radio/receiver headphone jack → phone mic input
- Works for Voice, Auto, and Morse modes

---

## Browser Requirements

| Browser | Auto / Voice | Morse |
|---------|-------------|-------|
| **Chrome** | ✅ | ✅ |
| **Edge** | ✅ | ✅ |
| Firefox | ❌ | ✅ |
| Safari | ⚠️ | ✅ |

> Speech recognition (Auto + Voice modes) requires Chrome or Edge.
> Morse decoding works in all modern browsers.

> ⚠️ **Do not open via `file://`** — browser won't remember microphone permission.
> Use `http://localhost` for local testing or deploy to GitHub Pages.

---

## Technical Details

### Auto Language Detection
- Web Speech API cycles through 7 languages (EN→RU→DE→IT→FR→ES→TR) in 5s windows, votes on best match, decides at 35s
- After each recognition result (3+ words), calls Google Translate's unofficial detection endpoint: `translate.googleapis.com/translate_a/single?client=gtx&sl=auto`
- No API key required — same endpoint used by Google Translate web UI
- On detection: switches Speech API to the confirmed language for better accuracy

### Morse (CW) Decoder
- 4096-point FFT scans 350–1300 Hz for tone presence
- Biquad bandpass filter centered at 750 Hz reduces interference
- Adaptive dot-unit estimation from mark-duration history (bottom 40th percentile)
- Letter/word boundaries from silence duration ratios (3× and 7× dot unit)
- Supported speed: 5–50+ WPM, self-calibrating

### Permission Design
- Voice/Auto: only **one** permission prompt (Web Speech API owns the mic)
- Morse: one `getUserMedia` call
- No duplicate permission dialogs

### Free APIs Used
| API | Purpose | Limit |
|-----|---------|-------|
| Web Speech API | Speech-to-text | Browser built-in, free |
| Google Translate (unofficial) | Language detection | No key, no limit |
| MyMemory | Translation (primary) | 1000 words/day anonymous |
| Lingva | Translation (fallback) | Community hosted |

---

## Project Structure

```
radiosub/
├── index.html              Single-page app
├── css/
│   └── style.css           Retro CRT phosphor terminal UI
├── js/
│   ├── app.js              Main controller, auto-detect logic
│   ├── speech.js           Web Speech API wrapper + VU meter
│   ├── morse.js            CW decoder (FFT + adaptive timing)
│   ├── translator.js       Translation + language detection
│   └── i18n.js             TR/EN internationalization + operator guide
├── README.md               English documentation
├── README_TR.md            Turkish documentation
├── LICENSE                 MIT
└── .gitignore
```


---

## License

[MIT](LICENSE) — free to use, fork, and modify.

---

*Made for the ham radio and WebSDR community*
