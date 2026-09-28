# V44 — aktivirano GA4 mjerenje uz analitičku privolu

Aktualna GA4 Measurement ID: `G-HQ6KFSQ503` (prepisana iz vlasnikove tekstualne potvrde).

Na svih 38 HR/EN HTML stranica `consent.js` se izvršava prije `tracking.js`. Google Analytics `gtag.js` učitava se samo nakon prihvaćanja **analitičkih** kolačića (basic consent mode). Prije privole, nakon odbijanja ili kada korisnik prihvati samo marketing, nema zahtjeva prema Google Analyticsu. Prilikom povlačenja analitičke privole stranica se ponovno učitava bez Google oznake. Consent Mode v2 signali su zadržani.

GA4 događaji: `generate_lead` (isključivo nakon uspješnog Web3Forms API odgovora), `click_phone`, `click_whatsapp`, `click_email`, `click_sms`, `click_viber`, `click_estimate` (klik CTA gumba, nije potvrđen upit), `click_google_profile`.

Ne šaljemo vlasnikove niti korisnikove osobne podatke, sadržaj obrasca, telefonske brojeve ili e-mail adrese kao parametre. Oznaka se učitava samo jednom po stranici. Postojeći GTM container `GTM-NCDJRNZW`, GT tagovi i Ads AW tag ovdje NISU uključeni, kako se ne bi napravila dvostruka GA4 mjerenja ili nekontrolirani marketinški zahtjevi.

Kontaktni obrazac u izvornom V43 i dalje koristi `YOUR_WEB3FORMS_ACCESS_KEY` i mailto fallback; stoga se `generate_lead` neće zabilježiti dok se ne konfigurira važeći ključ i dok Web3Forms ne potvrdi uspješno slanje. Ovo nije implementacija stvarnog praćenja ostvarenih telefonskih razgovora, već klikova na `tel:`.

Nakon objave na stvarnoj domeni provjeriti GA4 Realtime / DebugView i preglednikom network requests nakon prihvaćanja/odbijanja; potom u GA4 označiti `generate_lead` kao ključni događaj. Za Google Ads import treba povezati odgovarajuće GA4 i Ads račune i podesiti konverzije u računu. **Ne uključivati dodatni GA4/GTM tag na istu stranicu bez revizije** jer bi mogao duplicirati page_view ili događaje.
