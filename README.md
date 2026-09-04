# Kristall Diamant — premium redizajn v2

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
5. Zamijeniti dekorativne preview fotografije originalnim fotografijama vlasnika prije produkcije. Nema lažnih fotografija tima. Before/after sekcija je jasno označena kao placeholder u previewu.
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
