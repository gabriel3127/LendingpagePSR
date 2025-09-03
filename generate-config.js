// Script para gerar config.js durante o build
const fs = require('fs');

const config = `
// Configurações geradas automaticamente durante o build
window.CONFIG = {
    EMAILJS_PUBLIC_KEY: '${process.env.EMAILJS_PUBLIC_KEY || 'CBpvvLBOJW0FYVHHh'}',
    EMAILJS_SERVICE_ID: '${process.env.EMAILJS_SERVICE_ID || 'service_1irc3hk'}',
    EMAILJS_TEMPLATE_ID: '${process.env.EMAILJS_TEMPLATE_ID || 'template_0hhugyn'}',
    DESTINATION_EMAIL: '${process.env.DESTINATION_EMAIL || 'contato@psrembalagens.com.br'}',
    WHATSAPP_NUMBER: '${process.env.WHATSAPP_NUMBER || '5561993177107'}',
    SOCIAL_LINKS: {
        instagram: '${process.env.INSTAGRAM_URL || 'https://instagram.com/psrembalagens'}',
        facebook: '${process.env.FACEBOOK_URL || 'https://facebook.com/psrembalagens'}'
    }
};

// Inicializar EmailJS
if (typeof emailjs !== 'undefined' && window.CONFIG.EMAILJS_PUBLIC_KEY !== 'SEU_PUBLIC_KEY') {
    emailjs.init(window.CONFIG.EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS inicializado com sucesso!');
} else {
    console.warn('⚠️ EmailJS não pôde ser inicializado. Verifique as configurações.');
}
`;

fs.writeFileSync('config.js', config);
console.log('✅ config.js gerado com sucesso!');