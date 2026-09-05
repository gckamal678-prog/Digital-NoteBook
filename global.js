/**
 * Global Preferences & UI Configuration Manager
 * Handles Theme, Language, Font Settings, and Document Text Effects across all pages.
 */

class GlobalSettingsManager {
    constructor() {
        this.init();
    }

    init() {
        // DOM लोड भएपछि वा स्क्रिप्ट लोड हुनेबित्तिकै सेटिङहरू एप्लाई गर्ने
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.applyToDocument());
        } else {
            this.applyToDocument();
        }
    }

    // सबै सेटिङहरू डकुमेन्टमा लागु गर्ने मुख्य फंक्सन
    applyToDocument() {
        this.applyTheme();
        this.applyLanguage();
        this.applyTypography();
    }

    // १. थिम (Dark / Light Mode) व्यवस्थापन
    applyTheme() {
        const theme = localStorage.getItem('theme') || 'dark';
        const htmlElement = document.documentElement;
        
        if (theme === 'light') {
            htmlElement.classList.remove('dark');
        } else {
            htmlElement.classList.add('dark');
        }
    }

    // २. भाषा (Language) व्यवस्थापन
    applyLanguage() {
        const lang = localStorage.getItem('language') || 'en';
        document.documentElement.setAttribute('lang', lang);
        
        // यदि पेजमा data-i18n attribute हरू छन् भने तिनको अनुवाद मिलाउने (यदि ट्रान्सलेसन अब्जेक्ट उपलब्ध भएमा)
        if (typeof window.translations !== 'undefined' && window.translations[lang]) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (window.translations[lang][key]) {
                    el.innerText = window.translations[lang][key];
                }
            });
        }
    }

    // ३. फन्ट र डिजाइन शैली (Typography & Layout Style) व्यवस्थापन
    applyTypography() {
        const fontSize = localStorage.getItem('font_size') || 'normal';
        const fontFamily = localStorage.getItem('font_family') || 'Poppins';
        const fontStyle = localStorage.getItem('font_style') || 'normal';
        const textEffect = localStorage.getItem('text_effect') || 'normal';

        // बडी वा रुट इलेमेन्टमा फन्ट साइज क्लास वा स्टाइल सेट गर्ने
        document.body.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xs');
        if (fontSize === 'small') {
            document.body.style.fontSize = '13px';
        } else if (fontSize === 'extra') {
            document.body.style.fontSize = '18px';
        } else {
            document.body.style.fontSize = '15px'; // Normal default
        }

        // फन्ट फेमिली लागु गर्ने
        document.body.style.fontFamily = `'${fontFamily}', sans-serif`;

        // फन्ट स्टाइल (Bold / Italic / Normal) लागु गर्ने
        if (fontStyle === 'bold') {
            document.body.style.fontWeight = '700';
            document.body.style.fontStyle = 'normal';
        } else if (fontStyle === 'italic') {
            document.body.style.fontWeight = '400';
            document.body.style.fontStyle = 'italic';
        } else {
            document.body.style.fontWeight = '400';
            document.body.style.fontStyle = 'normal';
        }

        // ऐच्छिक टेक्स्ट इफेक्ट्स (Text Effects) ह्यान्डलिङ्ग
        document.body.classList.remove('text-effect-shadow', 'text-effect-outline', 'text-effect-hollow');
        if (textEffect && textEffect !== 'normal' && textEffect !== 'background') {
            document.body.classList.add(`text-effect-${textEffect}`);
        }
    }
}

// Global இன்स्टन्स सिर्जना गरी जतिखेर पनि कल गर्न मिल्ने बनाउने
window.SettingsManager = new GlobalSettingsManager();
