# V46 — Web3Forms Free integracija

- HR i EN obrasci učitavaju jedan zajednički `assets/js/form-config.js` s javnim Web3Forms Access Key identifikatorom.
- Izbačen rezervni `mailto:` put i placeholder `YOUR_WEB3FORMS_ACCESS_KEY` iz HTML-a.
- Izravni browser-side POST na `https://api.web3forms.com/submit`, sukladno Free paketu. Nema Cloudflare server-side proxyja ni dupliciranih ključeva u HTML-u.
- Gumb se onemogućuje tijekom slanja. Poruka o uspjehu i GA4 događaj `generate_lead` slijede tek nakon `response.ok && data.success === true`.
- Stvarna dostava na `kristalldiamant.zagreb@gmail.com` nije provjerena lokalno: nakon objave poslati po jedan probni upit s HR i EN kontakt stranice i potvrditi primanje u inboxu/spamu.
- Ako se želi skriveni server-side ključ, to nije podržan put za Web3Forms Free plan bez nadogradnje i omogućene serverske IP adrese.
