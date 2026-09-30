const KD_LANG=(document.documentElement.lang||'hr').toLowerCase().startsWith('en')?'en':'hr';
const KD_I18N={
  hr:{openMenu:'Otvori izbornik',closeMenu:'Zatvori izbornik',social:'poveznica još nije aktivirana.',preview:'Otvara se vaša e-mail aplikacija s već pripremljenim upitom.',sending:'Šaljem upit…',success:'Hvala! Upit je uspješno poslan. Javit ćemo vam se u najkraćem roku.',captchaLoading:'Sigurnosna provjera se još učitava. Pričekajte trenutak i pokušajte ponovno.',captchaRequired:'Prije slanja potvrdite da niste robot.',captchaRetry:'Molimo ponovno potvrdite sigurnosnu provjeru i pokušajte poslati upit.',error:'Upit se trenutačno nije mogao poslati. Nazovite nas ili pošaljite poruku putem WhatsAppa.',subject:'Upit za procjenu – Kristall Diamant',labels:{name:'Ime',phone:'Telefon',email:'E-mail',space:'Prostor',service:'Vrsta čišćenja',package:'Paket',area:'Površina',dirt:'Zaprljanost',location:'Lokacija',date:'Datum',message:'Poruka'}},
  en:{openMenu:'Open menu',closeMenu:'Close menu',social:'link is not active yet.',preview:'Your e-mail app is opening with the enquiry already prepared.',sending:'Sending enquiry…',success:'Thank you! Your enquiry has been sent successfully. We will get back to you as soon as possible.',captchaLoading:'The security check is still loading. Please wait a moment and try again.',captchaRequired:'Please confirm you are not a robot before submitting.',captchaRetry:'Please complete the security check again and resend your enquiry.',error:'The enquiry could not be sent at the moment. Please call us or send a WhatsApp message.',subject:'Estimate request – Kristall Diamant',labels:{name:'Name',phone:'Phone',email:'E-mail',space:'Space',service:'Type of cleaning',package:'Package',area:'Area',dirt:'Level of soiling',location:'Location',date:'Date',message:'Message'}}
};
const L=KD_I18N[KD_LANG];

// Premium brand reveal. Intro memory is used only when functional preferences are allowed.
const brandIntro=document.querySelector('[data-brand-intro]');
if(brandIntro){
  const params=new URLSearchParams(window.location.search);
  const forceIntro=params.has('intro');
  const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const cleanPath=location.pathname.replace(/index\.html$/,'').replace(/\/+$/,'/')||'/';
  const isHome=cleanPath==='/'||cleanPath==='/en/';
  if(!isHome){brandIntro.remove();}
  else{
    const preferenceAllowed=()=>window.KDConsent?.has('preferences')===true;
    let seen=false;
    if(preferenceAllowed()){try{if(forceIntro)sessionStorage.removeItem('kd-brand-intro');seen=sessionStorage.getItem('kd-brand-intro')==='1'}catch(e){}}
    if(seen&&!forceIntro){brandIntro.remove();}
    else{
      document.body.classList.add('intro-lock');
      requestAnimationFrame(()=>brandIntro.classList.add('play'));
      window.__kdIntroWasShown=true;
      if(preferenceAllowed()){try{sessionStorage.setItem('kd-brand-intro','1')}catch(e){}}
      const finish=()=>{document.body.classList.remove('intro-lock');brandIntro.remove();};
      window.setTimeout(finish,reduceMotion?260:2820);
    }
    window.addEventListener('kd:consentchange',e=>{if(e.detail?.preferences&&window.__kdIntroWasShown){try{sessionStorage.setItem('kd-brand-intro','1')}catch(err){}}});
  }
}

const menuBtn=document.querySelector('.menu-btn');
const mobileMenu=document.querySelector('.mobile-menu');
if(menuBtn&&mobileMenu){menuBtn.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open?'true':'false');menuBtn.setAttribute('aria-label',open?L.closeMenu:L.openMenu);document.body.style.overflow=open?'hidden':''});mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label',L.openMenu);document.body.style.overflow=''}));}

const mobileServicesToggle=document.querySelector('.mobile-submenu-toggle');
if(mobileServicesToggle){mobileServicesToggle.addEventListener('click',()=>{const group=mobileServicesToggle.closest('.mobile-nav-group');const open=group.classList.toggle('open');mobileServicesToggle.setAttribute('aria-expanded',open?'true':'false');});}

document.querySelectorAll('.nav-drop-btn').forEach(btn=>{btn.addEventListener('click',e=>{e.stopPropagation();const wrap=btn.closest('.nav-drop');wrap.classList.toggle('open');btn.setAttribute('aria-expanded',wrap.classList.contains('open')?'true':'false')})});
document.addEventListener('click',()=>document.querySelectorAll('.nav-drop.open').forEach(x=>x.classList.remove('open')));

document.querySelectorAll('.faq-btn').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');item.classList.toggle('open');btn.setAttribute('aria-expanded',item.classList.contains('open')?'true':'false')}));

if('IntersectionObserver' in window){const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.09});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}

const toast=document.querySelector('.toast');
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
document.querySelectorAll('.pending-social').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showToast(`${a.dataset.channel} ${L.social}`)}));

// Free-plan Web3Forms submission runs directly from the browser. The access key is public by design.
const form=document.querySelector('[data-contact-form]');
if(form){
  let submitting=false;
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const status=form.querySelector('.form-status');
    const setStatus=(message,type='')=>{
      if(!status)return;
      status.textContent=message||'';
      status.classList.remove('is-success','is-error','is-pending','is-warning');
      if(type)status.classList.add(`is-${type}`);
    };
    if(!form.checkValidity()){form.reportValidity();return;}
    if(submitting)return;
    const key=window.KDWeb3Forms?.accessKey;
    if(!key){setStatus(L.error,'error');return;}
    // The Web3Forms helper creates the h-captcha-response field when hCaptcha is ready.
    // Never submit an enquiry before the visitor completes the challenge.
    const captchaWidget=form.querySelector('.h-captcha');
    const captchaResponse=form.querySelector('[name="h-captcha-response"]');
    if(!captchaWidget || !captchaResponse){setStatus(L.captchaLoading,'warning');return;}
    const captchaToken=(captchaResponse.value||'').trim();
    if(!captchaToken){
      setStatus(L.captchaRequired,'warning');
      captchaWidget.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    const fd=new FormData(form);
    fd.set('access_key',key);
    fd.set('h-captcha-response',captchaToken);
    const button=form.querySelector('button[type="submit"]');
    submitting=true;
    if(button)button.disabled=true;
    setStatus(L.sending,'pending');
    try{
      const response=await fetch('https://api.web3forms.com/submit',{
        method:'POST',body:fd,headers:{Accept:'application/json'}
      });
      const data=await response.json();
      if(response.ok&&data.success===true){
        window.KDTrack?.event('kd_contact_form_success');
        form.reset();
        try{window.hcaptcha?.reset();}catch(_){}
        setStatus(L.success,'success');
      }else{
        throw new Error('Web3Forms submission rejected');
      }
    }catch(err){
      // A token must not be reused after a failed request or an expired challenge.
      try{window.hcaptcha?.reset();}catch(_){}
      setStatus(`${L.error} ${L.captchaRetry}`,'error');
    }finally{
      submitting=false;
      if(button)button.disabled=false;
    }
  });
}

// Final interaction polish: keyboard escape, responsive cleanup and correct ARIA state.
function kdCloseMenus(){
  if(mobileMenu){mobileMenu.classList.remove('open');}
  if(menuBtn){menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label',L.openMenu);}
  document.body.style.overflow='';
  document.querySelectorAll('.nav-drop.open').forEach(x=>{x.classList.remove('open');x.querySelector('.nav-drop-btn')?.setAttribute('aria-expanded','false')});
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')kdCloseMenus()});
window.addEventListener('resize',()=>{if(window.innerWidth>1020)kdCloseMenus()},{passive:true});
document.querySelectorAll('.faq-btn').forEach(btn=>{btn.setAttribute('aria-expanded',btn.closest('.faq-item')?.classList.contains('open')?'true':'false')});
