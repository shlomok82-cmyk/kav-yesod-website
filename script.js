// set year
document.getElementById("year").textContent = new Date().getFullYear();

// translation map (Hebrew = default)
const translations = {
	en: {
		'brand.he': 'BaseLine',
		'brand.en': 'BaseLine',
		'nav.services': 'Services',
		'nav.about': 'About',
		'nav.approach': 'Approach',
		'nav.contact': 'Contact',
		'cta.contact': 'Contact Us',
		'hero.title': 'Connecting idea to reality.'
	},
	he: {
		'brand.he': 'קו יסוד',
		'brand.en': 'BaseLine',
		'nav.services': 'שירותים',
		'nav.about': 'אודות',
		'nav.approach': 'איך אני עובד',
		'nav.contact': 'יצירת קשר',
		'cta.contact': 'דברו איתי',
		'hero.title': 'חיבור בין רעיון למציאות.'
	}
};

function applyTranslations(lang){
	document.documentElement.lang = (lang === 'he') ? 'he' : 'en';
	document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';
	document.querySelectorAll('[data-i18n]').forEach(el=>{
		const key = el.getAttribute('data-i18n');
		const text = (translations[lang] && translations[lang][key]) || el.textContent;
		el.textContent = text;
	});
}

// background images per language
const bgImages = {
	he: '/assets/og-image.jpg',
	en: '/assets/og-image-english.jpg'
};

function setBackgroundFor(lang){
	const bg = document.getElementById('site-bg');
	if(!bg) return;
	bg.style.backgroundImage = `url(${bgImages[lang] || bgImages.he})`;
}

// language toggle
const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('site-lang') || (document.documentElement.lang || 'he');
applyTranslations(currentLang);
setBackgroundFor(currentLang);
if(langToggle){
	langToggle.textContent = (currentLang === 'he') ? 'EN' : 'HE';
	langToggle.addEventListener('click', ()=>{
		currentLang = (currentLang === 'he') ? 'en' : 'he';
		localStorage.setItem('site-lang', currentLang);
		applyTranslations(currentLang);
		setBackgroundFor(currentLang);
		langToggle.textContent = (currentLang === 'he') ? 'EN' : 'HE';
	});
}

// load Lenis (smooth scroll) from CDN if not reduced motion
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
	const s = document.createElement('script');
	s.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.31/bundled/lenis.min.js';
	s.onload = ()=>{
		try{
			const lenis = new Lenis({lerp:0.1, smoothWheel:true});
			function raf(time){lenis.raf(time);requestAnimationFrame(raf)}
			requestAnimationFrame(raf);
		}catch(e){console.warn('Lenis init failed',e)}
	};
	document.body.appendChild(s);
}
