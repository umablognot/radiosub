class Translator {
  constructor() {
    this.currentApiName = 'MyMemory';

    this._translateApis = [
      {
        name: 'MyMemory',
        call: async (text, from, to) => {
          const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
          const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const d = await r.json();
          if (d.responseStatus !== 200) throw new Error(d.responseMessage || 'Failed');
          return d.responseData.translatedText;
        }
      },
      {
        name: 'Lingva',
        call: async (text, from, to) => {
          const url = `https://lingva.garudalinux.org/api/v1/${from}/${to}/${encodeURIComponent(text)}`;
          const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const d = await r.json();
          if (!d.translation) throw new Error('No translation');
          return d.translation;
        }
      },
      {
        name: 'Lingva-2',
        call: async (text, from, to) => {
          const url = `https://translate.plausibility.cloud/api/v1/${from}/${to}/${encodeURIComponent(text)}`;
          const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const d = await r.json();
          if (!d.translation) throw new Error('No translation');
          return d.translation;
        }
      }
    ];
    this._apiIdx = 0;
  }

  _short(lang) { return lang.split('-')[0].toLowerCase(); }

  /* ─── Language Detection ───────────────────────────────────
     Primary:  Google Translate unofficial endpoint (no key, CORS open, very reliable)
     Fallback: LibreTranslate community instances
  ──────────────────────────────────────────────────────────── */
  async detectLanguage(text) {
    if (!text || text.trim().length < 6) return null;
    const q = text.trim().slice(0, 250);

    // ── Primary: unofficial Google Translate detect ──
    // Returns d[2] = ISO 639-1 language code
    try {
      const url = 'https://translate.googleapis.com/translate_a/single' +
        `?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(q)}`;
      const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (r.ok) {
        const d = await r.json();
        const code = d && d[2];
        if (typeof code === 'string' && code.length >= 2) {
          return { lang: code.slice(0, 2), confidence: 0.92 };
        }
      }
    } catch (e) {
      console.warn('[detect] Google Translate:', e.message);
    }

    // ── Fallback: LibreTranslate community instances ──
    for (const ep of [
      'https://translate.argosopentech.com/detect',
      'https://libretranslate.de/detect'
    ]) {
      try {
        const r = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q }),
          signal: AbortSignal.timeout(4000)
        });
        if (!r.ok) continue;
        const data = await r.json();
        const best = Array.isArray(data) && data[0];
        if (best && best.confidence > 0.4) {
          return { lang: best.language, confidence: best.confidence };
        }
      } catch (_) {}
    }

    return null;
  }

  /* ─── Translation ──────────────────────────────────────── */
  async translate(text, fromLang, toLang) {
    if (!text || !text.trim()) return '';
    const from = this._short(fromLang);
    const to   = this._short(toLang);
    if (from === to) return text;
    const chunk = text.length > 450 ? text.slice(0, 450) + '...' : text;

    for (let i = 0; i < this._translateApis.length; i++) {
      const idx = (this._apiIdx + i) % this._translateApis.length;
      const api = this._translateApis[idx];
      try {
        const result = await api.call(chunk, from, to);
        this._apiIdx = idx;
        this.currentApiName = api.name;
        return result;
      } catch (err) {
        console.warn(`[Translator] ${api.name}:`, err.message);
      }
    }
    return text;
  }
}
