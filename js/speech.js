class SpeechHandler extends EventTarget {
  constructor() {
    super();
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.supported = !!SR;
    if (!this.supported) return;

    this._SR = SR;
    this._rec = null;
    this._running = false;
    this._restartTimer = null;
    this._currentLang = '';

  }

  _create(lang) {
    const rec = new this._SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.lang = lang || '';

    rec.onresult = (e) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      if (final.trim())
        this.dispatchEvent(new CustomEvent('final', { detail: { text: final.trim() } }));
      this.dispatchEvent(new CustomEvent('interim', { detail: { text: interim } }));
    };

    rec.onerror = (e) => {
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      this.dispatchEvent(new CustomEvent('error', { detail: { error: e.error } }));
    };

    rec.onend = () => {
      if (this._running) {
        this._restartTimer = setTimeout(() => {
          try { this._rec.start(); } catch (_) {}
        }, 250);
      }
    };
    return rec;
  }

  start(lang) {
    if (!this.supported) return;
    this._running = true;
    this._currentLang = lang || '';
    this._rec = this._create(lang);
    try { this._rec.start(); } catch (_) {}
  }

  changeLang(lang) {
    if (!this.supported || !this._running) return;
    clearTimeout(this._restartTimer);
    this._running = false;          // block onend from scheduling a restart
    try { this._rec.stop(); } catch (_) {}
    this._running = true;
    this._currentLang = lang;
    this._rec = this._create(lang);
    setTimeout(() => { try { this._rec.start(); } catch (_) {} }, 300);
  }

  stop() {
    this._running = false;
    clearTimeout(this._restartTimer);
    try { this._rec.stop(); } catch (_) {}
  }

}
