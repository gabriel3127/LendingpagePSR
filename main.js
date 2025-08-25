// main.js - PSR EMBALAGENS Landing Page JavaScript

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize page loading animation
    initPageLoading();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize header scroll effect
    initHeaderScrollEffect();
    
    // Initialize animations
    initAnimations();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize Schema.org structured data
    initSchemaOrg();
});

// Page loading animation
function initPageLoading() {
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            
            // Add animation class for better UX
            if (!isVisible) {
                navLinks.style.animation = 'slideDown 0.3s ease';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });

        // Close mobile menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Submission
function initFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const nome = formData.get('nome')?.trim();
            const email = formData.get('email')?.trim();
            const telefone = formData.get('telefone')?.trim();
            const mensagem = formData.get('mensagem')?.trim();
            
            // Validate form data
            if (!nome || !email || !telefone || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Olá! Meu nome é ${nome}.

📧 Email: ${email}
📞 Telefone: ${telefone}

💬 Mensagem: ${mensagem}

Enviei este contato através do site da EmbalaDF.`;
            
            try {
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappURL = `https://wa.me/5561993177107?text=${encodedMessage}`;
                
                // Open WhatsApp
                window.open(whatsappURL, '_blank');
                
                // Show success message
                showSuccessMessage('Redirecionando para o WhatsApp! Obrigado pelo seu contato.');
                
                // Reset form
                this.reset();
                
            } catch (error) {
                console.error('Erro ao processar formulário:', error);
                alert('Ocorreu um erro. Tente novamente ou entre em contato diretamente.');
            }
        });
    }
}

// Success message function
function showSuccessMessage(message) {
    // Create a custom success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove background based on scroll position
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 20px rgba(33, 65, 148, 0.1)';
            } else {
                header.style.background = 'var(--white)';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = '0 4px 15px rgba(33, 65, 148, 0.1)';
            }
            
            // Hide/show header on scroll (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
        
        // Ensure smooth transition
        header.style.transition = 'all 0.3s ease';
    }
}

// Intersection Observer for animations
function initAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        document.querySelectorAll('.diferencial-item, .produto-card, .stat-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for multiple items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.diferencial-item, .produto-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Counter animation for stats
function initCounterAnimations() {
    function animateCounter(element, target) {
        if (!element || isNaN(target)) return;
        
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const displayValue = Math.floor(current);
            const suffix = target >= 1000 ? '+' : '+';
            element.textContent = displayValue + suffix;
        }, stepTime);
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        return;
    }

    // Animate counters when they come into view
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement) {
                    const targetText = numberElement.textContent.replace('+', '');
                    const target = parseInt(targetText);
                    
                    if (!isNaN(target)) {
                        // Reset to 0 before animating
                        numberElement.textContent = '0+';
                        animateCounter(numberElement, target);
                    }
                }
                
                // Unobserve to prevent re-triggering
                statObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statObserver.observe(stat);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animations for notifications (inject into head)
function addNotificationStyles() {
    if (document.getElementById('notification-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-text {
            font-weight: 500;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize notification styles
addNotificationStyles();

// Initialize Schema.org structured data for SEO
function initSchemaOrg() {
    // Check if schema script already exists
    if (document.querySelector('script[type="application/ld+json"]')) {
        return; // Schema already exists, don't duplicate
    }
    
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PSR EMBALAGENS - Embalagens Brasília",
        "description": "Embalagens personalizadas e pronta entrega em Brasília DF. Especialistas em embalagens para delivery, festas e eventos.",
        "url": "https://psrembalagens.com.br",
        "telephone": "+55-61-99317-7107",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "SIA Trecho 10,05 PAV B-10B, BOX 07",
            "addressLocality": "Brasília",
            "addressRegion": "DF",
            "postalCode": "71200-100",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -15.788638,
            "longitude": -47.946421
        },
        "openingHours": [
            "Mo-Fr 05:00-17:00",
            "Sa 05:00-12:00"
        ],
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61578739646226",
            "https://www.instagram.com/psrembalagens/"
        ],
        "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": -15.788638,
                "longitude": -47.946421
            },
            "geoRadius": "50000"
        },
        "priceRange": "$",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Catálogo de Embalagens",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "Embalagens para Delivery",
                        "description": "Caixas, marmitas e embalagens para food service"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "Embalagens Personalizadas",
                        "description": "Embalagens customizadas com sua marca"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "Embalagens para Festas",
                        "description": "Utensílios descartáveis para eventos"
                    }
                }
            ]
        }
    };
    
    // Create and inject the schema script
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    
    // Add to document head
    document.head.appendChild(schemaScript);
    
    console.log('Schema.org structured data injected successfully');
}

function showTab(tabName) {
    // Esconder todo o conteúdo das abas
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.add('hidden');
    });

    // Remover classe ativa de todos os botões
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
        button.classList.remove('bg-primary', 'text-white');
        button.classList.add('bg-gray-200', 'text-gray-600', 'hover:bg-gray-300');
    });

    // Mostrar o conteúdo da aba selecionada
    document.getElementById('content-' + tabName).classList.remove('hidden');

    // Adicionar classe ativa ao botão selecionado
    const activeButton = document.getElementById('tab-' + tabName);
    activeButton.classList.add('active', 'bg-primary', 'text-white');
    activeButton.classList.remove('bg-gray-200', 'text-gray-600', 'hover:bg-gray-300');
}

// Inicializar com a primeira aba ativa
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        if (!button.classList.contains('active')) {
            button.classList.add('bg-gray-200', 'text-gray-600', 'hover:bg-gray-300');
        } else {
            button.classList.add('bg-primary', 'text-white');
        }
    });
});

// Export functions for potential external use
window.PSREMBALAGENS = {
    initMobileMenu,
    initSmoothScrolling,
    initFormSubmission,
    showSuccessMessage,
    initSchemaOrg
};