document.getElementById("year").textContent = new Date().getFullYear();

// Minimal language toggle: full translations applied by mapping keys to selectors
const translations = {
	en: {
		'קו יסוד · BaseLine': 'BaseLine · BaseLine',
		'חיבור בין\nרעיון למציאות.': 'Connecting\nidea to reality.',
		'תכנון, בקרה, חשמל, תקשורת ומערכות חכמות - משלב הרעיון והתכנון ועד ביצוע, אינטגרציה וניהול.': 'Design, control, electrical, communications and smart systems — from concept and planning to delivery, integration and management.',
		'בואו נדבר': 'Contact Us',
		'לשירותים': 'Services',
		'אזור פעילות: ירושלים והסביבה': 'Area: Jerusalem and surrounding',
		'תכנון · ביצוע · ניהול · ייעוץ': 'Design · Delivery · Management · Consulting',
		'מערכות מורכבות.\nגישה פשוטה.': 'Complex systems.\nSimple approach.'
	},
	he: {}
};

function translatePage(lang){
	if(lang === 'en'){
		// simple replacements for common static blocks
		document.querySelectorAll('.eyebrow, .hero-text, .hero-actions a, .hero-meta span, .statement h2').forEach(el=>{
			const t = el.textContent.trim();
			if(translations.en[t]) el.textContent = translations.en[t];
		});
	} else {
		// reload source language from server (easiest reliable option)
		location.reload();
	}
}

// wire up a temporary toggle if exists
const urlLang = new URLSearchParams(location.search).get('lang');
if(urlLang === 'en') translatePage('en');