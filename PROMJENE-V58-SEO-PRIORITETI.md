# Kristall Diamant V58 — premium isticanje SEO prioriteta

- Nova premium sekcija odmah nakon hero fotografije na HR i EN naslovnici: redovno čišćenje stubišta i redovno održavanje stanova i kuća.
- Stilski usklađene kartice s AVIF fotografijama, izravnim linkovima na usluge i kontakt CTA gumbima.
- Dodatni brzi CTA za mobilne korisnike unutar sekcije. Postojeća mobilna plutajuća traka (poziv/WhatsApp/procjena) ostaje netaknuta: izbjegnut drugi popup koji bi prekrivao sadržaj.
- Usluge / Services dobivaju diskretne poveznice na dvije fokusne usluge.
- Naslovi i metapodaci naslovnica i četiri fokusne podstranice prilagođeni su lokalnim ključnim riječima (bez mijenjanja URL-ova).
- Kontaktne forme mogu prepoznati `?interest=stairwells` i `?interest=homes`, prikazati kontekst i unaprijed odabrati redovno čišćenje. Posjetitelj može promijeniti polja.
- Zadržani svi prethodni Web3Forms/hCaptcha/GA4/cookie mehanizmi, postojeći kontakt i cijene.
- Novi `priority-v58.css` učitava se nakon ostatka teme samo na relevantnim stranicama. `main.js` cache verzija podignuta na 58.
- Arhiva `KRISTALL DIAMANT SAJT(2).zip` sadržavala je cijelu `.git` povijest i višak ugniježđenih mapa; produkcijski ZIP sadrži samo sadržaj web root direktorija.
- Ako se pokreće `build_site.py`, ponovno primijenite V58 izmjene jer su dorađeni već generirani HTML dokumenti.

## Nakon deploya
1. Provjeriti prikaz na desktopu/mobitelu za `/` i `/en/`.
2. Provjeriti dva CTA-a: `/kontakt/?interest=stairwells` i `/kontakt/?interest=homes`, te EN par.
3. Provjeriti da upiti normalno stižu na aktivni Gmail kroz Web3Forms (bez stvarnog produkcijskog slanja tijekom izrade).
4. U Google Search Consoleu zatražiti ponovno indeksiranje za naslovnicu i dvije prioritetne usluge.
