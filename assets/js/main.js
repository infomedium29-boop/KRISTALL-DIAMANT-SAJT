// Premium brand reveal – prikazuje se jednom po sesiji. Dodaj ?intro=1 za ponovni pregled.
const brandIntro=document.querySelector('[data-brand-intro]');
if(brandIntro){
  const params=new URLSearchParams(window.location.search);
  const forceIntro=params.has('intro');
  const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let seen=false;
  try{
    if(forceIntro){sessionStorage.removeItem('kd-brand-intro');document.documentElement.classList.remove('intro-seen');}
    seen=sessionStorage.getItem('kd-brand-intro')==='1';
  }catch(e){}
  if(seen&&!forceIntro){
    brandIntro.remove();
  }else{
    document.body.classList.add('intro-lock');
    requestAnimationFrame(()=>brandIntro.classList.add('play'));
    try{sessionStorage.setItem('kd-brand-intro','1')}catch(e){}
    const finish=()=>{document.body.classList.remove('intro-lock');brandIntro.remove();};
    window.setTimeout(finish,reduceMotion?260:2820);
  }
}

const menuBtn=document.querySelector('.menu-btn');
const mobileMenu=document.querySelector('.mobile-menu');
if(menuBtn&&mobileMenu){menuBtn.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open?'true':'false');document.body.style.overflow=open?'hidden':''});mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');document.body.style.overflow=''}));}

document.querySelectorAll('.nav-drop-btn').forEach(btn=>{btn.addEventListener('click',e=>{e.stopPropagation();const wrap=btn.closest('.nav-drop');wrap.classList.toggle('open');btn.setAttribute('aria-expanded',wrap.classList.contains('open')?'true':'false')})});
document.addEventListener('click',()=>document.querySelectorAll('.nav-drop.open').forEach(x=>x.classList.remove('open')));

document.querySelectorAll('.faq-btn').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');item.classList.toggle('open');btn.setAttribute('aria-expanded',item.classList.contains('open')?'true':'false')}));

if('IntersectionObserver' in window){const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.09});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}

const cookie=document.querySelector('.cookie');if(cookie&&!localStorage.getItem('kd-cookie-info')){setTimeout(()=>cookie.classList.add('show'),700)}document.querySelector('[data-cookie-ok]')?.addEventListener('click',()=>{localStorage.setItem('kd-cookie-info','1');cookie.classList.remove('show')});

const toast=document.querySelector('.toast');
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
document.querySelectorAll('.pending-social').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showToast(`${a.dataset.channel} profil je predviđen u dizajnu. Poveznicu ćemo aktivirati čim vlasnik potvrdi točan profil.`)}));

const form=document.querySelector('[data-contact-form]');
if(form){form.addEventListener('submit',async(e)=>{e.preventDefault();const status=form.querySelector('.form-status');if(!form.checkValidity()){form.reportValidity();return}const fd=new FormData(form);const key=(fd.get('access_key')||'').toString();if(!key||key==='YOUR_WEB3FORMS_ACCESS_KEY'){const vals=Object.fromEntries(fd.entries());const body=`Ime: ${vals.name||''}\nTelefon: ${vals.phone||''}\nE-mail: ${vals.email||''}\nProstor: ${vals.space||''}\nVrsta čišćenja: ${vals.service||''}\nPaket: ${vals.package||''}\nPovršina: ${vals.area||''} m²\nZaprljanost: ${vals.dirt||''}/10\nLokacija: ${vals.location||''}\nDatum: ${vals.date||''}\n\nPoruka:\n${vals.message||''}`;status.textContent='Preview: otvara se e-mail. Nakon dodavanja Web3Forms ključa forma će slati izravno sa stranice.';window.location.href=`mailto:info@ciscenjekristalldiamant.hr?subject=${encodeURIComponent('Upit za procjenu – Kristall Diamant')}&body=${encodeURIComponent(body)}`;return;}status.textContent='Šaljem upit…';try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',body:fd});const data=await r.json();if(data.success){form.reset();status.textContent='Hvala! Upit je uspješno poslan. Javit ćemo vam se u najkraćem roku.'}else throw new Error()}catch(err){status.textContent='Upit se trenutačno nije mogao poslati. Nazovite nas ili pošaljite poruku putem WhatsAppa.'}})}
