/* Kristall Diamant: prepared conversion-event layer, no live identifiers in this preview. */
(() => {
  'use strict';
  const GTM_ID = ''; // Add the verified GTM-XXXXXXXX ID after owner's approval. Empty = zero Google requests.
  let loaded = false;
  window.dataLayer = window.dataLayer || [];
  const allowed = () => !!(window.KDConsent?.has('analytics') || window.KDConsent?.has('marketing'));
  function loadGTM(){
    if(loaded || !/^GTM-[A-Z0-9]+$/.test(GTM_ID) || !allowed()) return;
    loaded = true;
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(tag);
  }
  function track(eventName,details={}) {
    // No personally identifiable information or form contents enter dataLayer.
    if(!allowed())return;
    window.dataLayer.push({event:eventName,page_language:document.documentElement.lang==='en'?'en':'hr',...details});
  }
  window.KDTrack = {event:track};
  document.addEventListener('click',e=>{
    const a=e.target.closest?.('a[href]'); if(!a)return;
    const url=a.getAttribute('href') || '';
    if(url.startsWith('tel:'))track('kd_phone_click');
    else if(url.includes('wa.me/') || url.includes('whatsapp.com/'))track('kd_whatsapp_click');
    else if(url.startsWith('mailto:'))track('kd_email_click');
    else if(url.includes('rb.gy/c4fncm'))track('kd_google_profile_click');
    else if((url==='/kontakt/' || url==='/en/contact/') && (a.classList.contains('btn') || a.classList.contains('floating-cta')))track('kd_quote_click');
  },{passive:true});
  window.addEventListener('kd:consentchange',loadGTM);
  loadGTM();
})();
