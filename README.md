# Kristall Diamant — premium redizajn V12

Deploy-ready statički višestranični site za GitHub + Cloudflare Pages.

## Deploy na Cloudflare Pages
- Framework preset: **None**
- Build command: **ostavite prazno**
- Build output directory: **/** (root repozitorija)
- Ako Cloudflare traži direktorij, koristite `.`

## Prije spajanja glavne domene OBAVEZNO
1. Ne dirati postojeći WordPress dok Google Ads rade. Novi site prvo testirati na Cloudflare preview URL-u.
2. U `kontakt/index.html` zamijeniti `YOUR_WEB3FORMS_ACCESS_KEY` stvarnim Web3Forms ključem. Dok ključ nije postavljen, forma otvara e-mail kao fallback.
3. Potvrditi završni cjenik vlasnika i unijeti iznose u `/cijene/`. Namjerno nismo prenijeli stare iznose kao konačne.
4. Potvrditi Facebook, YouTube i TikTok URL-ove. Instagram je povezan na javno pronađen profil `@ciscenje.kristall.diamant`. Ostali su u previewu vidljivi, ali klik prikazuje poruku da profil treba potvrditi.
5. Trenutne dekorativne fotografije su optimizirani AVIF vizuali i ne predstavljaju se kao stvarne reference klijenta. Kada vlasnik dostavi originalne fotografije rada i before/after materijal, mogu se zamijeniti bez promjene layouta.
6. Provjeriti URL-ove koje koriste postojeće Google Ads kampanje i dopuniti `_redirects` ako postoji landing URL koji nije na popisu.
7. Tek nakon testiranja formi, 301 redirekcija, mobilne verzije i kampanja spojiti `ciscenjekristalldiamant.hr` na novi Cloudflare projekt.

## Službeni podaci korišteni u ovoj verziji
- Kristall Diamant, obrt za usluge
- vl. Tamara Karakhanova
- Tršćanska 1, Zagreb
- OIB 01142261377
- MBS 98615220
- Telefon 097 752 4712
- E-mail info@ciscenjekristalldiamant.hr

## Struktura
Naslovna, O nama, Usluge, Cijene, Paketi, Recenzije, Blog, Kontakt, Posao, pravne stranice i pojedinačni SEO landing pageovi usluga.

## V12 izmjene
- Svaka usluga s početne stranice sada vodi na vlastitu podstranicu, uključujući novu stranicu **Čišćenje po dogovoru**.
- Desktop padajući izbornik **Usluge** sadrži sve podstranice usluga.
- Mobilni izbornik ima zaseban proširivi podizbornik **Usluge**, složen u kompaktan dvostupčani prikaz.
- Mobilni brzi kontakti redizajnirani su u urednu 3×3 mrežu s ikonama i punim nazivima umjesto kratica TEL / WA / SMS / VIB / MAIL / IG / FB / YT / TT.
- Breadcrumb naslovi poput „Naslovna / O nama“ ostaju uklonjeni.

## GDPR / kolačići (V13)
- Dodan je consent manager s jednakom mogućnošću prihvaćanja i odbijanja neobaveznih kategorija.
- Neobavezne kategorije su početno isključene.
- Postavke se mogu ponovno otvoriti iz footera.
- Privola se pamti 180 dana u `kd-consent-v2` i zatim ponovno traži.
- `consent.js` podržava odgođeno učitavanje skripti označenih kao `type="text/plain" data-consent="analytics|marketing|preferences"` i Google Consent Mode v2 ako se kasnije uvedu Google oznake.
- Trenutačna verzija ne učitava Google Analytics, Meta Pixel ni Google Ads tracking oznake; prije dodavanja takvih alata ažurirati popis tehnologija u `/kolacici/`.
