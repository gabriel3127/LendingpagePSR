// config.js - Configurações sensíveis do projeto
// IMPORTANTE: Este arquivo NÃO deve ser commitado no Git

window.CONFIG = {
    // Credenciais do EmailJS
    EMAILJS_PUBLIC_KEY: 'CBpvvLBOJW0FYVHHh',
    EMAILJS_SERVICE_ID: 'service_1irc3hk',
    EMAILJS_TEMPLATE_ID: 'template_0hhugyn',
    
    // Email de destino
    DESTINATION_EMAIL: 'psr.santaritaceasa@gmail.com',
    
    // Configurações do WhatsApp
    WHATSAPP_NUMBER: '5561993177107',
    
    // URLs de redes sociais
    SOCIAL_LINKS: {
        facebook: 'https://www.facebook.com/profile.php?id=61578739646226',
        instagram: 'https://www.instagram.com/psrembalagens/',
        whatsapp: 'https://wa.me/5561993177107'
    }
};

// Verificar se as configurações foram carregadas
if (typeof window !== 'undefined') {
    console.log('✅ Configurações carregadas com sucesso');
} else {
    console.error('❌ Erro ao carregar configurações');
}