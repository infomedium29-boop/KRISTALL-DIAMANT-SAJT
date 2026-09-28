/* Kristall Diamant V44 — GA4 (direct Google tag), consent-first implementation.
 * Google Tag Manager and Google Ads tags are deliberately NOT loaded here.
 * Never include names, telephone numbers, email addresses or message bodies in analytics events.
 */
(() => {
  'use strict';
  const GA4_ID = 'G-HQ6KFSQ503';
  const GA4_EVENTS = Object.freeze({
    kd_contact_form_success: 'generate_lead',
    kd_phone_click: 'click_phone',
    kd_whatsapp_click: 'click_whatsapp',
    kd_email_click: 'click_email',
    kd_sms_click: 'click_sms',
    kd_viber_click: 'click_viber',
    kd_quote_click: 'click_estimate',
    kd_google_profile_click: 'click_google_profile'
  });
  const language = document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'hr';
  let initialized = false;
  const analyticsAllowed = () => window.KDConsent?.has('analytics') === true;

  // BASIC consent mode: do not request any Google tag (not even a denied-consent ping)
  // before explicit analytics consent. consent.js queues the v2 consent defaults first.
  function initializeGA4() {
    if (initialized || !analyticsAllowed()) return;
    initialized = true;
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, {
      send_page_view: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
    document.head.appendChild(tag);
  }

  function track(internalName) {
    // Form fields and URL query strings are never forwarded as event properties.
    const eventName = GA4_EVENTS[internalName];
    if (!eventName || !analyticsAllowed() || !initialized) return;
    window.gtag('event', eventName, { page_language: language });
  }
  window.KDTrack = { event: track };

  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (/^tel:/i.test(href)) track('kd_phone_click');
    else if (/\b(?:wa\.me|whatsapp\.com)\//i.test(href)) track('kd_whatsapp_click');
    else if (/^mailto:/i.test(href)) track('kd_email_click');
    else if (/^sms:/i.test(href)) track('kd_sms_click');
    else if (/^viber:/i.test(href)) track('kd_viber_click');
    else if (href.includes('rb.gy/c4fncm')) track('kd_google_profile_click');
    else {
      let url;
      try { url = new URL(href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin || !/^\/(?:kontakt|en\/contact)\/?$/.test(url.pathname)) return;
      // Only genuine enquiry CTAs, not language switches or ordinary navigation links.
      const isCTA = a.matches('.btn, .mobile-sticky a, .floating-cta') ||
        /(?:procjen|upit|estimate|quote)/i.test(a.textContent || '');
      if (isCTA) track('kd_quote_click');
    }
  }, { passive: true });

  window.addEventListener('kd:consentchange', initializeGA4);
  initializeGA4();
})();
