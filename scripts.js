// Enhanced Modular JavaScript Components

// Smooth Scrolling Component
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Enhanced Scroll Animation Component with Stagger Effects
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        const delay = element.dataset.delay || 0;
        setTimeout(() => {
            element.classList.add('animated');
        }, delay);
    }
}

// Contact Form Component
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.addInputAnimations();
        }
    }

    addInputAnimations() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'translateY(-2px)';
            });
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        this.sendEmail(data);
    }
    
    sendEmail(data) {
        const subject = encodeURIComponent(`Service Request from ${data.name}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone}\n\n` +
            `Message:\n${data.message}`
        );
        
        const mailtoLink = `mailto:help@warmbo.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        this.showSuccessMessage();
    }
    
    showSuccessMessage() {
        const btn = this.form.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    }
}

// Enhanced Auto-scrolling Process Component
class ProcessAutoScroll {
    constructor() {
        this.processWrapper = document.querySelector('.process-container');
        this.processSection = document.querySelector('.process');
        this.init();
    }
    
    init() {
        if (this.processWrapper && this.processSection) {
            this.setupIntersectionObserver();
            this.addHoverEffects();
        }
    }

    addHoverEffects() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                step.style.zIndex = '100';
            });
            step.addEventListener('mouseleave', () => {
                step.style.zIndex = '';
            });
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.processWrapper.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        observer.observe(this.processSection);
    }
}

// Enhanced Header Scroll Effect Component
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        }, { passive: true });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Change header background based on scroll position
        if (currentScrollY > 100) {
            this.header.style.background = 'rgba(255, 255, 255, 0.95)';
            this.header.style.backdropFilter = 'blur(20px)';
            this.header.style.boxShadow = '0 8px 30px rgba(74, 144, 226, 0.2)';
        } else {
            this.header.style.background = 'var(--white)';
            this.header.style.backdropFilter = 'blur(15px)';
            this.header.style.boxShadow = 'var(--shadow-light)';
        }

        // Hide/show header based on scroll direction (optional enhancement)
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.header.style.transform = 'translateY(0)';
        }

        this.lastScrollY = currentScrollY;
    }
}

// Performance Optimization Component
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images when they come into view
        this.setupLazyLoading();
        
        // Reduce animations for users who prefer reduced motion
        this.respectMotionPreferences();
        
        // Optimize scroll events with throttling
        this.optimizeScrollEvents();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    respectMotionPreferences() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        }
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll event handling
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    new SmoothScroll();
    new ScrollAnimations();
    new ContactForm();
    new HeaderScrollEffect();
    new ProcessAutoScroll();
    new PerformanceOptimizer();

    // Add page loaded class for additional animations
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// Export components for potential use in other pages
window.WarmboComponents = {
    SmoothScroll,
    ScrollAnimations,
    ContactForm,
    HeaderScrollEffect,
    ProcessAutoScroll,
    PerformanceOptimizer
};