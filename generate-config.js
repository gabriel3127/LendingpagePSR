// Script para gerar config.js durante o build
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do arquivo .env
function loadEnvFile() {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
        console.log('✅ Variáveis de ambiente carregadas do .env');
    } else {
        console.warn('⚠️ Arquivo .env não encontrado. Usando valores padrão.');
    }
}

// Carregar variáveis de ambiente
loadEnvFile();

// Validar se as variáveis essenciais estão definidas
const requiredVars = ['EMAILJS_PUBLIC_KEY', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ Variáveis de ambiente obrigatórias não encontradas:', missingVars);
    console.error('💡 Copie o arquivo .env.example para .env e configure as variáveis.');
    process.exit(1);
}

const config = `// Configurações geradas automaticamente durante o build
// ⚠️ ESTE ARQUIVO É GERADO AUTOMATICAMENTE - NÃO EDITE MANUALMENTE
window.CONFIG = {
    EMAILJS_PUBLIC_KEY: '${process.env.EMAILJS_PUBLIC_KEY}',
    EMAILJS_SERVICE_ID: '${process.env.EMAILJS_SERVICE_ID}',
    EMAILJS_TEMPLATE_ID: '${process.env.EMAILJS_TEMPLATE_ID}',
    DESTINATION_EMAIL: '${process.env.DESTINATION_EMAIL || 'contato@psrembalagens.com.br'}',
    WHATSAPP_NUMBER: '${process.env.WHATSAPP_NUMBER || '5561993177107'}',
    SOCIAL_LINKS: {
        facebook: '${process.env.FACEBOOK_URL || 'https://facebook.com/psrembalagens'}',
        instagram: '${process.env.INSTAGRAM_URL || 'https://instagram.com/psrembalagens'}',
        whatsapp: 'https://wa.me/${process.env.WHATSAPP_NUMBER || '5561993177107'}'
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
`;

fs.writeFileSync('config.js', config);
console.log('✅ config.js gerado com sucesso!');