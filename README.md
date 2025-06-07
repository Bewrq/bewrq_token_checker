# Discord Token Doğrulama ve Filtreleme Aracı

Bu proje, elinizde bulunan Discord tokenlerini hızlı ve güvenli bir şekilde kontrol ederek geçerli ve doğrulanmış (verified) olanları ayıklamanıza yardımcı olur.

## Özellikler

- **Toplu Token Kontrolü:** `token.txt` dosyasındaki tüm tokenleri otomatik olarak kontrol eder.
- **Geçerli Tokenleri Kaydetme:** Giriş yapılabilen, geçerli tüm tokenleri `fixtoken.txt` dosyasına kaydeder.
- **Doğrulanmış Tokenleri Ayırma:** E-posta veya telefon doğrulaması tamamlanmış tokenleri ayrıca `dogrulanmis.txt` dosyasına kaydeder.
- **Anlık Kayıt:** Doğrulanmış tokenler bulunduğu anda hemen dosyaya eklenir.
- **İlerleme Göstergesi:** Terminalde işlem ilerlemesini ve istatistikleri gösterir.
- **Hız Ayarı:** Token kontrol hızını güvenli bir şekilde ayarlayabilirsiniz.

## Kullanım

1. Tokenlerinizi `token.txt` dosyasına her satıra bir token gelecek şekilde ekleyin.
2. Projeyi başlatın:
   ```bash
  npm i 
   ```  
   ```bash
   node bewrq_tokenhecker.js
   ```
3. İşlem tamamlandığında:
   - Geçerli tokenler `fixtoken.txt` dosyasında,
   - Doğrulanmış tokenler ise `dogrulanmis.txt` dosyasında bulunur.

## Uyarı

- Bu araç sadece kendi hesaplarınız ve yasal kullanım için tasarlanmıştır.
- Amk hep rexa Yüzünden yaptımm 
-sistemi Rexa yüzünden yaptık bu suncumuza gelmek isterseniz sizi https://discord.gg/vesperion 

---

**Geliştirici:** bewrq/Ramalcım mucuk 
**Amaç:** Discord tokenlerini hızlı ve güvenli şekilde filtrelemek.
