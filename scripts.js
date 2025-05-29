// Modular JavaScript Components

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

// Scroll Animation Component
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
                    entry.target.classList.add('animated');
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
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
        }
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
        
        // Show success message
        this.showSuccessMessage();
    }
    
    showSuccessMessage() {
        alert('Thank you for your message! Your email client should open with a pre-filled message. If not, please email us directly at help@warmbo.com');
    }
}

// Auto-scrolling Process Component
class ProcessAutoScroll {
    constructor() {
        this.processWrapper = document.querySelector('.process-wrapper');
        this.processSection = document.querySelector('.process');
        this.init();
    }
    
    init() {
        if (this.processWrapper && this.processSection) {
            this.setupIntersectionObserver();
        }
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger the slide-up animation for the entire container
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

// Header Scroll Effect Component
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                this.header.style.backdropFilter = 'blur(15px)';
            } else {
                this.header.style.background = 'var(--white)';
                this.header.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
    new ScrollAnimations();
    new ContactForm();
    new HeaderScrollEffect();
    new ProcessAutoScroll();
});

// Export components for potential use in other pages
window.WarmboComponents = {
    SmoothScroll,
    ScrollAnimations,
    ContactForm,
    HeaderScrollEffect,
    ProcessAutoScroll
};