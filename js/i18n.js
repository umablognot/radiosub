const STRINGS = {
  tr: {
    'ctrl-unit':         '// KONTROL ÜNİTESİ',
    'mode-select':       '// MOD SEÇ',
    'source-lang-label': '// KAYNAK DİL (SES)',
    'target-lang-label': '// HEDEF DİL',
    'scan-window':       'TARAMA',
    'sec':               'SN',
    'detected-label':    'ALGILANDI:',
    'vu-label':          'SİN',
    'rx-title':          '// ALIM TRANSKRİPTİ',
    'trans-title':       '// ÇEVİRİ',
    'history-title':     '// OTURUM KAYDI',
    'manual-title':      '// OPERATÖR KILAVUZU',
    'tab-auto':          'OTO MOD',
    'tab-websdr':        'WEBSDR',
    'tab-radio':         'AMATÖR RADYO',
    'tab-morse':         'MORS CW',
    'btn-mode-auto':     '⬡ OTO',
    'btn-mode-speech':   '▶ SES',
    'btn-mode-morse':    '·-· MORS',
    'footer-2-short':    'SUNUCU YOK // %100 ÜCRETSİZ',
    'btn-start':         'BAŞLAT',
    'btn-stop':          'DURDUR',
    'copy':              '[ KOPYALA ]',
    'clr':               '[ TEMİZLE ]',
    'awaiting':          '// SİNYAL BEKLENİYOR_',
    'trans-empty':       '// ÇEVİRİ TAMPONU BOŞ_',
    'history-empty':     '// OTURUM KAYDI BOŞ',
    'footer-1':          'RADIOSUB-1 // AÇIK KAYNAK RADYO ALTYAZI ARACI // MIT LİSANSI',
    'footer-2':          'GITHUB.COM/ALTUNSUMERVE/RADIOSUB // SUNUCU YOK // %100 ÜCRETSİZ',
    // app.js dynamic
    'msg-ready':         'RADIOSUB v1.0 — HAZIR',
    'msg-standby':       'BEKLEMEDE',
    'msg-not-supported': 'WEB SPEECH API DESTEKLENMİYOR — CHROME VEYA EDGE KULLANIN',
    'msg-mic-denied':    'MİKROFON ERİŞİMİ REDDEDİLDİ — İZİN VERİP TEKRAR DENEYİN',
    'msg-audio-err':     e => `SES HATASI: ${e}`,
    'msg-speech-err':    e => `SES API HATASI: ${e}`,
    'msg-scanning':      l => `TARANYOR [${l}] — NET KONUŞUN...`,
    'msg-detected':      n => `DİL ALGILANDI: ${n} — ÇEVİRİLİYOR`,
    'msg-not-detected':  'DİL ALGILANAMADI — LÜTFEN TEKRAR DENEYİN',
    'msg-receiving':     'SES İLETİMİ ALINIYOR...',
    'msg-cw-active':     'CW ÇÖZÜCÜ AKTİF — WPM KALİBRE EDİLİYOR...',
    'msg-cw-locked':     w => `CW SİNYALİ KİLİTLENDİ — ${w} WPM`,
    'not-detected-disp': 'ALGILANAMADI',
  },
  en: {
    'ctrl-unit':         '// CONTROL UNIT',
    'mode-select':       '// MODE SELECT',
    'source-lang-label': '// SOURCE LANG (VOICE)',
    'target-lang-label': '// TARGET LANG',
    'scan-window':       'SCAN WINDOW',
    'sec':               'SEC',
    'detected-label':    'DETECTED:',
    'vu-label':          'SIG',
    'rx-title':          '// RX TRANSCRIPT',
    'trans-title':       '// TRANSLATION',
    'history-title':     '// SESSION LOG',
    'manual-title':      '// OPERATOR MANUAL',
    'tab-auto':          'AUTO MODE',
    'tab-websdr':        'WEBSDR',
    'tab-radio':         'HAM RADIO',
    'tab-morse':         'MORSE CW',
    'btn-mode-auto':     '⬡ AUTO',
    'btn-mode-speech':   '▶ VOICE',
    'btn-mode-morse':    '·-· MORSE',
    'footer-2-short':    'NO BACKEND // 100% FREE',
    'btn-start':         'START RX',
    'btn-stop':          'STOP',
    'copy':              '[ COPY ]',
    'clr':               '[ CLR ]',
    'awaiting':          '// AWAITING SIGNAL_',
    'trans-empty':       '// TRANSLATION BUFFER EMPTY_',
    'history-empty':     '// SESSION LOG EMPTY',
    'footer-1':          'RADIOSUB-1 // OPEN SOURCE RADIO SUBTITLE TOOL // MIT LICENSE',
    'footer-2':          'GITHUB.COM/ALTUNSUMERVE/RADIOSUB // NO BACKEND // 100% FREE',
    // app.js dynamic
    'msg-ready':         'RADIOSUB v1.0 — READY',
    'msg-standby':       'STANDING BY',
    'msg-not-supported': 'WEB SPEECH API NOT SUPPORTED — USE CHROME OR EDGE',
    'msg-mic-denied':    'MICROPHONE ACCESS DENIED — PLEASE ALLOW AND RETRY',
    'msg-audio-err':     e => `AUDIO ERROR: ${e}`,
    'msg-speech-err':    e => `SPEECH ERR: ${e}`,
    'msg-scanning':      l => `SCANNING [${l}] — SPEAK CLEARLY...`,
    'msg-detected':      n => `LANGUAGE DETECTED: ${n} — TRANSLATING`,
    'msg-not-detected':  'LANGUAGE NOT DETECTED — PLEASE TRY AGAIN',
    'msg-receiving':     'RECEIVING VOICE TRANSMISSION...',
    'msg-cw-active':     'CW DECODER ACTIVE — AUTO-CALIBRATING WPM...',
    'msg-cw-locked':     w => `CW SIGNAL LOCKED — ${w} WPM`,
    'not-detected-disp': 'NOT DETECTED',
  }
};

const GUIDE = {
  tr: {
    auto: `
      <h3>// OTO MOD</h3>
      <ol>
        <li><strong>OTO</strong> modunu ve hedef dilini seç</li>
        <li><strong>BAŞLAT</strong>'a bas, mikrofon iznine izin ver</li>
        <li>Telefonu radyo hoparlörüne yaklaştır — sistem <strong>30 saniyeye</strong> kadar dinler</li>
        <li>Dil tespit edilince: <em>DİL ALGILANDI: İTALYANCA (87%)</em></li>
        <li>Çeviri hemen başlar, DURDUR'a basana kadar devam eder</li>
        <li>30 saniyede bulunamazsa: <em>DİL ALGILANAMADI — TEKRAR DENEYİN</em></li>
      </ol>
      <p class="tip">⬡ Net, tek konuşmacılı ses için en iyi sonucu verir</p>
      <p class="tip">⬡ Mors kodu için MORS modunu kullan — Oto mod sadece ses içindir</p>`,
    websdr: `
      <h3>// WEBSDR KULLANIMI</h3>
      <ol>
        <li>PC'nde <a href="http://websdr.org" target="_blank" rel="noopener">websdr.org</a> aç ve bir istasyona tun yap</li>
        <li><strong>Telefonunda</strong> RadioSub'ı aç</li>
        <li><strong>OTO</strong> veya <strong>SES</strong> modunu seç, <strong>BAŞLAT</strong>'a bas</li>
        <li>Telefon mikrofonunu PC hoparlörüne yaklaştır</li>
        <li>Altyazılar gerçek zamanlı görünür — net USB/LSB sinyaller için en iyi sonuç</li>
      </ol>
      <p class="tip">▶ Ses sinyalleri için WebSDR'de USB veya LSB modunu kullan</p>
      <p class="tip">·-· Mors için WebSDR'i CW moduna alıp MORS modunu seç</p>`,
    radio: `
      <h3>// AMATÖR RADYO / TARAYICI</h3>
      <ol>
        <li>Radyonu istediğin frekansa ayarla</li>
        <li>Telefonunda RadioSub'ı aç — <strong>BAŞLAT</strong>'a bas</li>
        <li>Telefonu radyo hoparlörüne yaklaştır</li>
        <li>Dil bilinmiyorsa <strong>OTO</strong> modunu, biliyorsan <strong>SES</strong> modunu kullan</li>
      </ol>
      <p class="tip">▶ Radyo kulaklık çıkışından telefon mikrofon girişine 3.5mm kablo daha temiz ses verir</p>
      <p class="tip">▶ Kısa dalga, tarayıcı, PMR, deniz VHF — hepsinde çalışır</p>`,
    morse: `
      <h3>// MORS CW ÇÖZÜCÜ</h3>
      <ol>
        <li><strong>MORS</strong> modunu seç ve <strong>BAŞLAT</strong>'a bas</li>
        <li>Telefonu CW sinyaline ayarlı radyo hoparlörüne yaklaştır</li>
        <li>Çözücü otomatik kalibre olur — karakterler tek tek görünür</li>
        <li>Çeviri yok — sadece ham çözülmüş Latin karakterleri gösterir</li>
      </ol>
      <p class="tip">⚙ 5'ten 50+ WPM'e kadar otomatik uyum sağlar</p>
      <p class="tip">⚙ En iyi CW ton aralığı: 400–1200 Hz</p>`,
  },
  en: {
    auto: `
      <h3>// AUTO MODE</h3>
      <ol>
        <li>Select <strong>AUTO</strong> mode and your target language</li>
        <li>Click <strong>START RX</strong> and allow microphone access</li>
        <li>Hold your phone near the radio speaker — system listens up to <strong>30 seconds</strong></li>
        <li>When identified: <em>LANGUAGE DETECTED: ITALIAN (87%)</em></li>
        <li>Translation starts immediately and continues until you click STOP</li>
        <li>If no language detected in 30s: <em>LANGUAGE NOT DETECTED — TRY AGAIN</em></li>
      </ol>
      <p class="tip">⬡ Works best with clear, single-speaker audio</p>
      <p class="tip">⬡ For Morse code, use MORSE mode — Auto mode is voice only</p>`,
    websdr: `
      <h3>// WEBSDR SETUP</h3>
      <ol>
        <li>Open <a href="http://websdr.org" target="_blank" rel="noopener">websdr.org</a> on your PC and tune to a station</li>
        <li>Open RadioSub on your <strong>phone</strong></li>
        <li>Select <strong>AUTO</strong> or <strong>VOICE</strong> mode and click <strong>START RX</strong></li>
        <li>Hold the phone microphone close to your PC speaker</li>
        <li>Subtitles appear in real-time — best results with clear USB/LSB voice signals</li>
      </ol>
      <p class="tip">▶ For voice signals: use USB or LSB mode in WebSDR</p>
      <p class="tip">·-· For Morse: switch WebSDR to CW mode and select MORSE above</p>`,
    radio: `
      <h3>// HAM RADIO / SCANNER</h3>
      <ol>
        <li>Tune your radio to the target frequency</li>
        <li>Open RadioSub on your phone — click <strong>START RX</strong></li>
        <li>Hold the phone near the radio speaker</li>
        <li>Use <strong>AUTO</strong> to detect language, or <strong>VOICE</strong> if you know it</li>
      </ol>
      <p class="tip">▶ A 3.5mm cable from radio headphone jack to phone mic gives cleaner audio</p>
      <p class="tip">▶ Works with any receiver: shortwave, scanner, PMR, marine VHF</p>`,
    morse: `
      <h3>// MORSE CW DECODER</h3>
      <ol>
        <li>Select <strong>MORSE</strong> mode and click <strong>START RX</strong></li>
        <li>Hold your phone near the radio speaker tuned to a CW signal</li>
        <li>Decoder auto-calibrates — decoded text appears character by character</li>
        <li>No translation — shows raw decoded Latin characters only</li>
      </ol>
      <p class="tip">⚙ Adapts automatically to any speed from 5 to 50+ WPM</p>
      <p class="tip">⚙ Optimal CW tone range: 400–1200 Hz</p>`,
  }
};

/* ── Core ─────────────────────────────────────────── */

let _lang = localStorage.getItem('radiosub-lang') || 'tr';

window.t = function(key, arg) {
  const val = STRINGS[_lang][key];
  if (typeof val === 'function') return val(arg);
  return val !== undefined ? val : key;
};

window.getLang = () => _lang;

function applyLang(lang) {
  _lang = lang;
  localStorage.setItem('radiosub-lang', lang);
  document.documentElement.lang = lang;

  // Static elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = STRINGS[lang][el.dataset.i18n];
    if (val !== undefined && typeof val !== 'function') el.textContent = val;
  });

  // Guide panes
  const activeTab = document.querySelector('.guide-tab.active')?.dataset.tab || 'auto';
  ['auto', 'websdr', 'radio', 'morse'].forEach(tab => {
    const pane = document.querySelector(`.guide-tab-content[data-tab="${tab}"]`);
    if (!pane) return;
    pane.innerHTML = GUIDE[lang][tab];
    pane.style.display = tab === activeTab ? 'block' : 'none';
  });

  // Dynamic elements (only when app is idle)
  const idle = !window.app || !window.app.isRunning;
  if (idle) {
    const btnText = document.querySelector('#mainBtn .btn-text');
    if (btnText) btnText.textContent = STRINGS[lang]['btn-start'];
    document.getElementById('statusMsg').textContent = STRINGS[lang]['msg-ready'];
  }

  const sub = document.getElementById('subtitleBox');
  if (sub?.querySelector('.ph-text'))
    sub.innerHTML = `<span class="ph-text">${STRINGS[lang]['awaiting']}</span>`;

  const trn = document.getElementById('translationBox');
  if (trn?.querySelector('.ph-text'))
    trn.innerHTML = `<span class="ph-text">${STRINGS[lang]['trans-empty']}</span>`;

  const hist = document.getElementById('historyBox');
  if (hist?.querySelector('.ph'))
    hist.innerHTML = `<span class="ph">${STRINGS[lang]['history-empty']}</span>`;

  // Lang toggle button states
  document.querySelectorAll('[data-lang-btn]').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.langBtn === lang)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang-btn]').forEach(btn =>
    btn.addEventListener('click', () => applyLang(btn.dataset.langBtn))
  );
  applyLang(_lang);
});
