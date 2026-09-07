const KD_LANG=(document.documentElement.lang||'hr').toLowerCase().startsWith('en')?'en':'hr';
const KD_I18N={
  hr:{openMenu:'Otvori izbornik',closeMenu:'Zatvori izbornik',social:'profil je predviđen u dizajnu. Poveznicu ćemo aktivirati čim vlasnik potvrdi točan profil.',preview:'Preview: otvara se e-mail. Nakon dodavanja Web3Forms ključa forma će slati izravno sa stranice.',sending:'Šaljem upit…',success:'Hvala! Upit je uspješno poslan. Javit ćemo vam se u najkraćem roku.',error:'Upit se trenutačno nije mogao poslati. Nazovite nas ili pošaljite poruku putem WhatsAppa.',subject:'Upit za procjenu – Kristall Diamant',labels:{name:'Ime',phone:'Telefon',email:'E-mail',space:'Prostor',service:'Vrsta čišćenja',package:'Paket',area:'Površina',dirt:'Zaprljanost',location:'Lokacija',date:'Datum',message:'Poruka'}},
  en:{openMenu:'Open menu',closeMenu:'Close menu',social:'profile is included in the design. We will activate the link as soon as the owner confirms the correct profile.',preview:'Preview: your e-mail app will open. Once the Web3Forms key is added, the form will submit directly from the website.',sending:'Sending enquiry…',success:'Thank you! Your enquiry has been sent successfully. We will get back to you as soon as possible.',error:'The enquiry could not be sent at the moment. Please call us or send a WhatsApp message.',subject:'Estimate request – Kristall Diamant',labels:{name:'Name',phone:'Phone',email:'E-mail',space:'Space',service:'Type of cleaning',package:'Package',area:'Area',dirt:'Level of soiling',location:'Location',date:'Date',message:'Message'}}
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

const form=document.querySelector('[data-contact-form]');
if(form){form.addEventListener('submit',async(e)=>{e.preventDefault();const status=form.querySelector('.form-status');if(!form.checkValidity()){form.reportValidity();return}const fd=new FormData(form);const key=(fd.get('access_key')||'').toString();if(!key||key==='YOUR_WEB3FORMS_ACCESS_KEY'){const vals=Object.fromEntries(fd.entries());const x=L.labels;const body=`${x.name}: ${vals.name||''}\n${x.phone}: ${vals.phone||''}\n${x.email}: ${vals.email||''}\n${x.space}: ${vals.space||''}\n${x.service}: ${vals.service||''}\n${x.package}: ${vals.package||''}\n${x.area}: ${vals.area||''} m²\n${x.dirt}: ${vals.dirt||''}/10\n${x.location}: ${vals.location||''}\n${x.date}: ${vals.date||''}\n\n${x.message}:\n${vals.message||''}`;status.textContent=L.preview;window.location.href=`mailto:info@ciscenjekristalldiamant.hr?subject=${encodeURIComponent(L.subject)}&body=${encodeURIComponent(body)}`;return;}status.textContent=L.sending;try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',body:fd});const data=await r.json();if(data.success){form.reset();status.textContent=L.success}else throw new Error()}catch(err){status.textContent=L.error}})}
