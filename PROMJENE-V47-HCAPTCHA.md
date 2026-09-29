# V47 — hCaptcha / Web3Forms Free

- Na HR `/kontakt/` i EN `/en/contact/` obrazac dodana hCaptcha prema službenoj Web3Forms dokumentaciji, s njihovom integracijskom skriptom i bez posebnog korisničkog hCaptcha ključa.
- Prije browser-side Web3Forms slanja provjerava se da je hCaptcha učitana i riješena; token se šalje kao `h-captcha-response`.
- Uspjeh, reset obrasca i GA4 `generate_lead` događaj izvršavaju se samo nakon potvrde uspješnog slanja. CAPTCHA se resetira nakon uspjeha ili neuspjelog pokušaja.
- Zadržani su postojeći dizajn, Web3Forms Access Key, kontakt podaci, Free plan i svi CSV/XML cjenici.
- Dopunjene HR/EN politike privatnosti informacijama o upotrebi hCaptcha.

## Točan redoslijed objave

1. Dok je Web3Forms CAPTCHA Protection = None/Off, objaviti V47 preko GitHuba i pričekati zeleni Cloudflare deployment.
2. Otvoriti HR i EN kontakt stranicu te provjeriti prikazuje li se CAPTCHA widget. Ako se ne učita, ne uključivati obvezu CAPTCHA-e dok se to ne riješi.
3. U Web3Forms Dashboard → Security Settings → Captcha Protection odabrati hCaptcha i kliknuti Save Settings.
4. Testirati da se upit BEZ potvrde CAPTCHA-e ne šalje; zatim riješiti CAPTCHA-u i poslati po jedan testni upit na HR i EN stranici. Provjeriti potvrdu na webu i dostavu e-maila.
5. GA4 `generate_lead` dodatno provjeriti samo uz odobrene analitičke kolačiće.

Cloudflare `WEB3FORMS_ACCESS_KEY` Secret u ovom browser-side Free rješenju se NE koristi; ne treba ga podešavati.
