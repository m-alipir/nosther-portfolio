# Nosther Portfolio V1 — V2 Başlangıç Notu

## Proje özeti

- İki dilli (TR/EN) kişisel video editör portföy sitesidir.
- Ana konumlandırma: **Video Editor for Creators & Brands**
- Marka:
  - **ALI**
  - **Creator behind N0STHER**
- Otomotiv işleri portföy örnekleridir; sitenin genel konumlandırması değildir.

## V1’de tamamlananlar

- TR/EN dil sistemi
- Tarayıcı diline göre otomatik seçim
- Manuel dil değiştirme ve localStorage kalıcılığı
- Hero, Selected Work, Services, NoteZ ve About bölümleri
- Responsive tasarım
- Custom cursor ve magnetic button etkileşimleri
- GSAP ve Lenis
- Reduced motion desteği
- SEO, Open Graph, sitemap, robots.txt ve JSON-LD
- CSP ve security header’lar
- Optimize edilmiş video ve görseller

## Önemli mevcut davranışlar

- Proje videoları masaüstünde hover/focus ile oynar.
- Aynı anda yalnızca bir preview video oynar.
- Touch cihazlarda ve reduced-motion durumunda poster gösterilir.
- Custom cursor yalnız uygun masaüstü pointer ortamında çalışır.
- Portrait/avatar kaynağı:
  - `public/media/portrait/Logo.png`

## Teknik durum

- V1 production ortamında test edildi.
- Video hover ve custom cursor production sorunları düzeltildi.
- EN/TR, medya, responsive, interaction, CSP ve security header testleri geçti.
- Console ve production logları temizdi.
- GitHub ve Vercel bağlantıları ayrıca verilmiştir.

## V2 için çalışma kuralları

- Önce mevcut repository ve component mimarisini incele.
- V1’de çalışan responsive, dil, erişilebilirlik, reduced-motion ve güvenlik davranışlarını bozma.
- Büyük yeniden yazım yerine küçük ve kontrollü iterasyonlarla ilerle.
- Her önemli değişiklikten sonra lint, typecheck, production build, desktop/mobile, TR/EN ve console kontrolü yap.
- Production öncesi Preview deployment üzerinde doğrula.
- Kullanıcı onayı olmadan büyük tasarım değişikliği veya production promote yapma.

## İlk görev

1. Repository yapısını incele.
2. Kullanılan framework, paketler ve component mimarisini özetle.
3. Mevcut V1 tasarım dilini kısa şekilde çıkar.
4. V2 hedeflerini kullanıcıyla netleştir.
5. Çalışmayı küçük fazlara böl.
