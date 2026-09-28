# Priprema Google Ads / GA4 / GTM mjerenja — V43

Postojeći `consent.js` ima kategorije privole i Consent Mode v2; `tracking.js` priprema događaje bez osobnih podataka. `GTM_ID` je prazan pa se nikakva Google skripta automatski ne učitava.

Kad vlasnik dostavi verificirani GTM ID, u `assets/js/tracking.js` zamijeniti prazan `GTM_ID`, a unutar GTM kontejnera konfigurirati GA4 tag, Google Ads Conversion ID i Label te pravila privole i objaviti kontejner. Provjeriti Tag Assistant i stvarne događaje prije nego što se oglasi optimiziraju prema konverzijama. Ako vlasnik koristi zasebni Meta Pixel, trebaju njegov ID i zasebna marketing-privola.

Dostupni dataLayer događaji: `kd_phone_click`, `kd_whatsapp_click`, `kd_email_click`, `kd_google_profile_click`, `kd_quote_click`, `kd_contact_form_success` (isključivo nakon Web3Forms potvrde). Nema PII ni slanja podataka prije analitičke ili marketinške privole. GTM oznakama treba zadati pojedinačne uvjete privole, tako da marketinške oznake ne pucaju na sam analitički pristanak.

Kontaktna forma još koristi zamjenski Web3Forms access key i otvara e-mail aplikaciju; taj događaj se NE bilježi kao potvrđena poslanna forma. Ova priprema nije potvrda da je stvarno mjerenje aktivno.
