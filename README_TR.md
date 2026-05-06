# 📻 RADIOSUB-1

**Gerçek zamanlı radyo altyazısı ve çeviri — tamamen ücretsiz, backend yok, tarayıcıda çalışır.**

Telefon mikrofonunu herhangi bir radyo, telsiz veya WebSDR hoparlörüne tut — otomatik dil algılama ve çeviri ile canlı altyazı al. 15'ten fazla dilde ses tanıma ve Mors alfabesi (CW) çözme desteği.

🔗 **[Canlı Demo](https://altunsumerve.github.io/radiosub)**

> **Tasarım**: Retro CRT terminal / fosfor yeşili ekran teması

---

## Nasıl Kullanılır

**En basit kurulum:**
1. Radyonu veya WebSDR'i bir istasyona ayarla
2. RadioSub'ı **telefonunda** aç (veya mikrofonu olan herhangi bir cihazda)
3. Telefonu hoparlöre tut — **START RX** tıkla
4. Canlı altyazılar gerçek zamanlı olarak gelir

Hepsi bu. Kurulum yok, hesap yok, sunucu yok.

---

## Özellikler

| | Özellik | Detay |
|-|---------|-------|
| ⬡ | **Otomatik Mod** | 35 saniye boyunca 7 dili 5'er saniyelik pencerelerle dener (EN→RU→DE→IT→FR→ES→TR), oylamaya göre en yüksek skoru alan dili seçer |
| 🎙️ | **Ses Modu** | Manuel dil seçimi + Web Speech API (Chrome/Edge dahili, 15+ dil) |
| ·-· | **Mors Modu** | FFT tabanlı CW çözücü — operatör hızına otomatik kalibrasyon, Latin karakterleri çıkarır |
| 🌐 | **Çeviri** | MyMemory API (birincil) + Lingva (yedek) — ücretsiz, API anahtarı gerekmez |
| 🔍 | **Dil Tespiti** | Google Translate resmi olmayan endpoint — hızlı, güvenilir, anahtar gerekmez |
| 📱 | **Mobil Öncelikli** | Android Chrome + mikrofon ile mükemmel çalışır — hoparlöre tut, altyazı gelir |
| ⚡ | **Backend Yok** | Saf HTML / CSS / JS — GitHub Pages'te ücretsiz yayınlanır |

---

## Otomatik Mod Nasıl Çalışır?

```
START RX
  │
  ├─ 0–5s    [EN] İngilizce ses tanımayı dener
  ├─ 5–10s   [RU] Rusça ses tanımayı dener
  ├─ 10–15s  [DE] Almanca ses tanımayı dener
  ├─ 15–20s  [IT] İtalyanca ses tanımayı dener  ← İtalyanca burada oy alır
  ├─ 20–25s  [FR] Fransızca ses tanımayı dener
  ├─ 25–30s  [ES] İspanyolca ses tanımayı dener
  └─ 30–35s  [TR] Türkçe ses tanımayı dener

Her adımda: transkript → Google Translate dil tespit API'si
  ├─ Dil onaylandı? → "LANGUAGE DETECTED: ITALIAN (92%)"
  │   → Speech API İtalyancaya geçer → sürekli çevirir
  └─ 30s'de bulunamazsa → "LANGUAGE NOT DETECTED — TRY AGAIN"
```

---

## Modlar

### ⬡ Otomatik Mod
- En iyi: bilinmeyen radyo istasyonları, WebSDR
- 7 dili 5'er saniyelik pencerelerle dener (toplam 35 saniye)
- 35 saniye boyunca oy toplar, en çok oy alan dili seçer, temiz alıma başlar

### 🎙️ Ses Modu
- En iyi: kaynak dili önceden biliyorsan
- Kaynak dili manuel seç → anında transkripsiyon + çeviri

### ·-· Mors Modu
- En iyi: CW (Continuous Wave) amatör radyo sinyalleri
- Nokta ve çizgileri Latin alfabesi karakterlerine dönüştürür
- Çeviri yok — ham çözülmüş metni gösterir
- Operatör hızına otomatik kalibrasyon (5–50+ WPM)

---

## Hızlı Başlangıç

### WebSDR ile (telefondan)
1. PC'nde [websdr.org](http://websdr.org) aç ve bir istasyona tun yap
2. **Telefonunda** RadioSub'ı aç
3. Hedef dili seç → **START RX** tıkla → telefonu PC hoparlörüne tut
4. Altyazılar gerçek zamanlı görünür

### Kendi Radyon / Telsizinle
1. Radyoyu istediğin frekansa ayarla
2. Telefonunda RadioSub'ı aç — **START RX** tıkla
3. Telefonu radyo hoparlörüne tut
4. Dil bilinmiyorsa **AUTO** modu kullan, biliyorsan **VOICE** seç

### Mors Alfabesi (CW)
1. **MORSE** modunu seç
2. CW sinyaline tun yap (WebSDR veya alıcında)
3. **START RX** tıkla — telefonu hoparlöre tut
4. Çözücü otomatik kalibre olur — çözülen karakterler tek tek görünür

### Daha İyi Ses Kalitesi
Arka plan gürültüsü olmadan daha temiz giriş için kablo kullan:
- 3.5mm ses kablosu: radyo/alıcı kulaklık çıkışı → telefon mikrofon girişi
- Ses, Otomatik ve Mors modlarında çalışır

---

## Tarayıcı Desteği

| Tarayıcı | Otomatik / Ses | Mors |
|----------|---------------|------|
| **Chrome** | ✅ | ✅ |
| **Edge** | ✅ | ✅ |
| Firefox | ❌ | ✅ |
| Safari | ⚠️ | ✅ |

> Ses tanıma (Otomatik + Ses modları) Chrome veya Edge gerektirir.
> Mors çözme tüm modern tarayıcılarda çalışır.

> ⚠️ **`file://` ile açma** — tarayıcı mikrofon iznini hatırlamaz, her açılışta sorar.
> Lokal test için `http://localhost` kullan veya GitHub Pages'e deploy et.

---

## Teknik Detaylar

### Otomatik Dil Tespiti
- Web Speech API, 7 dili 5'er saniyelik pencerelerle dener (EN→RU→DE→IT→FR→ES→TR) — 35 saniye boyunca oy toplar, en yüksek skor kazanır
- Her tanıma sonucunda (3+ kelime) Google Translate'in resmi olmayan detection endpoint'ini çağırır: `translate.googleapis.com/translate_a/single?client=gtx&sl=auto`
- API anahtarı gerekmez — Google Translate web arayüzünün kullandığı endpoint
- Tespit sonrası: Speech API onaylanan dile geçer, doğruluk artar

### Mors (CW) Çözücü
- 4096 noktalı FFT ile 350–1300 Hz aralığında ton varlığını tarar
- 750 Hz merkezli biquad bandpass filtre ile parazit azaltma
- İşaret süresi geçmişinin alt %40'ından adaptif nokta-birim tahmini
- Harf/kelime sınırları: sessizlik süresi oranları (3× ve 7× nokta birimi)
- Desteklenen hız: 5–50+ WPM, kendiliğinden kalibre olur

### İzin Tasarımı
- Ses/Otomatik: yalnızca **tek** izin diyaloğu (Web Speech API mikrofonu kendisi yönetiyor)
- Mors: tek `getUserMedia` çağrısı
- Çift izin diyaloğu yok

### Kullanılan Ücretsiz API'ler
| API | Amaç | Limit |
|-----|------|-------|
| Web Speech API | Konuşmadan metne | Tarayıcı dahili, ücretsiz |
| Google Translate (resmi olmayan) | Dil tespiti | Anahtar yok, limit yok |
| MyMemory | Çeviri (birincil) | Anonim 1000 kelime/gün |
| Lingva | Çeviri (yedek) | Topluluk barındırmalı |

---

## Proje Yapısı

```
radiosub/
├── index.html              Tek sayfalı uygulama
├── css/
│   └── style.css           Retro CRT fosfor terminal arayüzü
├── js/
│   ├── app.js              Ana kontrolcü, otomatik algılama mantığı
│   ├── speech.js           Web Speech API sarmalayıcısı + VU metre
│   ├── morse.js            CW çözücü (FFT + adaptif zamanlama)
│   ├── translator.js       Çeviri + dil tespiti servisi
│   └── i18n.js             TR/EN dil desteği + operatör kılavuzu
├── README.md               İngilizce dokümantasyon
├── README_TR.md            Türkçe dokümantasyon
├── LICENSE                 MIT
└── .gitignore
```


---

## Lisans

[MIT](LICENSE) — özgürce kullan, fork'la ve değiştir.

---

*Amatör radyo ve WebSDR topluluğu için yapıldı*
