// ==================== MOBILE MENU TOGGLE ==================== 
// This function toggles the mobile navigation menu open and closed
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        // Toggle the 'active' class to show/hide menu
        navLinks.classList.toggle('active');
        
        // Animate hamburger lines
        this.style.transform = navLinks.classList.contains('active') 
            ? 'rotate(90deg)' 
            : 'rotate(0deg)';
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.style.transform = 'rotate(0deg)';
        }
    });
});

// ==================== SMOOTH SCROLLING ==================== 
// Smooth scroll effect for anchor links
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

// ==================== BACK TO TOP BUTTON ==================== 
// Show/hide back to top button based on scroll position
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    // Show button when user scrolls down 300px from the top
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when button is clicked
if (backToTopButton) {
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== FORM SUBMISSION ==================== 
// Admission Form Submission Handler
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form values
        const formData = new FormData(this);
        const inputs = this.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        // Basic validation
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields!');
            return;
        }
        
        // Show success message
        alert('✅ Thank you for your inquiry!\n\nYour application has been submitted successfully. Our admission team will contact you within 24 hours.');
        
        // Reset form
        this.reset();
        
        // Clear error styles
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    });
}

// ==================== CONTACT FORM SUBMISSION ==================== 
// Contact Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form values
        const inputs = this.querySelectorAll('input, textarea');
        const nameInput = inputs[0];
        const emailInput = inputs[1];
        const phoneInput = inputs[2];
        const messageInput = inputs[3];
        
        let isValid = true;
        
        // Basic validation
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = '#ef4444';
            alert('Please enter a valid email address!');
            return;
        }
        
        if (!isValid) {
            alert('Please fill in all required fields!');
            return;
        }
        
        // Show success message with user's name
        const name = nameInput.value;
        alert(`✅ Thank you, ${name}!\n\nYour message has been sent successfully. We will get back to you shortly.`);
        
        // Reset form
        this.reset();
        
        // Clear error styles
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    });
}

// ==================== SCROLL ANIMATIONS ==================== 
// Add animation on scroll (optional fade-in effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to cards
document.querySelectorAll('.highlight-card, .facility-card, .class-card, .gallery-item, .news-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add fadeIn animation to CSS dynamically if not already present
if (!document.querySelector('style[data-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animation', 'true');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== NAVBAR BACKGROUND ON SCROLL ==================== 
// Add shadow to navbar when scrolled
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== COUNTER ANIMATION ==================== 
// Animate numbers in highlight section (optional)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // 16ms per frame
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Trigger counter animation when section comes into view
const highlightSection = document.querySelector('.highlights');
if (highlightSection) {
    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate achievement numbers
                const achievementCard = entry.target.querySelector('.highlight-card:nth-child(1) h3');
                if (achievementCard && !achievementCard.dataset.animated) {
                    achievementCard.dataset.animated = 'true';
                    // Optional: uncomment to enable counter animation
                    // animateCounter(achievementCard, 50);
                }
                highlightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    highlightObserver.observe(highlightSection);
}

// ==================== FORM INPUT FEEDBACK ==================== 
// Add real-time validation feedback
function addFormInputFeedback(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3b82f6';
        });
    });
}

// Apply feedback to both forms
addFormInputFeedback('admissionForm');
addFormInputFeedback('contactForm');

// ==================== RESPONSIVE TWEAKS ==================== 
// Handle window resize for responsive behavior
function handleResponsive() {
    const width = window.innerWidth;
    
    // Close mobile menu on larger screens
    if (width > 768 && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.style.transform = 'rotate(0deg)';
        }
    }
}

window.addEventListener('resize', handleResponsive);

// ==================== PAGE LOAD ANIMATION ==================== 
// Fade in page on load
window.addEventListener('load', function() {
    document.body.style.animation = 'fadeIn 0.6s ease';
});

// ==================== UTILITY FUNCTIONS ==================== 

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Function to format phone numbers (optional)
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return '+' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return phone;
}

// ==================== CONSOLE MESSAGES ==================== 
// Welcome message in console for developers
console.log('%c Welcome to RJL Public School! ', 'background: #1e3a8a; color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
console.log('%c This is a professional school website demo. ', 'color: #3b82f6; font-size: 14px;');
console.log('%c HTML, CSS, and JavaScript by Developer', 'color: #64748b; font-size: 12px;');

// ==================== INITIALIZATION ==================== 
// Run initialization on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('RJL Public School website loaded successfully!');
    
    // Initialize tooltips (if any)
    const tooltips = document.querySelectorAll('[title]');
    tooltips.forEach(element => {
        element.style.cursor = 'help';
    });
});

// ==================== KEYBOARD SHORTCUTS (OPTIONAL) ==================== 
// Keyboard shortcut: Press 'h' to scroll to home
document.addEventListener('keydown', function(e) {
    if (e.key === 'h' || e.key === 'H') {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
