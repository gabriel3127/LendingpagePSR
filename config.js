// Configurações geradas automaticamente durante o build
// ⚠️ ESTE ARQUIVO É GERADO AUTOMATICAMENTE - NÃO EDITE MANUALMENTE
window.CONFIG = {
    EMAILJS_PUBLIC_KEY: 'CBpvvLBOJW0FYVHHh',
    EMAILJS_SERVICE_ID: 'service_1irc3hk',
    EMAILJS_TEMPLATE_ID: 'template_0hhugyn',
    DESTINATION_EMAIL: 'contato@psrembalagens.com.br',
    WHATSAPP_NUMBER: '5561993177107',
    SOCIAL_LINKS: {
        facebook: 'https://facebook.com/psrembalagens',
        instagram: 'https://instagram.com/psrembalagens',
        whatsapp: 'https://wa.me/5561993177107'
    }
};

// Inicializar EmailJS
if (typeof emailjs !== 'undefined' && window.CONFIG.EMAILJS_PUBLIC_KEY) {
    emailjs.init(window.CONFIG.EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS inicializado com sucesso!');
} else {
    console.warn('⚠️ EmailJS não pôde ser inicializado. Verifique as configurações.');
}

// Verificar se as configurações foram carregadas
if (typeof window !== 'undefined') {
    console.log('✅ Configurações carregadas com sucesso');
} else {
    console.error('❌ Erro ao carregar configurações');
}
