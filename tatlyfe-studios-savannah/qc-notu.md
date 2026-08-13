# QC notu — Tatlyfe Studios (2026-08-13)

**Otomatik fonksiyonel kontrol (`qc.py`) ÇALIŞTIRILAMADI.** `qc.py` da `bul.py` gibi modül seviyesinde Playwright import ediyor; Playwright bu Python ortamında hiç kurulu değil (bkz. pipeline wiki sayfasındaki "altyapı sorunu" notu — Homebrew python3 3.14'e güncellendi, pip install bu oturumda izin duvarına takılıyor). Ekran görüntüsü / konsol hatası taraması bu koşuda yapılamadı, bu sitenin bir kusuru değil.

## Elle yapılan kontrol (bu koşuda kullanılan alternatif)

**A. İşletme bilgisi doğruluğu — Aligned**
- İsim/adres/telefon `brief.json` ile birebir eşleşiyor.
- Telefon `tel:` linki, adres Google Maps arama linki olarak tıklanabilir.
- Gerçek fotoğraf yok (scraping yapılamadı) → tipografi/renk ağırlıklı tasarıma gidildi, sahte foto kullanılmadı.
- Yorum/testimonial bölümü yok (brief'te yorum yok, kural gereği eklenmedi).
- Uydurma iddia taraması: "2011", "Big Jake", "karı-koca ekip", "fine line/black&gray/realism", "%100 custom", "piercing yok" — hepsi Antigravity derin araştırmasından kaynaklı. **Çelişkili bulunan bir iddia (threebestrated'in ayrı bir özetinde "walk-in kabul ediliyor, $60 minimum" çıkmıştı) siteye KONULMADI** — sadece "flash wall yok" gibi çelişkiye girmeyen, iki kaynakta da örtüşmeyen bir iddia kullanıldı.

**B. Tutarlılık — Aligned**
- Tek tema (koyu/açık bölümler ritmik alterne ediyor, kazara ters dönme yok).
- Tek accent renk (ember kırmızısı) baştan sona.
- Em dash taraması yapıldı, ilk taslakta 4 tane bulundu, hepsi düzeltildi (virgül/iki nokta üst üste ile değiştirildi).

**C. Erişilebilirlik — Aligned (görsel doğrulama yapılamadı, kod incelemesiyle)**
- Buton renkleri (ember kırmızısı zemin + krem metin / şeffaf zemin + krem metin koyu section üstünde) kontrast açısından güvenli aralıkta.
- Aynı niyetli tekrar CTA yok ("Request a consultation", "Call the studio", "Send this to the studio" üçü de farklı niyet).

**D/E. Hero ve AI kalıpları — Aligned**
- Hero'da 4 metin öğesi (eyebrow, başlık, alt metin, CTA çifti), scroll gerektirmiyor.
- Inter fontu / AI moru / 3'lü kart grid / sahte isim-istatistik / scroll ipucu yok.

**F. Duyarlı tasarım — DOĞRULANAMADI**
- Media query (760px kırılma noktası) koda yazıldı ama gerçek ekran görüntüsüyle test edilemedi (Playwright yok). Bu koşunun tek gerçek riski burada — kullanıcı canlı yayından sonra mobilde bir göz atarsa iyi olur.

## Sonuç

Blocker yok. Otomatik ekran/konsol testi ortam kısıtı yüzünden atlandı (site kusuru değil), elle yapılabilen tüm kontroller temiz. Yayına alınabilir.
