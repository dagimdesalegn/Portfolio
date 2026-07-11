// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL ENHANCEMENT =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .timeline-content').forEach(el => {
    observer.observe(el);
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create email link (mailto)
        const mailtoLink = `mailto:dagid6944@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message sent! Opening email client...';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// ===== ACTIVE NAV LINK INDICATOR =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#06b6d4';
        } else {
            link.style.color = '';
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.id = 'scrollTopBtn';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1e40af, #7c3aed);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(30, 64, 175, 0.3);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 10px 25px rgba(30, 64, 175, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 5px 15px rgba(30, 64, 175, 0.3)';
    });
};

createScrollTopButton();

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrollY < 800) {
        heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ===== COUNTER ANIMATION =====
const animateCounters = () => {
    const stats = document.querySelectorAll('.stat h4');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);
                let currentValue = 0;
                
                if (!isNaN(numericValue)) {
                    const increment = numericValue / 30;
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
                        }
                    }, 30);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
};

document.addEventListener('DOMContentLoaded', animateCounters);

// ===== FORM VALIDATION =====
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#FF003C';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
        
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#FF003C';
                isValid = false;
            }
        }
    });
    
    return isValid;
};

if (contactForm) {
    contactForm.addEventListener('input', (e) => {
        e.target.style.borderColor = '';
    });
}

// ===== CONSOLE LOG =====
console.log('%c👋 Welcome to Dagim\'s Portfolio!', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and get in touch!', 'color: #10b981; font-size: 12px;');
