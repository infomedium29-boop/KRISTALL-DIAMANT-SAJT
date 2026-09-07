(() => {
  'use strict';
  const KEY = 'kd-consent-v2';
  const VERSION = 2;
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const defaults = { necessary: true, preferences: false, analytics: false, marketing: false };
  let current = { ...defaults };
  let storedValid = false;

  const now = Date.now();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const valid = parsed && parsed.version === VERSION && parsed.timestamp && (now - parsed.timestamp) < MAX_AGE;
      if (valid) {
        current = { ...defaults, ...parsed.categories, necessary: true };
        storedValid = true;
      } else {
        localStorage.removeItem(KEY);
      }
    }
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  const applyGoogleConsent = (c, mode = 'default') => {
    window.gtag('consent', mode, {
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied',
      analytics_storage: c.analytics ? 'granted' : 'denied',
      functionality_storage: c.preferences ? 'granted' : 'denied',
      personalization_storage: c.preferences ? 'granted' : 'denied',
      security_storage: 'granted',
      wait_for_update: mode === 'default' ? 500 : undefined
    });
  };
  applyGoogleConsent(current, 'default');

  const loadDeferred = (category) => {
    document.querySelectorAll(`script[type="text/plain"][data-consent="${category}"]:not([data-consent-loaded])`).forEach(old => {
      const script = document.createElement('script');
      [...old.attributes].forEach(a => {
        if (!['type','data-consent','data-src'].includes(a.name)) script.setAttribute(a.name, a.value);
      });
      if (old.dataset.src) script.src = old.dataset.src;
      else script.textContent = old.textContent;
      script.dataset.consentLoaded = '1';
      old.dataset.consentLoaded = '1';
      old.after(script);
    });
    document.querySelectorAll(`[data-consent-src][data-consent="${category}"]:not([data-consent-loaded])`).forEach(el => {
      el.src = el.dataset.consentSrc;
      el.dataset.consentLoaded = '1';
    });
  };

  const apply = (c) => {
    current = { ...defaults, ...c, necessary: true };
    applyGoogleConsent(current, 'update');
    ['preferences','analytics','marketing'].forEach(cat => { if (current[cat]) loadDeferred(cat); });
    document.documentElement.dataset.consentPreferences = current.preferences ? 'granted' : 'denied';
    document.documentElement.dataset.consentAnalytics = current.analytics ? 'granted' : 'denied';
    document.documentElement.dataset.consentMarketing = current.marketing ? 'granted' : 'denied';
    window.dispatchEvent(new CustomEvent('kd:consentchange', { detail: { ...current } }));
  };

  const save = (categories) => {
    const normalized = { ...defaults, ...categories, necessary: true };
    try {
      localStorage.setItem(KEY, JSON.stringify({ version: VERSION, timestamp: Date.now(), categories: normalized }));
    } catch (e) {}
    storedValid = true;
    apply(normalized);
  };

  window.KDConsent = {
    get: () => ({ ...current }),
    has: (category) => category === 'necessary' ? true : !!current[category],
    save,
    open: () => openSettings()
  };

  const banner = document.querySelector('[data-consent-banner]');
  const modal = document.querySelector('[data-consent-modal]');
  let previousFocus = null;

  const syncToggles = () => {
    document.querySelectorAll('[data-consent-category]').forEach(input => {
      input.checked = !!current[input.dataset.consentCategory];
    });
  };
  const hideBanner = () => { if (banner) { banner.hidden = true; banner.classList.remove('is-visible'); } };
  const showBanner = () => {
    if (!banner || storedValid) return;
    banner.hidden = false;
    requestAnimationFrame(() => banner.classList.add('is-visible'));
  };
  const openSettings = () => {
    if (!modal) return;
    previousFocus = document.activeElement;
    syncToggles();
    modal.hidden = false;
    document.body.classList.add('consent-lock');
    requestAnimationFrame(() => modal.classList.add('is-visible'));
    setTimeout(() => modal.querySelector('[data-consent-category]:not(:disabled)')?.focus(), 60);
  };
  const closeSettings = () => {
    if (!modal) return;
    modal.classList.remove('is-visible');
    document.body.classList.remove('consent-lock');
    setTimeout(() => { modal.hidden = true; previousFocus?.focus?.(); }, 180);
  };

  document.querySelectorAll('[data-consent-accept]').forEach(btn => btn.addEventListener('click', () => {
    save({ preferences:true, analytics:true, marketing:true });
    hideBanner(); closeSettings();
  }));
  document.querySelectorAll('[data-consent-reject]').forEach(btn => btn.addEventListener('click', () => {
    save({ preferences:false, analytics:false, marketing:false });
    hideBanner(); closeSettings();
  }));
  document.querySelectorAll('[data-consent-settings], [data-open-cookie-settings]').forEach(btn => btn.addEventListener('click', openSettings));
  document.querySelectorAll('[data-consent-close]').forEach(btn => btn.addEventListener('click', closeSettings));
  document.querySelector('[data-consent-save]')?.addEventListener('click', () => {
    const selected = { preferences:false, analytics:false, marketing:false };
    document.querySelectorAll('[data-consent-category]').forEach(input => selected[input.dataset.consentCategory] = input.checked);
    save(selected); hideBanner(); closeSettings();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal && !modal.hidden) closeSettings(); });

  apply(current);
  if (!storedValid) setTimeout(showBanner, 650);
})();
