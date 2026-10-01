# V55 — Web3Forms cache fix

- Originalni Web3Forms Access Key vezan je direktno uz HR i EN kontakt formu.
- `main.js` prvo čita ključ iz same forme, a `form-config.js` ostaje fallback.
- Runtime asseti dobili su novi `?v=55` cache-busting.
- `form-config.js` ima `Cache-Control: no-store` kako se stari ključ ne bi zadržavao u pregledniku/edge cacheu.
- Nisu mijenjani sadržaj, cijene, hCaptcha ni ostale V54/V53 funkcionalnosti.
